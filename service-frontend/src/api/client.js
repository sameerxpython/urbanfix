export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiFetch(path, options = {}) {
  const { method = "GET", body, token } = options;

  const headers = {};
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    throw new Error(res.statusText || "Something went wrong");
  }

  if (!res.ok) throw new Error(data.message || "API Error");

  return data;
}
