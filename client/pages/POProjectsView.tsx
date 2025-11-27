import { useState, useEffect } from "react";
import { FileText, Loader2, Calendar, Building, Package, CheckCircle, TrendingUp, Sparkles, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface POProjectData {
  id: string;
  poDate: string;
  client: string;
  product: string;
  projectStatus: string;
  createdAt: string;
}

export default function POProjectsView() {
  const [poProjects, setPOProjects] = useState<POProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/po-projects");
      if (response.ok) {
        const data = await response.json();
        setPOProjects(data);
      }
    } catch (error) {
      console.error("Error fetching P/O projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("completed")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    } else if (lowerStatus.includes("progress") || lowerStatus.includes("ongoing")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    } else if (lowerStatus.includes("pending")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
    return "bg-primary/10 text-primary border-primary/30";
  };

  const getStatusStats = () => {
    const completed = poProjects.filter(p => p.projectStatus.toLowerCase().includes("completed")).length;
    const inProgress = poProjects.filter(p => p.projectStatus.toLowerCase().includes("progress") || p.projectStatus.toLowerCase().includes("ongoing")).length;
    const pending = poProjects.filter(p => p.projectStatus.toLowerCase().includes("pending")).length;
    return { completed, inProgress, pending };
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a1a 25%, #0a0a0a 50%, #1a0a1a 75%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
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
          <p className="text-gray-400 text-lg font-light tracking-wide">Loading P/O Projects...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0a0f1a 50%, #0a0a0a 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
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
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Precision Instruments</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              Supplying Testing
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-blue-400 via-primary to-blue-400 bg-clip-text text-transparent">
              Analytical Instruments
            </h2>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 -mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-black" />
                </div>
                <span className="text-gray-400 text-sm">Total Projects</span>
              </div>
              <p className="text-3xl font-bold text-white">{poProjects.length}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-sm">Completed</span>
              </div>
              <p className="text-3xl font-bold text-emerald-400">{stats.completed}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-sm">In Progress</span>
              </div>
              <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-sm">Pending</span>
              </div>
              <p className="text-3xl font-bold text-amber-400">{stats.pending}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {poProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">No P/O Projects Yet</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  P/O Projects will appear here once added through the admin panel.
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden lg:block rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl mb-8"
              >
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-primary flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Purchase Orders</h3>
                      <p className="text-sm text-gray-400">Analytical instruments supply projects</p>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            P/O Date
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <Building size={16} />
                            Client
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <Package size={16} />
                            Product
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={16} />
                            Status
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {poProjects.map((project) => (
                        <tr
                          key={project.id}
                          className="border-b border-border hover:bg-muted/50 transition"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium">{project.poDate}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold">{project.client}</span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {project.product}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1.5 rounded-full text-sm border ${getStatusColor(
                                project.projectStatus
                              )}`}
                            >
                              {project.projectStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <div className="lg:hidden grid gap-4">
                {poProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Client</p>
                        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{project.client}</h3>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs border ${getStatusColor(
                          project.projectStatus
                        )}`}
                      >
                        {project.projectStatus.length > 20
                          ? project.projectStatus.substring(0, 20) + "..."
                          : project.projectStatus}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <Calendar size={18} className="text-primary" />
                        <div>
                          <span className="text-gray-400 text-xs block">P/O Date</span>
                          <span className="font-medium text-white">{project.poDate}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                        <Package size={18} className="text-primary mt-0.5" />
                        <div>
                          <span className="text-gray-400 text-xs block">Product</span>
                          <span className="font-medium text-white">{project.product}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
