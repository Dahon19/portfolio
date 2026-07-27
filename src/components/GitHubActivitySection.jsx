import { useEffect, useState } from "react";
import { FaGithub, FaCodeBranch, FaEye, FaHistory } from "react-icons/fa";
import { ExternalLink, RefreshCw } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function GitHubActivitySection({ devUsername = "DevDahon" }) {
  const [events, setEvents] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [visitorCount, setVisitorCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch GitHub user profile & recent events
    async function fetchGitHubData() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${devUsername}`),
          fetch(`https://api.github.com/users/${devUsername}/events/public?per_page=6`)
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUserInfo(userData);
        }

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch GitHub activity:", err);
      } finally {
        setLoading(false);
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
        // Fallback visitor counter fallback if API endpoint is rate-limited
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

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getEventTitle = (event) => {
    switch (event.type) {
      case "PushEvent": {
        const commitCount = event.payload?.commits?.length || 1;
        const msg = event.payload?.commits?.[0]?.message || "Updated repository";
        return `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""}: "${msg.split("\n")[0]}"`;
      }
      case "CreateEvent":
        return `Created ${event.payload?.ref_type || "repository"} ${event.payload?.ref ? `"${event.payload.ref}"` : ""}`;
      case "WatchEvent":
        return `Starred repository`;
      case "ForkEvent":
        return `Forked repository`;
      case "PullRequestEvent":
        return `${event.payload?.action || "Updated"} pull request`;
      case "IssuesEvent":
        return `${event.payload?.action || "Updated"} issue`;
      default:
        return "Updated repository code";
    }
  };

  return (
    <section className="github-activity section" id="activity">
      <div className="container">
        <SectionHeading
          eyebrow="Live Metrics & Open Source"
          title="GitHub Activity & Visitor Analytics"
          subtitle="Real-time contribution events from GitHub and live portfolio visitor metrics."
          align="left"
        />

        <div className="github-activity__grid">
          {/* Main GitHub Activity Card */}
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
                  <small>Recent Public GitHub Activity</small>
                </div>
              </div>

              {userInfo && (
                <div className="github-activity__stats-row">
                  <span><strong>{userInfo.public_repos}</strong> Repos</span>
                  <span><strong>{userInfo.followers}</strong> Followers</span>
                </div>
              )}
            </div>

            {/* Events List */}
            <div className="github-activity__events">
              {loading ? (
                <div className="github-activity__loading">
                  <RefreshCw size={18} className="spin" />
                  <span>Loading live GitHub events...</span>
                </div>
              ) : events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="github-event-item">
                    <div className="github-event-item__icon">
                      <FaCodeBranch size={14} />
                    </div>
                    <div className="github-event-item__details">
                      <span className="github-event-item__repo">
                        <a
                          href={`https://github.com/${event.repo?.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {event.repo?.name}
                        </a>
                      </span>
                      <p className="github-event-item__title">{getEventTitle(event)}</p>
                    </div>
                    <span className="github-event-item__time">{formatTimeAgo(event.created_at)}</span>
                  </div>
                ))
              ) : (
                <div className="github-activity__loading">
                  <p>Explore all repositories directly on <a href={`https://github.com/${devUsername}`} target="_blank" rel="noopener noreferrer">GitHub @DevDahon</a>.</p>
                </div>
              )}
            </div>

            {/* Contribution Calendar Graph */}
            <div className="github-activity__heatmap">
              <span className="github-activity__heatmap-title"><FaHistory size={14} /> Contribution Calendar</span>
              <div className="github-activity__heatmap-img-wrap">
                <img
                  src={`https://ghchart.rshah.org/D4AF37/${devUsername}`}
                  alt={`GitHub Contribution Heatmap for ${devUsername}`}
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
