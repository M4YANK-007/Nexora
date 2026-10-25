const projects = [
  { title: "NEXORA UI Infrastructure", description: "A dashboard concept for design-system health, reusable UI components, and release monitoring.", tags: ["React", "CSS", "Router"] },
  { title: "Shopping Cart", description: "A small cart demo showing shared state, quantity updates, and calculated totals.", tags: ["Zustand", "State"] },
  { title: "Validated Contact Form", description: "Reusable form fields with inline validation and success feedback.", tags: ["Forms", "Validation"] }
];

export default function Portfolio() {
  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">PORTFOLIO</p><h1>Projects</h1><p className="muted">Example portfolio page connected through React Router.</p></div></div>
      <section className="portfolio-hero panel">
        <p className="eyebrow">FRONT-END DEVELOPER</p>
        <h2>Building useful, accessible web interfaces.</h2>
        <p className="muted">This page demonstrates a separate route and reusable project cards.</p>
      </section>
      <section className="component-grid">
        {projects.map(project => (
          <article className="component-card" key={project.title}>
            <h2>{project.title}</h2>
            <p className="muted">{project.description}</p>
            <div className="tag-row">{project.tags.map(tag => <span className="pill" key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </section>
    </>
  );
}
