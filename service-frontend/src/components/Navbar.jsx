import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-grey-500 tracking-tight">
        Urbanfix
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {user.role === 'admin' ? (
              <Link to="/admin" className="text-gray-800 font-medium hidden md:inline mr-2 hover:text-blue-600 transition-colors">Hello, {user.name}</Link>
            ) : user.role === 'provider' ? (
              <Link to="/provider-dashboard" className="text-gray-800 font-medium hidden md:inline mr-2 hover:text-blue-600 transition-colors">Hello, {user.name}</Link>
            ) : (
              <span className="text-gray-800 font-medium hidden md:inline mr-2">Hello, {user.name}</span>
            )}
            {user.role === 'admin' ? (
              null
            ) : user.role === 'provider' ? (
              null
            ) : (
              <Link
                to="/my-bookings"
                className="text-gray-600 hover:text-black transition-colors relative group"
                title="My Bookings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
