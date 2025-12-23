import { Link } from 'react-router-dom';

export default function Footer() {
    const footerFont = {
        fontFamily: 'apple-system, BlinkMacSystemFont, Segoe UI, Roboto, "Helvetica Neue", Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif'
    };

    return (
        <footer className="bg-gray-100 pt-16 pb-8 border-t border-gray-200 mt-auto" style={footerFont}>
            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    <div>
                        <Link to="/" className="text-2xl font-bold text-gray-800 tracking-tight mb-6 block">
                            Urbanfix
                        </Link>
                        <h3 className="font-bold text-gray-800 mb-4 text-[20px]">Company</h3>
                        <ul className="space-y-2 text-[14px] text-gray-600">
                            <li><Link to="#" className="hover:text-black transition-colors">About us</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Investor Relations</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Terms & conditions</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Privacy policy</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Anti-discrimination policy</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">ESG Impact</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-4 mt-0 md:mt-14 text-[20px]">For customers</h3>
                        <ul className="space-y-2 text-[14px] text-gray-600">
                            <li><Link to="#" className="hover:text-black transition-colors">UC reviews</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Categories near you</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Contact us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-4 mt-0 md:mt-14 text-[20px]">For professionals</h3>
                        <ul className="space-y-2 text-[14px] text-gray-600">
                            <li><Link to="#" className="hover:text-black transition-colors">Register as a professional</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-4 mt-0 md:mt-14 text-[20px]">Social links</h3>
                        <ul className="space-y-2 text-[14px] text-gray-600">
                            <li><a href="#" className="hover:text-black transition-colors flex items-center gap-2">Instagram</a></li>
                            <li><a href="#" className="hover:text-black transition-colors flex items-center gap-2">Twitter</a></li>
                            <li><a href="#" className="hover:text-black transition-colors flex items-center gap-2">Reddit</a></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© 2025 Urbanfix Technologies Pvt. Ltd.</p>
                </div>
            </div>
        </footer>
    );
}
