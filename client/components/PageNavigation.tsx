import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@assets/echo logo_1764343027663.png";

interface PageNavigationProps {
  activePage?: string;
}

export default function PageNavigation({ activePage }: PageNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_2px_10px_rgba(255,255,255,0.1)]" style={{ backgroundColor: '#030a3a' }}>
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="flex items-center">
            <img src={logoImage} alt="Eco Engineering Logo" className="h-[90px] w-auto" />
          </a>

          <nav className="hidden md:flex items-center">
            <ul className="flex">
              <li className="ml-8">
                <a 
                  href="/" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${activePage === 'home' ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Home
                </a>
              </li>
              <li className="ml-8">
                <a 
                  href="/about" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${activePage === 'about' ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  About Us
                </a>
              </li>
              <li className="ml-8 relative group">
                <button 
                  className={`flex items-center gap-1 font-medium transition-colors duration-300 hover:text-[#4CAF50] ${activePage === 'services' ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div 
                  className="absolute top-full left-0 min-w-[280px] rounded shadow-[0_8px_16px_rgba(255,255,255,0.1)] py-2.5 border border-[#4CAF50] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                  style={{ backgroundColor: '#030a3a' }}
                >
                  <a 
                    href="/projects-equipment" 
                    className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                  >
                    Install & Maintenance Telecommunications Infrastructure System
                  </a>
                  <a 
                    href="/po-projects" 
                    className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                  >
                    Supplying Testing Analytical Instrument
                  </a>
                  <a 
                    href="/supply-equipment" 
                    className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                  >
                    Supply Telecommunication Equipment
                  </a>
                </div>
              </li>
              <li className="ml-8">
                <a 
                  href="/projects" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${activePage === 'projects' ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Projects
                </a>
              </li>
              <li className="ml-8">
                <a 
                  href="/contact" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${activePage === 'contact' ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Contact
                </a>
              </li>
              <li className="ml-8">
                <a 
                  href="/careers" 
                  className={`font-medium transition-colors duration-300 hover:text-[#4CAF50] ${activePage === 'careers' ? 'text-[#4CAF50]' : 'text-white'}`}
                >
                  Careers
                </a>
              </li>
            </ul>
          </nav>

          <button 
            className="md:hidden p-2 text-white text-2xl cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-[#4CAF50]/30 pt-4">
            <a 
              href="/" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
            >
              About Us
            </a>
            <div>
              <button 
                className="flex items-center gap-2 py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50] w-full"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesDropdownOpen && (
                <div className="pl-4 border-l-2 border-[#4CAF50] ml-2 mt-1">
                  <a 
                    href="/projects-equipment" 
                    className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                  >
                    Install & Maintenance Telecommunications
                  </a>
                  <a 
                    href="/po-projects" 
                    className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                  >
                    Supplying Testing Analytical Instrument
                  </a>
                  <a 
                    href="/supply-equipment" 
                    className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                  >
                    Supply Telecommunication Equipment
                  </a>
                </div>
              )}
            </div>
            <a 
              href="/projects" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
            >
              Projects
            </a>
            <a 
              href="/contact" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
            >
              Contact
            </a>
            <a 
              href="/careers" 
              className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
            >
              Careers
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
