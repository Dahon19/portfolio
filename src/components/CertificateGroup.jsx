import { useState } from "react";

export function CertificateGroup({
  title,
  certificates,
  icon: Icon,
  delay = 0,
  initialLimit = 9
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const limit = initialLimit;
  const showToggle = certificates.length > limit;
  const visibleCertificates = isExpanded ? certificates : certificates.slice(0, limit);

  return (
    <article
      className="certificate-group"
      data-reveal
      style={{ "--delay": `${delay}ms` }}
    >
      <div className="certificate-group__header">
        <div className="certificate-group__title-wrap">
          {Icon ? (
            <span className="certificate-group__icon" aria-hidden="true">
              <Icon size={18} />
            </span>
          ) : null}
          <h3>{title}</h3>
        </div>
        <span>{certificates.length} records</span>
      </div>

      <div className="certificate-group__grid">
        {visibleCertificates.map((certificate, index) => (
          <div
            className="certificate-card"
            key={`${certificate.title}-${certificate.date}-${index}`}
            style={{ "--delay": `${(index % 6) * 35}ms` }}
          >
            {certificate.preview ? (
              <img
                src={certificate.preview}
                alt={`${certificate.title} preview`}
                className="certificate-card__preview"
                loading="lazy"
              />
            ) : (
              <span className="certificate-card__marker" aria-hidden="true" />
            )}
            <strong>
              {certificate.certificateLevel
                ? `${certificate.title} - ${certificate.certificateLevel}`
                : certificate.title}
            </strong>
            <small>{certificate.date}</small>
            <span>{certificate.location}</span>
          </div>
        ))}
      </div>

      {showToggle && (
        <div className="certificate-group__footer" style={{ marginTop: "1.2rem" }}>
          <button
            type="button"
            className="certificate-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? "Show Less"
              : `Show All ${certificates.length} Records (+${certificates.length - limit} More)`}
          </button>
        </div>
      )}
    </article>
  );
}
