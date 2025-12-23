import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";
import ServiceDetails from "./pages/ServiceDetails";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProviders from "./pages/AdminProviders";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/providers" element={<AdminProviders />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
