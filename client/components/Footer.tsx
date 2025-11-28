import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@assets/4_1764310807924.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-indigo-900/30" style={{ background: '#0a0a1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoImage} 
                alt="Eco Engineers Logo" 
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Innovative engineering solutions with a commitment to sustainability and environmental responsibility.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-500 transition"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-500 transition"
              >
                <Twitter size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-500 transition"
              >
                <Linkedin size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-500 transition"
              >
                <Instagram size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition text-sm">
                  Services
                </a>
              </li>
              <li>
                <Link to="/projects-equipment" className="text-gray-400 hover:text-primary transition text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Waliwita Junction, Kaduwela</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">011 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">ecoengineering@.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-indigo-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
            <span className="text-gray-400 text-sm">
              © 2023 Eco Engineering. All Rights Reserved.
            </span>
            <span className="text-gray-400 text-sm">|</span>
            <div className="flex items-center gap-2">
              <a href="#" className="text-primary hover:text-primary/80 transition text-sm">
                Privacy Policy
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-primary hover:text-primary/80 transition text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 w-12 h-12 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition shadow-lg z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="text-primary-foreground" />
      </button>
    </footer>
  );
}
