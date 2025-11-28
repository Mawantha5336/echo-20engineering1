import { motion } from "framer-motion";
import { Sparkles, MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import PageFooter from "@/components/PageFooter";

export default function SupplyEquipment() {
  const equipmentColumns = [
    [
      "All Kinds of Fiber Cables",
      "HDPE Silicon Duct Pipes All Sizes",
      "Conduit Metal Shielded 8/12/24/48/64/96/128/256 Core, Fiber Optic Cables",
      "OM2/3/4, SM & MM Patch Cords, & CPRI Cables",
      "Ariel & UG Fiber Optic Cables",
      "Indoor/Outdoor ODFs all sizes of any Terminal Configurations",
      "Fiber Optic Transmitters/Receivers",
      "SFP Transceiver Modules All types up to 10/100/200/400G",
      "Media Converters",
      "Optical Sources & Testing Equipments",
      "Outdoor Fiber Optic Clamps",
    ],
    [
      "Repeaters Full Turn Key Solutions",
      "Antennas (Indoor / Outdoor) All Bands & Beams & Ports (RFS)",
      "Splitters / Combiners /Attenuators/and Accessories",
      "All Types of R. F. & I. F. Cables, Connectors, Clamps, Grounding Kits etc.",
      "All Kinds of Tapes: Cold Shrink Tubes/Mastic/Insulating/Vinal",
      "Cable Ties All Types & Sizes",
      "G. I. Flexible Conduits all sizes",
      "PVC Conduit, Flexible & Accessories",
      "Fabrication of all types of Brackets, Cable Ladders & Stripes",
    ],
    [
      "All Electrical Items : SPD's, MCBs, MCCBs, RCCBs, needed for Sites",
      "RRU Power Cables",
      "Network Cables (Indoor & Outdoor)",
      "All Battery Types (VRLA, AGM, Li-ion)",
      "UPS systems",
      "Rectifiers",
      "Invertors",
      "Generators & Spares up to 2000kVA",
      "Server Racks",
      "19\" Racks",
    ],
  ];

  const contactCards = [
    { icon: MapPin, title: "Address", text: "Weliwita Junction, Kaduwela, Sri Lanka" },
    { icon: Phone, title: "Phone", text: "+94 11 234 5678" },
    { icon: Mail, title: "Email", text: "info@ecoengineering.com" },
    { icon: Clock, title: "Working Hours", text: "Monday - Friday: 8:30 AM - 5:30 PM" },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0a1628 50%, #0a0a0a 100%)' }}>
      <PageNavigation activePage="services" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative h-[400px] md:h-[450px] overflow-hidden pt-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url(/images/7.jpg)',
          }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,50,100,0.4) 0%, rgba(10,22,40,0.8) 60%, rgba(10,10,10,1) 100%)',
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
              <span className="text-sm text-primary font-medium">Equipment Supply</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              Supply Telecommunication Equipment
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive telecommunications equipment solutions for infrastructure projects across Sri Lanka
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
            Huawei and ZTE Projects
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-primary to-cyan-500 rounded-full" />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            We supply a complete range of telecommunications equipment and accessories for major projects
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {equipmentColumns.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: columnIndex * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
            >
              <ul className="space-y-0">
                {column.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 py-4 border-b border-white/5 last:border-b-0 text-gray-300 text-sm leading-relaxed hover:text-white hover:pl-2 transition-all duration-300 group"
                  >
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 group-hover:text-cyan-400 transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 text-center hover:border-primary/30 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-white font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-white/10"
        >
          <div className="text-center py-6 bg-white/5">
            <h2 className="text-2xl font-bold text-white">Find Us on Map</h2>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.207664062502!2d79.960278!3d6.933472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTYnMDAuNSJOIDc5wrA1Nyc0My44IkU!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full"
          />
        </motion.div>
      </div>

      <PageFooter />
    </div>
  );
}
