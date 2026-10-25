import { useState } from "react";

const components = [
  { name: "Button", category: "Actions", description: "Triggers an action." },
  { name: "Input", category: "Forms", description: "Collects a short text value." },
  { name: "Modal", category: "Overlays", description: "Displays focused content." },
  { name: "Tabs", category: "Navigation", description: "Switches between content panels." },
  { name: "Toast", category: "Feedback", description: "Shows a short status message." },
  { name: "Card", category: "Layout", description: "Groups related information." }
];

export default function Components() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const categories = ["All", ...new Set(components.map(item => item.category))];
  const filtered = components.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === "All" || item.category === category)
  );

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">DESIGN SYSTEM</p><h1>Components</h1><p className="muted">A small React component catalogue with working search and filters.</p></div></div>
      <section className="toolbar">
        <input className="control search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search components…" aria-label="Search components" />
        <select className="control" value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter category">
          {categories.map(item => <option key={item}>{item}</option>)}
        </select>
      </section>
      {message && <div className="notice">{message}</div>}
      <section className="component-grid">
        {filtered.map(item => (
          <article className="component-card" key={item.name}>
            <span className="pill">{item.category}</span>
            <h2>{item.name}</h2>
            <p className="muted">{item.description}</p>
            <button className="button secondary" onClick={() => setMessage(`${item.name} component selected.`)}>View example</button>
          </article>
        ))}
        {filtered.length === 0 && <div className="notice">No components match your search.</div>}
      </section>
    </>
  );
}
