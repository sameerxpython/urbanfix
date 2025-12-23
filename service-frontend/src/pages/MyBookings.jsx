import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getBookings, cancelBooking } from '../api/bookings';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function MyBookings() {
    const { user, token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && token) {
            fetchBookings();
        }
    }, [user, token]);

    const fetchBookings = () => {
        setLoading(true);
        getBookings(token, user.role, user.id)
            .then(res => {
                setBookings(res.data || []);
            })
            .catch(err => {
                console.error("Fetch bookings error:", err);
                setError("Failed to load bookings");
            })
            .finally(() => setLoading(false));
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await cancelBooking(id, token);
            fetchBookings();
        } catch (err) {
            alert(err.message || "Failed to cancel booking");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'accepted': return 'bg-blue-100 text-blue-800';
            case 'In_progress': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!user) return <div className="p-8">Please login to view bookings.</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

                {loading && <div className="text-center py-8">Loading bookings...</div>}
                {error && <div className="text-red-600 mb-4">{error}</div>}

                {!loading && !error && bookings.length === 0 && (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <p className="text-gray-500 mb-4">You haven't booked any services yet.</p>
                        <Link to="/" className="text-blue-600 font-medium hover:underline">Browse Services</Link>
                    </div>
                )}

                <div className="space-y-4">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {booking.serviceId?.title || 'Unknown Service'}
                                </h3>
                                <p className="text-gray-500 text-sm mb-2">
                                    Provider: {booking.providerId?.businessName || booking.providerId?.name || 'Unknown'}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(booking.date).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {booking.timeSlot}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                </span>

                                {['pending', 'accepted'].includes(booking.status) && (
                                    <button
                                        onClick={() => handleCancel(booking._id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
