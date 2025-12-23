import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getServices, createService } from '../api/services';

export default function ProviderServices() {
    const { user, token } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        durationMinutes: '60',
        category: 'Plumbing'
    });

    useEffect(() => {
        if (user) fetchServices();
    }, [user]);

    const fetchServices = () => {
        setLoading(true);
        getServices(user.id)
            .then(res => setServices(res.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createService({
                ...formData,
                price: Number(formData.price),
                durationMinutes: Number(formData.durationMinutes)
            }, token);
            setShowForm(false);
            setFormData({
                title: '',
                description: '',
                price: '',
                durationMinutes: '60',
                category: 'Plumbing'
            });
            fetchServices();
        } catch (err) {
            alert(err.message || 'Failed to create service');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Services</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    {showForm ? 'Cancel' : 'New Service'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                            <input
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option>Plumbing</option>
                                <option>Electrical</option>
                                <option>Cleaning</option>
                                <option>Carpentry</option>
                                <option>Painting</option>
                                <option>Gardening</option>
                                <option>Moving</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mins)</label>
                            <input
                                type="number"
                                value={formData.durationMinutes}
                                onChange={e => setFormData({ ...formData, durationMinutes: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                rows="3"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700">
                        Create Service
                    </button>
                </form>
            )}

            {loading ? (
                <p>Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-gray-500">You haven't created any services yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map(service => (
                        <div key={service._id} className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900">{service.title}</h3>
                                <span className="text-blue-600 font-bold">₹{service.price}</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1 mb-3">{service.description}</p>
                            <div className="flex items-center text-xs text-gray-400">
                                <span className="bg-gray-100 px-2 py-1 rounded mr-2">{service.category}</span>
                                <span>{service.durationMinutes} mins</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
