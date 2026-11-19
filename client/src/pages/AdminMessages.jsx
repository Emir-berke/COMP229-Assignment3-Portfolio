
import { useEffect, useState } from "react";
import { apiRequest, isAdmin } from "../api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const admin = isAdmin();

  async function loadMessages() {
    try {
      setError("");

      const data = await apiRequest("/api/contacts");
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (admin) {
      loadMessages();
    } else {
      setLoading(false);
    }
  }, [admin]);

  function handleEdit(item) {
    setEditingId(item._id);
    setError("");
    setSuccess("");

    setForm({
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      email: item.email || "",
      phone: item.phone || "",
      message: item.message || "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleCancel() {
    setEditingId(null);
    setError("");
  }

  async function handleUpdate(event) {
    event.preventDefault();

    if (!editingId) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await apiRequest(`/api/contacts/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      setEditingId(null);
      setSuccess("Message updated successfully!");

      await loadMessages();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await apiRequest(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (editingId === id) {
        setEditingId(null);
      }

      setSuccess("Message deleted successfully!");

      await loadMessages();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!admin) {
    return (
      <main>
        <h1>Access Denied</h1>
        <p>Only administrators can view contact messages.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Contact Messages</h1>
      <p>Messages submitted through your portfolio.</p>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {success && (
        <p role="status" style={{ color: "green" }}>
          {success}
        </p>
      )}

      {loading && <p>Loading messages...</p>}

      {!loading && messages.length === 0 && (
        <p>No messages have been received yet.</p>
      )}

      {messages.map((item) => (
        <section className="project-card" key={item._id}>
          <div className="project-details">
            {editingId === item._id ? (
              <>
                <h2>Edit Contact Message</h2>

                <form onSubmit={handleUpdate}>
                  <label>First Name</label>
                  <input
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                  />

                  <label>Last Name</label>
                  <input
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                  />

                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <label>Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />

                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Update Message"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>
                  {item.firstname} {item.lastname}
                </h2>

                <p>
                  <strong>Email:</strong> {item.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {item.phone || "Not provided"}
                </p>

                <p>
                  <strong>Message:</strong>{" "}
                  {item.message || "No message"}
                </p>

                <p>
                  <strong>Received:</strong>{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Unknown"}
                </p>

                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                >
                  Edit Message
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete Message
                </button>
              </>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}

export default AdminMessages;
