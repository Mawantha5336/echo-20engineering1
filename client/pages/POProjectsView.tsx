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
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-banner.png)',
          }}
        />
        {/* Dark overlay for better text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)',
          }}
        />
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-wide drop-shadow-lg">
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
