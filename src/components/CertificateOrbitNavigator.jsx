import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpenText,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Presentation,
  ShieldCheck
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

const certificateCategoryDefinitions = [
  {
    label: "Certifications",
    icon: Award,
    matches: ["Certifications / Trainings", "certifications"]
  },
  {
    label: "Online Courses",
    icon: BookOpenText,
    matches: ["Online Courses Taken", "courses"]
  },
  {
    label: "Digital Badges",
    icon: ShieldCheck,
    matches: ["Badges"]
  },
  {
    label: "Webinars & Seminars",
    icon: Presentation,
    matches: ["Webinars / Seminars Attended", "seminars"]
  }
];

function CertificateDetails({ certificate }) {
  return (
    <>
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

      <h3 className="certificate-card__title">
        {certificate.certificateLevel
          ? `${certificate.title} - ${certificate.certificateLevel}`
          : certificate.title}
      </h3>

      <div className="certificate-card__meta">
        <MapPin size={13} className="certificate-card__meta-icon" aria-hidden="true" />
        <span>{certificate.location}</span>
      </div>
    </>
  );
}

export function CertificateOrbitNavigator({ certificates }) {
  const certificateCategories = useMemo(() => {
    return certificateCategoryDefinitions
      .map((category) => ({
        ...category,
        certificates: certificates.filter((certificate) =>
          category.matches.includes(certificate.type)
        )
      }))
      .filter((category) => category.certificates.length > 0);
  }, [certificates]);

  const [activeCategory, setActiveCategory] = useState(
    () => certificateCategories.find((category) => category.label === "Online Courses")?.label
      ?? certificateCategories[0]?.label
      ?? ""
  );
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCategory = certificateCategories.find(
    (category) => category.label === activeCategory
  ) ?? certificateCategories[0];

  const categoryCertificates = selectedCategory?.certificates ?? [];
  const totalItems = categoryCertificates.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return categoryCertificates.slice(start, start + ITEMS_PER_PAGE);
  }, [categoryCertificates, currentPage]);

  const ActiveIcon = selectedCategory?.icon || Award;

  return (
    <div className="certificate-orbit-experience">
      <nav className="certificate-orbit-navigation" aria-label="Certificate categories">
        {certificateCategories.map(({ label, icon: Icon, certificates: catCerts }) => {
          const isActive = label === selectedCategory?.label;

          return (
            <button
              type="button"
              className="certificate-orbit-navigation__card"
              key={label}
              onClick={() => setActiveCategory(label)}
              aria-pressed={isActive}
            >
              <span className="certificate-orbit-navigation__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="certificate-orbit-navigation__copy">
                <strong>{label}</strong>
                <small>{catCerts.length} records</small>
              </span>
              <span className="certificate-orbit-navigation__count" aria-hidden="true">
                {catCerts.length}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="certificate-cards-container">
        <div className="certificate-container__header">
          <div className="certificate-container__title-group">
            <span className="certificate-container__icon" aria-hidden="true">
              <ActiveIcon size={20} />
            </span>
            <div>
              <h3 className="certificate-container__title">{selectedCategory?.label}</h3>
              <p className="certificate-container__subtitle">
                Showing {totalItems > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} credentials
              </p>
            </div>
          </div>
          <span className="certificate-container__badge">
            {totalItems} records
          </span>
        </div>

        <div className="certificate-grid" key={`${activeCategory}-${currentPage}`}>
          {paginatedCertificates.map((certificate, idx) => (
            <div
              key={`${certificate.title}-${idx}`}
              className="certificate-card certificate-card--text certificate-card--grid-item"
            >
              <CertificateDetails certificate={certificate} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="certificate-pagination">
            <button
              type="button"
              className="certificate-pagination__btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              <span>Previous</span>
            </button>

            <div className="certificate-pagination__pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`certificate-pagination__page-num ${pageNum === currentPage ? "is-active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={pageNum === currentPage ? "page" : undefined}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="certificate-pagination__btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
