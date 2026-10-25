import { useMemo, useState } from "react";

const tokens = {
  Color: [["--color-background", "#0a0c10"], ["--color-surface", "#12151b"], ["--color-text-primary", "#e7eaf0"], ["--color-accent", "#4fb3ff"], ["--color-success", "#34d399"], ["--color-warning", "#e3a445"]],
  Typography: [["Inter", "Interface font"], ["JetBrains Mono", "Monospace font"], ["12px", "Small text"], ["20px", "Section headings"], ["28px", "Page headings"]],
  Spacing: [["4px", "space-1"], ["8px", "space-2"], ["12px", "space-3"], ["16px", "space-4"], ["24px", "space-6"], ["32px", "space-8"]],
  Radius: [["6px", "Small"], ["10px", "Medium"], ["14px", "Large"], ["999px", "Pill"]],
  Motion: [["120ms", "Fast"], ["180ms", "Base"], ["260ms", "Slow"]]
};
const applications = [
  ["Design System", "Healthy", "3.4.0", "Platform Team"],
  ["Analytics", "Healthy", "2.1.7", "Data Team"],
  ["Admin Console", "Degraded", "1.8.2", "Core Team"],
  ["Documentation", "Healthy", "4.0.1", "DX Team"]
];
const initialDeploys = [
  ["dpl_8f21", "Design System", "3.4.0", "Production", "Success"],
  ["dpl_8f1e", "Analytics", "2.1.7", "Production", "Success"],
  ["dpl_8f0a", "Admin Console", "1.8.2", "Staging", "In progress"],
  ["dpl_8ed7", "Admin Console", "1.8.1", "Production", "Failed"]
];
const activity = [
  ["Analytics remote deployed to production", "2m ago"],
  ["@nexora/ui v3.4.0 published to npm", "41m ago"],
  ["Combobox accessibility audit passed", "1h ago"],
  ["New developer added to Design System team", "3h ago"],
  ["Admin Console flagged degraded — investigating", "5h ago"],
  ["Documentation remote deployed to staging", "8h ago"]
];
const packages = [
  ["@nexora/ui", "3.4.0", "128k/wk", "41.2kb gzip"],
  ["@nexora/tokens", "1.4.0", "96k/wk", "3.8kb gzip"],
  ["@nexora/hooks", "1.1.2", "61k/wk", "6.1kb gzip"],
  ["@nexora/icons", "2.0.3", "74k/wk", "12.4kb gzip"]
];

function PageHeading({ eyebrow, title, subtitle, action }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{subtitle}</p></div>{action}</div>;
}
function DataTable({ headers, rows }) {
  return <div className="table-wrap"><table className="data-table"><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export default function OriginalPages({ page }) {
  const [tokenTab, setTokenTab] = useState("Color");
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("Medium");
  const [label, setLabel] = useState("Deploy");
  const [disabled, setDisabled] = useState(false);
  const [deploys, setDeploys] = useState(initialDeploys);
  const [showDeploy, setShowDeploy] = useState(false);
  const [deployName, setDeployName] = useState("Design System");
  const [environment, setEnvironment] = useState("Staging");
  const [version, setVersion] = useState("3.4.1");
  const [toast, setToast] = useState("");
  const [auditing, setAuditing] = useState(false);
  const [auditRun, setAuditRun] = useState(false);
  const [members, setMembers] = useState([["Mayank", "Platform Team", "Admin"], ["Piyush Yadav", "Data Team", "Editor"], ["Aryan Ratti", "Core Team", "Developer"]]);
  const [newMember, setNewMember] = useState("");
  const [search, setSearch] = useState("");

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  const titleMap = {
    tokens: ["DESIGN SYSTEM", "Design tokens", "The shared values used across the interface."],
    playground: ["DESIGN SYSTEM", "Component playground", "Configure a component live and preview its appearance."],
    applications: ["MICRO-FRONTENDS", "Applications", "Independently deployed remote applications."],
    architecture: ["MICRO-FRONTENDS", "Module Federation architecture", "How the host shell can share runtime concerns with remote applications."],
    deployments: ["MICRO-FRONTENDS", "Deployments", "Release history across remote applications."],
    accessibility: ["QUALITY", "Accessibility", "Sample accessibility checks across the component library."],
    packages: ["DEVELOPER", "Packages", "Published packages and their release information."],
    changelog: ["DEVELOPER", "Changelog", "Example release notes for the design system."],
    team: ["ADMINISTRATION", "Team", "People and roles in the workspace."],
    activity: ["ADMINISTRATION", "Activity", "Recent events across the platform."]
  };
  const filteredActivity = useMemo(() => activity.filter(([text]) => text.toLowerCase().includes(search.toLowerCase())), [search]);

  return <>
    <PageHeading eyebrow={titleMap[page][0]} title={titleMap[page][1]} subtitle={titleMap[page][2]}
      action={page === "deployments" ? <button className="button" onClick={() => setShowDeploy(true)}>＋ Deploy remote</button> : null} />

    {page === "tokens" && <>
      <div className="toolbar">{Object.keys(tokens).map(tab => <button key={tab} className={`button ${tokenTab === tab ? "" : "secondary"}`} onClick={() => setTokenTab(tab)}>{tab}</button>)}</div>
      <section className="panel"><DataTable headers={["Token", "Value", "Action"]} rows={tokens[tokenTab].map(([name, value]) => [name, value, <button className="text-button" onClick={() => { navigator.clipboard?.writeText(`${name}: ${value}`); notify("Token copied"); }}>Copy</button>])} /></section>
    </>}

    {page === "playground" && <section className="playground-grid">
      <div className="panel playground-controls">
        <label>Variant<select className="control" value={variant} onChange={e => setVariant(e.target.value)}><option value="primary">Primary</option><option value="secondary">Secondary</option><option value="ghost">Ghost</option><option value="destructive">Destructive</option></select></label>
        <label>Size<select className="control" value={size} onChange={e => setSize(e.target.value)}><option>Small</option><option>Medium</option><option>Large</option></select></label>
        <label>Label<input className="control" value={label} onChange={e => setLabel(e.target.value)} /></label>
        <label className="inline-check"><input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled state</label>
      </div>
      <div><div className="preview-stage"><button disabled={disabled} className={`button demo-${variant} size-${size.toLowerCase()}`}>{label || "Button"}</button></div>
      <pre className="code-preview">{`<Button variant="${variant}" size="${size.toLowerCase()}"${disabled ? " disabled" : ""}>\\n  ${label || "Button"}\\n</Button>`}<button className="text-button" onClick={() => { navigator.clipboard?.writeText(`<Button variant="${variant}" size="${size.toLowerCase()}">${label}</Button>`); notify("Example code copied"); }}>Copy code</button></pre></div>
    </section>}

    {page === "applications" && <section className="component-grid">{applications.map(([name, status, version, owner]) => <article className="component-card" key={name}><span className={`pill ${status === "Degraded" ? "warn" : ""}`}>{status}</span><h2>{name}</h2><p className="muted">Version {version}</p><p className="muted">Owner: {owner}</p><button className="button secondary" onClick={() => notify(`${name} selected`)}>View application</button></article>)}</section>}

    {page === "architecture" && <><section className="architecture-flow"><div className="architecture-box"><strong>Host shell</strong><span>Authentication · Routing · Shared runtime · Design tokens</span></div><div className="architecture-connector">↓</div><div className="architecture-remotes">{["Design System", "Analytics", "Admin Console"].map(name => <div className="architecture-box" key={name}><strong>{name}</strong><span>Remote application</span></div>)}</div></section><section className="panel"><h2>How it works</h2><p className="muted readable">A host application can own shared concerns such as routing and authentication. Separately deployed remote applications can be loaded into the host at runtime. This page is a conceptual illustration, not a configured Module Federation build.</p></section></>}

    {page === "deployments" && <><section className="panel"><DataTable headers={["Deployment", "Application", "Version", "Environment", "Status"]} rows={deploys.map(row => [...row, <span className={`pill ${row[4] === "Failed" ? "warn" : ""}`}>{row[4]}</span>].slice(0,5))} /></section>
      {showDeploy && <div className="modal-backdrop"><form className="modal-card" onSubmit={e => { e.preventDefault(); setDeploys(rows => [[`dpl_${Date.now().toString().slice(-5)}`, deployName, version, environment, "In progress"], ...rows]); setShowDeploy(false); notify("Demo deployment added"); }}><h2>Deploy remote</h2><label>Micro-frontend<select className="control" value={deployName} onChange={e => setDeployName(e.target.value)}>{["Design System", "Analytics", "Admin Console", "Documentation"].map(x => <option key={x}>{x}</option>)}</select></label><label>Environment<select className="control" value={environment} onChange={e => setEnvironment(e.target.value)}><option>Production</option><option>Staging</option><option>Preview</option></select></label><label>Version<input className="control" value={version} onChange={e => setVersion(e.target.value)} required /></label><div className="modal-actions"><button type="button" className="button secondary" onClick={() => setShowDeploy(false)}>Cancel</button><button className="button">Confirm deployment</button></div></form></div>}</>}

    {page === "accessibility" && <><section className="stats-grid">{[["Overall score","98%"],["Keyboard navigation","100%"],["Screen reader","98%"],["Color contrast","97%"]].map(([a,b]) => <div className="stat-card" key={a}><div className="muted">{a}</div><div className="stat-value">{b}</div></div>)}</section><section className="panel"><div className="panel-heading"><h2>Recent audits</h2><button className="button secondary" disabled={auditing} onClick={() => { setAuditing(true); window.setTimeout(() => { setAuditing(false); setAuditRun(true); notify("Demo audit complete"); }, 900); }}>{auditing ? "Running…" : "Run accessibility audit"}</button></div><DataTable headers={["Component","Result","Score"]} rows={[["Modal","PASS","100%"],["Combobox","PASS","96%"],["Tabs","PASS","99%"],["Tooltip","PASS","97%"],["Data Grid",auditRun ? "PASS" : "WARN",auditRun ? "96%" : "94%"],["Date Picker","WARN","89%"]]} /></section></>}

    {page === "packages" && <section className="component-grid">{packages.map(([name, version, downloads, size]) => <article className="component-card" key={name}><span className="pill">v{version}</span><h2>{name}</h2><p className="muted">Downloads: {downloads}</p><p className="muted">Bundle size: {size}</p><button className="button secondary" onClick={() => notify(`${name} package selected`)}>View package</button></article>)}</section>}

    {page === "changelog" && <section className="component-grid">{[["3.4.0",["New DataGrid component","Improved Combobox accessibility","New dark theme tokens"]],["3.3.2",["Table row selection API","Select menu fixes"]],["3.3.1",["Button focus ring improvement"]],["3.2.0",["Drawer component","Focus-trap hook"]]].map(([version, changes]) => <article className="component-card" key={version}><span className="pill">Release</span><h2>v{version}</h2><ul className="check-list">{changes.map(change => <li key={change}>{change}</li>)}</ul></article>)}</section>}

    {page === "team" && <><form className="toolbar team-form" onSubmit={e => { e.preventDefault(); const name = newMember.trim(); if (!name) { notify("Please enter a member name"); return; } if (members.some(member => member[0].toLowerCase() === name.toLowerCase())) { notify("A team member with that name already exists"); return; } setMembers(rows => [...rows, [name, "New Team", "Developer"]]); setNewMember(""); notify(`${name} added to the team`); }}><input className="control" placeholder="New member name" aria-label="New member name" value={newMember} onChange={e => setNewMember(e.target.value)} required /><button className="button" type="submit">＋ Add member</button></form><section className="panel"><DataTable headers={["Name","Team","Role","Action"]} rows={members.map((member, index) => [...member, <button className="text-button danger-text" key={`remove-${member[0]}`} onClick={() => { setMembers(rows => rows.filter((_, rowIndex) => rowIndex !== index)); notify(`${member[0]} removed`); }}>Remove</button>])} /></section><p className="muted team-hint">New members default to New Team / Developer. Changes are stored in React state and reset when the page reloads.</p></>}

    {page === "activity" && <><div className="toolbar"><input className="control search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter activity…" /></div><section className="panel activity-list">{filteredActivity.map(([text, time]) => <div className="activity-row" key={text}><span className="status-dot" /><div>{text}<small>{time}</small></div></div>)}{filteredActivity.length === 0 && <p className="muted">No matching activity.</p>}</section></>}

    {toast && <div className="toast-message" role="status">{toast}</div>}
  </>;
}
