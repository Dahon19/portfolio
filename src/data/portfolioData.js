const certificatePreviewModules = import.meta.glob("../assets/certificate-previews/*.{webp,svg}", {
  eager: true,
  import: "default"
});

const certificatePreview = (fileName) =>
  certificatePreviewModules[`../assets/certificate-previews/${fileName}`];

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
    { label: "Projects", value: "5" },
    { label: "Learning Records", value: "50" },
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
      title: "Computer Systems Servicing",
      certificateLevel: "NCII",
      date: "July 3, 2024",
      type: "Certifications / Trainings",
      location: "TESDA"
    },
    {
      title: "Oplan Paskong Sigurado",
      date: "May 29, 2026",
      type: "Webinars / Seminars Attended",
      location: "Google Drive",
      preview: certificatePreview("oplan-paskong-sigurado.svg")
    },
    {
      title: "Data Analytics and Visualization Essentials",
      date: "January 19, 2026",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("data-analytics-visualization-essentials.webp")
    },
    {
      title: "Cloud and DevOps Basics",
      date: "January 8, 2026",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("cloud-devops-basics.webp")
    },
    {
      title: "AI-Alam: Enhancing Academic Excellence Through Proper AI Tool Usage",
      date: "November 21, 2024",
      type: "Webinars / Seminars Attended",
      location: "Microsoft Teams",
      preview: certificatePreview("ai-alam-proper-ai-tool-usage.webp")
    },
    {
      title: "Step-by-Step Roadmap to Land Data Analyst Role",
      date: "December 27, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("data-analyst-roadmap.webp")
    },
    {
      title: "Smart Moves: How AI Can Power Your Studies, Work, and Future",
      date: "December 17, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("smart-moves-ai-studies-work-future.webp")
    },
    {
      title: "Design Thinking and Mobile App Wireframing",
      date: "November 27, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT Region V / Zoom",
      preview: certificatePreview("design-thinking-mobile-wireframing.webp")
    },
    {
      title: "The Human Side of AI: Ethics, Integrity, and Impact",
      date: "November 29, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT Region V / Zoom and Facebook Live",
      preview: certificatePreview("human-side-ai-ethics-integrity-impact.webp")
    },
    {
      title: "AI x Design: Boost Your Creativity, Speed & Style",
      date: "November 28, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT Region V / Zoom and Facebook Live",
      preview: certificatePreview("ai-design-creativity-speed-style.webp")
    },
    {
      title: "Batch 2 of Hour of Code: Learn AI & Coding the Fun Way!",
      date: "November 22, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT MIMAROPA",
      preview: certificatePreview("batch-2-hour-of-code.svg")
    },
    {
      title: "Hour of Code Session under the AI SmartCT",
      date: "November 27, 2025",
      type: "Webinars / Seminars Attended",
      location: "AI SmartCT",
      preview: certificatePreview("hour-of-code-ai-smartct.webp")
    },
    {
      title: "FreshMedia Fusion: Multimedia Innovation for Future Creative Software Developers",
      date: "November 17, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("freshmedia-fusion.webp")
    },
    {
      title: "The New Era of Marketing: Decoding AI Marketing Automation",
      date: "November 5, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("ai-marketing-automation.webp")
    },
    {
      title: "Decipher the Code: Challenges and Opportunities of AI Adoption Through the Lens of Multigenerational Workforce",
      date: "November 30, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("decipher-ai-workforce.webp")
    },
    {
      title: "i-ACT4SmartCity: Industry-Academe Congress on Technologies for Smart City",
      date: "October 16, 2024",
      type: "Webinars / Seminars Attended",
      location: "Cauayan City, Isabela",
      preview: certificatePreview("iact4smartcity.webp")
    },
    {
      title: "How to 3D Model: Fundamentals of 3D Design and Modeling",
      date: "November 29, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("fundamentals-3d-design-modeling.webp")
    },
    {
      title: "Simplifying Artificial Intelligence for the Next Generation",
      date: "November 18, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("simplifying-ai-next-generation.webp")
    },
    {
      title: "Linux Fundamentals",
      date: "November 30, 2024",
      type: "Webinars / Seminars Attended",
      location: "USAID / Online",
      preview: certificatePreview("linux-fundamentals.webp")
    },
    {
      title: "Introduction to RAN, 5G, and Open RAN",
      date: "November 23, 2024",
      type: "Webinars / Seminars Attended",
      location: "USAID / Online",
      preview: certificatePreview("ran-5g-open-ran.webp")
    },
    {
      title: "Embracing Cyber Security for Tomorrow: Advanced Networking and Defense",
      date: "November 22, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("advanced-networking-defense.webp")
    },
    {
      title: "Building a Personal Brand in IT",
      date: "November 20, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("personal-brand-it.webp")
    },
    {
      title: "Data Privacy and Protection in the Digital Age",
      date: "November 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("data-privacy-protection-digital-age.webp")
    },
    {
      title: "Cutting-edge Strategies and Innovation in Software Technologies",
      date: "November 8, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("software-technologies-innovation.webp")
    },
    {
      title: "Casting a Safe Line: Women Navigating Phishing Waters",
      date: "October 18, 2024",
      type: "Webinars / Seminars Attended",
      location: "Google Meet",
      preview: certificatePreview("phishing-waters.webp")
    },
    {
      title: "The People-Pleaser Career: A Practical Roadmap for UI/UX Design Field",
      date: "November 30, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("uiux-design-roadmap.webp")
    },
    {
      title: "5G and AI: How 5G Accelerates AI-Powered Technology and Edge Computing",
      date: "November 30, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("5g-ai-edge-computing.webp")
    },
    {
      title: "Network Security",
      date: "December 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("network-security.webp")
    },
    {
      title: "Leadership Training",
      date: "December 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("leadership-training.webp")
    },
    {
      title: "Capstone Project Software Quality and Usability",
      date: "December 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("capstone-software-quality-usability.webp")
    },
    {
      title: "Artificial Intelligence Applications in IoT and Its Impact",
      date: "December 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("ai-applications-iot-impact.webp")
    },
    {
      title: "Master ChatGPT",
      date: "December 20, 2025",
      type: "Online Courses Taken",
      location: "UniAthena",
      preview: certificatePreview("uniathena-master-chatgpt.webp")
    },
    {
      title: "Hardware and Upgrade Support",
      date: "December 17, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy",
      preview: certificatePreview("hardware-upgrade-support.webp")
    },
    {
      title: "Artificial Intelligence for Social Impact",
      date: "December 12, 2025",
      type: "Online Courses Taken",
      location: "ADBI E-Learning",
      preview: certificatePreview("ai-social-impact.webp")
    },
    {
      title: "Computer Hardware Basics",
      date: "December 9, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy",
      preview: certificatePreview("computer-hardware-basics.webp")
    },
    {
      title: "Introduction to Modern AI",
      date: "December 8, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy",
      preview: certificatePreview("introduction-modern-ai.webp")
    },
    {
      title: "Basics of SQL Statements and Indexes",
      date: "December 7, 2025",
      type: "Online Courses Taken",
      location: "Online",
      preview: certificatePreview("sql-statements-indexes.webp")
    },
    {
      title: "Basics of Artificial Intelligence",
      date: "December 7, 2025",
      type: "Online Courses Taken",
      location: "Online",
      preview: certificatePreview("basics-artificial-intelligence.webp")
    },
    {
      title: "Basics of Artificial Intelligence: Learning Models",
      date: "December 4, 2025",
      type: "Online Courses Taken",
      location: "Online",
      preview: certificatePreview("ai-learning-models.webp")
    },
    {
      title: "AI for Oceans",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "Code.org",
      preview: certificatePreview("ai-for-oceans.webp")
    },
    {
      title: "Basics of Machine Learning Algorithms",
      date: "December 4, 2025",
      type: "Online Courses Taken",
      location: "Online",
      preview: certificatePreview("machine-learning-algorithms.webp")
    },
    {
      title: "AIClass ASEAN",
      date: "December 4, 2025",
      type: "Online Courses Taken",
      location: "AIClass ASEAN",
      preview: certificatePreview("ai-class-asean.webp")
    },
    {
      title: "Getting Started with Cisco Packet Tracer",
      date: "December 1, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy",
      preview: certificatePreview("cisco-packet-tracer.webp")
    },
    {
      title: "Basics of Python",
      date: "December 2, 2025",
      type: "Online Courses Taken",
      location: "Online",
      preview: certificatePreview("basics-python.webp")
    },
    {
      title: "Web Design",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "FreeCodeCamp",
      preview: certificatePreview("web-design.webp")
    },
    {
      title: "Course C",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "Code.org",
      preview: certificatePreview("course-c.webp")
    },
    {
      title: "Minecraft Hour of Code",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "Code.org",
      preview: certificatePreview("minecraft-hour-of-code.webp")
    },
    {
      title: "Hardware and Upgrade Support Badge",
      date: "December 17, 2025",
      type: "Badges",
      location: "Cisco Networking Academy",
      preview: certificatePreview("hardware-upgrade-support-badge.webp")
    },
    {
      title: "Computer Hardware Basics Badge",
      date: "December 9, 2025",
      type: "Badges",
      location: "Cisco Networking Academy",
      preview: certificatePreview("computer-hardware-basics-badge.webp")
    },
    {
      title: "Introduction to Modern AI Badge",
      date: "December 8, 2025",
      type: "Badges",
      location: "Cisco Networking Academy",
      preview: certificatePreview("modern-ai-badge.webp")
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
    email: "rodagregado19@gmail.com",
    phone: "09770317480",
    note:
      "For professional inquiries, IT instruction opportunities, technical support roles, or junior development work, you may contact me through the details provided here."
  }
};
