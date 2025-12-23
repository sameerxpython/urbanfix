import iconSalon from '../assets/icon-salon-women.png';
import iconCleaning from '../assets/icon-cleaning.png';
import iconAc from '../assets/icon-ac.jpg';
import iconElectrician from '../assets/icon-electrician.png';
import iconMensSalon from '../assets/icon-mens-salon.png';
import iconWaterPurifier from '../assets/icon-water-purifier.jpg';
import heroCollage from '../assets/hero-collage.jpg';

const categories = [
    { name: "Women's Salon & Spa", icon: iconSalon },
    { name: "Men's Salon & Massage", icon: iconMensSalon },
    { name: "Cleaning", icon: iconCleaning },
    { name: "Electrician, Plumber & Carpenter", icon: iconElectrician },
    { name: "AC & Appliance Repair", icon: iconAc },
    { name: "Native Water Purifier", icon: iconWaterPurifier },
];

export default function Hero({ searchTerm, setSearchTerm, location, setLocation }) {
    return (
        <div className="bg-white py-12 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                <div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-8 leading-tight font-family: os_semibold">
                        Home services at your doorstep
                    </h1>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-6">What are you looking for?</h2>

                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation && setLocation(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                            <div className="flex-[2] relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search for 'AC service'"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {categories.map((cat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer text-center h-32"
                                >
                                    <img src={cat.icon} alt={cat.name} className="w-10 h-10 mb-3 object-contain" />
                                    <span className="text-xs md:text-sm font-medium text-gray-700 leading-tight">
                                        {cat.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <img src={heroCollage} alt="Services Collage" className="w-full h-auto object-contain rounded-2xl" />
                </div>

            </div>
        </div>
    );
}
