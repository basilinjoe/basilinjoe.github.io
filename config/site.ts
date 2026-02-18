export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: "Basilin Joe | Technology Lead & Cloud Solutions Architect",
  description: "Personal website of Basilin Joe, Technology Lead at Experion Technologies specializing in Azure, AWS, and Full Stack development with 7+ years of experience.",
  url: "https://basilinjoe.github.io",
  openGraph: {
    type: "website",
    title: "Basilin Joe | Technology Lead & Cloud Solutions Architect",
    url: "https://basilinjoe.github.io",
    description: "Personal website of Basilin Joe, Technology Lead at Experion Technologies specializing in Azure, AWS, and Full Stack development with 7+ years of experience.",
    siteName: "Basilin Joe",
    locale: "en_US",
    images: [
      {
        url: "https://basilinjoe.github.io/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Basilin Joe"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@BasilinJoe",
    creator: "@BasilinJoe",
    title: "Basilin Joe | Technology Lead & Cloud Solutions Architect",
    description: "Personal website of Basilin Joe, Technology Lead at Experion Technologies specializing in Azure, AWS, and Full Stack development with 7+ years of experience.",
    images: ["https://basilinjoe.github.io/images/og-default.png"],
  },
  gaid:"G-631LG05FS6",
  name: "Basilin Joe",
  position: "Technology Lead at Experion Technologies",
  tagline: "Building scalable cloud solutions that drive business growth",
  aboutMe: "Results-driven Technology Lead with 7+ years' experience in software development, excelling in Azure, AWS, and Full Stack. Proven track record in delivering high-quality projects, optimizing processes, and leading cross-functional teams for enhanced efficiency and collaboration.",
  location: "Ernakulam,Kerala,India",
  email: "basilin@live.com",
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
          name: "Technology Lead",
          startDate: "01/04/2022",
          endDate: "",
          responsibilities: [
            "Architected and implemented enterprise-scale Azure cloud solutions using Infrastructure as Code (IaC) with Bicep templates, ensuring consistent and repeatable deployments",
            "Designed and implemented comprehensive DevOps pipelines using Azure DevOps, incorporating automated testing, security scanning, and deployment strategies",
            "Led the development of Micro-frontend architecture using Single-SPA and ReactJS, implementing atomic design principles for scalable application structure",
            "Established cloud-native deployment patterns using Azure Kubernetes Service (AKS) and Azure Container Registry (ACR) for containerized applications",
            "Implemented robust monitoring and observability using Azure Monitor, Application Insights, and Log Analytics",
            "Developed reusable Bicep modules for standardized resource provisioning across multiple Azure environments",
            "Introduced and implemented Test-Driven Development (TDD) practices, ensuring optimal development processes and code reliability",
            "Mentored team members in cloud-native development practices, DevOps methodologies, and Azure best practices"
          ],
          skills: ["Azure", "Bicep", "DevOps", "Kubernetes", "React", "NestJs", "Azure DevOps", "AKS", "IaC"],
          current: true
        },
        {
          name: "Lead Software Engineer",
          startDate: "01/04/2020",
          endDate: "01/04/2022",
          responsibilities: [
            "Architected and implemented CI/CD pipelines in Azure DevOps with multi-stage deployments and environment-specific configurations",
            "Established infrastructure provisioning workflows using ARM templates for consistent Azure resource deployment",
            "Implemented automated security scanning and compliance checks in the build pipeline using Azure Security Center",
            "Set up automated testing frameworks and quality gates in Azure Pipelines for ensuring code quality",
            "Designed and implemented blue-green deployment strategies for zero-downtime releases",
            "Created reusable pipeline templates and task groups for standardizing deployment processes across projects",
            "Integrated SonarQube analysis into the CI pipeline for continuous code quality monitoring",
            "Mentored team members in DevOps practices and Azure cloud services adoption"
          ],
          skills: ["Azure", "DevOps", "Azure Pipelines", "ARM Templates", "CI/CD", "SonarQube", "Azure Security"],
          current: false
        },
        {
          name: "Senior Software Engineer",
          startDate: "01/04/2018",
          endDate: "01/04/2020",
          responsibilities: [
            "Orchestrated containerized microservices deployment on Amazon EKS, improving system scalability and reliability",
            "Implemented Jenkins pipelines for automated build, test, and deployment workflows across multiple environments",
            "Configured AWS CloudWatch and Application Performance Monitoring (APM) tools for comprehensive system monitoring",
            "Designed and implemented microservices architecture for logistics operations, leveraging AWS managed services",
            "Established infrastructure monitoring and alerting using CloudWatch and custom metrics",
            "Optimized application performance using Redis caching and AWS CloudFront CDN integration",
            "Led the development of scalable APIs using .NET Core, deployed on AWS ECS with auto-scaling capabilities",
            "Mentored junior developers in cloud-native development practices and microservices architecture"
          ],
          skills: ["AWS", "EKS", "Jenkins", "Docker", "Microservices", "CloudWatch", ".NET Core", "Redis", "CloudFront"],
          current: false
        },
        {
          name: "Software Engineer",
          startDate: "01/04/2016",
          endDate: "01/04/2018",
          responsibilities: [
            "Implemented a label printing helper system, cutting printing time by 50%, boosting efficiency and productivity.",
            "Developed reusable AngularJS components for improved application maintainability, scalability, and consistent user experience.",
            "Integrated real-time communication through SignalR endpoints, facilitating user interaction and enhancing overall experience.",
            "Created visually appealing Point of Sale (POS) screens using canvas, elevating usability and aesthetics.",
            "Developed RESTful web APIs in .NET for a robust and user-friendly application interface, ensuring scalability.",
            "Conducted comprehensive unit tests, ensuring codebase quality and reliability, contributing to application stability and performance."
          ],
          skills: ["Typescript", "Angular", ".Net", "SQL Server", "API"],
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
            "Designed and developed robust MEAN stack web applications, ensuring dynamic and efficient solutions.",
            "Wrote secure and scalable code adhering to industry best practices and coding standards.",
            "Conducted thorough testing and debugging for optimal functionality and user experience.",
            "Successfully deployed web applications to production environments, ensuring seamless operations.",
            "Collaborated with developers and stakeholders to translate user requirements into actionable tasks.",
            "Actively participated in meetings, providing insights to enhance web application usability and effectiveness."
          ],
          skills: ["Javascript", "AngularJs", "SailsJs", "ExpressJs", "Mongodb", "Html", "CSS"],
          current: false
        }
      ]
    }
  ]
}
