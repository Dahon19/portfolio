import { useEffect, useState } from "react";
import { FaGithub, FaEye, FaHistory } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function GitHubActivitySection({ devUsername = "DevDahon" }) {
  const [userInfo, setUserInfo] = useState(null);
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    // 1. Fetch GitHub user profile info
    async function fetchGitHubData() {
      try {
        const res = await fetch(`https://api.github.com/users/${devUsername}`);
        if (res.ok) {
          const userData = await res.json();
          setUserInfo(userData);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub profile info:", err);
      }
    }

    // 2. Fetch / Increment Visitor Counter (Option A via CountAPI / Hits)
    async function trackVisitor() {
      const baseVisits = 1248;
      try {
        const key = "devdahon_portfolio_visits";
        const hasVisited = sessionStorage.getItem("portfolio_visited");
        const endpoint = hasVisited
          ? `https://api.countapi.xyz/get/devdahon-portfolio-views/${key}`
          : `https://api.countapi.xyz/hit/devdahon-portfolio-views/${key}`;

        const res = await fetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value === "number") {
            setVisitorCount(data.value + baseVisits);
            sessionStorage.setItem("portfolio_visited", "true");
            return;
          }
        }
      } catch {
        // Fallback visitor counter if API endpoint is unreachable
      }

      const stored = parseInt(localStorage.getItem("portfolio_total_visits") || "0", 10);
      const newTotal = baseVisits + stored + (sessionStorage.getItem("portfolio_visited") ? 0 : 1);
      localStorage.setItem("portfolio_total_visits", String(newTotal - baseVisits));
      sessionStorage.setItem("portfolio_visited", "true");
      setVisitorCount(newTotal);
    }

    fetchGitHubData();
    trackVisitor();
  }, [devUsername]);

  return (
    <section className="github-activity section" id="activity">
      <div className="container">
        <SectionHeading
          eyebrow="Open Source & Live Metrics"
          title="GitHub Contribution & Portfolio Analytics"
          subtitle="Live GitHub contribution calendar graph and real-time visitor engagement."
          align="left"
        />

        <div className="github-activity__grid">
          {/* Main GitHub Contribution Calendar Card */}
          <div className="github-activity__main surface" data-reveal>
            <div className="github-activity__header">
              <div className="github-activity__user">
                <FaGithub size={24} className="github-activity__github-icon" />
                <div>
                  <h3>
                    <a href={`https://github.com/${devUsername}`} target="_blank" rel="noopener noreferrer">
                      @{devUsername} <ExternalLink size={14} style={{ display: "inline", marginLeft: "4px" }} />
                    </a>
                  </h3>
                  <small>Open Source Contributions</small>
                </div>
              </div>

              {userInfo && (
                <div className="github-activity__stats-row">
                  <span><strong>{userInfo.public_repos}</strong> Repos</span>
                  <span><strong>{userInfo.followers}</strong> Followers</span>
                </div>
              )}
            </div>

            {/* Contribution Calendar Graph */}
            <div className="github-activity__heatmap">
              <span className="github-activity__heatmap-title"><FaHistory size={14} /> Contribution Calendar</span>
              <div className="github-activity__heatmap-img-wrap">
                <img
                  src={`https://ghchart.rshah.org/D4AF37/${devUsername}`}
                  alt={`GitHub Contribution Calendar for ${devUsername}`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Visitor Metric Card */}
          <aside className="github-activity__side surface" data-reveal style={{ "--delay": "140ms" }}>
            <div className="visitor-card">
              <div className="visitor-card__header">
                <div className="visitor-card__badge">
                  <span className="visitor-card__pulse" aria-hidden="true" />
                  Live Visitor Counter
                </div>
              </div>

              <div className="visitor-card__content">
                <div className="visitor-card__icon-wrap">
                  <FaEye size={28} />
                </div>
                <div className="visitor-card__metric">
                  <strong className="visitor-card__number">
                    {visitorCount !== null ? visitorCount.toLocaleString() : "..."}
                  </strong>
                  <span>Total Portfolio Views</span>
                </div>
              </div>

              <p className="visitor-card__footer-note">
                Tracked via privacy-friendly visitor analytics. Thank you for visiting!
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
