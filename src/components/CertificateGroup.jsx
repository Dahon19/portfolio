export function CertificateGroup({ title, certificates, icon: Icon, delay = 0 }) {
  return (
    <article className="certificate-group" data-reveal style={{ "--delay": `${delay}ms` }}>
      <div className="certificate-group__header">
        <div className="certificate-group__title-wrap">
          {Icon ? (
            <span className="certificate-group__icon" aria-hidden="true">
              <Icon size={18} />
            </span>
          ) : null}
          <h3>{title}</h3>
        </div>
        <span>{certificates.length} entries</span>
      </div>

      <div className="certificate-group__grid">
        {certificates.map((certificate) => (
          <div
            className="certificate-card"
            key={`${certificate.title}-${certificate.date}`}
          >
            <strong>{certificate.title}</strong>
            <small>{certificate.date}</small>
            <span>{certificate.location}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
