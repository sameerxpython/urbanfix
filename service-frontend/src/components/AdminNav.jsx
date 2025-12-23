import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminNav() {
    return (
        <div className="bg-white border-b border-gray-200 mb-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex space-x-8">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `py-4 px-1 border-b-2 font-medium text-sm transition-colors ${isActive
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/providers"
                        className={({ isActive }) =>
                            `py-4 px-1 border-b-2 font-medium text-sm transition-colors ${isActive
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        Manage Providers
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
