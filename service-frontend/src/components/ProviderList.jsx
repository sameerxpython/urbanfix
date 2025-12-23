import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProviderCard from "./ProviderCard";
import { getProviders } from "../api/providers";

export default function ProviderList({ onSelect }) {
  const { token } = useContext(AuthContext);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProviders(token)
      .then((list) => {
        if (!mounted) return;
        setProviders(list);
      })
      .catch((err) => {
        console.error("Providers fetch error:", err);
        if (mounted) setError(err.message || "Failed to fetch providers");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [token]);

  if (loading) return <p>Loading providers...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!providers.length) return <p>No providers found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {providers.map((p) => (
        <ProviderCard
          key={p._id || p.id}
          provider={p}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
