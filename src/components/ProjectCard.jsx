import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project, TechIcon, delay = 0 }) {
  return (
    <article className="project-card" data-reveal style={{ "--delay": `${delay}ms` }}>
      <div className="project-card__top">
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__reference">{project.reference}</span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__meta">
          <div className="project-card__stack-group">
            <h4>Languages</h4>
            <div className="project-card__stack">
              {project.techStack.languages.map((item) => (
                <span className="stack-chip" key={`${project.slug}-lang-${item}`}>
                  <span className="stack-chip__icon">
                    <TechIcon name={item} />
                  </span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="project-card__stack-group">
            <h4>Tools</h4>
            <div className="project-card__stack">
              {project.techStack.tools.map((item) => (
                <span className="stack-chip" key={`${project.slug}-tool-${item}`}>
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
            <span>Architecture Summary</span>
            <ArrowUpRight size={16} />
          </span>
          <span className="project-card__action project-card__action--muted">
            Public-safe portfolio summary
          </span>
        </div>
      </div>
    </article>
  );
}
