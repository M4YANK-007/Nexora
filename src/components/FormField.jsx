export default function FormField({ label, name, value, onChange, error, type = "text", placeholder, as = "input", options = [] }) {
  const common = {
    id: name,
    name,
    value,
    onChange,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${name}-error` : undefined,
    placeholder
  };

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {as === "select" ? (
        <select {...common}>
          <option value="">Choose an option</option>
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : as === "textarea" ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type={type} />
      )}
      {error && <small className="field-error" id={`${name}-error`}>{error}</small>}
    </div>
  );
}
