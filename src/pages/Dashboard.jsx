import { useEffect, useState } from "react";
import StatCard from "../components/StatCard.jsx";

function getDashboardData() {
  // Mock asynchronous API call for coursework. Replace with fetch("/api/dashboard") when an API exists.
  return new Promise((resolve) => {
    window.setTimeout(() => resolve({
      components: 32,
      applications: 4,
      packages: 8,
      accessibility: "98%"
    }), 650);
  });
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  async function loadDashboard() {
    setStatus("loading");
    setError("");
    try {
      const result = await getDashboardData();
      setData(result);
      setStatus("success");
    } catch {
      setError("Dashboard data could not be loaded. Please try again.");
      setStatus("error");
    }
  }

  useEffect(() => { loadDashboard(); }, []);

  return (
    <>
      <div className="page-heading">
        <div><p className="eyebrow">OVERVIEW</p><h1>Dashboard</h1><p className="muted">Your NEXORA workspace at a glance.</p></div>
        <button className="button secondary" onClick={loadDashboard}>Refresh data</button>
      </div>

      {status === "loading" && <div className="notice">Loading dashboard data…</div>}
      {status === "error" && <div className="notice error" role="alert">{error} <button className="text-button" onClick={loadDashboard}>Retry</button></div>}
      {status === "success" && data && (
        <>
          <section className="stats-grid">
            <StatCard label="Components" value={data.components} note="Design system library" />
            <StatCard label="Micro-frontends" value={data.applications} note="Applications registered" />
            <StatCard label="Published packages" value={data.packages} note="Package registry" />
            <StatCard label="Accessibility score" value={data.accessibility} note="Sample dashboard metric" />
          </section>
          <section className="panel">
            <div className="panel-heading"><h2>Project implementation checklist</h2><span className="pill">React version</span></div>
            <ul className="check-list">
              <li>React component structure and props</li>
              <li>React Router navigation and portfolio route</li>
              <li>Context API for global theme state</li>
              <li>Zustand store for shared shopping cart state</li>
              <li>Async loading/error states and reusable validated form fields</li>
            </ul>
          </section>
        </>
      )}
    </>
  );
}
