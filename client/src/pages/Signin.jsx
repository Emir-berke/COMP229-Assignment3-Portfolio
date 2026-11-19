
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { signin } from "../api";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signin(email, password);

      alert("Signed in successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Sign In</h1>
      <p>Sign in to your portfolio account.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button
          type="submit"
          className="button-link"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </main>
  );
}

export default Signin;
