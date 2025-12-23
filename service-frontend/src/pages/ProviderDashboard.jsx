import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import ProviderServices from '../components/ProviderServices';
import ProviderBookings from '../components/ProviderBookings';

export default function ProviderDashboard() {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('services');

    if (!user || user.role !== 'provider') {
        return <div className="p-8 text-center">Access Denied. Providers only.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>

                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
                    <div className="flex border-b border-gray-100">
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'services'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            My Services
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'bookings'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            My Bookings
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'services' ? <ProviderServices /> : <ProviderBookings />}
                    </div>
                </div>
            </div>
        </div>
    );
}
