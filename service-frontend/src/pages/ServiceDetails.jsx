import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServices } from '../api/services';
import { createBooking } from '../api/bookings';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { apiFetch } from '../api/client';

export default function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [address, setAddress] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        apiFetch(`/services/${id}`)
            .then(res => setService(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleBook = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        try {
            await createBooking({
                serviceId: service._id,
                providerId: service.providerId._id || service.providerId,
                date,
                timeSlot,
                address
            }, token);
            alert('Booking successful!');
            navigate('/my-bookings');
        } catch (err) {
            alert(err.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    if (!service) return <div className="min-h-screen flex items-center justify-center">Service not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full mb-4">
                                    {service.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
                                <div className="flex items-center text-gray-500 mb-6">
                                    <span className="mr-4">Duration: {service.durationMinutes || 60} mins</span>
                                    <span>Provider: {service.providerId?.businessName || service.providerId?.name || 'Unknown'}</span>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-600">
                                ₹{service.price}
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {service.description}
                        </p>

                        <hr className="border-gray-100 my-8" />

                        {user?.role === 'user' ? (
                            <form onSubmit={handleBook} className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-900">Book this Service</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={e => setDate(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                                        <select
                                            value={timeSlot}
                                            onChange={e => setTimeSlot(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        >
                                            <option value="">Select a time</option>
                                            <option value="09:00">09:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="12:00">12:00 PM</option>
                                            <option value="13:00">01:00 PM</option>
                                            <option value="14:00">02:00 PM</option>
                                            <option value="15:00">03:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                            <option value="17:00">05:00 PM</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            placeholder="Your service address"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={bookingLoading}
                                    className={`w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 transition-all ${bookingLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </form>
                        ) : user?.role === 'provider' ? (
                            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                                Providers cannot book services. Please login as a user to book.
                            </div>
                        ) : (
                            <div className="bg-blue-50 text-blue-800 p-6 rounded-lg text-center">
                                <p className="mb-4 text-lg">Please login to book this service</p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Login to Book
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
