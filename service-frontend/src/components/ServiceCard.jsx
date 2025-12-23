import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
                        {service.category}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                        ₹{service.price}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {service.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                    {service.description}
                </p>

                {service.providerId && (
                    <div className="flex items-center text-sm text-gray-500 mb-4 pt-4 border-t border-gray-50">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium truncate">
                            {service.providerId.businessName || service.providerId.name || 'Provider'}
                        </span>
                    </div>
                )}

                <Link
                    to={`/services/${service._id}`}
                    className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-auto"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
