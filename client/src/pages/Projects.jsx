
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

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const admin = isAdmin();

  async function loadProjects() {
    try {
      setError("");
      const data = await apiRequest("/api/projects");
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
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
        await apiRequest(`/api/projects/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await apiRequest("/api/projects", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(project) {
    setEditingId(project._id);

    setForm({
      title: project.title,
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      completion: project.completion
        ? project.completion.slice(0, 10)
        : "",
      description: project.description,
    });

    window.scrollTo(0, 0);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this project?")) return;

    try {
      setError("");

      await apiRequest(`/api/projects/${id}`, {
        method: "DELETE",
      });

      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>My Projects</h1>
      <p>A selection of projects I am building as I learn.</p>

      {error && <p role="alert">{error}</p>}

      {admin && (
        <section className="project-card">
          <div className="project-details">
            <h2>
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Project title"
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
                placeholder="Project description"
                value={form.description}
                onChange={handleChange}
                required
                rows="4"
              />

              <button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Project"
                    : "Add Project"}
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
          </div>
        </section>
      )}

      {loading && <p>Loading projects...</p>}

      {!loading && projects.length === 0 && (
        <p>No projects have been added yet.</p>
      )}

      {projects.map((project) => (
        <article className="project-card" key={project._id}>
          <img
            src={`${import.meta.env.BASE_URL}portfolio-project.png`}
            alt="Portfolio project preview"
            className="project-image"
          />

          <div className="project-details">
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <p>
              <strong>Created by:</strong>{" "}
              {project.firstname} {project.lastname}
            </p>

            <p>
              <strong>Completion:</strong>{" "}
              {project.completion?.slice(0, 10)}
            </p>

            {admin && (
              <div>
                <button onClick={() => handleEdit(project)}>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </article>
      ))}
    </main>
  );
}

export default Projects;
