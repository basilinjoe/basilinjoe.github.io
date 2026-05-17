---
title: "Deploying Azure Kubernetes Service with Bicep IaC"
date: "2024-06-15"
modified: "2024-06-15"
excerpt: "A practical guide to provisioning production-ready AKS clusters using Bicep infrastructure as code, with networking, RBAC, monitoring, and CI/CD integration."
tags: ["Azure", "Kubernetes", "Bicep", "DevOps", "IaC"]
coverImage: "/blog/ai-coding-assistants-cover.webp"
---

Provisioning an Azure Kubernetes Service cluster manually through the portal is fine for experiments. For production — where you need repeatable, reviewable, auditable infrastructure — you need infrastructure as code. Bicep is the native Azure IaC language, and when combined with AKS it gives you a cluster you can version-control, peer-review, and redeploy from scratch in minutes.

This post walks through a production-grade AKS Bicep module: private networking, workload identity, RBAC, monitoring, and the CI/CD pipeline to deploy it.

## Why Bicep over ARM or Terraform?

**ARM templates** are verbose JSON that nobody enjoys writing or reviewing. Bicep compiles to ARM but is a clean DSL with type safety, modules, and conditions.

**Terraform** is excellent and cross-cloud, but adds the overhead of state management (remote state in Azure Storage, state locking) and a separate toolchain. If your team is Azure-only, Bicep reduces friction and integrates natively with Azure DevOps and GitHub Actions.

**Bicep's key advantages for AKS:**
- First-class Azure resource type support — new AKS API versions appear in Bicep types immediately
- No state file to manage or protect
- Native integration with Azure RBAC and Policy
- Modules encourage reusable, opinionated infrastructure patterns

## Project Structure

Organize your Bicep as reusable modules:

```
infra/
├── main.bicep                 # Orchestrator — calls all modules
├── main.bicepparam            # Environment-specific parameter values
├── modules/
│   ├── aks/
│   │   ├── cluster.bicep      # AKS cluster resource
│   │   ├── nodepool.bicep     # System and user node pools
│   │   └── rbac.bicep         # Role assignments for the cluster
│   ├── networking/
│   │   ├── vnet.bicep         # Virtual network and subnets
│   │   └── nsg.bicep          # Network security groups
│   ├── monitoring/
│   │   └── workspace.bicep    # Log Analytics workspace
│   └── acr/
│       └── registry.bicep     # Azure Container Registry
```

This structure lets you deploy the full stack from `main.bicep` or independently test individual modules.

## Networking First

AKS clusters should run in a dedicated subnet. Never use the default VNet — it limits your options for private clusters, peering, and firewall integration.

```bicep
// modules/networking/vnet.bicep
param location string
param vnetName string
param addressPrefix string = '10.10.0.0/16'

resource vnet 'Microsoft.Network/virtualNetworks@2023-09-01' = {
  name: vnetName
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [ addressPrefix ]
    }
    subnets: [
      {
        name: 'aks-nodes'
        properties: {
          addressPrefix: '10.10.0.0/22'  // 1022 usable IPs for nodes
          // Reserve space for Azure CNI: nodes * max pods per node
        }
      }
      {
        name: 'aks-pods'
        properties: {
          addressPrefix: '10.10.4.0/22'  // For Azure CNI overlay
        }
      }
      {
        name: 'private-endpoints'
        properties: {
          addressPrefix: '10.10.8.0/27'
          privateEndpointNetworkPolicies: 'Disabled'
        }
      }
    ]
  }
}

output vnetId string = vnet.id
output aksSubnetId string = vnet.properties.subnets[0].id
```

## The AKS Cluster Module

```bicep
// modules/aks/cluster.bicep
param location string
param clusterName string
param kubernetesVersion string = '1.29'
param systemNodeSize string = 'Standard_D4s_v3'
param userNodeSize string = 'Standard_D8s_v3'
param minUserNodes int = 2
param maxUserNodes int = 10
param aksSubnetId string
param logAnalyticsWorkspaceId string
param acrId string

// Managed identity for the cluster
resource clusterIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: '${clusterName}-identity'
  location: location
}

resource cluster 'Microsoft.ContainerService/managedClusters@2024-01-01' = {
  name: clusterName
  location: location
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${clusterIdentity.id}': {}
    }
  }
  properties: {
    kubernetesVersion: kubernetesVersion
    dnsPrefix: clusterName

    agentPoolProfiles: [
      // System pool: runs kube-system workloads only
      {
        name: 'system'
        count: 2
        vmSize: systemNodeSize
        osType: 'Linux'
        mode: 'System'
        vnetSubnetID: aksSubnetId
        maxPods: 30
        nodeTaints: [ 'CriticalAddonsOnly=true:NoSchedule' ]
        upgradeSettings: {
          maxSurge: '33%'
        }
      }
      // User pool: runs your application workloads
      {
        name: 'user'
        count: minUserNodes
        vmSize: userNodeSize
        osType: 'Linux'
        mode: 'User'
        vnetSubnetID: aksSubnetId
        maxPods: 110
        enableAutoScaling: true
        minCount: minUserNodes
        maxCount: maxUserNodes
        upgradeSettings: {
          maxSurge: '33%'
        }
      }
    ]

    networkProfile: {
      networkPlugin: 'azure'
      networkPluginMode: 'overlay'  // Azure CNI Overlay — efficient IP usage
      networkPolicy: 'azure'
      serviceCidr: '172.16.0.0/16'
      dnsServiceIP: '172.16.0.10'
      loadBalancerSku: 'standard'
    }

    // Workload identity — pods get Azure AD tokens without stored credentials
    oidcIssuerProfile: {
      enabled: true
    }
    securityProfile: {
      workloadIdentity: {
        enabled: true
      }
    }

    // Azure RBAC for cluster access — no kubeconfig shared secrets
    aadProfile: {
      managed: true
      enableAzureRBAC: true
    }

    // Disable local accounts — force AAD auth
    disableLocalAccounts: true

    addonProfiles: {
      omsAgent: {
        enabled: true
        config: {
          logAnalyticsWorkspaceResourceID: logAnalyticsWorkspaceId
        }
      }
      azureKeyVaultSecretsProvider: {
        enabled: true
        config: {
          enableSecretRotation: 'true'
          rotationPollInterval: '2m'
        }
      }
    }

    autoUpgradeProfile: {
      upgradeChannel: 'patch'  // Auto-patch minor version, manual major upgrades
    }
  }
}

// Grant the cluster identity permission to pull from ACR
resource acrPullRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(acrId, clusterIdentity.id, 'acrpull')
  scope: resourceGroup()
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '7f951dda-4ed3-4680-a7ca-43fe172d538d'  // AcrPull
    )
    principalId: cluster.properties.identityProfile.kubeletidentity.objectId
    principalType: 'ServicePrincipal'
  }
}

output clusterId string = cluster.id
output clusterName string = cluster.name
output kubeletIdentityObjectId string = cluster.properties.identityProfile.kubeletidentity.objectId
output oidcIssuerUrl string = cluster.properties.oidcIssuerProfile.issuerURL
```

## Log Analytics Workspace

Never skip monitoring. The OMS agent addon (enabled above) streams node and container logs to Log Analytics automatically.

```bicep
// modules/monitoring/workspace.bicep
param location string
param workspaceName string

resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 90
    features: {
      enableLogAccessUsingOnlyResourcePermissions: true
    }
  }
}

output workspaceId string = workspace.id
output workspaceResourceId string = workspace.id
```

## Wiring It All Together in main.bicep

```bicep
// main.bicep
targetScope = 'resourceGroup'

param location string = resourceGroup().location
param environment string  // 'dev', 'staging', 'prod'
param clusterName string = 'aks-${environment}'

module networking 'modules/networking/vnet.bicep' = {
  name: 'networking'
  params: {
    location: location
    vnetName: 'vnet-aks-${environment}'
  }
}

module monitoring 'modules/monitoring/workspace.bicep' = {
  name: 'monitoring'
  params: {
    location: location
    workspaceName: 'law-aks-${environment}'
  }
}

module acr 'modules/acr/registry.bicep' = {
  name: 'acr'
  params: {
    location: location
    registryName: 'acr${environment}${uniqueString(resourceGroup().id)}'
  }
}

module aks 'modules/aks/cluster.bicep' = {
  name: 'aks'
  params: {
    location: location
    clusterName: clusterName
    aksSubnetId: networking.outputs.aksSubnetId
    logAnalyticsWorkspaceId: monitoring.outputs.workspaceId
    acrId: acr.outputs.registryId
  }
}
```

## The main.bicepparam File

Bicep parameter files (`.bicepparam`) are the recommended way to handle environment-specific values:

```bicep
// main.prod.bicepparam
using './main.bicep'

param environment = 'prod'
param location = 'southeastasia'
param minUserNodes = 3
param maxUserNodes = 20
param userNodeSize = 'Standard_D16s_v3'
```

Check these into source control alongside the Bicep modules. Secrets (service principal credentials, connection strings) go into Azure Key Vault — never into parameter files.

## Azure DevOps Pipeline

```yaml
# azure-pipelines.yml
trigger:
  branches:
    include: [ main ]
  paths:
    include: [ infra/** ]

variables:
  - group: aks-deploy-secrets   # Contains AZURE_SUBSCRIPTION_ID, SERVICE_CONNECTION

stages:
  - stage: Validate
    jobs:
      - job: LintAndValidate
        steps:
          - task: AzureCLI@2
            displayName: Bicep lint
            inputs:
              azureSubscription: $(SERVICE_CONNECTION)
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az bicep lint --file infra/main.bicep
          - task: AzureCLI@2
            displayName: What-if preview
            inputs:
              azureSubscription: $(SERVICE_CONNECTION)
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az deployment group what-if \
                  --resource-group rg-aks-prod \
                  --template-file infra/main.bicep \
                  --parameters infra/main.prod.bicepparam

  - stage: Deploy
    dependsOn: Validate
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: DeployInfra
        environment: production   # Requires manual approval in Azure DevOps
        strategy:
          runOnce:
            deploy:
              steps:
                - task: AzureCLI@2
                  displayName: Deploy AKS infrastructure
                  inputs:
                    azureSubscription: $(SERVICE_CONNECTION)
                    scriptType: bash
                    scriptLocation: inlineScript
                    inlineScript: |
                      az deployment group create \
                        --resource-group rg-aks-prod \
                        --template-file infra/main.bicep \
                        --parameters infra/main.prod.bicepparam \
                        --mode Incremental
```

The **what-if** stage is critical: it shows exactly what resources will be created, modified, or deleted before the deployment runs. Make it mandatory in your team's process for any infrastructure change.

## Common Pitfalls

**Insufficient subnet IP space** — AKS with Azure CNI allocates IPs per pod, not per node. With 30 pods per node and 10 nodes, you need 300+ IPs in the node subnet. Allocate generously and use CNI Overlay to decouple pod IPs from the VNet.

**Skipping system node pool taints** — Without `CriticalAddonsOnly=true:NoSchedule` on the system pool, your application workloads can land on it and starve kube-system components of resources. Always taint the system pool.

**Local accounts not disabled** — The `disableLocalAccounts: true` property is easy to forget and easy to skip "just for debugging." Disabled local accounts enforce Azure AD authentication across the board, which is what you want for audit trails.

**Node version drift** — Set `autoUpgradeChannel: 'patch'` to keep nodes current on security patches automatically. Major and minor upgrades should be planned and tested, but patch upgrades are safe to automate.

**Missing resource locks** — Add a resource lock to the AKS resource group in production to prevent accidental deletion:

```bicep
resource lock 'Microsoft.Authorization/locks@2020-05-01' = {
  name: 'aks-delete-lock'
  properties: {
    level: 'CanNotDelete'
    notes: 'Prevent accidental AKS cluster deletion'
  }
}
```

## Wrapping Up

A well-structured Bicep AKS deployment gives you infrastructure you can trust: version-controlled, peer-reviewed, and reproducible. The patterns above — modular structure, workload identity, Azure RBAC, CNI Overlay, OMS monitoring, and automated CI/CD — are what we've standardized on across enterprise projects at Experion.

The investment in getting the IaC right pays back quickly. When you need to spin up a staging environment, disaster-recover a production cluster, or onboard a new team, you run the pipeline rather than clicking through the portal hoping you remember every checkbox.

Start with the networking and monitoring modules first — those are the pieces most teams skip and most regret later. Get those right, then layer in the cluster configuration on top.
