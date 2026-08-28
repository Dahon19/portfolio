import { useMemo, useState } from "react";
import {
  Award,
  BookOpenText,
  Calendar,
  CheckCircle2,
  MapPin,
  Presentation,
  ShieldCheck
} from "lucide-react";
import { CoverflowCarousel } from "./ui/coverflow-carousel";

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

function getCertificateCaption(certificate) {
  const issuer = certificate.location
    ?.split(/\s*(?:·|\/)\s*/)
    .map((part) => part.trim())
    .find((part) => part && part.toLowerCase() !== "online");

  if (certificate.type === "Badges") {
    return issuer
      ? `Verified digital badge issued by ${issuer}.`
      : "Verified digital badge recognizing completed technical learning.";
  }

  if (["Online Courses Taken", "courses"].includes(certificate.type)) {
    return issuer
      ? `Course completion credential issued by ${issuer}.`
      : "Course completion credential for structured online learning.";
  }

  if (["Certifications / Trainings", "certifications"].includes(certificate.type)) {
    return issuer
      ? `${certificate.certificateLevel ?? "Professional"} competency credential issued by ${issuer}.`
      : "Professional competency and technical training credential.";
  }

  return issuer
    ? `Professional learning participation credential issued by ${issuer}.`
    : "Participation credential for a professional learning session.";
}

function CertificateDetails({ certificate, isActive }) {
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

      <p className="certificate-card__caption">
        {getCertificateCaption(certificate)}
      </p>

      {certificate.preview ? (
        <div className="certificate-card__preview">
          <img
            src={certificate.preview}
            alt={`${certificate.title} certificate preview`}
            className="certificate-card__preview-image"
            loading="eager"
            fetchPriority={isActive ? "high" : "auto"}
            decoding="async"
            draggable="false"
          />
        </div>
      ) : null}

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

  const selectedCategory = certificateCategories.find(
    (category) => category.label === activeCategory
  ) ?? certificateCategories[0];

  const categoryCertificates = selectedCategory?.certificates ?? [];
  const totalItems = categoryCertificates.length;
  const certificateSlides = useMemo(
    () => categoryCertificates.map((certificate) => ({
      src: certificate.preview,
      title: certificate.certificateLevel
        ? `${certificate.title} - ${certificate.certificateLevel}`
        : certificate.title,
      alt: `${certificate.title} certificate preview`,
      data: certificate
    })),
    [categoryCertificates]
  );

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
            </div>
          </div>
          <span className="certificate-container__badge">
            {totalItems} records
          </span>
        </div>

        <CoverflowCarousel
          key={activeCategory}
          slides={certificateSlides}
          cardWidth="clamp(240px, 28vw, 360px)"
          cardAspectRatio="4 / 5"
          stageHeight="calc(var(--cf-card) * 5 / 4)"
          autoPlayInterval={4500}
          showCaption={false}
          showNavigation={true}
          showPagination={true}
          label={`${selectedCategory?.label ?? "Certificates"} 3D cardflow`}
          className="certificate-coverflow"
          cardClassName="certificate-coverflow__slide"
          renderSlide={(slide, { isActive }) => (
            <div
              className={`certificate-card certificate-card--text certificate-card--coverflow ${slide.data.preview ? "has-preview" : "without-preview"} ${isActive ? "is-active" : ""}`}
            >
              <div className="certificate-card__content">
                <CertificateDetails certificate={slide.data} isActive={isActive} />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
