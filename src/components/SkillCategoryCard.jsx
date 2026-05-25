import { BadgeCheck } from "lucide-react";

export function SkillCategoryCard({ icon: Icon, title, items, getItemIcon, delay = 0 }) {
  return (
    <article className="skill-card" data-reveal style={{ "--delay": `${delay}ms` }}>
      <div className="skill-card__header">
        <span className="skill-card__icon">
          <Icon size={20} />
        </span>
        <h3>{title}</h3>
      </div>
      <div className="skill-card__items">
        {items.map((item) => (
          <div className="skill-card__item" key={`${title}-${item}`}>
            <span className="skill-card__item-icon" aria-hidden="true">
              {getItemIcon ? getItemIcon(item) : <BadgeCheck size={14} />}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
