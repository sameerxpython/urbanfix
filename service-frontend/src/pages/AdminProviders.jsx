import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getProviders, approveProvider, deleteProvider } from '../api/admin';
import Navbar from '../components/Navbar';
import AdminNav from '../components/AdminNav';

export default function AdminProviders() {
    const { user, token } = useContext(AuthContext);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && token && user.role === 'admin') {
            fetchProviders();
        }
    }, [user, token]);

    const fetchProviders = () => {
        setLoading(true);
        getProviders(token)
            .then(res => setProviders(res.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleApprove = async (id) => {
        if (!window.confirm("Approve this provider?")) return;
        try {
            await approveProvider(id, token);
            fetchProviders();
        } catch (err) {
            alert(err.message || "Failed to approve");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this provider?")) return;
        try {
            await deleteProvider(id, token);
            fetchProviders();
        } catch (err) {
            alert(err.message || "Failed to delete");
        }
    };

    if (!user || user.role !== 'admin') return <div className="p-8">Access Denied</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <AdminNav />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Providers</h1>

                {loading ? (
                    <p>Loading providers...</p>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Role</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {providers.map(p => (
                                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-900 font-medium">{p.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{p.email}</td>
                                        <td className="px-6 py-4 text-gray-500 capitalize">{p.role}</td>
                                        <td className="px-6 py-4">
                                            {p.isApproved ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            {!p.isApproved && (
                                                <button
                                                    onClick={() => handleApprove(p._id)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {providers.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No providers found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
