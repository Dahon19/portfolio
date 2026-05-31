import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Code2,
  Cpu,
  Database,
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
  SiFlutter,
  SiMysql,
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
  "IT Instructor",
  "Frontend Developer",
  "Technical Support Specialist",
  "System Developer"
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
  }
];

const skillIconMap = {
  Programming: Code2,
  "Web Development": Laptop2,
  Database,
  "Technical Support": ShieldCheck,
  "Computer Hardware and Software": MonitorSmartphone,
  "Networking Basics": Network,
  "Teaching/Communication Skills": MessageSquareMore
};

const itemIconMap = {
  PHP: FaPhp,
  JavaScript: FaJs,
  "C++": Cpu,
  Python: Code2,
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
  "VS Code": Code2,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: FaBootstrap,
  "Node.js": FaNodeJs,
  Arduino: SiArduino,
  Sensors: Cpu,
  Flask: Code2,
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
  Badges: BadgeCheck,
  "Seminars & Webinars": GraduationCap,
  "Online Courses": BookOpenText,
  Certifications: ShieldCheck
};

const certificateGroupLabels = {
  "Certifications / Trainings": "Certifications",
  Badges: "Badges",
  "Webinars / Seminars Attended": "Seminars & Webinars",
  "Online Courses Taken": "Online Courses"
};

const certificateGroupOrder = ["Certifications", "Seminars & Webinars", "Online Courses", "Badges"];

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
  return <Code2 {...props} />;
}

function useSectionObservers() {
  const [activeSection, setActiveSection] = useState("home");
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.55],
        rootMargin: "-18% 0px -55% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  return { activeSection, reducedMotion };
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
            <span className="hero__eyebrow">Applied Technology + Instruction</span>
            <p className="hero__kicker">Clear workflows, reliable service, and classroom-ready communication</p>
            <h1 className="hero__title">{portfolioData.profile.name}</h1>
            <p className="hero__role">
              <span className="hero__role-static">BSIT Graduate</span>
              <span className="hero__role-divider">|</span>
              <span className="hero__typewriter" aria-live="polite">
                {typedRole}
                {!reducedMotion ? <span className="hero__cursor" aria-hidden="true" /> : null}
              </span>
            </p>
            <p className="hero__description">{portfolioData.profile.intro}</p>

            <div className="hero__meta-list" aria-label="Primary value areas">
              <span>Build</span>
              <span>Service</span>
              <span>Instruction</span>
            </div>

            <div className="hero__proof" aria-label="Professional focus summary">
              <span>Concise project documentation</span>
              <span>Readable technical writing</span>
              <span>Workflow-first thinking</span>
            </div>

            <div className="hero__actions">
              <a href="#projects" className="button" aria-label="View portfolio projects">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#certificates" className="button button--secondary" aria-label="View certificates">
                View Development
              </a>
              <a href="#contact" className="button button--ghost" aria-label="Go to contact section">
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
            <div className="hero-card hero-card--portrait" data-reveal style={{ "--delay": "120ms" }}>
              <div className="hero-card__badge">Profile</div>
              <div className="hero-card__photo-frame">
                <img
                      src={profileImageSrc}
                      alt="Rod Allen B. Agregado portrait"
                      className="hero-card__photo"
                    />
              </div>
            </div>

            <div className="hero-card hero-card--focus" data-reveal style={{ "--delay": "220ms" }}>
              <div className="hero-card__identity">
                <div className="hero-card__avatar">RA</div>
                <div>
                  <strong>Current Focus</strong>
                  <span>Applied software and IT service</span>
                </div>
              </div>
              <div className="hero-card__topics">
                {portfolioData.profile.focusAreas.slice(0, 6).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p className="hero-card__note">
                Focused on maintainable tools that are easy for users to understand.
              </p>
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
          title="Competencies for build, service, and instruction"
          subtitle="Grouped by capability area for quick technical review."
        />

        <div className="skills__grid">
          {portfolioData.skills.map((group, index) => (
            <SkillCategoryCard
              key={group.category}
              icon={skillIconMap[group.category] ?? Code2}
              title={group.category}
              items={group.items}
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
  return (
    <section className="timeline section" id="resume">
      <div className="container">
        <SectionHeading
          eyebrow="Academic Background"
          title="Education, internship, and technical exposure"
          subtitle="A concise professional timeline for recruiter review."
          align="left"
        />

        <div className="timeline__layout">
          <div className="timeline__main">
            {qualificationItems.map((item, index) => (
              <TimelineItem key={item.label} item={item} label={item.label} delay={index * 100} />
            ))}
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
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Selected technical projects"
          subtitle="Concise summaries with technologies, features, and contribution scope."
          align="left"
        />

        <div className="projects__grid">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              TechIcon={TechIcon}
              index={index}
              delay={index * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificatesSection() {
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

  return (
    <section className="certificates section" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow="Professional Development"
          title="Learning records for technical review"
          subtitle="Organized into certifications, seminars, webinars, online courses, and badges."
          align="left"
        />

        <div className="certificates__grid">
          {groupedCertificates.map(([group, certificates], index) => (
            <CertificateGroup
              key={group}
              title={group}
              certificates={certificates}
              icon={certificateIcons[group]}
              delay={index * 100}
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
            <span className="contact__eyebrow">Contact</span>
            <h2>Open to teaching, support, and junior developer opportunities.</h2>
            <p>{portfolioData.contact.note}</p>
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
            <a href="#home" className="button button--secondary" aria-label="Back to top of portfolio">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { activeSection, reducedMotion } = useSectionObservers();
  const typedRole = useTypewriter(rotatingRoles, reducedMotion);

  return (
    <>
      <Navbar activeSection={activeSection} />
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
