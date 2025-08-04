import React from 'react';
import { Link } from 'react-router-dom';
import BagIcon from './common/BagIcon.tsx';

const Footer: React.FC = () => {
    const logoUrl = 'https://i.postimg.cc/FFwQQHxC/jondulogo.png';
    return (
        <footer className="relative bg-neutral-900 text-neutral-300 py-12 px-6 md:px-12 lg:px-8 dark-background-section">
            <style>
                {`
                    .footer-logo {
                        filter: brightness(0) invert(1);
                    }
                `}
            </style>
            <BagIcon theme="dark" positionClasses="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
            <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 z-10">
                <div>
                    <img src={logoUrl} alt="Jondu Global Services Logo" className="footer-logo h-24 w-auto mb-4" />
                    <p className="text-sm">Your trusted partner in plastic bag manufacturing, committed to quality and innovation.</p>
                </div>
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-[#748873] transition duration-300">Home</Link></li>
                        <li><Link to="/products" className="hover:text-[#748873] transition duration-300">Products</Link></li>
                        <li><Link to="/custom-order" className="hover:text-[#748873] transition duration-300">Custom Orders</Link></li>
                        <li><Link to="/inquiries" className="hover:text-[#748873] transition duration-300">Inquiries</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link to="/faq" className="hover:text-[#748873] transition duration-300">FAQ</Link></li>
                        <li><Link to="/inquiries" className="hover:text-[#748873] transition duration-300">Contact Us</Link></li>
                        <li><Link to="/privacy" className="hover:text-[#748873] transition duration-300">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-[#748873] transition duration-300">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
                    <p className="text-sm">OPPOSITE PERM SITE, ALONG UNIVERSITY/NKPOVURU ROAD, EZZANGBO, EBONYI STATE, NIGERIA</p>
                    <p className="text-sm">onazejoesy342@gmail.com</p>
                    <p className="text-sm">+234 8146632632</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-neutral-400 hover:text-[#748873] transition duration-300"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-neutral-400 hover:text-[#748873] transition duration-300"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-neutral-400 hover:text-[#748873] transition duration-300"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="text-neutral-400 hover:text-[#748873] transition duration-300"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="relative text-center text-neutral-500 text-sm mt-12 border-t border-neutral-700 pt-8 z-10">
                &copy; 2024 Jondu Global Services. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;