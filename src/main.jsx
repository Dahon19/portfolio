import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "3rem", color: "#ffffff", background: "#050507", fontFamily: "monospace", minHeight: "100vh" }}>
          <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Runtime Error Caught</h2>
          <pre style={{ background: "#121215", padding: "1.5rem", borderRadius: "8px", border: "1px solid #d4af37", overflowX: "auto", whiteSpace: "pre-wrap" }}>
            {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", background: "#d4af37", color: "#000000", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
