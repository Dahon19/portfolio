const productionStylesheet = "/portfolio/assets/app-BqvCXp7J.css?v=20260530-lowercase-route";
const productionEntry = "/portfolio/assets/app-mJuEUeno.js?v=20260530-lowercase-route";
const devHosts = new Set(["localhost", "127.0.0.1"]);

function loadProductionEntry() {
  if (!document.querySelector(`link[href^="${productionStylesheet.split("?")[0]}"]`)) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = productionStylesheet;
    document.head.appendChild(stylesheet);
  }

  return import(/* @vite-ignore */ productionEntry);
}

if (devHosts.has(window.location.hostname)) {
  import("./app-entry.jsx");
} else {
  loadProductionEntry();
}
