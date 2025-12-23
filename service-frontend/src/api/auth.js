import { apiFetch } from "./client";

export function loginUser(credentials) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export function registerUser(data) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: data,
  });
}
