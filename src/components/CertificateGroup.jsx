import { useState, useEffect } from "react";
import { Calendar, MapPin, CheckCircle2, Orbit, LayoutGrid, ArrowRight } from "lucide-react";
import { CircularCarousel } from "./ui/circular-carousel";

const categorySubtitles = {
  "Online Courses": "Swipe or drag to orbit through specialized courses",
  "Digital Badges": "Swipe or drag to orbit through verified badges & credentials",
  "Webinars & Seminars": "Swipe or drag to orbit through verified webinars & seminars",
  "Certifications": "Official technical qualification and licensure"
};

export function CertificateGroup({
  title,
  certificates,
  icon: Icon,
  delay = 0,
  initialLimit = 3,
  initialView = "grid",
  showViewToggle = true,
  onSelectCategory,
  isAllRecordsOverview = false
}) {
  const [viewMode, setViewMode] = useState(initialView);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setViewMode(initialView);
    setIsExpanded(false);
  }, [initialView, title]);

  const limit = initialLimit;
  const showToggle = !isAllRecordsOverview && certificates.length > limit;
  const visibleCertificates = isExpanded ? certificates : certificates.slice(0, limit);
  const subtitle = categorySubtitles[title] || "Swipe or drag to orbit through records";

  return (
    <article
      className="certificate-group is-visible"
      style={{ "--delay": `${delay}ms` }}
    >
      <div className="certificate-group__header">
        <div className="certificate-group__title-wrap">
          {Icon ? (
            <span className="certificate-group__icon" aria-hidden="true">
              <Icon size={18} />
            </span>
          ) : null}
          <div>
            <h3>{title}</h3>
            {viewMode === "orbit" && certificates.length > 1 && (
              <small className="certificate-group__subtitle">{subtitle}</small>
            )}
            {isAllRecordsOverview && certificates.length > 3 && (
              <small className="certificate-group__subtitle" style={{ color: "var(--gold-dark)" }}>
                Top Featured ({Math.min(3, certificates.length)} of {certificates.length} Records)
              </small>
            )}
          </div>
        </div>

        <div className="certificate-group__actions">
          {/* 3D Orbit / Grid View Switcher (for category tabs) */}
          {showViewToggle && certificates.length > 1 && (
            <div className="certificate-view-toggle" role="group" aria-label="View display mode">
              <button
                type="button"
                className={`certificate-view-toggle__btn ${viewMode === "orbit" ? "is-active" : ""}`}
                onClick={() => setViewMode("orbit")}
                title="3D Circular Carousel View"
                aria-label="3D Orbit View"
              >
                <Orbit size={14} />
                <span>3D Orbit</span>
              </button>
              <button
                type="button"
                className={`certificate-view-toggle__btn ${viewMode === "grid" ? "is-active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Standard Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>
            </div>
          )}

          {isAllRecordsOverview && onSelectCategory && certificates.length > 3 && (
            <button
              type="button"
              className="certificate-view-all-btn"
              onClick={onSelectCategory}
              title={`Explore all ${certificates.length} records in 3D Orbit`}
            >
              <span>Explore All {certificates.length}</span>
              <ArrowRight size={13} />
            </button>
          )}

          <span className="certificate-group__count-badge">{certificates.length} Records</span>
        </div>
      </div>

      {viewMode === "orbit" && certificates.length > 1 ? (
        <div className="certificate-group__orbit-container">
          <CircularCarousel
            items={certificates}
            renderItem={(certificate, { isActive }) => (
              <div className={`certificate-card certificate-card--text certificate-card--orbit ${isActive ? "is-active" : ""}`}>
                <div className="certificate-card__top">
                  <span className="certificate-card__date">
                    <Calendar size={13} aria-hidden="true" />
                    {certificate.date}
                  </span>
                  <span className="certificate-card__status">
                    <CheckCircle2 size={12} aria-hidden="true" />
                    Verified
                  </span>
                </div>

                <h4 className="certificate-card__title">
                  {certificate.certificateLevel
                    ? `${certificate.title} - ${certificate.certificateLevel}`
                    : certificate.title}
                </h4>

                <div className="certificate-card__meta">
                  <MapPin size={13} className="certificate-card__meta-icon" aria-hidden="true" />
                  <span>{certificate.location}</span>
                </div>
              </div>
            )}
          />
        </div>
      ) : (
        <>
          <div className="certificate-group__grid">
            {visibleCertificates.map((certificate, index) => (
              <div
                className="certificate-card certificate-card--text is-visible"
                key={`${certificate.title}-${certificate.date}-${index}`}
                style={{ "--delay": `${(index % 6) * 35}ms` }}
              >
                <div className="certificate-card__top">
                  <span className="certificate-card__date">
                    <Calendar size={13} aria-hidden="true" />
                    {certificate.date}
                  </span>
                  <span className="certificate-card__status">
                    <CheckCircle2 size={12} aria-hidden="true" />
                    Verified
                  </span>
                </div>

                <h4 className="certificate-card__title">
                  {certificate.certificateLevel
                    ? `${certificate.title} - ${certificate.certificateLevel}`
                    : certificate.title}
                </h4>

                <div className="certificate-card__meta">
                  <MapPin size={13} className="certificate-card__meta-icon" aria-hidden="true" />
                  <span>{certificate.location}</span>
                </div>
              </div>
            ))}
          </div>

          {showToggle && (
            <div className="certificate-group__footer" style={{ marginTop: "1.5rem" }}>
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
        </>
      )}
    </article>
  );
}
