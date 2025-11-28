import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Radio, Sun, HardHat, Leaf, DollarSign, Award, Lightbulb, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import PageFooter from "@/components/PageFooter";

export default function Services() {
  const services = [
    {
      icon: Radio,
      title: "Telecommunications",
      description: "Eco-friendly telecom infrastructure, tower construction, and network solutions with minimal environmental impact.",
      features: [
        "Green tower design and construction",
        "Solar-powered telecom sites",
        "Fiber optic network deployment",
        "5G infrastructure development"
      ],
      link: "/projects-equipment"
    },
    {
      icon: Sun,
      title: "Energy Solutions",
      description: "Renewable energy systems, solar power installations, and energy efficiency consulting for sustainable power solutions.",
      features: [
        "Solar energy systems",
        "Wind power solutions",
        "Energy storage systems",
        "Energy efficiency audits"
      ],
      link: "/services"
    },
    {
      icon: HardHat,
      title: "Construction",
      description: "Green building practices, sustainable materials, and eco-conscious construction management services.",
      features: [
        "Sustainable building design",
        "LEED certification consulting",
        "Green materials sourcing",
        "Eco-friendly construction methods"
      ],
      link: "/services"
    },
  ];

  const approach = [
    { step: 1, title: "Assessment", description: "Comprehensive environmental impact analysis and sustainability assessment" },
    { step: 2, title: "Planning", description: "Developing eco-friendly solutions tailored to each project's requirements" },
    { step: 3, title: "Implementation", description: "Executing projects with sustainable practices and materials" },
    { step: 4, title: "Monitoring", description: "Continuous environmental impact monitoring and optimization" },
  ];

  const benefits = [
    { icon: Leaf, title: "Environmental Responsibility", description: "Reduce your carbon footprint and environmental impact with our sustainable solutions" },
    { icon: DollarSign, title: "Cost Efficiency", description: "Long-term savings through energy-efficient designs and sustainable practices" },
    { icon: Award, title: "Quality Assurance", description: "Rigorous quality standards and certifications for all our services" },
    { icon: Lightbulb, title: "Innovation", description: "Cutting-edge technologies and approaches for sustainable engineering" },
    { icon: Users, title: "Expert Team", description: "Experienced professionals with expertise in sustainable engineering" },
    { icon: Shield, title: "Compliance", description: "Full compliance with environmental regulations and sustainability standards" },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)' }}>
      <PageNavigation />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative h-[350px] md:h-[400px] overflow-hidden pt-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url(/images/6.jpeg)',
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
              <span className="text-sm text-primary font-medium">What We Offer</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive sustainable engineering solutions across multiple sectors
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Integrated engineering solutions with environmental responsibility at their core</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-5">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                to={service.link}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
              >
                Explore {service.title} <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Sustainable Approach</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">How we integrate environmental responsibility into every project</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {approach.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                {item.step}
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Benefits of Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Why choose Eco Engineering for your projects</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Discuss Your Project?</h2>
              <p className="text-gray-400">
                Contact us today to learn how our sustainable engineering solutions can benefit your next project
              </p>
            </div>
            <div className="flex gap-4">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-yellow-500 text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300"
              >
                Get a Consultation
              </Link>
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <PageFooter />
    </div>
  );
}
