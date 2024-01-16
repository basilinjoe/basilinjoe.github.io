export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: "Basilin Joe",
  description: "Basilin's Personal Website",
  openGraph: {
    type: "website",
    title: "Basilin Joe",
    url: "https://basilinjoe.github.io",
    description: "Basilin's Personal Website",
    siteName: "Basilin Joe"
  },
  name: "Basilin Joe",
  position: "Technology Lead at Experion Technologies",
  aboutMe: "Results-driven Technology Lead with 7+ years' experience in software development, excelling in Azure, AWS, and Full Stack. Proven track record in delivering high-quality projects, optimizing processes, and leading cross-functional teams for enhanced efficiency and collaboration.",
  location: "Ernakulam,Kerala,India",
  email: "basilin@live.com",
  skills: ["C#", "JavaScript", "Python", "TypeScript", "Angular", "ReactJS", "NextJS", ".Net", "Entityframework", "SQL Server", "Azure", "AWS", "Docker", "Kubernetes"],
  tools: ["Visual Studio", "Visual Studio Code", "Github", "Jira", "Confluence"],
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Experience",
      href: "/about",
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
          startDate: "01/04/2022",
          responsibilities: [
            "Led the development of a Micro-frontend-based front-end application framework, incorporating MVVM pattern and atomic design principles.",
            "Utilised technologies such as Single-SPA, ReactJS, Inversify, and Mobx to establish a modular and scalable application structure, fostering enhanced collaboration and efficiency in development.",
            "Introduced and implemented Test-Driven Development (TDD) practices, ensuring optimal development processes, code reliability, and comprehensive test coverage from project inception.",
            "Led initiatives to educate the team on TDD implementation and its benefits, contributing to the establishment of a culture centered on quality-driven development.",
            "Implemented visual UI testing using Galen, ensuring consistent and visually appealing user interfaces across various devices and screen sizes.",
            "Developed a custom virtual infinite scrolling component using ReactJS, significantly improving performance and user experience in displaying timelines within the application."
          ],
          skills: [],
          current: true
        },
        {
          name: "Lead Software Engineer",
          startDate: "01/04/2020",
          responsibilities: [
            "Led the conceptualisation and implementation of an Azure DevOps-driven build and deployment pipeline,ensuring a seamless delivery of application updates.",
            "Engineered an optimised deployment process, enhancing the efficiency of application updates and enhancements.",
            "Utilised Azure DevOps tools to manage the entire software delivery lifecycle, including code compilation,testing, and deployment.",
            "Collaborated with the development team to instill best practices for continuous integration and continuous deployment (CI/CD) within the pipeline.",
            "Designed and executed automation protocols, minimising manual intervention and ensuring overall deployment consistency.",
            "Enforced adherence to industry standards and coding practices, upholding code quality and stability throughout software delivery, including designing intricate data models, leading a front-end team, crafting both front-end and back-end architectures",
            "Conducted thorough code reviews, worked in task planning and estimation activities, and mentored junior resources for their growth within the team."
          ],
          skills: [],
          current: false
        },
        {
          name: "Senior Software Engineer",
          startDate: "01/04/2018",
          responsibilities: [
            "Implemented a custom task scheduler with a priority queue for efficient task execution and resource allocation.",
            "Configured Application Performance Monitoring (APM) tools to proactively monitor and address performance issues, ensuring optimal system health.",
            "Demonstrated leadership by prioritising and assigning tasks to junior team members, effectively utilising their skills for successful project delivery.",
            "Established build and deployment processes using Jenkins, enabling continuous integration and deployment for improved development efficiency.",
            "Implemented Redis cache to reduce API request latency, significantly improving system responsiveness and overall performance.",
            "Collaborated with stakeholders and product owners to understand project requirements, providing valuable technical insights and recommendations.",
            "Led the development of micro-services for ETA calculation, scheduling, and tracking to optimse logistics and fleet management operations.",
            "Improved the Angular application's load time by deploying static resources to a Content Delivery Network (CDN), ensuring a faster and more responsive user experience."
          ],
          skills: [],
          current: false
        },
        {
          name: "Software Engineer",
          startDate: "01/04/2016",
          responsibilities: [
            "Implemented a label printing helper system, cutting printing time by 50%, boosting efficiency and productivity.",
            "Developed reusable AngularJS components for improved application maintainability, scalability, and consistent user experience.",
            "Integrated real-time communication through SignalR endpoints, facilitating user interaction and enhancing overall experience.",
            "Created visually appealing Point of Sale (POS) screens using canvas, elevating usability and aesthetics.",
            "Developed RESTful web APIs in .NET for a robust and user-friendly application interface, ensuring scalability.",
            "Conducted comprehensive unit tests, ensuring codebase quality and reliability, contributing to application stability and performance."
          ],
          skills: [],
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
          startDate: "01/08/2015",
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
