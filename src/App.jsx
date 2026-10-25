import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Components from "./pages/Components.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Shop from "./pages/Shop.jsx";
import Forms from "./pages/Forms.jsx";
import OriginalPages from "./pages/OriginalPages.jsx";

export default function App() {
  const { theme, setTheme } = useTheme();
  return <div className="app-shell">
    <Sidebar />
    <main className="main-area">
      <header className="topbar">
        <div><span className="live-dot" /> Workspace <span className="muted">/ Enterprise UI Infrastructure</span></div>
        <label className="theme-control">Theme
          <select value={theme} onChange={event => setTheme(event.target.value)} className="control compact">
            <option value="dark">Dark</option><option value="light">Light</option>
          </select>
        </label>
      </header>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/components" element={<Components />} />
          <Route path="/tokens" element={<OriginalPages page="tokens" />} />
          <Route path="/playground" element={<OriginalPages page="playground" />} />
          <Route path="/applications" element={<OriginalPages page="applications" />} />
          <Route path="/architecture" element={<OriginalPages page="architecture" />} />
          <Route path="/deployments" element={<OriginalPages page="deployments" />} />
          <Route path="/accessibility" element={<OriginalPages page="accessibility" />} />
          <Route path="/packages" element={<OriginalPages page="packages" />} />
          <Route path="/changelog" element={<OriginalPages page="changelog" />} />
          <Route path="/team" element={<OriginalPages page="team" />} />
          <Route path="/activity" element={<OriginalPages page="activity" />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="*" element={<section className="panel"><h1>Page not found</h1><p className="muted">Choose a page from the sidebar.</p></section>} />
        </Routes>
        <footer className="footer">NEXORA · React edition · Educational demo data</footer>
      </div>
    </main>
  </div>;
}
