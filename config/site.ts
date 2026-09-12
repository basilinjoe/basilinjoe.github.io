export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: "Basilin Joe | Associate Technical Architect - AI, Cloud & Integration",
  description: "Associate Technical Architect with 11 years across enterprise integration, multi-tenant SaaS and AI platform work. Currently building a private Azure AI Foundry agent platform for Australian healthcare, plus a live AI resume platform and a paid production access-control integration shipped solo.",
  url: "https://basilinjoe.github.io",
  openGraph: {
    type: "website",
    title: "Basilin Joe | Associate Technical Architect - AI, Cloud & Integration",
    url: "https://basilinjoe.github.io",
    description: "Personal website of Basilin Joe, Associate Technical Architect at Experion Technologies. Architects AI agent platforms on Azure AI Foundry, ships solo products end to end, and works where architecture meets hard constraint.",
    siteName: "Basilin Joe",
    locale: "en_US",
    images: [
      {
        url: "https://basilinjoe.github.io/avatar.webp",
        width: 400,
        height: 400,
        alt: "Basilin Joe"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@BasilinJoe",
    creator: "@BasilinJoe",
    title: "Basilin Joe | Associate Technical Architect - AI, Cloud & Integration",
    description: "Personal website of Basilin Joe, Associate Technical Architect at Experion Technologies. Architects AI agent platforms on Azure AI Foundry, ships solo products end to end.",
    images: ["https://basilinjoe.github.io/avatar.webp"],
  },
  gaid:"G-631LG05FS6",
  name: "Basilin Joe",
  position: "Associate Technical Architect at Experion Technologies",
  tagline: "Architecting AI platforms, integration systems, and multi-tenant SaaS on Azure",
  aboutMe: "Solution architect who builds the platforms other teams build on. Eleven years across enterprise integration, multi-tenant SaaS and AI platform work, promoted through six roles at one firm into architecture ownership. Most recently a private AI agent platform on Azure AI Foundry for an Australian healthcare provider, and the clinical applications running on top of it. Works best where architecture meets hard constraint: data-sovereignty law, multi-tenant SLAs, offline-tolerant field operations, legacy systems coupled at the database layer. Also ships alone - a live AI resume platform and a paid production access-control integration, both designed, built and operated end to end.",
  location: "Ernakulam,Kerala,India",
  email: "basilin@live.com",
  // Sign up at formspree.io, create a form, and paste the form ID here
  formspreeId: "YOUR_FORM_ID",
  skills: [
    // Cloud & DevOps
    { name: "Azure", category: "cloud", proficiency: 95 },
    { name: "AWS", category: "cloud", proficiency: 80 },
    { name: "DevOps", category: "cloud", proficiency: 90 },
    { name: "Bicep", category: "cloud", proficiency: 85 },
    { name: "Terraform", category: "cloud", proficiency: 75 },
    { name: "Kubernetes", category: "cloud", proficiency: 85 },
    { name: "Docker", category: "cloud", proficiency: 90 },
    { name: "AKS", category: "cloud", proficiency: 85 },
    { name: "Azure DevOps", category: "cloud", proficiency: 90 },
    // Backend
    { name: "C#", category: "backend", proficiency: 95 },
    { name: "Python", category: "backend", proficiency: 75 },
    { name: ".Net", category: "backend", proficiency: 90 },
    { name: "SQL Server", category: "backend", proficiency: 80 },
    { name: "Entityframework", category: "backend", proficiency: 85 },
    // Frontend
    { name: "JavaScript", category: "frontend", proficiency: 85 },
    { name: "TypeScript", category: "frontend", proficiency: 85 },
    { name: "Angular", category: "frontend", proficiency: 80 },
    { name: "ReactJS", category: "frontend", proficiency: 90 },
    { name: "NextJS", category: "frontend", proficiency: 80 },
  ],
  tools: ["Visual Studio", "Visual Studio Code", "Github", "Azure Portal", "Azure DevOps", "Jira", "Confluence"],
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Experience",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    }
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/basilinjoe",
    github: "https://github.com/basilinjoe",
    twitter: "https://twitter.com/BasilinJoe",
    instagram: "https://www.instagram.com/basilinjoe",
    medium: "https://medium.com/@basilin"
  },
  experience: [
    {
      company: "Experion Technologies",
      logo: "",
      link: "https://experionglobal.com/",
      current: true,
      roles: [
        {
          name: "Associate Technical Architect",
          startDate: "01/06/2025",
          endDate: "",
          responsibilities: [
            "Architected and built a private AI agent platform, now in production in the client's own Azure tenant on hub-and-spoke topology, giving business units self-service deployment of agents and the web applications consuming them - private networking, PHI handling, monitoring and audit are properties of the platform rather than problems each team solves again.",
            "Built regulatory retention into the platform itself rather than leaving it to each application - logs held 90 days, other categories beyond 360 days, and records required for seven years - so a team shipping onto the platform inherits compliance instead of implementing it.",
            "Designed the access and network architecture end to end: every application deployed into a private VNet, all web traffic entering through an Application Gateway, an Azure Firewall on egress, and a Bastion service as the only route to build hosts, so engineers deploy through pipelines without the estate ever holding a public endpoint.",
            "Resolved a conflict between Australian data-residency law and audio models available only in East US by combining multi-region model routing, automated screening of data leaving Australia and mandatory security-reviewer approval, narrowing cross-border traffic to an audited exception path instead of dropping the capability.",
            "Built an evaluation framework for agents and prompts and applied it across the AI projects on the platform, establishing measurable quality baselines before release, and integrated Microsoft Fabric so agents query governed enterprise data at source rather than through duplicated copies.",
            "Configured content moderation, prompt-injection defence and output controls on Azure AI Foundry, and applied systematic prompt iteration across the platform's agents.",
            "Took over a clinical AI application delivered late by another team, worked it for bug fixing before concluding that unclear naming, uncaptured business scenarios and unfit scaling warranted rebuilding - then redesigned it as a Next.js application consuming Microsoft Fabric data, with Python agents on the Azure Agent Framework and Cosmos DB for application state.",
            "Directed Claude Code and its design canvas to build a clinical note-taking feature end to end for a policy-grounded care-plan assistant - spec written with test cases first, agent generating the build plan, with the plan and edge cases corrected by hand - for a second Australian aged-care client.",
            "Designed a three-agent pipeline (language detection, speech transcription, translation) letting multilingual aged-care staff record shift notes in their own language, with a summary and action list derived automatically for the next carer - live in production, and the multilingual note core was later adapted for a second Australian healthcare client.",
            "Gave the agents a governed tool surface against a real system of record: a C# console MCP server on the .NET MCP SDK wrapping the aged-care system of record, reading across a handful of endpoints and writing back exactly one record type, progress notes, by deliberate design rather than broad access."
          ],
          skills: ["Azure AI Foundry", "Semantic Kernel", "Azure Agent Framework", "MCP", "RAG", "Azure AI Search", "Microsoft Fabric", "LangGraph", "Next.js", "Python", "C#", "Cosmos DB", "Bicep"],
          current: true
        },
        {
          name: "Technology Lead",
          startDate: "01/01/2022",
          endDate: "01/05/2025",
          responsibilities: [
            "Cut evaluation turnaround for campus-recruitment drives from roughly four hours to fifteen to twenty minutes per 300-400 candidate drive, by encoding Experion's own human scoring rubric into an agent that reasons over each candidate's resume, code-execution results, group-discussion signal and academic record.",
            "Returned a review pool of 10-50 engineers, each spending 2-3 hours per drive, to delivery work by replacing manual per-candidate marking with the automated evaluator.",
            "Proved the system before trusting it: ran it in parallel with human evaluators across five drives, adjudicated every scoring disagreement to identify which side was wrong, and turned the labelled outliers into a standing regression-eval suite that re-verifies the agents after every model or prompt change.",
            "Ran a formal study comparing agent and human evaluation scores and found no measurable bias by gender or other candidate category; in production and well regarded across the organisation for two years.",
            "Co-designed the move from direct database-level coupling to Azure Service Bus publish/subscribe across an estate of 15+ integrated aged-care applications, cutting event-propagation latency from five minutes to under one second and eliminating public network exposure by relocating the estate into a private VNet on hub-and-spoke topology.",
            "Codified the Azure estate in Bicep and introduced centralised monitoring and structured logging where none existed, cutting infrastructure deployment time 30% and giving the team repeatable, audit-ready environment builds.",
            "Authored the pre-sales proposal carrying the architecture and integration design for an enterprise integration platform, then carried it through delivery from Technology Lead into the Associate Technical Architect role.",
            "Spent six months on-site with the client in Australia during the integration platform's delivery, working with them directly rather than from offshore.",
            "Authored and sent the pre-sales solution-architecture proposal, architecture design and diagram included, that won a new client engagement and was later delivered as its Single-SPA/React micro-frontend platform.",
            "Replaced a paginated timeline view with a custom virtual-scroll component in React, built when off-the-shelf options didn't fit the scroll performance the data-mesh product's timeline needed, as part of a Single-SPA/React/InversifyJS/MobX micro-frontend platform serving a ten-person engineering team."
          ],
          skills: ["Azure Service Bus", "Bicep", "Single-SPA", "React", "InversifyJS", "MobX", "Micro-frontends", "Enterprise Integration", "Pre-sales"],
          current: false
        },
        {
          name: "Lead Software Engineer",
          startDate: "01/04/2020",
          endDate: "01/12/2021",
          responsibilities: [
            "Decomposed a fleet-management monolith into independently deployable microservices for ETA calculation, scheduling and real-time truck tracking - workloads with different load characteristics and deploy cadences - communicating over RabbitMQ and containerised onto Azure Kubernetes Service through an Azure DevOps pipeline.",
            "Centralised authorisation across the application with Keycloak SSO and reusable Angular RBAC components and directives, removing duplicated auth logic from every module, and cut initial load time by serving Angular static assets from a CDN.",
            "Built a custom priority-queue task scheduler enforcing tenant precedence across a 50+ tenant warehouse-management SaaS, protecting SLA-tier throughput under peak load where a generic queue let one tenant's spike starve the rest.",
            "Cut API latency roughly 20-30% by caching the results of complex, slow-running SQL queries in Redis - targeting reference tables refreshed on a daily batch cycle, where staleness was bounded by design rather than hoped for - and instrumented the platform with APM so performance problems were detected proactively rather than arriving as customer reports."
          ],
          skills: ["Microservices", "RabbitMQ", "AKS", "Azure DevOps", "Keycloak", "Angular", "Redis", "Multi-tenant SaaS"],
          current: false
        },
        {
          name: "Senior Software Engineer",
          startDate: "01/04/2018",
          endDate: "01/03/2020",
          responsibilities: [
            "Architected and delivered a van-sales platform now used by 2,000+ field agents, owning the data model, back-end and front-end as one system so that all three agreed on an offline-tolerant sync strategy keeping order capture working through the connectivity loss routine on distribution routes.",
            "Led the front-end workstream hands-on inside a 20-engineer programme - estimation, code review and mentoring of junior engineers onto an unfamiliar codebase - and automated private-cloud deployment with Jenkins, removing manual misconfiguration as a failure class.",
            "Designed and built the Azure DevOps build and release pipeline for a ship-vetting product, replacing a manual release process with automated build, test and deployment stages to industry CI/CD conventions, so releases became routine rather than high-stakes."
          ],
          skills: ["Offline Sync", "Angular", "Jenkins", "Azure DevOps", "CI/CD", "Private Cloud"],
          current: false
        },
        {
          name: "Software Engineer",
          startDate: "01/04/2017",
          endDate: "01/03/2018",
          responsibilities: [
            "Tuned a WPF and Silverlight desktop dashboard running over WCF services, cutting load time 30% by indexing and partitioning the SQL Server tables behind it and adding lazy loading so users saw data immediately rather than waiting on the full load.",
            "Used memory profiling to trace the dashboard's memory leaks to the exact retaining objects rather than guessing at causes, then authored an architecture proposal for the product's next major version that the team adopted as its scalability and maintainability baseline."
          ],
          skills: ["WPF", "Silverlight", "WCF", "SQL Server", "Performance Tuning"],
          current: false
        },
        {
          name: "Associate Software Engineer",
          startDate: "01/04/2016",
          endDate: "01/03/2017",
          responsibilities: [
            "Built RESTful ASP.NET Web APIs over the existing .NET services for a large retail loyalty POS programme, cutting label-printing time 50% with a purpose-built print-helper service.",
            "Developed a reusable AngularJS component library and SignalR real-time endpoints, supporting a consistent user experience and live in-store interactions across the loyalty platform."
          ],
          skills: ["ASP.NET", "AngularJS", "SignalR", ".NET", "REST APIs"],
          current: false
        }
      ]
    },
    {
      company: "Independent AI Career Platform",
      logo: "",
      link: "",
      current: true,
      roles: [
        {
          name: "Founder and Sole Engineer",
          startDate: "01/01/2025",
          endDate: "",
          responsibilities: [
            "Independently designed, built and now operate a live AI resume and cover-letter platform end to end - a Next.js/TypeScript frontend, a LangChain/LangGraph agent workflow behind an OpenRouter model router, Postgres plus a vector store for job-to-resume matching, deployed via Docker on a self-managed VM - solo, with 1,000+ signups since launch.",
            "Designed the platform's personal data model as a self-updating career record in an open resume format: when a user supplies experience the stored record does not yet hold, that record absorbs it, so every generated resume and cover letter is a projection of one durable record rather than a disconnected draft.",
            "Owned the product decisions as well as the engineering: researched competing resume tools, designed the UI and wireframes in Figma, and wrote the specs, for a platform conceived, built and shipped solo."
          ],
          skills: ["Next.js", "TypeScript", "LangChain", "LangGraph", "OpenRouter", "PostgreSQL", "Vector Search", "Docker", "Figma"],
          current: true
        }
      ]
    },
    {
      company: "Independent Contract Work",
      logo: "",
      link: "",
      current: false,
      roles: [
        {
          name: "Backend Engineer, Contract",
          startDate: "01/02/2026",
          endDate: "01/04/2026",
          responsibilities: [
            "Solo-designed, built and shipped a paid, production FastAPI integration syncing gym membership status to third-party face-recognition access gates - async service with dual sync paths (scheduled polling and real-time webhooks) and an admin dashboard for device health and sync monitoring - from design through Docker deployment and live operation."
          ],
          skills: ["FastAPI", "Python", "Docker", "Webhooks", "IoT Integration"],
          current: false
        }
      ]
    },
    {
      company: "Vyooha Technologies Pvt Ltd.",
      logo: "",
      link: "https://www.linkedin.com/company/vyooha-entertainment/",
      current: false,
      roles: [
        {
          name: "MEAN Stack Developer",
          startDate: "01/08/2015",
          endDate: "01/04/2016",
          responsibilities: [
            "Delivered a travel-and-tourism booking application on the MEAN stack (MongoDB, Express, AngularJS and Node.js, with Sails.js) inside an eight-person squad, shipped to production."
          ],
          skills: ["MongoDB", "Express", "AngularJS", "Node.js", "Sails.js"],
          current: false
        }
      ]
    }
  ]
}
