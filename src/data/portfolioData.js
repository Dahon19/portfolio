const certificatePreviewModules = import.meta.glob("../assets/certificate-previews/**/*.{webp,png,jpg,jpeg,svg}", {
  eager: true,
  import: "default"
});

const projectPreviewModules = import.meta.glob("../assets/project-previews/*.{jpg,jpeg,png,svg,webp}", {
  eager: true,
  import: "default"
});

const certificatePreview = (fileName) => {
  for (const [key, module] of Object.entries(certificatePreviewModules)) {
    if (key.endsWith("/" + fileName)) {
      return module;
    }
  }
  return null;
};

const projectPreview = (fileName) =>
  projectPreviewModules[`../assets/project-previews/${fileName}`];

export const portfolioData = {
  profile: {
    name: "Rod Allen B. Agregado",
    devName: "",
    displayName: "Rod Allen B. Agregado",
    title: "IT Instructor & Web Developer",
    shortTitle: "IT Instructor · Web Developer · Systems Technician",
    intro:
      "IT Instructor at Northeastern College and Web Developer who loves making tech simple, reliable, and hands-on.",
    about:
      "I teach IT at Northeastern College and build web applications. Whether I'm guiding students through hardware diagnostics and network setups or coding practical web tools, I enjoy making technology approachable, reliable, and easy to use.",
    focusAreas: [
      "IT Instruction",
      "Web Development",
      "Computer Hardware",
      "Local Networks",
      "Frontend UI",
      "Database Systems",
      "Technical Mentoring"
    ]
  },
  stats: [
    { label: "TESDA Certified", value: "NCII" },
    { label: "Verified Credentials", value: "50 Records" },
    { label: "Technical Projects", value: "5" }
  ],
  skills: [
    {
      category: "Frontend Development",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Vite", "Bootstrap"],
      competencies: ["Responsive interfaces", "Reusable UI sections", "Portfolio-ready presentation"]
    },
    {
      category: "Backend / Database",
      technologies: ["PHP", "Laravel", "SQL", "MySQL", "Supabase"],
      competencies: ["CRUD workflows", "Schema planning", "Data validation"]
    },
    {
      category: "Technical Support",
      technologies: ["Cisco Packet Tracer", "MS Word", "MS Excel", "PowerPoint"],
      competencies: ["Troubleshooting", "Device setup", "User assistance", "Maintenance tasks"]
    },
    {
      category: "Teaching & Communication",
      technologies: [],
      competencies: ["Documentation", "Presentation readiness", "Team communication", "Learner guidance"]
    },
    {
      category: "Tools & Workflow",
      technologies: ["Git", "GitHub", "VS Code", "Expo", "Arduino", "Arduino IDE"],
      competencies: ["Version control habits", "Project organization", "Hardware-software workflow"]
    }
  ],
  projects: [
    {
      slug: "hrms",
      title: "HRSync: Human Resource Management System",
      shortTitle: "HRSync",
      featured: true,
      category: "Administrative Information System",
      description:
        "An HR platform for employee records, attendance workflows, leave handling, documents, and administrative reporting.",
      summary:
        "HR workflow system for employee records, attendance, leave, documents, and reporting.",
      techStack: {
        languages: ["PHP", "JavaScript", "SQL"],
        tools: ["Laravel", "CoreUI", "Bootstrap", "MySQL", "Vite"]
      },
      preview: {
        src: projectPreview("hrsync-human-resource-management-system.jpg") ?? projectPreview("hrsync-human-resource-management-system.png"),
        alt: "Preview of the HRSync human resource management system dashboard.",
        source: "Project asset from Google Drive"
      },
      features: [
        "Employee, department, and position management",
        "Attendance workflows with kiosk and NFC-ready support",
        "Leave, travel order, offboarding, and document modules",
        "Reporting, audit visibility, and notification features"
      ],
      contribution:
        "Developed HR workflows, attendance experiences, and module integrations for administrative operations.",
      reference: "HR workflow overview"
    },
    {
      slug: "content-management-system",
      title: "Municipal Health Information System (MHIS)",
      shortTitle: "MHIS",
      category: "Healthcare Information System",
      description:
        "A clinic operations system for patient registration, consultation records, and daily medical logs.",
      summary:
        "Healthcare platform for patient records, consultations, medicine tracking, and logs.",
      techStack: {
        languages: ["PHP", "JavaScript", "SQL"],
        tools: ["Laravel", "Bootstrap", "MySQL", "Vite"]
      },
      preview: {
        src: projectPreview("content-management-system.jpg") ?? projectPreview("content-management-system.png"),
        alt: "Preview of the Municipal Health Information System dashboard.",
        source: "Project asset from Google Drive"
      },
      features: [
        "Patient registration and demographic history",
        "Consultation notes and medicine dispensing logs",
        "Role-based access for clinic staff",
        "Daily activity and service summary reports"
      ],
      contribution:
        "Built responsive interface layouts and integrated health records workflows for clinic staff.",
      reference: "Clinic workflow overview"
    },
    {
      slug: "interna",
      title: "Interna: OJT Management Companion",
      shortTitle: "Interna",
      category: "Academic Support Tool",
      description:
        "A mobile-first companion for trainees to log daily tasks, monitor hours, and organize internship documents.",
      summary:
        "Mobile companion app for daily task logs, attendance hours, and internship records.",
      techStack: {
        languages: ["JavaScript", "HTML", "CSS"],
        tools: ["Expo", "React Native", "Firebase", "Supabase"]
      },
      preview: {
        src: projectPreview("interna-ojt-management-companion.jpg") ?? projectPreview("interna-ojt-management-companion.png"),
        alt: "Preview of Interna mobile app screens.",
        source: "Project asset from Google Drive"
      },
      features: [
        "Daily task logging and attendance hour tracking",
        "Document and requirement checklist management",
        "Supervisor verification and evaluation export",
        "Mobile-first architecture with cloud-backed services"
      ],
      contribution:
        "Created the app structure and time-management workflow with a mobile-first experience for internship documentation.",
      reference: "Mobile app overview"
    },
    {
      slug: "bacmatic",
      title: "SACMATIC: IoT-Based Water Monitoring System for SACDECO Tilapia Hatchery",
      shortTitle: "SACMATIC",
      category: "Capstone Project",
      description:
        "An IoT water-monitoring build for tilapia hatchery operations using hardware sensors and microcontroller data handling.",
      summary:
        "IoT hatchery monitor using sensors and microcontroller-based water condition tracking.",
      techStack: {
        languages: ["C++"],
        tools: ["Arduino", "Arduino IDE", "Sensors"]
      },
      preview: {
        src: null,
        alt: "",
        source: "Image pending"
      },
      features: [
        "Sensor-based water condition tracking",
        "Microcontroller-driven environmental data handling",
        "IoT-oriented hatchery monitoring"
      ],
      contribution:
        "Developed the capstone solution and configured the hardware-software workflow.",
      reference: "Academic build"
    },
    {
      slug: "u-turn",
      title: "U-Turn Accident Prevention System",
      shortTitle: "U-Turn",
      category: "Client Project",
      description:
        "A client project for accident-risk reduction using Arduino control, sensor input, and detection components.",
      summary:
        "Arduino-based prevention system using sensor input and embedded control logic.",
      techStack: {
        languages: ["C++"],
        tools: ["Arduino", "Arduino IDE", "Sensors"]
      },
      preview: {
        src: projectPreview("u-turn-accident-prevention-system.jpg") ?? projectPreview("u-turn-accident-prevention-system.png"),
        alt: "Preview of the U-Turn accident prevention system project.",
        source: "Project asset from Google Drive"
      },
      features: [
        "Arduino-based control implementation",
        "Sensor-assisted detection",
        "Prevention-oriented hardware logic",
        "Embedded setup for client deployment"
      ],
      contribution:
        "Handled setup and implementation for the embedded workflow.",
      reference: "Client build"
    }
  ],
  certificates: [
    {
      title: "5G and AI: How 5G Accelerates AI-Powered Technology and Edge Computing",
      date: "November 22, 2024",
      type: "Webinars / Seminars Attended",
      location: "Gordon College · College of Computer Studies & Syntax Squad",
      preview: certificatePreview("5g-and-ai-how-5g-accelerates-ai-powered-technology-and-edge-computing.jpg")
    },
    {
      title: "AI x Design: Boost Your Creativity, Speed & Style",
      date: "November 28, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT Region V · Department of Information and Communications Technology",
      featured: true
    },
    {
      title: "Introduction to RAN, 5G, and Open RAN",
      date: "November 23, 2024",
      type: "Webinars / Seminars Attended",
      location: "USAID BEACON Project · International Development / Online",
      featured: true
    },
    {
      title: "Batch 2 of Hour of Code: Learn AI & Coding the Fun Way!",
      date: "November 22, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT MIMAROPA · Department of Information and Communications Technology",
      featured: true
    },
    {
      title: "Building a Personal Brand in IT",
      date: "November 20, 2024",
      type: "Webinars / Seminars Attended",
      location: "DICT / Online",
      preview: certificatePreview("building-a-personal-brand-in-it.jpg")
    },
    {
      title: "Capstone Project Software Quality and Usability",
      date: "December 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Northeastern College · College of Information and Technology",
      preview: certificatePreview("capstone-project-software-quality-and-usability.jpg")
    },
    {
      title: "Cloud and DevOps Basics",
      date: "January 8, 2026",
      type: "Webinars / Seminars Attended",
      location: "DICT / Online",
      preview: certificatePreview("cloud-and-devops-basics.jpg")
    },
    {
      title: "Cutting-Edge Strategies and Innovation in Software Technologies",
      date: "November 8, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("cutting-edge-strategies-and-innovation-in-software-technologies.jpg")
    },
    {
      title: "Data Analytics and Visualization Essentials",
      date: "January 19, 2026",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("data-analytics-and-visualization-essentials.jpg")
    },
    {
      title: "Data Privacy and Protection in the Digital Age",
      date: "November 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("data-privacy-and-protection-in-the-digital-age.jpg")
    },
    {
      title: "Decipher the Code: Challenges and Opportunities of AI Adoption Through the Lens of Multigenerational Workforce",
      date: "November 30, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("decipher-the-code-challenges-and-opportunities-of-ai-adoption-through-the-lens-of-multigenerational-workforce.jpg")
    },
    {
      title: "Design Thinking and Mobile App Wireframing",
      date: "November 27, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT Region V / Zoom",
      preview: certificatePreview("design-thinking-and-mobile-app-wireframing.jpg")
    },
    {
      title: "Embracing Cyber Security for Tomorrow: Advanced Networking & Defense",
      date: "November 22, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("embracing-cyber-security-for-tomorrow-advanced-netwroking-defense.jpg")
    },
    {
      title: "FreshMedia Fusion: Multimedia Innovation for Future Creative Software Developers",
      date: "November 17, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("freshmedia-fusion-a-webinar-on-multimedia-innovation-for-future-creative-software-developers.jpg")
    },
    {
      title: "Hour of Code Session under the AI SmartCT",
      date: "November 27, 2025",
      type: "Webinars / Seminars Attended",
      location: "AI SmartCT",
      preview: certificatePreview("hour-of-code-session-under-the-ai-smartct.jpg")
    },
    {
      title: "How to 3D Model: Fundamentals of 3D Design and Modeling",
      date: "November 29, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("how-to-3d-model-fundamentals-of-3d-design-and-modeling.jpg")
    },
    {
      title: "Introduction to RAN, 5G, and Open RAN",
      date: "November 23, 2024",
      type: "Webinars / Seminars Attended",
      location: "USAID / Online",
      preview: certificatePreview("introduction-to-ran-5g-and-open-ran.jpg")
    },
    {
      title: "Leadership Training",
      date: "December 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("leadership-training.jpg")
    },
    {
      title: "Linux Fundamentals",
      date: "November 30, 2024",
      type: "Webinars / Seminars Attended",
      location: "USAID / Online",
      preview: certificatePreview("linux-fundamentals.jpg")
    },
    {
      title: "Network Security",
      date: "December 7, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("network-security.jpg")
    },
    {
      title: "Oplan Paskong Sigurado",
      date: "May 29, 2026",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("oplan-paskong-sigurado.jpg")
    },
    {
      title: "Simplifying Artificial Intelligence for the Next Generation",
      date: "November 18, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("simplifying-artificial-intelligence-for-the-next-generation.jpg")
    },
    {
      title: "Smart Moves: How AI Can Power Your Studies, Work, and Future",
      date: "December 17, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("smart-moves-how-ai-can-power-your-studies-work-and-future-png.jpg")
    },
    {
      title: "Step-by-Step Roadmap to Land Data Analyst Role",
      date: "December 27, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("step-by-step-roadmap-to-land-data-analyst-role.jpg")
    },
    {
      title: "The Human Side of AI: Ethics, Integrity, and Impact",
      date: "November 29, 2025",
      type: "Webinars / Seminars Attended",
      location: "DICT Region V / Zoom and Facebook Live",
      preview: certificatePreview("the-human-side-of-ai-ethics-integrity-and-impact.jpg")
    },
    {
      title: "The New Era of Marketing: Decoding AI Marketing Automation",
      date: "November 5, 2024",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("the-new-era-of-marketing-decoding-ai-marketing-automation.jpg")
    },
    {
      title: "The People-Pleaser Career: A Practical Roadmap for UI/UX Design Field",
      date: "November 30, 2025",
      type: "Webinars / Seminars Attended",
      location: "Online",
      preview: certificatePreview("the-people-pleaser-career-a-practical-roadmap-for-ui-ux-design-field.jpg")
    },
    {
      title: "Casting a Safe Line: Women Navigating Phishing Waters",
      date: "October 18, 2024",
      type: "Webinars / Seminars Attended",
      location: "Google Meet",
      preview: certificatePreview("webinar-on-casting-a-safe-line-women-navigating-phishing-waters.jpg")
    },
    {
      title: "i-ACT4SmartCity: Industry-Academe Congress on Technologies for Smart City",
      date: "October 16, 2024",
      type: "Webinars / Seminars Attended",
      location: "Cauayan City, Isabela"
    },
    // --- Online Courses ---
    {
      title: "Master ChatGPT",
      date: "December 20, 2025",
      type: "Online Courses Taken",
      location: "UniAthena"
    },
    {
      title: "Hardware and Upgrade Support",
      date: "December 17, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy"
    },
    {
      title: "Artificial Intelligence (AI) for Social Impact",
      date: "December 12, 2025",
      type: "Online Courses Taken",
      location: "ADBI E-Learning"
    },
    {
      title: "Computer Hardware Basics",
      date: "December 9, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy"
    },
    {
      title: "Introduction to Modern AI",
      date: "December 8, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy"
    },
    {
      title: "Basics of SQL Statements and Indexes",
      date: "December 7, 2025",
      type: "Online Courses Taken",
      location: "Great Learning / Online"
    },
    {
      title: "Basics of Artificial Intelligence",
      date: "December 7, 2025",
      type: "Online Courses Taken",
      location: "Great Learning / Online"
    },
    {
      title: "Basics of Artificial Intelligence: Learning Models",
      date: "December 4, 2025",
      type: "Online Courses Taken",
      location: "Great Learning / Online"
    },
    {
      title: "Basics of Machine Learning Algorithms",
      date: "December 4, 2025",
      type: "Online Courses Taken",
      location: "Great Learning / Online"
    },
    {
      title: "AIClass ASEAN",
      date: "December 4, 2025",
      type: "Online Courses Taken",
      location: "AIClass ASEAN"
    },
    {
      title: "Basics of Python",
      date: "December 2, 2025",
      type: "Online Courses Taken",
      location: "Great Learning / Online"
    },
    {
      title: "Getting Started with Cisco Packet Tracer",
      date: "December 1, 2025",
      type: "Online Courses Taken",
      location: "Cisco Networking Academy"
    },
    {
      title: "Responsive Web Design",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "FreeCodeCamp"
    },
    {
      title: "Course C: Computer Science Fundamentals",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "Code.org"
    },
    {
      title: "Minecraft Hour of Code: AI for Good",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "Code.org"
    },
    {
      title: "AI for Oceans",
      date: "November 30, 2025",
      type: "Online Courses Taken",
      location: "Code.org"
    },
    // --- Digital Badges ---
    {
      title: "Computer Hardware Basics Badge",
      date: "December 9, 2025",
      type: "Badges",
      location: "Cisco Networking Academy · Credly"
    },
    {
      title: "Hardware and Upgrade Support Badge",
      date: "December 17, 2025",
      type: "Badges",
      location: "Cisco Networking Academy · Credly"
    },
    {
      title: "Introduction to Modern AI Badge",
      date: "December 8, 2025",
      type: "Badges",
      location: "Cisco Networking Academy · Credly"
    },
    // --- Certifications & Licensures ---
    {
      title: "Computer Systems Servicing",
      certificateLevel: "NCII",
      date: "July 3, 2024",
      type: "Certifications / Trainings",
      location: "TESDA · International School of Skills and Excellence"
    }
  ],
  resume: {
    education: [
      {
        title: "Bachelor of Science in Information Technology",
        subtitle: "Northeastern College · 2022 to 2026",
        detail:
          "BSIT Graduate · Cum Laude, Outstanding On-the-Job Trainee, Multimedia Artist of the Year."
      }
    ],
    experience: [
      {
        title: "IT Instructor",
        subtitle: "Northeastern College · Present",
        detail:
          "Teaching IT fundamentals, programming concepts, and practical computer skills to college students."
      },
      {
        title: "Information Systems / EDP Intern",
        subtitle: "Northeastern College EDP · 2025 to 2026",
        detail:
          "Assisted with maintenance, troubleshooting, IT operations, and internal web development."
      }
    ],
    trainings: [
      {
        title: "Continuous Technical Learning",
        subtitle: "50+ Courses, Seminars & Certifications",
        detail:
          "TESDA NCII Computer Systems Servicing, AI tool usage, cybersecurity, and web development."
      }
    ],
    internship: {
      organization: "Northeastern College Information Systems / Electronic Data Processing",
      period: "2025 to 2026",
      role: "Information Systems / EDP Intern",
      responsibilities: [
        "Supported maintenance, troubleshooting, and IT operations.",
        "Assisted with web development and system-related tasks.",
        "Helped document issues, workflows, and user support needs."
      ],
      technologies: ["Web development", "PC troubleshooting", "Software applications", "Documentation"],
      outcomes: [
        "Recognized as Outstanding On-the-Job Trainee.",
        "Gained workplace experience in support, maintenance, and systems work."
      ]
    },
    technical: [
      "Hardware Servicing (NCII)",
      "Network Setup & Cabling",
      "IT Helpdesk & Diagnostics",
      "Full-Stack Web Dev",
      "Technical Documentation"
    ],
    soft: [
      "Classroom Instruction",
      "User Support & Guidance",
      "Technical Mentoring",
      "Problem Solving",
      "Clear Communication"
    ]
  },
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/DevDahon",
      handle: "@DevDahon",
      type: "github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rod-allen-agregado-73b2b4398/",
      handle: "Rod Allen Agregado",
      type: "linkedin"
    },
    {
      name: "Credly",
      url: "https://www.credly.com/users/rod-allen-agregado/badges/credly",
      handle: "Rod Allen Agregado",
      type: "credly"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/raagregado19",
      handle: "Rod Allen Agregado",
      type: "facebook"
    }
  ],
  contact: {
    email: "devdahon@northeasterncollege.edu.ph",
    phone: "09770317480",
    note:
      "For instructor, helpdesk, or junior developer opportunities, contact me through the details provided here."
  }
};
