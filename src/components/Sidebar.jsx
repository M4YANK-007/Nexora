import { NavLink } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

const groups = [
  { title: "Overview", links: [["/", "▤", "Dashboard"]] },
  { title: "Design System", links: [["/components", "◧", "Components"], ["/tokens", "◍", "Tokens"], ["/playground", "▶", "Playground"]] },
  { title: "Micro-Frontends", links: [["/applications", "◫", "Applications"], ["/architecture", "◈", "Architecture"], ["/deployments", "▲", "Deployments"]] },
  { title: "Quality", links: [["/accessibility", "✓", "Accessibility"]] },
  { title: "Developer", links: [["/packages", "◇", "Packages"], ["/changelog", "≡", "Changelog"]] },
  { title: "Administration", links: [["/team", "◐", "Team"], ["/activity", "◌", "Activity"]] },
  { title: "PE-I Add-ons", links: [["/portfolio", "↗", "Portfolio"], ["/shop", "🛒", "Shop / Cart"], ["/forms", "✉", "Form Validation"]] }
];

export default function Sidebar() {
  const totalItems = useCartStore(state => state.totalItems());
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark">N</div><div><strong>NEXORA</strong><small>UI Infrastructure</small></div></div>
    <nav className="sidebar-nav">
      {groups.map(group => <div className="nav-group" key={group.title}>
        <div className="nav-group-title">{group.title}</div>
        {group.links.map(([to, icon, label]) => <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
          <span className="nav-icon">{icon}</span><span className="nav-label">{label}</span>
          {to === "/shop" && totalItems > 0 && <span className="count">{totalItems}</span>}
        </NavLink>)}
      </div>)}
    </nav>
    <div className="sidebar-note"><span className="status-dot" /> NEXORA workspace<small>React · Router · Context · Zustand</small></div>
  </aside>;
}
