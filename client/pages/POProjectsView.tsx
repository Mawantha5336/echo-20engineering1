import { useState, useEffect } from "react";
import { FileText, Loader2, Calendar, Building, Package, CheckCircle } from "lucide-react";

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
      return "bg-green-500/10 text-green-500 border-green-500/20";
    } else if (lowerStatus.includes("progress") || lowerStatus.includes("ongoing")) {
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    } else if (lowerStatus.includes("pending")) {
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
    return "bg-primary/10 text-primary border-primary/20";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1033 50%, #0a0a1a 100%)' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-400">Loading P/O Projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1033 50%, #0a0a1a 100%)' }}>
      {/* Hero Banner Section */}
      <div className="relative h-[320px] md:h-[400px] overflow-hidden">
        {/* Background with gradient overlay simulating sunset sky */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #f97316 0%, #fb923c 15%, #fcd34d 30%, #fef3c7 45%, #a5b4fc 60%, #6366f1 75%, #1e1b4b 100%)',
          }}
        />
        {/* Silhouette overlay for mountains and towers */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, rgba(10, 10, 26, 1) 0%, rgba(10, 10, 26, 0.9) 15%, transparent 40%),
              linear-gradient(to bottom, transparent 60%, rgba(30, 41, 59, 0.8) 100%)
            `,
          }}
        />
        {/* Tower silhouettes using CSS shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48">
          {/* Left tower */}
          <div className="absolute left-[15%] bottom-0 w-1 md:w-1.5 h-24 md:h-36 bg-slate-900" />
          <div className="absolute left-[14%] bottom-[60px] md:bottom-[90px] w-3 md:w-4 h-3 md:h-4 border-2 border-slate-900 rotate-45" />
          <div className="absolute left-[12%] bottom-0 w-8 md:w-12 h-16 md:h-24 bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-sm" style={{ clipPath: 'polygon(20% 100%, 80% 100%, 90% 0%, 10% 0%)' }} />
          
          {/* Center tower (main) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 md:w-2 h-32 md:h-44 bg-slate-900" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[100px] md:bottom-[140px] w-6 md:w-8 h-4 md:h-6 border-2 border-slate-900 transform" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 80% 0%, 20% 0%)' }} />
          <div className="absolute left-[48%] bottom-[70px] md:bottom-[100px] w-12 md:w-16 h-1 bg-slate-900" />
          
          {/* Right tower */}
          <div className="absolute right-[20%] bottom-0 w-1 md:w-1.5 h-20 md:h-32 bg-slate-900" />
          <div className="absolute right-[18%] bottom-0 w-6 md:w-10 h-12 md:h-20 bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-sm" style={{ clipPath: 'polygon(15% 100%, 85% 100%, 95% 0%, 5% 0%)' }} />
          
          {/* Mountain silhouettes */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-20 md:h-28"
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
              clipPath: 'polygon(0% 100%, 0% 60%, 10% 40%, 25% 70%, 35% 30%, 50% 50%, 65% 20%, 80% 60%, 90% 35%, 100% 55%, 100% 100%)',
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 md:h-20"
            style={{
              background: 'linear-gradient(to right, #0f172a, #1e293b, #0f172a)',
              clipPath: 'polygon(0% 100%, 0% 50%, 15% 30%, 30% 60%, 45% 25%, 55% 45%, 70% 20%, 85% 55%, 100% 40%, 100% 100%)',
            }}
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-800 tracking-wide">
              Supplying Testing Analytical Instrument
            </h1>
          </div>
        </div>
      </div>
      
      {/* Stats bar */}
      <div className="border-b border-indigo-900/50" style={{ background: 'linear-gradient(to right, rgba(20, 20, 60, 0.8), rgba(15, 15, 45, 0.6))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="backdrop-blur rounded-lg px-4 py-2 border border-indigo-900/50" style={{ background: 'rgba(15, 15, 45, 0.6)' }}>
              <span className="text-gray-400 text-sm">Total Projects:</span>
              <span className="ml-2 font-bold text-primary">{poProjects.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {poProjects.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-indigo-900/50" style={{ background: 'rgba(15, 15, 45, 0.6)' }}>
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">No P/O Projects Yet</h3>
            <p className="text-gray-400">
              P/O Projects will appear here once added through the admin panel.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block bg-card rounded-xl border border-border overflow-hidden mb-8">
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
            </div>

            <div className="lg:hidden grid gap-4">
              {poProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-indigo-900/50 p-6 hover:border-primary transition"
                  style={{ background: 'rgba(15, 15, 45, 0.6)' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Client</p>
                      <h3 className="font-bold text-lg text-white">{project.client}</h3>
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
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-400">P/O Date:</span>
                      <span className="font-medium text-white">{project.poDate}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Package size={16} className="text-gray-400 mt-0.5" />
                      <span className="text-gray-400">Product:</span>
                      <span className="font-medium text-white">{project.product}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
