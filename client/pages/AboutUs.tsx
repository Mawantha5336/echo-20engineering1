import { motion } from "framer-motion";
import { Sparkles, Leaf, Lightbulb, Users, HandshakeIcon, Calendar, Award, Target } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import PageFooter from "@/components/PageFooter";

export default function AboutUs() {
  const milestones = [
    { year: "2020", title: "Company Founded" },
    { year: "2021", title: "First Major Telecom Project" },
    { year: "2022", title: "International Expansion" },
    { year: "2024", title: "100+ Sustainable Projects" },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We prioritize eco-friendly solutions that reduce environmental impact without compromising quality or performance."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuous research and development to deliver cutting-edge engineering solutions for tomorrow's challenges."
    },
    {
      icon: HandshakeIcon,
      title: "Integrity",
      description: "Honest, transparent business practices that build trust with our clients and partners."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with clients, communities, and stakeholders to achieve shared success."
    },
  ];

  const ceoStats = [
    { number: "10+", label: "Years Experience" },
    { number: "100+", label: "Projects Led" },
    { number: "50+", label: "Team Members" },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)' }}>
      <PageNavigation activePage="about" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative h-[400px] md:h-[500px] overflow-hidden pt-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url(/images/2.jpg)',
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
              <span className="text-sm text-primary font-medium">Our Journey</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              About Eco Engineering
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pioneering sustainable engineering solutions for a connected future
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From humble beginnings to industry leaders in sustainable engineering</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-white/10"
          >
            <img src="/images/group 2.jpg" alt="Eco Engineering Team" className="w-full h-auto" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 mb-6 leading-relaxed">
              Founded in 2020, Eco Engineering began with a vision to deliver exceptional telecommunications infrastructure services with a commitment to sustainability and quality. In a short time, we've grown to become a trusted partner for major telecommunications providers, especially Dialog.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our expertise lies in building and maintaining robust telecom infrastructure with a focus on environmental responsibility. We take pride in our skilled field teams who consistently deliver projects on time and to the highest standards.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{milestone.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Mission & Values</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Guiding principles that drive everything we do</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Leadership</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Visionary leadership driving sustainable innovation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-yellow-500/30 rounded-full blur-2xl" />
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/30">
                  <img src="/images/ceo.jpg" alt="Mr. Manoj Bandara - CEO" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
                  Founder & CEO
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">Mr. Manoj Bandara</h3>
                <p className="text-gray-400 mb-6">
                  With over a decade of experience in telecommunications and sustainable engineering, Mr. Manoj Bandara founded Eco Engineering with a vision to revolutionize infrastructure development while prioritizing environmental responsibility.
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {ceoStats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5">
                      <div className="text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <PageFooter />
    </div>
  );
}
