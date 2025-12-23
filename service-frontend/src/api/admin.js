import { apiFetch } from "./client";

export function getAdminStats(token) {
    return apiFetch("/admin/stats", {
        method: "GET",
        token,
    });
}

export function getProviders(token) {
    return apiFetch("/admin/providers", {
        method: "GET",
        token,
    });
}

export function approveProvider(id, token) {
    return apiFetch(`/admin/providers/${id}/approve`, {
        method: "PATCH",
        token,
    });
}

export function deleteProvider(id, token) {
    return apiFetch(`/admin/providers/${id}`, {
        method: "DELETE",
        token,
    });
}
