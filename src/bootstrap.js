const productionStylesheet = "/portfolio/assets/app-BqvCXp7J.css?v=20260530-lowercase-route";
const productionEntry = "/portfolio/assets/app-mJuEUeno.js?v=20260530-lowercase-route";
const portraitFallbackSources = [
  "/portfolio/assets/rod-allen-profile-web-BRP0ZP85.jpg",
  "/portfolio/rod-allen-profile-clean.jpg?v=20260527c",
  "https://raw.githubusercontent.com/Dahon19/dahon19.github.io/master/portfolio/rod-allen-profile-clean.jpg"
];

if (!document.querySelector(`link[href^="${productionStylesheet.split("?")[0]}"]`)) {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = productionStylesheet;
  document.head.appendChild(stylesheet);
}

import(/* @vite-ignore */ productionEntry);

function installPortraitFallback() {
  let attempts = 0;

  const timer = window.setInterval(() => {
    attempts += 1;
    const portrait = document.querySelector(".hero-card__photo");

    if (!portrait) {
      if (attempts >= 30) {
        window.clearInterval(timer);
      }
      return;
    }

    const applyFallback = () => {
      if (portrait.naturalWidth > 0) {
        return;
      }

      const currentSource = portrait.getAttribute("src") ?? "";
      const nextSource = portraitFallbackSources.find((source) => !currentSource.includes(source));

      if (nextSource) {
        portrait.src = nextSource;
      }
    };

    portrait.addEventListener("error", applyFallback);
    window.setTimeout(applyFallback, 1200);
    window.clearInterval(timer);
  }, 250);
}

if (typeof window !== "undefined") {
  if (document.readyState === "complete") {
    installPortraitFallback();
  } else {
    window.addEventListener("load", installPortraitFallback, { once: true });
  }
}
