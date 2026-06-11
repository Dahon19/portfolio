import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Code2,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Database,
  BriefcaseBusiness,
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
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaravel,
  FaNetworkWired,
  FaNodeJs,
  FaPhp,
  FaReact
} from "react-icons/fa";
import {
  SiArduino,
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
import profileImageSrc from "./assets/rod-allen-profile-web.jpg";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SectionHeading } from "./components/SectionHeading";
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { ProjectCard } from "./components/ProjectCard";
import { CertificateGroup } from "./components/CertificateGroup";
import { TimelineItem } from "./components/TimelineItem";
import { portfolioData } from "./data/portfolioData";

const rotatingRoles = [
  "Teaching Support",
  "Junior Developer",
  "Technical Support",
  "Systems Support"
];

const navSectionIds = ["home", "about", "skills", "projects", "resume", "certificates", "contact"];

const quickSnapshotCards = [
  {
    title: "Best-fit roles",
    description:
      "Ready for entry-level roles where teaching, support, and software work overlap.",
    items: ["Teaching support", "Helpdesk support", "Junior development"],
    icon: BriefcaseBusiness
  },
  {
    title: "Working strengths",
    description:
      "Most effective in systems work that needs clean UI, structure, and user guidance.",
    items: ["Workflow thinking", "Readable interfaces", "Clear documentation"],
    icon: Laptop2
  },
  {
    title: "Proof points",
    description:
      "Formal training, project work, and continuing technical study back up the portfolio.",
    items: ["BSIT graduate", "TESDA NCII", "Internship experience"],
    icon: GraduationCap
  }
];

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
    title: "Instruction and learner support",
    subtitle: "Prepared for IT fundamentals, user guidance, and classroom support",
    detail:
      "Combines documentation, presentation readiness, and technical communication for entry-level teaching assistant or IT instruction support."
  }
];

const skillIconMap = {
  "Frontend Development": Laptop2,
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

function useTypewriter(words, reducedMotion) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(words[0] ?? "");
      return undefined;
    }

    const currentWord = words[wordIndex] ?? "";
    const finishedTyping = displayText === currentWord;
    const finishedDeleting = displayText.length === 0;

    let timeout = 110;

    if (!isDeleting && finishedTyping) {
      timeout = 1400;
    } else if (isDeleting && finishedDeleting) {
      timeout = 260;
    } else if (isDeleting) {
      timeout = 55;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && finishedTyping) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && finishedDeleting) {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      const nextLength = isDeleting ? displayText.length - 1 : displayText.length + 1;
      setDisplayText(currentWord.slice(0, nextLength));
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, reducedMotion, wordIndex, words]);

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

  const navigateToSection = useCallback(
    (sectionId) => {
      const target = document.getElementById(sectionId);

      if (!target) {
        return;
      }

      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

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

function HomeSection({ typedRole, reducedMotion }) {
  return (
    <section className="hero section" id="home">
      <div className="hero__mesh" aria-hidden="true" />
      <div className="hero__ambient hero__ambient--one" aria-hidden="true" />
      <div className="hero__ambient hero__ambient--two" aria-hidden="true" />
      <div className="hero__container container">
        <div className="hero__grid">
          <div className="hero__copy" data-reveal>
            <span className="hero__eyebrow">Technical Projects + Teaching Readiness</span>
            <p className="hero__kicker">{portfolioData.profile.name}</p>
            <h1 className="hero__title">IT Graduate | Teaching Support | Junior Developer | Technical Support</h1>
            <p className="hero__role">
              <span className="hero__role-static">{portfolioData.profile.tagline}</span>
              <span className="hero__typewriter" aria-live="polite">
                {typedRole}
                {!reducedMotion ? <span className="hero__cursor" aria-hidden="true" /> : null}
              </span>
            </p>
            <p className="hero__description">{portfolioData.profile.intro}</p>

            <div className="hero__actions">
              <a href="#projects" className="button">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="button button--ghost">
                Contact Me
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
                <img src={profileImageSrc} alt="" />
              </div>
              <div className="hero__portrait-light hero__portrait-light--gold" aria-hidden="true" />
              <div className="hero__portrait-light hero__portrait-light--blue" aria-hidden="true" />
              <div className="hero__portrait-lines" aria-hidden="true" />

              <div className="hero-card hero-card--portrait">
                <div className="hero-card__badge">Profile</div>
                <div className="hero-card__photo-frame">
                  <img
                    src={profileImageSrc}
                    alt="Rod Allen B. Agregado portrait"
                    className="hero-card__photo"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SnapshotSection() {
  return (
    <section className="snapshot section" id="snapshot">
      <div className="container">
        <div className="snapshot__panel surface" data-reveal>
          <div className="snapshot__intro">
            <span className="snapshot__eyebrow">Professional Snapshot</span>
            <h2>What a recruiter should understand in under a minute.</h2>
            <p>
              This portfolio is strongest for structured roles that combine software building,
              technical support, and clear user-facing communication.
            </p>
          </div>

          <div className="snapshot__grid">
            {quickSnapshotCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article
                  className="snapshot-card"
                  key={card.title}
                  data-reveal
                  style={{ "--delay": `${index * 90}ms` }}
                >
                  <div className="snapshot-card__content">
                    <div className="snapshot-card__icon" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <div className="snapshot-card__list">
                    {card.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
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
          eyebrow="About"
          title="Clear technical work with process thinking"
          subtitle="Academic projects, internship exposure, troubleshooting, and useful software."
          align="left"
        />

        <div className="about__grid">
          <div className="about__story surface" data-reveal>
            <p>{portfolioData.profile.about}</p>
            <div className="about__signature-line" />
          </div>

          <div className="about__highlights">
            <article className="highlight-card surface" data-reveal style={{ "--delay": "120ms" }}>
              <span className="highlight-card__label">Current direction</span>
              <h3>Building useful tools and communicating technology clearly</h3>
              <p>
                My strongest fit is structured IT work where development,
                user guidance, and process improvement intersect.
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
          title="Focused capability areas for entry-level IT work"
          subtitle="Technologies are separated from competencies so each skill group is easier to scan."
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
          eyebrow="Education & Professional Preparation"
          title="Internship, education, and teaching readiness"
          subtitle="Workplace trust signals for entry-level IT, support, and instruction roles."
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
          title="Proof through systems, web, mobile, and support-focused builds"
          subtitle="Projects are the main evidence: they show how I can build, support, document, and explain technology solutions."
          align="left"
        />

        <article className="projects-showcase surface" data-reveal>
          <div className="projects-showcase__header">
            <div className="projects-showcase__copy">
              <span className="projects-showcase__eyebrow">Proof Through Projects</span>
              <h3>Start with the strongest system, then scan the rest.</h3>
              <p>
                Recruiters should see the strongest build first, then quickly compare the remaining
                systems, mobile, and hardware-assisted work.
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
                        <strong>{project.title}</strong>
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
  const [activeGroup, setActiveGroup] = useState(certificateGroupOrder[0]);
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
  const activeCertificateGroup =
    groupedCertificates.find(([group]) => group === activeGroup) ?? groupedCertificates[0];

  return (
    <section className="certificates section" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow="Professional Development"
          title="Credentials that support the main portfolio"
          subtitle="Certificates are secondary evidence after projects, internship, and skills."
          align="left"
        />

        <div className="certificates-tabs" role="tablist" aria-label="Professional development categories">
          {groupedCertificates.map(([group, certificates]) => (
            <button
              type="button"
              role="tab"
              aria-selected={group === activeCertificateGroup?.[0]}
              className={`certificates-tabs__button${group === activeCertificateGroup?.[0] ? " is-active" : ""}`}
              key={group}
              onClick={() => setActiveGroup(group)}
            >
              <span>{group}</span>
              <small>{certificates.length}</small>
            </button>
          ))}
        </div>

        <div className="certificates__grid">
          {activeCertificateGroup ? (
            <CertificateGroup
              key={activeCertificateGroup[0]}
              title={activeCertificateGroup[0]}
              certificates={activeCertificateGroup[1]}
              icon={certificateIcons[activeCertificateGroup[0]]}
              delay={80}
            />
          ) : null}
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
            <h2>Open to IT Instruction, Technical Support, and Junior Developer Opportunities.</h2>
            <p>{portfolioData.contact.note}</p>
            <div className="contact__tags" aria-label="Professional fit">
              <span>Teaching readiness</span>
              <span>Systems support</span>
              <span>Software development</span>
            </div>
          </div>

          <div className="contact__cards">
            <article className="contact-card" data-reveal style={{ "--delay": "120ms" }}>
              <GraduationCap size={20} />
              <div>
                <h3>Open roles</h3>
                <p>IT instructor, helpdesk support, systems development, and junior software roles.</p>
              </div>
            </article>
            <article className="contact-card" data-reveal style={{ "--delay": "180ms" }}>
              <ArrowRight size={20} />
              <div>
                <h3>Working style</h3>
                <p>Structured, user-focused, and organized with clear documentation.</p>
              </div>
            </article>
            <article className="contact-card" data-reveal style={{ "--delay": "240ms" }}>
              <Mail size={20} />
              <div>
                <h3>Email</h3>
                <a href={`mailto:${portfolioData.contact.email}`}>{portfolioData.contact.email}</a>
              </div>
            </article>
            <article className="contact-card" data-reveal style={{ "--delay": "300ms" }}>
              <Phone size={20} />
              <div>
                <h3>Phone</h3>
                <a href={`tel:${portfolioData.contact.phone}`}>{portfolioData.contact.phone}</a>
              </div>
            </article>
          </div>

          <div className="contact__cta">
            <a href={`mailto:${portfolioData.contact.email}`} className="button" aria-label="Send email to Rod Allen Agregado">
              Contact Me
            </a>
            <a
              href="#resume"
              className="button button--secondary"
              aria-label="View resume section"
            >
              View Resume
            </a>
            <a
              href="#projects"
              className="button button--ghost"
              aria-label="View project section"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { activeSection, reducedMotion, navigateToSection } = useSectionObservers();
  const typedRole = useTypewriter(rotatingRoles, reducedMotion);

  return (
    <>
      <Navbar activeSection={activeSection} onSectionNavigate={navigateToSection} />
      <main className="main">
        <HomeSection typedRole={typedRole} reducedMotion={reducedMotion} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <QualificationSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
