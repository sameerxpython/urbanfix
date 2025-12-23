import { apiFetch } from "./client";

export function createBooking(data, token) {
  return apiFetch("/bookings", {
    method: "POST",
    body: data,
    token,
  });
}

export function getBookings(token, role = 'user', userId) {
  const params = new URLSearchParams();
  if (role) params.append('role', role);
  if (userId) params.append('userId', userId);

  return apiFetch(`/bookings?${params.toString()}`, {
    method: "GET",
    token,
  });
}

export function cancelBooking(id, token) {
  return apiFetch(`/bookings/${id}`, {
    method: "DELETE",
    token,
  });
}

export function updateBookingStatus(id, status, token) {
  return apiFetch(`/bookings/${id}/status`, {
    method: "PATCH",
    body: { status },
    token,
  });
}
