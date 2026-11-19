
import { useState } from "react";
import { apiRequest } from "../api";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiRequest("/api/contacts", {
        method: "POST",
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      setSuccess("Your message was submitted successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Contact Me</h1>
      <p>Interested in my work? Get in touch.</p>

      <section>
        <h2>Contact Information</h2>
        <p>Email: emrberkepeker@gmail.com</p>
      </section>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Contact number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        {success && (
          <p role="status" style={{ color: "green" }}>
            {success}
          </p>
        )}

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <p>
          Your message will be saved securely in the
          portfolio database. This form does not send email.
        </p>

        <button
          className="button-link"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit message"}
        </button>
      </form>
    </main>
  );
}

export default Contact;
