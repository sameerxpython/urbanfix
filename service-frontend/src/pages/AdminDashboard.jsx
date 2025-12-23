import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getAdminStats } from '../api/admin';
import Navbar from '../components/Navbar';
import AdminNav from '../components/AdminNav';

export default function AdminDashboard() {
    const { user, token } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && token && user.role === 'admin') {
            getAdminStats(token)
                .then(res => setStats(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user, token]);

    if (!user || user.role !== 'admin') return <div className="p-8">Access Denied</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <AdminNav />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {loading ? (
                    <p>Loading stats...</p>
                ) : stats ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard title="Total Users" value={stats.totalUsers} color="bg-blue-500" />
                        <StatCard title="Total Providers" value={stats.totalProviders} color="bg-purple-500" />
                        <StatCard title="Total Services" value={stats.totalServices} color="bg-green-500" />
                        <StatCard title="Total Bookings" value={stats.totalBookings} color="bg-orange-500" />
                    </div>
                ) : (
                    <p>Failed to load stats.</p>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white mr-4 shadow-md`}>
                <span className="text-xl font-bold">{title[0]}</span>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
