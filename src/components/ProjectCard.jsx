import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project, TechIcon, delay = 0, index = 0, lensLabel = "Project" }) {
  const projectNumber = String(index + 1).padStart(2, "0");
  const techStack = [...new Set([...project.techStack.languages, ...project.techStack.tools])];
  const hasPreviewImage = Boolean(project.preview?.src);

  return (
    <article className="project-card" data-lens={lensLabel.toLowerCase()} data-reveal style={{ "--delay": `${delay}ms` }}>
      <div className="project-card__preview">
        {hasPreviewImage ? (
          <img
            src={project.preview.src}
            alt={project.preview.alt}
            className="project-card__preview-image"
            loading="lazy"
          />
        ) : null}
        <div className="project-card__preview-overlay" aria-hidden="true">
          <span>{projectNumber}</span>
          <strong>{lensLabel}</strong>
        </div>
      </div>

      <div className="project-card__top">
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__reference">{project.reference}</span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title" title={project.title}>{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__meta">
          <div className="project-card__stack-group">
            <h4>Tech stack</h4>
            <div className="project-card__stack">
              {techStack.map((item) => (
                <span className="stack-chip" key={`${project.slug}-stack-${item}`}>
                  <span className="stack-chip__icon">
                    <TechIcon name={item} />
                  </span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="project-card__details">
          <div>
            <h4>Key features</h4>
            <ul>
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contribution</h4>
            <p>{project.contribution}</p>
          </div>
        </div>

        <div className="project-card__actions">
          <span className="project-card__action">
            <span>Project Scope</span>
            <ArrowUpRight size={16} />
          </span>
          <span className="project-card__action project-card__action--muted">
            {project.preview.source}
          </span>
        </div>
      </div>
    </article>
  );
}
