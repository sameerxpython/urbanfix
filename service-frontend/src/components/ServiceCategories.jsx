import React from 'react';

const categories = [
    {
        id: 1,
        name: 'Cleaning',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        color: 'bg-blue-100 text-blue-600',
    },
    {
        id: 2,
        name: 'Plumbing',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        color: 'bg-green-100 text-green-600',
    },
    {
        id: 3,
        name: 'Electrical',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        color: 'bg-yellow-100 text-yellow-600',
    },
    {
        id: 4,
        name: 'Moving',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        ),
        color: 'bg-purple-100 text-purple-600',
    },
];

export default function ServiceCategories() {
    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center border border-gray-100">
                            <div className={`p-4 rounded-full mb-4 ${cat.color}`}>
                                {cat.icon}
                            </div>
                            <h3 className="font-semibold text-lg text-gray-700">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
