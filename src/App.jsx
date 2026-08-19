import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpenText,
  Briefcase,
  Code2,
  Cpu,
  ChevronRight,
  Database,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Laptop2,
  Layers,
  Mail,
  Menu,
  MessageSquareMore,
  MonitorCog,
  MonitorSmartphone,
  Network,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Wrench,
  X
} from "lucide-react";
import {
  FaBootstrap,
  FaCss3Alt,
  FaDatabase,
  FaFacebook,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaravel,
  FaLinkedin,
  FaNetworkWired,
  FaNodeJs,
  FaPhp,
  FaReact,
  FaWhatsapp
} from "react-icons/fa";
import {
  SiArduino,
  SiCredly,
  SiDart,
  SiExpo,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiMysql,
  SiPython,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite
} from "react-icons/si";
import avatarImageSrc from "./assets/rod-allen-avatar.jpg";
import { SectionHeading } from "./components/SectionHeading";
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { ProjectCard } from "./components/ProjectCard";
import { CertificateGroup } from "./components/CertificateGroup";
import { TimelineItem } from "./components/TimelineItem";
import { CoverflowCarousel } from "./components/ui/coverflow-carousel";
import { portfolioData } from "./data/portfolioData";

const rotatingHeroWords = [
  "hardware & networks.",
  "practical web apps.",
  "reliable IT solutions.",
  "hands-on tech skills."
];

const qualificationItems = [
  {
    label: "Current Role",
    title: "IT Instructor",
    subtitle: "Northeastern College · Present",
    detail: "Teaching computer hardware, networking fundamentals, IT essentials, and practical troubleshooting."
  },
  {
    label: "Education",
    title: "Bachelor of Science in Information Technology",
    subtitle: "Northeastern College · 2022 to 2026",
    detail: "BSIT Graduate · Cum Laude, Outstanding On-the-Job Trainee, Multimedia Artist of the Year."
  },
  {
    label: "Internship / OJT",
    title: "Information Systems / Electronic Data Processing",
    subtitle: "Northeastern College · 2025 to 2026",
    detail: "Hardware maintenance, local network troubleshooting, IT support, and web development assistance."
  },
  {
    label: "Technical Training",
    title: "Continuous Technical Learning",
    subtitle: "50+ Courses, Seminars & Certifications",
    detail: "TESDA NCII Computer Systems Servicing, Cisco networking, AI tool usage, and cybersecurity."
  }
];

const workValueItems = [
  {
    label: "IT Instruction",
    title: "IT Instruction & Training",
    detail: "Teaches computer hardware, networking fundamentals, and guides students with practical hands-on diagnostics."
  },
  {
    label: "Web Development",
    title: "Clean & Practical Web Apps",
    detail: "Develops responsive web applications, database-backed tools, and modern user interfaces."
  },
  {
    label: "Hardware & Networks",
    title: "Hardware & Network Setup",
    detail: "PC assembly, component diagnostics, local network cabling, and router/switch configuration."
  }
];

const skillIconMap = {
  "Backend / Database": Database,
  "Technical Support": ShieldCheck,
  "Teaching & Communication": MessageSquareMore,
  "Tools & Workflow": MonitorCog
};

const itemIconMap = {
  PHP: FaPhp,
  Laravel: FaLaravel,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  "Node.js": FaNodeJs,
  Flask: SiFlask,
  React: FaReact,
  JavaScript: FaJs,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  Tailwind: SiTailwindcss,
  Bootstrap: FaBootstrap,
  TypeScript: SiTypescript,
  Flutter: SiFlutter,
  Dart: SiDart,
  "Expo / React Native": SiExpo,
  Arduino: SiArduino,
  "ESP32 / IoT": Cpu,
  Python: SiPython,
  "PC Hardware & Repair": MonitorCog,
  "LAN Cabling & Config": Network,
  "Printer & Peripherals": MonitorSmartphone,
  "Software Deployment": Laptop2,
  "Cisco Packet Tracer": FaNetworkWired,
  "Classroom Instruction": GraduationCap,
  "Technical Mentoring": BookOpenText,
  "Helpdesk Troubleshooting": ShieldCheck,
  "System Workflows": Layers,
  Documentation: Code2,
  "AI Tool Mastery": Sparkles
};

function ItemIcon({ name }) {
  const IconComponent = itemIconMap[name] || Code2;
  return <IconComponent aria-hidden="true" />;
}

const techIconMap = {
  React: FaReact,
  "React Native": FaReact,
  "Node.js": FaNodeJs,
  JavaScript: FaJs,
  PHP: FaPhp,
  Laravel: FaLaravel,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Flutter: SiFlutter,
  Dart: SiDart,
  Expo: SiExpo,
  Arduino: SiArduino,
  "ESP32 / IoT": Cpu,
  Python: SiPython,
  "Chart.js": Layers,
  Lucide: Sparkles,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  TypeScript: SiTypescript,
  Vite: SiVite,
  Git: FaGitAlt,
  GitHub: FaGithub,
  "Cisco Packet Tracer": FaNetworkWired,
  "Network Switch": Network,
  Router: Network
};

function TechIcon({ name }) {
  const IconComponent = techIconMap[name] || Code2;
  return <IconComponent aria-hidden="true" />;
}

function useTypewriterEffect(words, typingSpeed = 65, deletingSpeed = 35, pauseDuration = 1800) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentWord = words[wordIndex];

    if (!isDeleting && currentText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return currentText;
}

function useReducedMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}

const certificateGroupLabels = {
  "Webinars / Seminars Attended": "Webinars & Seminars",
  "Online Courses Taken": "Online Courses",
  Badges: "Digital Badges",
  "Certifications / Trainings": "Certifications",
  certifications: "Certifications",
  seminars: "Webinars & Seminars",
  courses: "Online Courses"
};

const certificateIcons = {
  "Webinars & Seminars": GraduationCap,
  "Online Courses": BookOpenText,
  "Digital Badges": Sparkles,
  Certifications: Award
};

const certificateGroupOrder = [
  "Certifications",
  "Online Courses",
  "Digital Badges",
  "Webinars & Seminars"
];

/* ==========================================================================
   SITE HEADER: Obsidian & Gold Floating Navigation Bar
   ========================================================================== */
function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Timeline", href: "#resume" },
    { label: "Certificates", href: "#certificates" },
    { label: "Activity", href: "#activity" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <a href="#home" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt="RA Logo"
              className="brand-logo"
            />
          </span>
          <div className="brand-copy">
            <strong>Dev Dahon</strong>
            <small>IT INSTRUCTOR & WEB DEVELOPER</small>
          </div>
        </a>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`site-nav${isOpen ? " is-open" : ""}`} aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ==========================================================================
   SECTION 1: HERO & PROFILE (High-Impact Obsidian & Gold)
   ========================================================================== */
function HeroSection() {
  return (
    <section className="hero section" id="home">
      <div className="hero__mesh" aria-hidden="true" />
      <div className="hero__ambient hero__ambient--one" aria-hidden="true" />
      <div className="hero__ambient hero__ambient--two" aria-hidden="true" />

      <div className="hero__container container">
        <div className="hero__grid">
          <div className="hero__copy" data-reveal>
            <div className="hero__signal" aria-label="Portfolio positioning">
              <span className="hero__availability"><i aria-hidden="true" /> Open to opportunities</span>
              <span>🎓 Northeastern College Faculty</span>
            </div>
            <h1 className="hero__title">
              Hardware, Networks <span className="hero__highlight">& Web Solutions.</span>
            </h1>
            <p className="hero__role">
              <span className="hero__role-static">TESDA NCII Certified · Computer Systems Servicing</span>
            </p>
            <p className="hero__description">
              IT Instructor and BSIT Cum Laude graduate specializing in computer systems servicing, network infrastructure, and practical web applications.
            </p>

            <div className="hero__actions">
              <a
                href="#projects"
                className="button"
              >
                <span>Explore Projects</span>
                <ChevronRight size={18} />
              </a>
              <a
                href="#contact"
                className="button button--white"
              >
                <span>Let's Connect</span>
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="hero__stats">
              {portfolioData.stats.map((item, index) => (
                <div
                  className="stat-tile"
                  key={item.label}
                  data-reveal
                  style={{ "--delay": `${index * 90}ms` }}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero__panel">
            <div className="hero__portrait-stage" data-reveal style={{ "--delay": "120ms" }}>
              <div className="hero__portrait-backdrop" aria-hidden="true">
                <img src={avatarImageSrc} alt="" width="340" height="340" decoding="async" fetchPriority="high" />
              </div>
              <div className="hero__portrait-light hero__portrait-light--gold" aria-hidden="true" />
              <div className="hero__portrait-light hero__portrait-light--blue" aria-hidden="true" />
              <div className="hero__portrait-lines" aria-hidden="true" />

              <div className="hero-card hero-card--portrait">
                <div className="hero-card__header-row">
                  <div className="hero-card__badge">DevDahon</div>
                </div>

                <div className="hero-card__photo-stage is-avatar">
                  <div className="hero-card__crossfade-wrap">
                    <div className="hero-card__photo-layer hero-card__photo-layer--avatar is-active">
                      <img
                        src={avatarImageSrc}
                        alt="DevDahon Barong Tagalog avatar illustration"
                        className="hero-card__photo hero-card__photo--avatar"
                        width="320"
                        height="320"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                    <div className="hero-card__light-sweep" aria-hidden="true" />
                  </div>
                </div>

                <p className="hero-card__name">{portfolioData.profile.displayName}</p>
                <div className="hero-card__meta" aria-label="Profile highlights">
                  <span>IT Instructor</span>
                  <span>BSIT Cum Laude</span>
                  <span>NCII Certified</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 2: ABOUT & VALUE PROPOSITION
   ========================================================================== */
function AboutSection() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="About & Value Proposition"
          title="IT Instruction & Practical Web Development"
          subtitle="Bridging classroom instruction in hardware and networks with modern, clean web applications."
          align="left"
        />

        <div className="about-simplified-grid">
          {/* Left: Bio & Core Focus */}
          <div className="about-story-card surface" data-reveal>
            <span className="highlight-card__label">Instructor & Developer Profile</span>
            <p className="about-story-text">
              {portfolioData.profile.about}
            </p>
            <div className="about-strengths-wrap">
              <span className="about-strengths-label">Focus Areas:</span>
              <div className="about__tags">
                {portfolioData.profile.focusAreas.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Build / Support / Teach Triad */}
          <div className="about-triad-column">
            {workValueItems.map((item, index) => (
              <article
                className="value-card-compact surface"
                key={item.label}
                data-reveal
                style={{ "--delay": `${index * 80}ms` }}
              >
                <div className="value-card-compact__header">
                  <span className="value-card-compact__tag">{item.label}</span>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 3: RESUME & CAREER TIMELINE
   ========================================================================== */
function ResumeSection() {
  const internship = portfolioData.resume.internship;

  return (
    <section className="timeline section section--dark" id="resume">
      <div className="container">
        <SectionHeading
          eyebrow="Resume & Career Timeline"
          title="Qualifications & Internship Experience"
          subtitle="Clear timeline detailing education, work/internship experience, and key competencies."
          align="left"
        />

        <div className="timeline__layout">
          <div className="timeline__main">
            <article className="internship-spotlight-simple surface" data-reveal>
              <div className="internship-spotlight-simple__header">
                <div>
                  <span className="internship-badge">★ Outstanding OJT Trainee</span>
                  <h3>{internship.role}</h3>
                  <p className="internship-org">
                    {internship.organization} · <small>{internship.period}</small>
                  </p>
                </div>
              </div>

              <p className="internship-summary">
                Maintained college IT infrastructure, performed PC hardware diagnostics and maintenance, assisted with network cabling and setup, and supported institutional systems.
              </p>

              <div className="internship-tags-wrap">
                <span className="internship-tags-label">Key Focus:</span>
                <div className="internship-spotlight__tags">
                  {internship.technologies.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>

            <div className="timeline__cards">
              {qualificationItems.map((item, index) => (
                <TimelineItem key={item.label} item={item} label={item.label} delay={index * 100} />
              ))}
            </div>
          </div>

          <aside className="timeline__aside surface" data-reveal style={{ "--delay": "180ms" }}>
            <div className="timeline__aside-block">
              <span className="timeline__aside-label">
                <Wrench size={13} style={{ display: "inline", marginRight: "5px" }} /> Technical Strengths
              </span>
              <div className="competencies-chips">
                {portfolioData.resume.technical.map((item) => (
                  <span className="competency-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="timeline__aside-block">
              <span className="timeline__aside-label">
                <BookOpenText size={13} style={{ display: "inline", marginRight: "5px" }} /> Core Soft Skills
              </span>
              <div className="competencies-chips">
                {portfolioData.resume.soft.map((item) => (
                  <span className="competency-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 4: CERTIFICATES & BADGES (3D Coverflow & Grid)
   ========================================================================== */
function CertificatesSection() {
  const [activeGroup, setActiveGroup] = useState("All Records");

  const groupedCertificates = useMemo(() => {
    const groups = portfolioData.certificates.reduce((accumulator, item) => {
      const groupLabel = certificateGroupLabels[item.type] ?? item.type;

      if (!accumulator[groupLabel]) {
        accumulator[groupLabel] = [];
      }

      accumulator[groupLabel].push(item);
      return accumulator;
    }, {});

    // Sort items within each group: featured credentials first, then reverse chronological order
    Object.values(groups).forEach((items) => {
      items.sort((a, b) => {
        const featA = a.featured ? 1 : 0;
        const featB = b.featured ? 1 : 0;
        if (featA !== featB) return featB - featA;

        const timeA = a.date ? Date.parse(a.date) || 0 : 0;
        const timeB = b.date ? Date.parse(b.date) || 0 : 0;
        return timeB - timeA;
      });
    });

    const orderedGroups = certificateGroupOrder
      .filter((group) => groups[group]?.length)
      .map((group) => [group, groups[group]]);
    const extraGroups = Object.entries(groups).filter(
      ([group]) => !certificateGroupOrder.includes(group)
    );

    return [...orderedGroups, ...extraGroups];
  }, []);

  const totalCount = useMemo(() => portfolioData.certificates.length, []);

  const displayedGroups = useMemo(() => {
    if (activeGroup === "All Records") {
      return groupedCertificates;
    }
    return groupedCertificates.filter(([group]) => group === activeGroup);
  }, [activeGroup, groupedCertificates]);

  return (
    <section className="certificates section" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow="Verified Credentials"
          title="Certificates, Courses & Badges"
          subtitle="Explore verified professional development records categorized into Webinars & Seminars, Online Courses, Digital Badges, and Technical Certifications."
          align="left"
        />

        <div className="certificates-tabs" role="tablist" aria-label="Professional development categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeGroup === "All Records"}
            className={`certificates-tabs__button${activeGroup === "All Records" ? " is-active" : ""}`}
            onClick={() => setActiveGroup("All Records")}
          >
            <span>All Records</span>
            <small>{totalCount}</small>
          </button>

          {groupedCertificates.map(([group, certificates]) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeGroup === group}
              className={`certificates-tabs__button${activeGroup === group ? " is-active" : ""}`}
              key={group}
              onClick={() => setActiveGroup(group)}
            >
              <span>{group}</span>
              <small>{certificates.length}</small>
            </button>
          ))}
        </div>

        <div className="certificates__list" style={{ display: "grid", gap: "2rem" }}>
          {displayedGroups.map(([groupTitle, certificates], index) => (
            <CertificateGroup
              key={groupTitle}
              title={groupTitle}
              certificates={certificates}
              icon={certificateIcons[groupTitle]}
              delay={index * 80}
              initialLimit={activeGroup === "All Records" ? 3 : 18}
              initialView={activeGroup === "All Records" ? "grid" : "orbit"}
              showViewToggle={activeGroup !== "All Records"}
              onSelectCategory={() => setActiveGroup(groupTitle)}
              isAllRecordsOverview={activeGroup === "All Records"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 3: FEATURED PROJECTS (3D Coverflow Showcase - Dark Stage)
   ========================================================================== */
function ProjectsSection() {
  const projects = portfolioData.projects;

  const projectSlides = useMemo(() => {
    return projects.map((p) => ({
      src: p.preview?.src || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=640&fit=crop&q=70&auto=format",
      alt: p.preview?.alt || p.title,
      title: p.title,
      description: p.description || p.summary,
      tags: [...new Set([...p.techStack.languages, ...p.techStack.tools])]
    }));
  }, [projects]);

  return (
    <section className="projects section section--dark" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Technical Projects"
          title="Featured Projects"
          subtitle="Swipe through the interactive 3D Coverflow showcase to explore each project's architecture, impact, and technology stack."
          align="left"
        />

        {/* 3D Coverflow Ribbon Showcase */}
        <div className="projects-coverflow-deck surface" style={{ padding: "2rem 1.25rem 2.5rem" }} data-reveal>
          <CoverflowCarousel
            slides={projectSlides}
            cardWidth="clamp(220px, 30vw, 420px)"
            showCaption={true}
            showNavigation={true}
            showPagination={true}
          />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 4: SKILLS MATRIX
   ========================================================================== */
function SkillsSection() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills Matrix"
          title="Dev Stack & Support Tools"
          subtitle="Categorized into Frontend, Backend / Database, Technical Support, Teaching & Communication, and Tools & Workflow."
          align="left"
        />

        <div className="skills__grid">
          {portfolioData.skills.map((group, index) => (
            <SkillCategoryCard
              key={group.category}
              icon={skillIconMap[group.category] ?? Code2}
              title={group.category}
              technologies={group.technologies}
              competencies={group.competencies}
              getItemIcon={(item) => <ItemIcon name={item} />}
              delay={index * 90}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 7: GITHUB ACTIVITY & CONTRIBUTIONS
   ========================================================================== */
function GitHubActivitySectionWrapper() {
  const [userInfo, setUserInfo] = useState(null);
  const devUsername = "DevDahon";

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const res = await fetch(`https://api.github.com/users/${devUsername}`);
        if (res.ok) {
          const userData = await res.json();
          setUserInfo(userData);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub profile info:", err);
      }
    }

    fetchGitHubData();
  }, [devUsername]);

  return (
    <section className="github-activity section section--dark" id="activity">
      <div className="container">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Activity & Contributions"
          subtitle="Recent open-source contributions and repository updates from my GitHub profile."
          align="left"
        />

        <div className="github-simplified-card surface" data-reveal>
          <div className="github-simplified-header">
            <div className="github-simplified-user">
              <FaGithub size={28} className="github-simplified-icon" />
              <div>
                <h3>
                  <a href={`https://github.com/${devUsername}`} target="_blank" rel="noopener noreferrer">
                    @{devUsername} <ExternalLink size={14} style={{ display: "inline", marginLeft: "4px" }} />
                  </a>
                </h3>
                <small>Developer Profile & Repositories</small>
              </div>
            </div>

            <div className="github-simplified-stats">
              <div className="github-stat-badge">
                <strong>{userInfo ? userInfo.public_repos : "5"}</strong>
                <span>Public Repos</span>
              </div>
              <div className="github-stat-badge">
                <strong>{userInfo ? userInfo.followers : "1"}</strong>
                <span>Followers</span>
              </div>
            </div>
          </div>

          <div className="github-simplified-calendar">
            <span className="github-calendar-label">Contribution Calendar</span>
            <div className="github-heatmap-wrapper">
              <img
                src={`https://ghchart.rshah.org/D4AF37/${devUsername}`}
                alt={`GitHub Contribution Calendar for ${devUsername}`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 8: CONTACT & CONNECT
   ========================================================================== */
function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Let's Connect"
          title="Get in Touch"
          subtitle="Open to web development, technical support, and IT instruction opportunities."
          align="left"
        />

        <div className="contact-unified-card" data-reveal>
          <div className="contact-unified-glow" aria-hidden="true" />

          {/* Left Column: Proposition & Details */}
          <div className="contact-unified-copy">
            <span className="contact-unified-eyebrow">
              <span className="contact-unified-pulse" /> Available for Opportunities
            </span>
            <h3 className="contact-unified-title">
              Let&apos;s build reliable software or collaborate on <span className="contact-unified-gold">IT education</span>.
            </h3>
            <p className="contact-unified-text">
              {portfolioData.contact.note || "For instructor, helpdesk, or junior developer opportunities, reach out through the direct channels."}
            </p>
          </div>

          {/* Right Column: Direct Channels Stack + Horizontal Social Strip */}
          <div className="contact-unified-channels">
            <div className="contact-channel-stack">
              <a href={`mailto:${portfolioData.contact.email}`} className="contact-channel-item">
                <span className="contact-channel-icon"><Mail size={20} /></span>
                <div className="contact-channel-body">
                  <small>OFFICIAL EMAIL</small>
                  <strong>{portfolioData.contact.email}</strong>
                </div>
              </a>

              <a href={`tel:${portfolioData.contact.phone}`} className="contact-channel-item">
                <span className="contact-channel-icon"><Phone size={20} /></span>
                <div className="contact-channel-body">
                  <small>PHONE NUMBER</small>
                  <strong>{portfolioData.contact.phone}</strong>
                </div>
              </a>
            </div>

            <div className="contact-unified-socials">
              <span className="contact-social-heading">Connect Online:</span>
              <div className="contact-social-row-icons">
                <a
                  href="https://github.com/DevDahon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-circle-btn"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={19} />
                  <span className="contact-circle-tooltip">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/rod-allen-agregado-73b2b4398/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-circle-btn"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={19} />
                  <span className="contact-circle-tooltip">LinkedIn</span>
                </a>

                <a
                  href="https://www.credly.com/users/rod-allen-agregado/badges/credly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-circle-btn"
                  aria-label="Credly Profile"
                >
                  <SiCredly size={19} />
                  <span className="contact-circle-tooltip">Credly</span>
                </a>

                <a
                  href="https://wa.me/639770317480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-circle-btn"
                  aria-label="WhatsApp Chat"
                >
                  <FaWhatsapp size={19} />
                  <span className="contact-circle-tooltip">WhatsApp</span>
                </a>

                <a
                  href="https://www.facebook.com/raagregado19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-circle-btn"
                  aria-label="Facebook Profile"
                >
                  <FaFacebook size={19} />
                  <span className="contact-circle-tooltip">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SITE FOOTER
   ========================================================================== */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <p>© {new Date().getFullYear()} {portfolioData.profile.displayName}. All rights reserved.</p>
        <small>IT Instructor · Web Developer · TESDA NCII Certified</small>
      </div>
    </footer>
  );
}

/* ==========================================================================
   ROOT APP COMPONENT
   ========================================================================== */
export default function App() {
  const reducedMotion = useReducedMotionPreference();

  // Scroll reveal observer
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!revealItems.length) return undefined;

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <>
      <SiteHeader />
      <main className="main">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <CertificatesSection />
        <GitHubActivitySectionWrapper />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
