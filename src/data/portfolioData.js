import advancedNetworkingDefensePreview from "../assets/certificate-previews/advanced-networking-defense.webp";
import aiSocialImpactPreview from "../assets/certificate-previews/ai-social-impact.webp";
import ciscoPacketTracerPreview from "../assets/certificate-previews/cisco-packet-tracer.webp";
import computerSystemsServicingPreview from "../assets/certificate-previews/computer-systems-servicing.webp";
import decipherAiWorkforcePreview from "../assets/certificate-previews/decipher-ai-workforce.webp";
import designThinkingMobileWireframingPreview from "../assets/certificate-previews/design-thinking-mobile-wireframing.webp";
import hardwareUpgradeSupportPreview from "../assets/certificate-previews/hardware-upgrade-support.webp";
import uniathenaMasterChatgptPreview from "../assets/certificate-previews/uniathena-master-chatgpt.webp";

export const portfolioData = {
  profile: {
    name: "Rod Allen B. Agregado",
    title: "Information Technology Graduate",
    shortTitle: "IT Graduate | System Developer | Technical Support Learner",
    tagline:
      "System development, support, and practical web solutions.",
    intro:
      "Information Technology graduate with a foundation in computer fundamentals, hardware troubleshooting, software applications, user support, and web development. I build practical systems for real workflow problems.",
    about:
      "I am an Information Technology graduate with hands-on experience in system maintenance, hardware support, troubleshooting, and web-based development. My background combines programming, digital tools, academic projects, internship exposure, competitions, seminars, and online courses. I am especially interested in building useful systems and helping users apply technology in an organized way.",
    focusAreas: [
      "System development",
      "Technical support",
      "Web application development",
      "Computer troubleshooting",
      "Inventory and HR workflows",
      "Learning technology and digital skills",
      "User-oriented interface design",
      "Student and user guidance"
    ]
  },
  stats: [
    { label: "Projects", value: "7" },
    { label: "Learning Records", value: "20" },
    { label: "Focus", value: "IT Systems" }
  ],
  skills: [
    {
      category: "Programming",
      items: ["PHP", "JavaScript", "C++", "Python", "TypeScript", "SQL"]
    },
    {
      category: "Web Development",
      items: ["HTML", "CSS", "Bootstrap", "Laravel", "React", "Vite", "Responsive UI"]
    },
    {
      category: "Database",
      items: ["MySQL", "SQL", "CRUD operations", "Database schema design", "Data validation"]
    },
    {
      category: "Technical Support",
      items: ["Basic troubleshooting", "Technical support", "System setup support", "User assistance", "System maintenance"]
    },
    {
      category: "Computer Hardware and Software",
      items: ["Computer hardware and software", "Hardware installation and maintenance", "Computer troubleshooting", "MS Word", "MS Excel", "PowerPoint"]
    },
    {
      category: "Networking Basics",
      items: ["Cisco Packet Tracer", "Basic networking", "Network security fundamentals", "Connectivity basics"]
    },
    {
      category: "Teaching/Communication Skills",
      items: ["Clear documentation", "Presentation readiness", "Collaborative communication", "Practical guidance", "Continuous learning mindset"]
    }
  ],
  projects: [
    {
      slug: "mhis",
      title: "Medical Hospital Inventory System",
      category: "Inventory and Operations System",
      description:
        "A hospital inventory platform designed to manage medical supply requests, stock movements, batch monitoring, and reporting for organized inventory operations.",
      techStack: {
        languages: ["PHP", "JavaScript", "SQL"],
        tools: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "MySQL"]
      },
      features: [
        "FEFO inventory logic for expiration-aware stock release",
        "Role-based workflows for administrators and department staff",
        "Request approval and release tracking",
        "Inventory alerts, reports, and audit-style visibility"
      ],
      contribution:
        "Implemented and organized the full-stack application structure, dashboard experience, and module-level workflows for a healthcare inventory use case.",
      reference: "Project summary"
    },
    {
      slug: "hrms",
      title: "HRSync: Human Resource Management System",
      category: "Administrative Information System",
      description:
        "A human resource management system built to organize employee records, attendance workflows, leave handling, documents, and administrative reporting.",
      techStack: {
        languages: ["PHP", "JavaScript", "SQL"],
        tools: ["Laravel", "CoreUI", "Bootstrap", "MySQL", "Vite"]
      },
      features: [
        "Employee, department, and position management",
        "Attendance workflows with kiosk and NFC-ready support",
        "Leave, travel order, offboarding, and document modules",
        "Reporting, audit visibility, and notification features"
      ],
      contribution:
        "Developed and refined HR workflows, attendance experiences, and module integrations for a broad administrative system.",
      reference: "Project summary"
    },
    {
      slug: "edu-web",
      title: "Genesis English Language Academy CMS",
      category: "Education Website and CMS",
      description:
        "A school website and content management system for public information, announcements, learning resources, gallery content, and role-based administration.",
      techStack: {
        languages: ["PHP", "CSS", "SQL", "JavaScript"],
        tools: ["Laravel", "MySQL", "Vite"]
      },
      features: [
        "Public website for programs, books, events, and contact content",
        "Role-based CMS for content updates",
        "Fixed homepage editor with reusable content sections",
        "Gallery, news, events, and inquiry management"
      ],
      contribution:
        "Built and maintained the CMS structure, public page rendering, and admin-side content management flows.",
      reference: "Project summary"
    },
    {
      slug: "interna",
      title: "Interna",
      category: "Mobile Productivity App",
      description:
        "A mobile productivity app for OJT time management that helps users log activity, monitor hours, and organize internship-related records.",
      techStack: {
        languages: ["JavaScript", "TypeScript"],
        tools: ["Expo", "React Native", "Expo Router", "Supabase"]
      },
      features: [
        "Time logging and history tracking",
        "Report-focused workflow for OJT activity records",
        "Profile, settings, and tab-based navigation",
        "Mobile-first architecture with cloud-backed services"
      ],
      contribution:
        "Created the app structure and time-management workflow with a mobile-first experience for internship documentation.",
      reference: "Project summary"
    },
    {
      slug: "project-studio",
      title: "Mobile App Project Studio",
      category: "Developer Tooling and Automation",
      description:
        "A local automation studio that scaffolds and improves Flutter projects through a multi-agent workflow with validation, run tracking, and a web dashboard.",
      techStack: {
        languages: ["Python", "JavaScript", "TypeScript"],
        tools: ["Flask", "React", "Vite", "Flutter", "Local model integration"]
      },
      features: [
        "Prompt-based Flutter project creation and improvement",
        "Project run history and orchestration tracking",
        "Validation pipeline and runtime controls",
        "GUI explorer for generated projects"
      ],
      contribution:
        "Designed the orchestration workflow and supporting interface for local AI-assisted Flutter project generation.",
      reference: "Project summary"
    },
    {
      slug: "bacmatic",
      title: "SACMATIC: IoT-Based Water Monitoring System for SACDECO Tilapia Hatchery",
      category: "Capstone Project",
      description:
        "A capstone project focused on monitoring water conditions for tilapia hatchery operations using IoT-oriented hardware and sensor-based tracking.",
      techStack: {
        languages: ["C++"],
        tools: ["Arduino", "Arduino IDE", "Sensors"]
      },
      features: [
        "Sensor-based water monitoring support",
        "Microcontroller-driven environmental data handling",
        "IoT-oriented setup for hatchery monitoring"
      ],
      contribution:
        "Developed the academic capstone solution and worked on the hardware-software setup for monitoring use.",
      reference: "Academic project"
    },
    {
      slug: "u-turn",
      title: "U-Turn Accident Prevention System",
      category: "Client Project",
      description:
        "A client-focused project designed to support accident prevention using Arduino-based control and detection components.",
      techStack: {
        languages: ["C++"],
        tools: ["Arduino", "Arduino IDE"]
      },
      features: [
        "Arduino-based control implementation",
        "Prevention-oriented hardware logic",
        "Client-focused embedded system setup"
      ],
      contribution:
        "Handled the development setup and implementation support for the embedded project workflow.",
      reference: "Client project"
    }
  ],
  certificates: [
    {
      title: "Design Thinking and Mobile App Wireframing",
      date: "December 11, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: designThinkingMobileWireframingPreview
    },
    {
      title: "The Human Side of AI: Ethics, Integrity, and Impact",
      date: "December 10, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online"
    },
    {
      title: "AI x Design: Boost Your Creativity, Speed & Style",
      date: "December 10, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online"
    },
    {
      title: "Hour of Code Session under the AI SmartCT",
      date: "November 27, 2025",
      type: "Webinars / Seminars Attended",
      location: "AI SmartCT"
    },
    {
      title: "FreshMedia Fusion: Multimedia Innovation for Future Creative Software Developers",
      date: "November 17, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online"
    },
    {
      title: "Decipher the Code: Challenges and Opportunities of AI Adoption Through the Lens of Multigenerational Workforce",
      date: "November 30, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: decipherAiWorkforcePreview
    },
    {
      title: "Master ChatGPT",
      date: "December 20, 2025",
      type: "Online Courses Taken",
      location: "UniAthena",
      preview: uniathenaMasterChatgptPreview
    },
    {
      title: "Hardware and Upgrade Support",
      date: "December 17, 2025",
      type: "Online Courses Taken",
      location: "Online",
      preview: hardwareUpgradeSupportPreview
    },
    {
      title: "Linux Fundamentals",
      date: "December 6, 2024",
      type: "Online Courses Taken",
      location: "Online"
    },
    {
      title: "Introduction to RAN, 5G, and Open RAN",
      date: "November 27, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online"
    },
    {
      title: "Embracing Cyber Security for Tomorrow: Advanced Networking and Defense",
      date: "November 22, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: advancedNetworkingDefensePreview
    },
    {
      title: "Data Privacy and Protection in the Digital Age",
      date: "November 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online"
    },
    {
      title: "Cutting-edge Strategies and Innovation in Software Technologies",
      date: "November 8, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online"
    },
    {
      title: "Casting a Safe Line: Women Navigating Phishing Waters",
      date: "November 30, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online"
    },
    {
      title: "Artificial Intelligence for Social Impact",
      date: "December 11, 2025",
      type: "Online Courses Taken",
      location: "ADBI E-Learning",
      preview: aiSocialImpactPreview
    },
    {
      title: "Computer Hardware Basics",
      date: "December 9, 2025",
      type: "Online Courses Taken",
      location: "Online"
    },
    {
      title: "Introduction to Modern AI",
      date: "December 8, 2025",
      type: "Online Courses Taken",
      location: "Online"
    },
    {
      title: "Basics of SQL Statements and Indexes",
      date: "December 7, 2025",
      type: "Online Courses Taken",
      location: "Online"
    },
    {
      title: "Cisco Packet Tracer",
      date: "December 2, 2025",
      type: "Online Courses Taken",
      location: "Cisco",
      preview: ciscoPacketTracerPreview
    },
    {
      title: "Computer Systems Servicing",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "Online",
      preview: computerSystemsServicingPreview
    }
  ],
  resume: {
    education: [
      {
        title: "Bachelor of Science in Information Technology",
        subtitle: "BSIT Graduate",
        detail:
          "Northeastern College, 2022 to 2026. Academic achievements include Cum Laude, Outstanding On-the-Job Trainee, and Multimedia Artist of the Year."
      }
    ],
    experience: [
      {
        title: "Internship / OJT Experience",
        subtitle: "Northeastern College Information Systems / Electronic Data Processing, 2025 to 2026",
        detail:
          "Assisted in system maintenance and technical support, supported troubleshooting and IT operations, and participated in web and system development tasks."
      }
    ],
    trainings: [
      {
        title: "Relevant Trainings",
        subtitle: "Seminars, webinars, and online learning in AI, cybersecurity, hardware, networking, and web development",
        detail:
          "Built supplementary technical knowledge through Cisco Networking Academy, Free Code Camp, institutional seminars, and technology-focused webinars."
      }
    ],
    technical: [
      "Frontend and backend web development",
      "Computer hardware and software fundamentals",
      "Database-backed CRUD systems",
      "Hardware installation and maintenance",
      "Basic networking",
      "Technical support and troubleshooting",
      "Documentation and structured reporting"
    ],
    soft: [
      "Communication",
      "Adaptability",
      "Willingness to learn",
      "Process-oriented thinking",
      "Collaboration",
      "Guiding and helping users"
    ]
  },
  contact: {
    note:
      "Private contact details are intentionally excluded from this public version. Please reach out through the application channel, recruiter contact path, or a resume request."
  }
};
