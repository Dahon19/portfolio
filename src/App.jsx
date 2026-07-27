import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Code2,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  GraduationCap,
  Laptop2,
  Mail,
  MessageSquareMore,
  MonitorCog,
  MonitorSmartphone,
  Network,
  Phone,
  ShieldCheck,
  Wrench
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
  FaReact
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
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SectionHeading } from "./components/SectionHeading";
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { ProjectCard } from "./components/ProjectCard";
import { CertificateGroup } from "./components/CertificateGroup";
import { TimelineItem } from "./components/TimelineItem";
import { portfolioData } from "./data/portfolioData";

const rotatingHeroWords = [
  "web apps",
  "dashboards",
  "support tools",
  "learning tools",
  "workflows"
];

const navSectionIds = ["home", "about", "projects", "skills", "resume", "certificates", "contact"];

const qualificationItems = [
  {
    label: "Education",
    ...portfolioData.resume.education[0]
  },
  {
    label: "Internship / OJT",
    ...portfolioData.resume.experience[0]
  },
  {
    label: "Relevant Training",
    ...portfolioData.resume.trainings[0]
  },
  {
    label: "Teaching Readiness",
    title: "IT Instruction & User Support",
    subtitle: "Prepared for IT fundamentals, tech training, and user support",
    detail:
      "Combines technical skills and clear communication for IT teaching assistance and user training."
  }
];

const workValueItems = [
  {
    label: "Build",
    title: "Simple & Clean Web Apps",
    detail: "Web applications, CMS platforms, and mobile tools built for everyday tasks."
  },
  {
    label: "Support",
    title: "Reliable Tech Support",
    detail: "Hardware diagnostics, software troubleshooting, and clear user documentation."
  },
  {
    label: "Teach",
    title: "Simple & Clear Guidance",
    detail: "Explains technical tools and solutions in clear language that anyone can understand."
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
  JavaScript: FaJs,
  "C++": Cpu,
  Python: SiPython,
  TypeScript: SiTypescript,
  SQL: FaDatabase,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  Bootstrap: FaBootstrap,
  Laravel: FaLaravel,
  React: FaReact,
  Vite: SiVite,
  "Responsive UI": MonitorCog,
  MySQL: SiMysql,
  "CRUD operations": Database,
  "Database schema design": Database,
  "Data validation": ShieldCheck,
  Troubleshooting: Wrench,
  "Helpdesk support": HeadsetIcon,
  "Device setup": MonitorCog,
  "User assistance": MessageSquareMore,
  "Maintenance tasks": Wrench,
  "PC fundamentals": Cpu,
  "Hardware installation": Cpu,
  "Software diagnostics": Wrench,
  "MS Word": Laptop2,
  "MS Excel": Laptop2,
  PowerPoint: Laptop2,
  "Cisco Packet Tracer": FaNetworkWired,
  "Network fundamentals": Network,
  "Network security": ShieldCheck,
  "Connectivity checks": Network,
  Git: FaGitAlt,
  GitHub: FaGithub,
  "VS Code": MonitorCog,
  Expo: SiExpo,
  Arduino: SiArduino,
  "Arduino IDE": SiArduino,
  Supabase: SiSupabase,
  Documentation: BookOpenText,
  "Presentation readiness": GraduationCap,
  "Team communication": MessageSquareMore,
  "Learner guidance": GraduationCap,
  "Growth mindset": BookOpenText
};

const techIconMap = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  TypeScript: SiTypescript,
  React: FaReact,
  Laravel: FaLaravel,
  PHP: FaPhp,
  MySQL: SiMysql,
  Flutter: SiFlutter,
  Dart: SiDart,
  Firebase: SiFirebase,
  Git: FaGitAlt,
  GitHub: FaGithub,
  "VS Code": MonitorCog,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: FaBootstrap,
  "Node.js": FaNodeJs,
  Arduino: SiArduino,
  Sensors: Cpu,
  Flask: SiFlask,
  SQL: FaDatabase,
  Supabase: SiSupabase,
  Expo: SiExpo,
  "Expo Router": SiExpo,
  "Inertia.js": FaLaravel,
  "React Native": FaReact,
  "Arduino IDE": SiArduino,
  Vite: SiVite,
  CoreUI: MonitorCog,
  "Local model integration": Cpu
};

const certificateIcons = {
  Certifications: ShieldCheck,
  "Seminars & Webinars": GraduationCap,
  "Online Courses": BookOpenText
};

const certificateGroupLabels = {
  "Certifications / Trainings": "Certifications",
  Badges: "Online Courses",
  "Webinars / Seminars Attended": "Seminars & Webinars",
  "Online Courses Taken": "Online Courses"
};

const certificateGroupOrder = [
  "Certifications",
  "Seminars & Webinars",
  "Online Courses"
];

function HeadsetIcon(props) {
  return <MonitorSmartphone {...props} />;
}

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useTypewriterEffect(words, typeSpeed = 85, deleteSpeed = 45, delayAfterWord = 1800) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return undefined;

    const currentWord = words[wordIndex % words.length];
    let timer;

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = window.setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        timer = window.setTimeout(() => {}, 220);
      }
    } else {
      if (displayText.length < currentWord.length) {
        timer = window.setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timer = window.setTimeout(() => {
          setIsDeleting(true);
        }, delayAfterWord);
      }
    }

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delayAfterWord]);

  return displayText;
}

function TechIcon({ name, className = "" }) {
  const Icon = techIconMap[name];

  if (!Icon) {
    return <span className={`tech-icon__text ${className}`}>{name.slice(0, 2).toUpperCase()}</span>;
  }

  return <Icon className={className} aria-hidden="true" />;
}

function ItemIcon({ name }) {
  const Icon = itemIconMap[name] ?? BadgeFallbackIcon;
  return <Icon size={16} aria-hidden="true" />;
}

function BadgeFallbackIcon(props) {
  return <MonitorCog {...props} />;
}

function useSectionObservers() {
  const [activeSection, setActiveSection] = useState("home");
  const reducedMotion = useReducedMotionPreference();
  const pendingSectionRef = useRef(null);

  const navigateToSection = useCallback(
    (sectionId) => {
      const target = document.getElementById(sectionId);

      if (!target) {
        return;
      }

      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      pendingSectionRef.current = sectionId;
      setActiveSection(sectionId);

      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, "", `#${sectionId}`);
      }

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: reducedMotion ? "auto" : "smooth"
      });
    },
    [reducedMotion]
  );

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');

      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }

      const sectionId = link.hash.slice(1);

      if (!navSectionIds.includes(sectionId)) {
        return;
      }

      event.preventDefault();
      navigateToSection(sectionId);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [navigateToSection]);

  useEffect(() => {
    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const activationLine = window.scrollY + headerHeight + window.innerHeight * 0.18;
      const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const pendingSectionId = pendingSectionRef.current;

      if (pendingSectionId) {
        const pendingSection = document.getElementById(pendingSectionId);
        const targetOffset = headerHeight + 12;
        const distanceFromTarget = pendingSection
          ? Math.abs(pendingSection.getBoundingClientRect().top - targetOffset)
          : 0;

        if (pendingSection && distanceFromTarget > 24 && !pageBottom) {
          setActiveSection(pendingSectionId);
          return;
        }

        pendingSectionRef.current = null;
      }

      if (pageBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const active = sections.reduce((current, section) => {
        return section.offsetTop <= activationLine ? section : current;
      }, sections[0]);

      setActiveSection(active.id);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!revealItems.length) {
      return undefined;
    }

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
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { activeSection, reducedMotion, navigateToSection };
}

function HomeSection() {
  const typedText = useTypewriterEffect(rotatingHeroWords);

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
              <span>Developer · Support · IT Instruction</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-row">
                <span className="hero__title-lead">I build</span>
                <span className="hero__typewriter-wrap">
                  <span className="hero__typewriter-text">{typedText}</span>
                  <span className="hero__typewriter-cursor" aria-hidden="true">|</span>
                </span>
                <span className="sr-only">{typedText}</span>
              </span>
              <span className="hero__title-tail">with clean delivery.</span>
            </h1>
            <p className="hero__role">
              <span className="hero__role-static">Web Developer & Technical Support Specialist</span>
            </p>
            <p className="hero__description">
              I build clean web applications, fix technical problems, and write simple guides that make tools easy to use.
            </p>

            <div className="hero__actions">
              <a href="#projects" className="button">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="button button--secondary">
                Let&apos;s connect
              </a>
              <div className="hero__socials" aria-label="Social media profiles">
                <a href="https://github.com/DevDahon" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="GitHub Profile (@DevDahon)">
                  <FaGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/rod-allen-agregado-73b2b4398/" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="LinkedIn Profile">
                  <FaLinkedin size={18} />
                </a>
                <a href="https://www.credly.com/users/rod-allen-agregado/badges/credly" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="Credly Badges">
                  <SiCredly size={18} />
                </a>
                <a href="https://www.facebook.com/raagregado19" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="Facebook Profile">
                  <FaFacebook size={18} />
                </a>
              </div>
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
                <img src={avatarImageSrc} alt="" />
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
                      />
                    </div>
                    <div className="hero-card__light-sweep" aria-hidden="true" />
                  </div>
                </div>

                <p className="hero-card__name">{portfolioData.profile.displayName}</p>
                <div className="hero-card__meta" aria-label="Profile highlights">
                  <span>BSIT Graduate</span>
                  <span>Outstanding Trainee</span>
                  <span>Cum Laude</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="Practical web tools & reliable tech support"
          subtitle="Building web applications, fixing technical issues, and helping users."
          align="left"
        />

        <div className="about__grid">
          <div className="about__story surface" data-reveal>
            <span className="about__story-label">Developer Profile</span>
            <p>{portfolioData.profile.about}</p>
            <div className="about__story-points" aria-label="About summary">
              <span>Web Dev</span>
              <span>Tech Support</span>
              <span>Instruction</span>
            </div>
            <div className="about__signature-line" />
          </div>

          <div className="about__highlights">
            <article className="highlight-card surface" data-reveal style={{ "--delay": "120ms" }}>
              <span className="highlight-card__label">My Goal</span>
              <h3>Building useful web apps and making technology easy to use</h3>
              <p>
                I focus on web development, troubleshooting technical issues, and helping users with clear guidance.
              </p>
            </article>

            <article className="highlight-card surface" data-reveal style={{ "--delay": "220ms" }}>
              <span className="highlight-card__label">Core strengths</span>
              <div className="about__tags">
                {portfolioData.profile.focusAreas.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </div>

        <div className="about__value-grid" aria-label="Portfolio value summary">
          {workValueItems.map((item, index) => (
            <article
              className="value-card surface"
              key={item.label}
              data-reveal
              style={{ "--delay": `${180 + index * 80}ms` }}
            >
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Dev Stack & Support Tools"
          subtitle="The programming languages, frameworks, and support tools I work with."
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

function QualificationSection() {
  const internship = portfolioData.resume.internship;

  return (
    <section className="timeline section" id="resume">
      <div className="container">
        <SectionHeading
          eyebrow="Experience & Education"
          title="My Qualifications & Internship"
          subtitle="Education, internship experience, and key technical capabilities."
          align="left"
        />

        <div className="timeline__layout">
          <div className="timeline__main">
            <article className="internship-spotlight surface" data-reveal>
              <div className="internship-spotlight__header">
                <span>Internship Highlight</span>
                <h3>{internship.role}</h3>
                <p>{internship.organization}</p>
                <small>{internship.period}</small>
              </div>

              <div className="internship-spotlight__grid">
                <div>
                  <h4>Responsibilities</h4>
                  <ul>
                    {internship.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Technologies</h4>
                  <div className="internship-spotlight__tags">
                    {internship.technologies.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4>Outcomes</h4>
                  <ul>
                    {internship.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
              <span className="timeline__aside-label">Technical strengths</span>
              <div className="list-grid">
                {portfolioData.resume.technical.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="timeline__aside-block">
              <span className="timeline__aside-label">Soft skills</span>
              <div className="list-grid">
                {portfolioData.resume.soft.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const visibleProjects = portfolioData.projects;
  const normalizedProjectIndex = visibleProjects.length
    ? Math.min(activeProjectIndex, visibleProjects.length - 1)
    : 0;
  const activeProject = visibleProjects[normalizedProjectIndex] ?? null;
  const activePositionLabel =
    visibleProjects.length ? String(normalizedProjectIndex + 1).padStart(2, "0") : "00";

  useEffect(() => {
    if (visibleProjects.length && activeProjectIndex > visibleProjects.length - 1) {
      setActiveProjectIndex(0);
    }
  }, [activeProjectIndex, visibleProjects]);

  const handleCarouselStep = (direction) => {
    if (!visibleProjects.length) {
      return;
    }

    const currentIndex = Math.max(normalizedProjectIndex, 0);
    const nextIndex = (currentIndex + direction + visibleProjects.length) % visibleProjects.length;

    setActiveProjectIndex(nextIndex);
  };

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Technical Projects"
          title="Featured Projects"
          subtitle="Projects in web development, mobile apps, and IoT hardware."
          align="left"
        />

        <article className="projects-showcase surface" data-reveal>
          <div className="projects-showcase__header">
            <div className="projects-showcase__copy">
              <span className="projects-showcase__eyebrow">Projects Showcase</span>
              <h3>Explore my web, mobile, and hardware projects.</h3>
              <p>
                Each project highlights the tech stack used and the problem it solves.
              </p>
            </div>

            <div className="projects-showcase__meta">
              <div className="projects-showcase__counter" aria-live="polite">
                <strong>{activePositionLabel}</strong>
                <span>/ {String(visibleProjects.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {activeProject ? (
            <>
              <div className="projects-card-carousel">
                <button
                  type="button"
                  className="projects-card-carousel__nav"
                  onClick={() => handleCarouselStep(-1)}
                  aria-label="Show previous project"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="projects-card-carousel__viewport">
                  <ProjectCard
                    key={activeProject.slug}
                    project={activeProject}
                    TechIcon={TechIcon}
                    variant="showcase"
                    projectNumber={activePositionLabel}
                  />
                </div>

                <button
                  type="button"
                  className="projects-card-carousel__nav"
                  onClick={() => handleCarouselStep(1)}
                  aria-label="Show next project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="projects-rail" aria-label="Project quick selection">
                {visibleProjects.map((project, index) => {
                  const isActive = index === normalizedProjectIndex;

                  return (
                    <button
                      type="button"
                      key={project.slug}
                      className={`projects-rail__item${isActive ? " is-active" : ""}`}
                      onClick={() => setActiveProjectIndex(index)}
                      aria-pressed={isActive}
                    >
                      <span className="projects-rail__index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="projects-rail__body">
                        <strong title={project.title}>{project.shortTitle ?? project.title}</strong>
                        <span>{project.reference}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="projects-showcase__empty">
              <p>No projects available for this filter.</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

function CertificatesSection() {
  const [activeGroup, setActiveGroup] = useState("All Records");
  const groupedCertificates = useMemo(
    () => {
      const groups = portfolioData.certificates.reduce((accumulator, item) => {
        const groupLabel = certificateGroupLabels[item.type] ?? item.type;

        if (!accumulator[groupLabel]) {
          accumulator[groupLabel] = [];
        }

        accumulator[groupLabel].push(item);
        return accumulator;
      }, {});
      const orderedGroups = certificateGroupOrder
        .filter((group) => groups[group]?.length)
        .map((group) => [group, groups[group]]);
      const extraGroups = Object.entries(groups).filter(
        ([group]) => !certificateGroupOrder.includes(group)
      );

      return [...orderedGroups, ...extraGroups];
    },
    []
  );

  const totalCount = useMemo(
    () => portfolioData.certificates.length,
    []
  );

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
          eyebrow="Professional Development"
          title="Credentials & Certifications"
          subtitle="Complete record of verified certifications, seminars, webinars, and technical online courses."
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
              initialLimit={activeGroup === "All Records" ? 6 : 12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact__panel" data-reveal>
          <div className="contact__glow" aria-hidden="true" />
          <div className="contact__copy">
            <span className="contact__eyebrow">Open to Opportunities</span>
            <h2>Let&apos;s build or work together.</h2>
            <p>{portfolioData.contact.note}</p>
            <div className="contact__direct-actions">
              <a href={`mailto:${portfolioData.contact.email}`} className="button">
                <Mail size={18} /> Email Me
              </a>
              <a href={`tel:${portfolioData.contact.phone}`} className="button button--secondary">
                <Phone size={18} /> Call {portfolioData.contact.phone}
              </a>
            </div>
          </div>

          <div className="contact__links-grid">
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="contact-button"
              title="Send an email"
            >
              <span className="contact-button__icon"><Mail size={18} /></span>
              <span className="contact-button__info">
                <small>Email</small>
                <strong>{portfolioData.contact.email}</strong>
              </span>
            </a>

            <a
              href={`tel:${portfolioData.contact.phone}`}
              className="contact-button"
              title="Call or send SMS"
            >
              <span className="contact-button__icon"><Phone size={18} /></span>
              <span className="contact-button__info">
                <small>Phone</small>
                <strong>{portfolioData.contact.phone}</strong>
              </span>
            </a>

            <a
              href="https://github.com/DevDahon"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
              title="View GitHub profile"
            >
              <span className="contact-button__icon"><FaGithub size={18} /></span>
              <span className="contact-button__info">
                <small>GitHub</small>
                <strong>@DevDahon</strong>
              </span>
              <ExternalLink size={14} className="contact-button__arrow" />
            </a>

            <a
              href="https://www.linkedin.com/in/rod-allen-agregado-73b2b4398/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
              title="Connect on LinkedIn"
            >
              <span className="contact-button__icon"><FaLinkedin size={18} /></span>
              <span className="contact-button__info">
                <small>LinkedIn</small>
                <strong>Rod Allen Agregado</strong>
              </span>
              <ExternalLink size={14} className="contact-button__arrow" />
            </a>

            <a
              href="https://www.credly.com/users/rod-allen-agregado/badges/credly"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
              title="Verify Credly Badges"
            >
              <span className="contact-button__icon"><SiCredly size={18} /></span>
              <span className="contact-button__info">
                <small>Credly Badges</small>
                <strong>Verify Profile</strong>
              </span>
              <ExternalLink size={14} className="contact-button__arrow" />
            </a>

            <a
              href="https://www.facebook.com/raagregado19"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
              title="Connect on Facebook"
            >
              <span className="contact-button__icon"><FaFacebook size={18} /></span>
              <span className="contact-button__info">
                <small>Facebook</small>
                <strong>@raagregado19</strong>
              </span>
              <ExternalLink size={14} className="contact-button__arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { activeSection, navigateToSection } = useSectionObservers();

  return (
    <>
      <Navbar activeSection={activeSection} onSectionNavigate={navigateToSection} />
      <main className="main">
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <QualificationSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
