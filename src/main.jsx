const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

if (isLocalHost) {
  import("./app-entry.jsx");
} else {
  const productionEntry = "/Portfolio/assets/app.js";
  import(/* @vite-ignore */ productionEntry);
}
