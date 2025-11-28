import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import logoImage from "@assets/echo logo_1764343027663.png";

export default function PageFooter() {
  return (
    <footer className="relative py-16" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #030a3a 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-yellow-600/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={logoImage} alt="Eco Engineering Logo" className="h-20 w-auto mb-6" />
            <p className="text-gray-400 mb-6">
              Innovative engineering solutions with a commitment to sustainability and environmental responsibility.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4CAF50] hover:scale-110 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4CAF50] hover:scale-110 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4CAF50] hover:scale-110 transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4CAF50] hover:scale-110 transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#4CAF50] hover:pl-2 transition-all duration-300">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#4CAF50] hover:pl-2 transition-all duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#4CAF50] hover:pl-2 transition-all duration-300">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-[#4CAF50] hover:pl-2 transition-all duration-300">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#4CAF50] hover:pl-2 transition-all duration-300">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-[#4CAF50] flex-shrink-0 mt-1" />
                <span>Waliwita Junction, Kaduwela, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-[#4CAF50] flex-shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-[#4CAF50] flex-shrink-0" />
                <span>info@ecoengineering.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500">
            &copy; 2024 Eco Engineering. All Rights Reserved. | 
            <span className="hover:text-[#4CAF50] transition-colors ml-1 cursor-pointer">Privacy Policy</span> | 
            <span className="hover:text-[#4CAF50] transition-colors ml-1 cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
