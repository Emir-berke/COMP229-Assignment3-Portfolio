
const API_URL = "http://localhost:5000";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.body
      ? { "Content-Type": "application/json" }
      : {}),
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

// Register a regular user
export function signup(name, email, password) {
  return apiRequest("/api/users", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

// Sign in and save login information
export async function signin(email, password) {
  const data = await apiRequest("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  window.dispatchEvent(new Event("authChanged"));

  return data;
}

// Sign out and clear login information
export async function signout() {
  try {
    await apiRequest("/auth/signout", {
      method: "GET",
    });
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
  }
}

// Get the currently signed-in user
export function getCurrentUser() {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

// Check whether the user is an Admin
export function isAdmin() {
  return getCurrentUser()?.role === "admin";
}
