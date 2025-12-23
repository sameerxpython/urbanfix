
export default function ProviderCard({ provider, onSelect }) {
  const name = provider.businessName || provider.userId?.name || provider.name;
  const owner = provider.userId?.name || "Unknown";
  const city = provider.location?.city || "";
  const bio = provider.bio || "No description available.";
  const price = provider.basePrice ?? provider.rate ?? "—";
  const rating = provider.ratingAvg ?? 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
        <span className="text-white text-4xl font-bold opacity-50">
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            ₹{price}/hr
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {owner} {city && `• ${city}`}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{bio}</p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
          </div>
          <button
            onClick={() => onSelect(provider)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-none"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
