import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@assets/echo logo_1764343027663.png";

export default function PageNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = ['/services', '/projects-equipment', '/po-projects', '/supply-equipment'].includes(location.pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_2px_10px_rgba(255,255,255,0.1)]" style={{ backgroundColor: '#030a3a' }}>
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="Eco Engineering Logo" className="h-[120px] w-auto" />
          </Link>

          <nav className="hidden md:flex items-center">
            <ul className="flex">
              <li className="ml-8">
                <Link 
                  to="/" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${isActive('/') ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Home
                </Link>
              </li>
              <li className="ml-8">
                <Link 
                  to="/about" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${isActive('/about') ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  About Us
                </Link>
              </li>
              <li className="ml-8 relative group">
                <Link 
                  to="/services"
                  className={`flex items-center gap-1 font-medium transition-colors duration-300 hover:text-[#4CAF50] ${isServicesActive ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Services <ChevronDown className="w-4 h-4" />
                </Link>
                <div 
                  className="absolute top-full left-0 min-w-[280px] rounded shadow-[0_8px_16px_rgba(255,255,255,0.1)] py-2.5 border border-[#4CAF50] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                  style={{ backgroundColor: '#030a3a' }}
                >
                  <Link 
                    to="/services" 
                    className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a] border-b border-[#4CAF50]/30"
                  >
                    All Services Overview
                  </Link>
                  <Link 
                    to="/projects-equipment" 
                    className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                  >
                    Install & Maintenance Telecommunications Infrastructure System
                  </Link>
                  <Link 
                    to="/po-projects" 
                    className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                  >
                    Supplying Testing Analytical Instrument
                  </Link>
                  <Link 
                    to="/supply-equipment" 
                    className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                  >
                    Supply Telecommunication Equipment
                  </Link>
                </div>
              </li>
              <li className="ml-8">
                <Link 
                  to="/projects" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${isActive('/projects') ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Projects
                </Link>
              </li>
              <li className="ml-8">
                <Link 
                  to="/contact" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${isActive('/contact') ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Contact
                </Link>
              </li>
              <li className="ml-8">
                <Link 
                  to="/careers" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${isActive('/careers') ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Careers
                </Link>
              </li>
            </ul>
          </nav>

          <button 
            className="md:hidden p-2 text-white text-2xl cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-[#4CAF50]/30 pt-4">
            <Link 
              to="/" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <div>
              <button 
                className="flex items-center gap-2 py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50] w-full"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                aria-expanded={servicesDropdownOpen}
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesDropdownOpen && (
                <div className="pl-4 border-l-2 border-[#4CAF50] ml-2 mt-1">
                  <Link 
                    to="/services" 
                    className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm border-b border-[#4CAF50]/20 mb-1 pb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Services Overview
                  </Link>
                  <Link 
                    to="/projects-equipment" 
                    className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Install & Maintenance Telecommunications
                  </Link>
                  <Link 
                    to="/po-projects" 
                    className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Supplying Testing Analytical Instrument
                  </Link>
                  <Link 
                    to="/supply-equipment" 
                    className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Supply Telecommunication Equipment
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/projects" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/careers" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Careers
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
