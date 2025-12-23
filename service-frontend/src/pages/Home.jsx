import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../api/services";

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getServices()
      .then((res) => {
        setServices(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Services</h2>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && filteredServices.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? `No services found matching "${searchTerm}"` : "No services available at the moment."}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
