import { useState, useEffect } from "react";
import { Wrench, Building2, Image as ImageIcon, Loader2, Sparkles, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageNavigation from "@/components/PageNavigation";
import PageFooter from "@/components/PageFooter";

interface ProjectData {
  id: string;
  projectName: string;
  customer: string;
  oem: string;
  operator: string;
  activity: string;
  noOfSites: number;
  image?: string;
  createdAt: string;
}

interface EquipmentData {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

export default function ProjectsEquipment() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [equipment, setEquipment] = useState<EquipmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"projects" | "equipment">("projects");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, equipmentRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/equipment"),
      ]);

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }

      if (equipmentRes.ok) {
        const equipmentData = await equipmentRes.json();
        setEquipment(equipmentData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 25%, #0a0a0a 50%, #0a1a0a 75%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-6 relative z-10" />
          </div>
          <p className="text-gray-400 text-lg font-light tracking-wide">Loading data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)' }}>
      <PageNavigation />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative h-[400px] md:h-[500px] overflow-hidden pt-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url(/images/hero-banner.png)',
          }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)',
        }} />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * 500,
                opacity: 0 
              }}
              animate={{ 
                y: [null, -100],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
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
              <span className="text-sm text-primary font-medium">Excellence in Engineering</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              Install & Maintenance
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">
              Telecommunication Infrastructure
            </h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-white font-semibold">{projects.length}</span>
                <span className="text-gray-400">Projects</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <Wrench className="w-5 h-5 text-primary" />
                <span className="text-white font-semibold">{equipment.length}</span>
                <span className="text-gray-400">Equipment</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-10 p-1.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 w-fit mx-auto"
        >
          <button
            onClick={() => setActiveTab("projects")}
            className={`relative px-8 py-3 font-semibold transition-all duration-300 rounded-xl flex items-center gap-3 ${
              activeTab === "projects"
                ? "text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === "projects" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-primary to-yellow-500 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Building2 size={20} className="relative z-10" />
            <span className="relative z-10">Projects</span>
            <span className={`relative z-10 px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === "projects" ? "bg-black/20" : "bg-white/10"
            }`}>
              {projects.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`relative px-8 py-3 font-semibold transition-all duration-300 rounded-xl flex items-center gap-3 ${
              activeTab === "equipment"
                ? "text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === "equipment" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-primary to-yellow-500 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Wrench size={20} className="relative z-10" />
            <span className="relative z-10">Equipment</span>
            <span className={`relative z-10 px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === "equipment" ? "bg-black/20" : "bg-white/10"
            }`}>
              {equipment.length}
            </span>
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {projects.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">No Projects Yet</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Projects will appear here once added through the admin panel.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl">
                  <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Active Projects</h3>
                        <p className="text-sm text-gray-400">Telecommunication infrastructure installations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-primary font-semibold">{projects.length} Active</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted">
                          <th className="px-6 py-4 text-left text-sm font-semibold">
                            Project Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">
                            Customer
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">
                            OEM
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">
                            Operator
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">
                            Activity
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">
                            Sites
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr
                            key={project.id}
                            className="border-b border-border hover:bg-muted/50 transition"
                          >
                            <td className="px-6 py-4">
                              <div className="font-medium">{project.projectName}</div>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {project.customer}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {project.oem}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {project.operator}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {project.activity}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-primary">
                                {project.noOfSites}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "equipment" && (
            <motion.div
              key="equipment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {equipment.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Wrench className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">No Equipment Yet</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Equipment will appear here once added through the admin panel.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Specialized Equipment</h3>
                        <p className="text-sm text-gray-400">Professional tools & machinery</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipment.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                      >
                        {item.image ? (
                          <div className="aspect-video overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-black text-sm font-medium">
                                View Details <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                            <ImageIcon className="w-12 h-12 text-gray-600" />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-2 text-white group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PageFooter />
    </div>
  );
}
