import { apiFetch } from "./client";

export async function getProviders(token) {
  const res = await apiFetch("/providers", { token });
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.providers)) return res.providers;
  if (Array.isArray(res.data)) return res.data;
  return [];
}
