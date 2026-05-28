const productionStylesheet = "/Portfolio/assets/app-entry-2pSaNgVX.css?v=20260528-main";
const productionEntry = "/Portfolio/assets/app-entry-Bo7LUriQ.js?v=20260528-main";
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
