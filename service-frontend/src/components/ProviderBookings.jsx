import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getBookings, updateBookingStatus } from '../api/bookings';

export default function ProviderBookings() {
    const { user, token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) fetchBookings();
    }, [user]);

    const fetchBookings = () => {
        setLoading(true);
        getBookings(token, 'provider', user.id)
            .then(res => setBookings(res.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateBookingStatus(id, status, token);
            fetchBookings();
        } catch (err) {
            alert(err.message || 'Failed to update status');
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

    if (loading) return <p>Loading bookings...</p>;
    if (bookings.length === 0) return <p className="text-gray-500">No bookings yet.</p>;

    return (
        <div className="space-y-4">
            {bookings.map(booking => (
                <div key={booking._id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{booking.serviceId?.title}</h3>
                            <p className="text-sm text-gray-500">Client: {booking.userId?.name || 'Unknown'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mt-2 md:mt-0 ${getStatusColor(booking.status)}`}>
                            {booking.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {booking.timeSlot}
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {booking.address}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {booking.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                >
                                    Decline
                                </button>
                            </>
                        )}
                        {booking.status === 'accepted' && (
                            <>
                                <button
                                    onClick={() => handleStatusUpdate(booking._id, 'In_progress')}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                                >
                                    Start Job
                                </button>
                            </>
                        )}
                        {booking.status === 'In_progress' && (
                            <button
                                onClick={() => handleStatusUpdate(booking._id, 'completed')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                                Mark Completed
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
