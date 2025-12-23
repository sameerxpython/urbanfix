import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { createBooking } from "../api/bookings";
import { getServices } from "../api/services";

export default function BookingForm({ provider, onClose }) {
  const { token } = useContext(AuthContext);

  if (!provider) return null;

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (provider._id) {
      getServices(provider._id)
        .then(data => setServices(data))
        .catch(err => console.error("Failed to fetch services", err));
    }
  }, [provider._id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!selectedService) {
      setError("Please select a service");
      setLoading(false);
      return;
    }

    const timeSlot = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      await createBooking(
        {
          providerId: provider._id,
          serviceId: selectedService,
          date,
          timeSlot,
          address,
        },
        token
      );
      alert("Booking created successfully!");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Service
        </label>
        <select
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">-- Choose a Service --</option>
          {services.map(s => (
            <option key={s._id} value={s._id}>
              {s.title} - ₹{s.price}
            </option>
          ))}
        </select>
        {services.length === 0 && <p className="text-xs text-gray-500 mt-1">No services found for this provider.</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date & Time
        </label>
        <input
          type="datetime-local"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Address
        </label>
        <input
          type="text"
          required
          placeholder="123 Main St, City"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
