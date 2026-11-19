
import { useEffect, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router";

import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminMessages from "./pages/AdminMessages";

import {
  getCurrentUser,
  signout,
} from "./api";

function PortfolioApp() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getCurrentUser());
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    function updateUser() {
      setUser(getCurrentUser());
    }

    window.addEventListener("authChanged", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("authChanged", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  async function handleSignout() {
    setSigningOut(true);

    try {
      await signout();
    } catch (error) {
      console.error("Signout request failed:", error);
    } finally {
      setSigningOut(false);
      setUser(null);
      navigate("/");
    }
  }

  const admin = user?.role === "admin";

  return (
    <>
      <nav>
        <Link
          to="/"
          className="logo"
          aria-label="Emir Berke home"
        >
          EBP
        </Link>

        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About Me</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/education">Education</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact Me</NavLink>

        {!user && (
          <NavLink to="/signin">Sign In</NavLink>
        )}

        {admin && (
          <NavLink to="/admin/messages">
            Admin Messages
          </NavLink>
        )}

        {user && (
          <button
            type="button"
            onClick={handleSignout}
            disabled={signingOut}
          >
            {signingOut ? "Signing Out..." : "Sign Out"}
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin/messages"
          element={<AdminMessages />}
        />
      </Routes>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Emir Berke Peker</p>

        <a
          href="https://github.com/Emir-berke"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <PortfolioApp />
    </HashRouter>
  );
}

export default App;
