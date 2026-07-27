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

    // 2. Accurate Real-Time Visitor Counter API via CounterAPI.dev
    async function trackVisitor() {
      const namespace = "devdahon-portfolio-v1";
      const key = "visits";
      const hasVisited = sessionStorage.getItem("portfolio_session_tracked");

      // Use /up endpoint to increment for new visitors, or / endpoint to read live count for existing session
      const endpoint = hasVisited
        ? `https://api.counterapi.dev/v1/${namespace}/${key}/`
        : `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

      try {
        const res = await fetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === "number") {
            setVisitorCount(data.count);
            sessionStorage.setItem("portfolio_session_tracked", "true");
            localStorage.setItem("portfolio_last_known_count", String(data.count));
            return;
          }
        }
      } catch (err) {
        console.warn("CounterAPI fetch issue, using local counter fallback:", err);
      }

      // Fallback for offline or network interruption
      const savedCount = parseInt(localStorage.getItem("portfolio_last_known_count") || "1", 10);
      setVisitorCount(savedCount);
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
                Tracked in real time via CounterAPI analytics. Thank you for visiting!
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
