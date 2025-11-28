import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Grid3X3, Radio, Sun, Building, Calendar, MapPin, ArrowRight, TrendingUp, Zap, Smile } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import PageFooter from "@/components/PageFooter";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects", icon: Grid3X3 },
    { id: "telecom", label: "Telecommunications", icon: Radio },
    { id: "energy", label: "Energy Solutions", icon: Sun },
    { id: "construction", label: "Construction", icon: Building },
  ];

  const projects = [
    {
      id: 1,
      category: "telecom",
      title: "Colombo 5G Network",
      description: "Deployed energy-efficient 5G infrastructure across Colombo with minimal environmental impact.",
      image: "/images/7.jpg",
      tag: "Telecommunications",
      duration: "6 Months",
      location: "Colombo",
      year: "2023"
    },
    {
      id: 2,
      category: "energy",
      title: "Hambantota Solar Farm",
      description: "Designed and installed a 10MW solar farm providing clean energy to 8,000 homes.",
      image: "/images/6.jpeg",
      tag: "Energy Solutions",
      duration: "8 Months",
      location: "Hambantota",
      year: "2023"
    },
    {
      id: 3,
      category: "construction",
      title: "Colombo Green Tower",
      description: "Sustainable office complex with energy-efficient systems and recycled materials.",
      image: "/images/4.jpg",
      tag: "Construction",
      duration: "14 Months",
      location: "Colombo",
      year: "2022"
    },
    {
      id: 4,
      category: "telecom",
      title: "Rural Network Expansion",
      description: "Extended telecom access to remote areas with solar-powered towers.",
      image: "/images/1.jpg",
      tag: "Telecommunications",
      duration: "5 Months",
      location: "Anuradhapura",
      year: "2023"
    },
    {
      id: 5,
      category: "energy",
      title: "Mannar Wind Farm",
      description: "15MW wind energy project providing sustainable power to the region.",
      image: "/images/2.jpg",
      tag: "Energy Solutions",
      duration: "10 Months",
      location: "Mannar",
      year: "2022"
    },
    {
      id: 6,
      category: "construction",
      title: "Southern Eco Resort",
      description: "Designed and built a sustainable resort with minimal environmental impact.",
      image: "/images/3.jpg",
      tag: "Construction",
      duration: "12 Months",
      location: "Galle",
      year: "2021"
    },
  ];

  const achievements = [
    { icon: TrendingUp, number: "150+", label: "Projects Completed", progress: 95 },
    { icon: MapPin, number: "25+", label: "Cities Covered", progress: 80 },
    { icon: Zap, number: "50MW", label: "Renewable Energy", progress: 70 },
    { icon: Smile, number: "100%", label: "Client Satisfaction", progress: 100 },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)' }}>
      <PageNavigation />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative h-[450px] md:h-[500px] overflow-hidden pt-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url(/images/1.jpg)',
          }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,1) 100%)',
        }} />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center px-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Our Portfolio</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Showcasing our sustainable engineering solutions in action
            </p>

            <div className="flex justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-primary font-bold text-xl">150+</span>
                <span className="text-gray-400">Projects</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-primary font-bold text-xl">25+</span>
                <span className="text-gray-400">Cities</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-primary font-bold text-xl">100%</span>
                <span className="text-gray-400">Success</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Explore Our Work</h2>
          <p className="text-gray-400">Filter by category to find projects that interest you</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-primary to-yellow-500 text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <filter.icon size={18} />
              <span>{filter.label}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      View Project <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'telecom' ? 'bg-primary/20 text-primary' :
                      project.category === 'energy' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.tag}
                    </span>
                    <span className="text-gray-500 text-sm">{project.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {project.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">Our Impact</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Achievements That Speak</h2>
            <p className="text-gray-400">Numbers that reflect our commitment to excellence</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{achievement.number}</div>
                <div className="text-gray-400 text-sm mb-4">{achievement.label}</div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${achievement.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-yellow-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">Start Your Project</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Let's discuss how we can bring sustainable engineering solutions to your next project.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-yellow-500 text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300"
          >
            Get in Touch <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <PageFooter />
    </div>
  );
}
