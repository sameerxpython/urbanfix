import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        try {
            await register({ name, email, password, role });
            if (role === 'provider') {
                navigate('/provider-dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            setErr(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                <p className="text-gray-500 mt-2">Join Urbanfix today</p>
            </div>

            {err && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {err}
                </div>
            )}

            <div className="space-y-5">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setRole('user')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'user' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        I'm a User
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('provider')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'provider' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        I'm a Provider
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={role === 'provider' ? "Business Name" : "John Doe"}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                    />
                </div>

                <button
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </div>
        </form>
    );
}
