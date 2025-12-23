import { apiFetch } from "./client";

export function getServices(providerId) {
    const query = providerId ? `?providerId=${providerId}` : "";
    return apiFetch(`/services${query}`, {
        method: "GET",
    });
}

export function createService(data, token) {
    return apiFetch("/services", {
        method: "POST",
        body: data,
        token,
    });
}
