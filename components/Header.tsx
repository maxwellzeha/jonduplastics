import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './common/AuthContext.tsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = 'https://i.postimg.cc/FFwQQHxC/jondulogo.png';

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const navLinkItems = document.querySelectorAll('.nav-link-item');
    const logoImage = headerRef.current?.querySelector('.header-logo');
    if (!navLinkItems || navLinkItems.length === 0 || !logoImage) return;
    
    const darkSections = document.querySelectorAll('.dark-background-section');
    
    // GSAP can't directly color SVGs inside an <img> this way, but we can change opacity or use filters
    // For the text links, color change works fine.
    const defaultColor = "#333333";
    const whiteColor = "#FFFFFF";

    gsap.set(navLinkItems, { color: defaultColor });
    gsap.set(logoImage, { filter: 'brightness(1) invert(0)' }); // Default logo color

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const navbarRect = headerRef.current?.querySelector('.navbar-glass')?.getBoundingClientRect();
        if (!navbarRect) return;
        
        let isOverlappingDark = false;
        darkSections.forEach(section => {
          const sectionRect = section.getBoundingClientRect();
          if (navbarRect.bottom > sectionRect.top && navbarRect.top < sectionRect.bottom) {
            isOverlappingDark = true;
          }
        });

        gsap.to(navLinkItems, { 
          color: isOverlappingDark ? whiteColor : defaultColor, 
          duration: 0.3 
        });
         gsap.to(logoImage, { 
          filter: isOverlappingDark ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)', 
          duration: 0.3 
        });
      }
    });

    return () => {
      st.kill();
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = (
    <>
      <Link to="/" className="nav-link-item hover:text-[#748873] font-medium">Home</Link>
      <Link to="/products" className="nav-link-item hover:text-[#748873] font-medium">Products</Link>
      <Link to="/custom-order" className="nav-link-item hover:text-[#748873] font-medium">Custom Orders</Link>
      <Link to="/inquiries" className="nav-link-item hover:text-[#748873] font-medium">Inquiries</Link>
    </>
  );

  const authLinks = isAuthenticated ? (
      <>
        <button onClick={() => navigate('/dashboard')} className="nav-link-item w-full text-center px-6 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition duration-300">Dashboard</button>
        <button onClick={handleLogout} className="w-full text-center mt-2 px-6 py-2 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300">Logout</button>
      </>
    ) : (
      <>
        <button onClick={() => navigate('/login')} className="nav-link-item w-full text-center px-6 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition duration-300">Login</button>
        <button onClick={() => navigate('/signup')} className="w-full text-center mt-2 px-6 py-2 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300">Register</button>
      </>
    );

  return (
    <header id="main-navbar" className="fixed z-50" ref={headerRef}>
        <div className="navbar-glass py-3 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/">
                    <img src={logoUrl} alt="Jondu Global Services Logo" className="header-logo h-14 w-auto"/>
                </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button onClick={() => navigate('/dashboard')} className="nav-link-item px-6 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition duration-300">Dashboard</button>
                  <button onClick={handleLogout} className="px-6 py-2 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="nav-link-item px-6 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition duration-300">Login</button>
                  <button onClick={() => navigate('/signup')} className="px-6 py-2 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300">Register</button>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl nav-link-item p-2">
                    <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </button>
            </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="mx-4 mt-2 p-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-neutral-200">
                <nav className="flex flex-col items-center space-y-4 text-center">
                    {React.Children.map(navLinks.props.children, child => 
                        React.cloneElement(child, { 
                            className: 'text-neutral-700 text-lg font-semibold w-full py-2 hover:bg-neutral-100 rounded-md'
                        })
                    )}
                </nav>
                <div className="border-t border-neutral-200 mt-6 pt-6">
                    <div className="flex flex-col items-center">
                        {authLinks}
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;