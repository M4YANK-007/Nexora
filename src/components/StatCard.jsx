export default function StatCard({ label, value, note }) {
  return (
    <article className="stat-card">
      <div className="muted">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </article>
  );
}
