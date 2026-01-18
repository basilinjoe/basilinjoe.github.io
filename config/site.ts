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
  gaid: "G-631LG05FS6",
  name: "Basilin Joe",
  position: "Technology Lead at Experion Technologies",
  tagline: "Building scalable cloud solutions that drive business growth",
  aboutMe: "Results-driven Technology Lead with 7+ years' experience in software development, excelling in Azure, AWS, and Full Stack. Proven track record in delivering high-quality projects, optimizing processes, and leading cross-functional teams for enhanced efficiency and collaboration.",
  location: "Ernakulam, Kerala, India",
  email: "basilin@live.com",
  skills: [
    "Azure", "AWS", "DevOps", "Bicep", "Terraform", "Kubernetes", "Docker",
    "C#", "JavaScript", "Python", "TypeScript",
    "Angular", "ReactJS", "NextJS", ".Net",
    "Entityframework", "SQL Server", "AKS", "Azure DevOps"
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
      link: "https://experionglobal.com/",
      current: true,
      roles: [
        {
          name: "Technology Lead",
          startDate: "April 2022",
          responsibilities: [
            "Spearheaded the architecture and implementation of enterprise-scale Azure cloud solutions using Bicep (IaC), achieving 100% consistency in repeatable deployments",
            "Engineered comprehensive Azure DevOps pipelines integrating automated testing, security scanning, and strategic deployment workflows to accelerate release cycles",
            "Directed the transition to a Micro-frontend architecture using Single-SPA and ReactJS, utilizing atomic design principles to enhance application scalability and maintainability",
            "Established cloud-native deployment standards using Azure Kubernetes Service (AKS) and ACR, optimizing container orchestration for high-availability applications",
            "Deployed observability frameworks using Azure Monitor, Application Insights, and Log Analytics to ensure proactive system health monitoring and rapid incident resolution",
            "Developed a library of reusable Bicep modules to standardize resource provisioning, reducing environment setup time across multiple Azure subscriptions",
            "Championed Test-Driven Development (TDD) adoption, resulting in improved code reliability and reduced regression defects",
            "Mentored engineering teams in cloud-native best practices, DevOps methodologies, and Azure optimization"
          ],
          skills: ["Azure", "Bicep", "DevOps", "Kubernetes", "React", "NestJs", "Azure DevOps", "AKS", "IaC"],
          current: true
        },
        {
          name: "Lead Software Engineer",
          startDate: "April 2020",
          responsibilities: [
            "Architected multi-stage CI/CD pipelines in Azure DevOps with environment-specific configurations, significantly reducing deployment errors",
            "Standardized infrastructure provisioning workflows using ARM templates to ensure identical environments and eliminate drift",
            "Integrated automated security scanning and compliance checks within build pipelines via Azure Security Center to shift security left",
            "Configured automated testing frameworks and strict quality gates in Azure Pipelines to enforce high code standards",
            "Designed and executed blue-green deployment strategies, achieving zero-downtime releases for critical production services",
            "Created a suite of reusable pipeline templates and task groups, standardizing deployment processes across the organization",
            "Integrated SonarQube analysis into CI pipelines, enabling continuous monitoring and improvement of code quality metrics",
            "Mentored team members in DevOps practices and Azure cloud services adoption"
          ],
          skills: ["Azure", "DevOps", "Azure Pipelines", "ARM Templates", "CI/CD", "SonarQube", "Azure Security"],
          current: false
        },
        {
          name: "Senior Software Engineer",
          startDate: "April 2018",
          responsibilities: [
            "Orchestrated containerized microservices deployment on Amazon EKS, significantly improving system scalability and reliability",
            "Engineered Jenkins pipelines for fully automated build, test, and deployment workflows across diverse environments",
            "Configured AWS CloudWatch and APM tools to deliver comprehensive real-time system monitoring and performance insights",
            "Designed a robust microservices architecture for logistics operations, maximizing the efficiency of AWS managed services",
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
          startDate: "April 2016",
          responsibilities: [
            "Engineered a label printing helper system that slashed printing time by 50%, driving operational efficiency",
            "Developed modular AngularJS components to upgrade application scalability and ensure a consistent user experience",
            "Integrated real-time SignalR endpoints to facilitate seamless user interaction and enhance engagement",
            "Created visually appealing Point of Sale (POS) screens using canvas, elevating usability and aesthetics",
            "Developed RESTful web APIs in .NET for a robust and user-friendly application interface, ensuring scalability",
            "Conducted comprehensive unit tests, ensuring codebase quality and reliability, contributing to application stability and performance"
          ],
          skills: ["Typescript", "Angular", ".Net", "SQL Server", "API"],
          current: false
        }
      ]
    },
    {
      company: "Vyooha Technologies Pvt Ltd.",
      link: "https://www.linkedin.com/company/vyooha-entertainment/",
      current: false,
      roles: [
        {
          name: "MEAN Stack Developer",
          startDate: "August 2015",
          responsibilities: [
            "Designed and built dynamic MEAN stack web applications, delivering robust and efficient solutions",
            "Authored secure, scalable code complying with rigorous industry standards and best practices",
            "Executed comprehensive testing and debugging protocols to maximize functionality and user satisfaction",
            "Managed successful production deployments, ensuring seamless operations and high availability",
            "Collaborated with developers and stakeholders to translate user requirements into actionable tasks",
            "Actively participated in meetings, providing insights to enhance web application usability and effectiveness"
          ],
          skills: ["Javascript", "AngularJs", "SailsJs", "ExpressJs", "Mongodb", "Html", "CSS"],
          current: false
        }
      ]
    }
  ]
}
