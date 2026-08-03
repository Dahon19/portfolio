import { useEffect, useState } from "react";
import { FaGithub, FaHistory } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function GitHubActivitySection({ devUsername = "DevDahon" }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
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

    fetchGitHubData();
  }, [devUsername]);

  return (
    <section className="github-activity section" id="activity">
      <div className="container">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Activity"
          subtitle="Recent work and open-source contributions from my GitHub profile."
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

        </div>
      </div>
    </section>
  );
}
