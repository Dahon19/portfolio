export function CertificateCard({ certificate }) {
  return (
    <article className="certificate-card">
      <div className="certificate-topline">
        <span className="chip">{certificate.category}</span>
        <span className="certificate-date">{certificate.date}</span>
      </div>
      <h3>{certificate.title}</h3>
      <p className="certificate-provider">{certificate.provider}</p>
      <div className="tag-list">
        {certificate.skills.map((skill) => (
          <span className="tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
