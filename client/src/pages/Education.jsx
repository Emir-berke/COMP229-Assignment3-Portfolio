
import { useEffect, useState } from "react";
import { apiRequest, isAdmin } from "../api";

const emptyForm = {
  title: "",
  firstname: "",
  lastname: "",
  email: "",
  completion: "",
  description: "",
};

function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const admin = isAdmin();

  async function loadQualifications() {
    try {
      setError("");
      const data = await apiRequest("/api/qualifications");
      setQualifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQualifications();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId) {
        await apiRequest(`/api/qualifications/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await apiRequest("/api/qualifications", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadQualifications();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    setEditingId(item._id);

    setForm({
      title: item.title,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      completion: item.completion
        ? item.completion.slice(0, 10)
        : "",
      description: item.description,
    });

    window.scrollTo(0, 0);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this education record?")) {
      return;
    }

    try {
      setError("");

      await apiRequest(`/api/qualifications/${id}`, {
        method: "DELETE",
      });

      await loadQualifications();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>My Education</h1>

      {error && <p role="alert">{error}</p>}

      {admin && (
        <section>
          <h2>
            {editingId
              ? "Edit Education"
              : "Add New Education"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Education title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              name="firstname"
              placeholder="First name"
              value={form.firstname}
              onChange={handleChange}
              required
            />

            <input
              name="lastname"
              placeholder="Last name"
              value={form.lastname}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>
              Completion Date
              <input
                name="completion"
                type="date"
                value={form.completion}
                onChange={handleChange}
                required
              />
            </label>

            <textarea
              name="description"
              placeholder="Education description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
            />

            <button type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Education"
                  : "Add Education"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>
      )}

      <section>
        <h2>
          Software Engineering Technology – Artificial Intelligence
        </h2>
        <p>
          <strong>Centennial College</strong> · Scarborough, Ontario
        </p>
        <p>Advanced Diploma · Expected December 2028</p>
        <p>Status: In progress</p>

        <h3>Relevant coursework</h3>
        <ul>
          <li>Introduction to Artificial Intelligence</li>
          <li>Database Concepts</li>
          <li>Client-Side Web Development</li>
          <li>Object-Oriented Programming</li>
          <li>Software Requirements Engineering</li>
          <li>Statistics</li>
        </ul>
      </section>

      <section>
        <h2>English for Academic Purposes</h2>
        <p>
          <strong>George Brown College</strong> · Toronto, Ontario
        </p>
        <p>Certificate · December 2022</p>
        <p>Status: Completed</p>
      </section>

      <h2>Additional Education Records</h2>

      {loading && <p>Loading education...</p>}

      {!loading && qualifications.length === 0 && (
        <p>No additional education records yet.</p>
      )}

      {qualifications.map((item) => (
        <section key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>

          <p>
            <strong>Student:</strong>{" "}
            {item.firstname} {item.lastname}
          </p>

          <p>
            <strong>Completion:</strong>{" "}
            {item.completion?.slice(0, 10)}
          </p>

          {admin && (
            <div>
              <button onClick={() => handleEdit(item)}>
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          )}
        </section>
      ))}
    </main>
  );
}

export default Education;
