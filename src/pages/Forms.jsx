import { useState } from "react";
import FormField from "../components/FormField.jsx";

const initialValues = { name: "", email: "", topic: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.topic) errors.topic = "Choose a topic.";
  if (values.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export default function Forms() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: "" }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setValues(initialValues);
    }
  }

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">FORMS</p><h1>Contact form</h1><p className="muted">Reusable fields, controlled React inputs, and client-side validation.</p></div></div>
      <section className="form-layout">
        <form className="panel form-panel" onSubmit={handleSubmit} noValidate>
          <FormField label="Full name" name="name" value={values.name} onChange={handleChange} error={errors.name} placeholder="Your name" />
          <FormField label="Email address" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
          <FormField label="Topic" name="topic" as="select" value={values.topic} onChange={handleChange} error={errors.topic} options={[
            { value: "project", label: "Project enquiry" },
            { value: "support", label: "Technical support" },
            { value: "feedback", label: "Feedback" }
          ]} />
          <FormField label="Message" name="message" as="textarea" value={values.message} onChange={handleChange} error={errors.message} placeholder="Write at least 10 characters…" />
          <button className="button" type="submit">Submit form</button>
          {submitted && <div className="notice success" role="status">Form submitted successfully. This demo does not send data to a server.</div>}
        </form>
        <aside className="panel">
          <h2>What this demonstrates</h2>
          <ul className="check-list">
            <li>Controlled inputs with React state</li>
            <li>Reusable FormField component</li>
            <li>Required name and topic validation</li>
            <li>Email format validation</li>
            <li>Minimum message length</li>
            <li>Inline error messages and submit feedback</li>
          </ul>
        </aside>
      </section>
    </>
  );
}
