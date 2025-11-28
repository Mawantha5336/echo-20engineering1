import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Network, Radio, Building2, CheckCircle, ArrowRight } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import PageFooter from "@/components/PageFooter";

const slides = [
  {
    image: "/images/1.jpg",
    title: "Telecommunications Solutions",
    subtitle: "Innovative and sustainable telecom infrastructure for the modern world",
    buttonText: "Explore Our Services",
    buttonLink: "/services"
  },
  {
    image: "/images/2.jpg",
    title: "5G Network Deployment",
    subtitle: "Eco-friendly 5G solutions for faster, greener connectivity",
    buttonText: "Our Approach",
    buttonLink: "/services"
  },
  {
    image: "/images/3.jpg",
    title: "Smart City Integration",
    subtitle: "Sustainable telecom solutions for smart urban development",
    buttonText: "View Projects",
    buttonLink: "/projects"
  }
];

const services = [
  {
    image: "/images/1.jpg",
    icon: Network,
    title: "Network Infrastructure",
    description: "Design and implementation of sustainable telecom networks including fiber optics and wireless systems.",
    link: "/projects-equipment"
  },
  {
    image: "/images/7.jpg",
    icon: Radio,
    title: "Tower Construction",
    description: "Eco-friendly tower solutions with minimal environmental impact and maximum efficiency.",
    link: "/projects-equipment"
  },
  {
    image: "/images/6.jpeg",
    icon: Building2,
    title: "Smart City Solutions",
    description: "Integrated telecom systems for smart cities with energy-efficient technologies.",
    link: "/services"
  }
];

const projects = [
  {
    image: "/images/1.jpg",
    title: "Urban Fiber Network",
    subtitle: "City-wide deployment with minimal environmental impact",
    description: "City-wide fiber optic deployment with minimal disruption to urban environment."
  },
  {
    image: "/images/2.jpg",
    title: "Rural Connectivity",
    subtitle: "Extending access to remote areas",
    description: "Extending telecom access to remote areas with solar-powered towers."
  },
  {
    image: "/images/3.jpg",
    title: "5G Implementation",
    subtitle: "Eco-friendly network rollout",
    description: "Eco-friendly 5G network rollout with energy-efficient small cells."
  }
];

const aboutFeatures = [
  "Energy-efficient network designs",
  "Low-impact tower installations",
  "Recyclable materials in construction",
  "Solar-powered telecom solutions"
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aboutImageIndex, setAboutImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutImageIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0a1a0a 50%, #0a0a0a 100%)' }}>
      <PageNavigation />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[80px]" />
      </div>

      <section className="relative h-[600px] md:h-[700px] overflow-hidden pt-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
        </AnimatePresence>
        
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(3,10,58,0.7) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,1) 100%)',
        }} />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4 max-w-4xl mx-auto"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {slides[currentSlide].subtitle}
              </p>
              <Link
                to={slides[currentSlide].buttonLink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#4CAF50] text-white rounded-lg font-semibold hover:bg-[#45a049] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4CAF50]/20"
              >
                {slides[currentSlide].buttonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#4CAF50] transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#4CAF50] transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#4CAF50] w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      <section className="relative z-10 py-20" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Telecommunications Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Eco Engineering delivers comprehensive telecom solutions with an environmental focus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-[#4CAF50]/50 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-[#4CAF50] flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#4CAF50] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-[#4CAF50] font-medium hover:gap-3 transition-all duration-300"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Sustainable Telecom Solutions
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                At Eco Engineering, we combine telecommunications expertise with environmental responsibility. 
                Our approach minimizes ecological impact while delivering robust, future-proof telecom infrastructure.
              </p>
              <ul className="space-y-4">
                {aboutFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={aboutImageIndex}
                    src={`/images/${aboutImageIndex + 1}.jpg`}
                    alt="Telecom Project"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-[#4CAF50]/20 blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary/20 blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Telecom Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our work speaks for our commitment to quality and sustainability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-[#4CAF50]/50 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.subtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4CAF50] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-[#4CAF50] text-white rounded-lg font-medium hover:bg-[#45a049] transition-all duration-300 text-sm"
                  >
                    View Project
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-12 rounded-3xl border border-[#4CAF50]/30 bg-gradient-to-br from-[#4CAF50]/10 to-transparent backdrop-blur-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Sustainable Telecom Infrastructure?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Contact our team to discuss how we can help with your telecommunications needs while minimizing environmental impact.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4CAF50] text-white rounded-lg font-semibold hover:bg-[#45a049] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4CAF50]/20"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
