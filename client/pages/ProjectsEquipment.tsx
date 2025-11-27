import { useState, useEffect } from "react";
import { Wrench, Building2, Image as ImageIcon, Loader2 } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1033 50%, #0a0a1a 100%)' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-400">Loading data...</p>
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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-wide">
              Telecommunication Infrastructure
            </h1>
            <p className="mt-3 text-lg md:text-xl text-slate-700/80">
              Building Tomorrow's Connectivity Today
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-4 mb-8 border-b border-indigo-900/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "projects"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Building2 size={20} />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-6 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "equipment"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Wrench size={20} />
            Equipment ({equipment.length})
          </button>
        </div>

        {activeTab === "projects" && (
          <div>
            {projects.length === 0 ? (
              <div className="text-center py-16 rounded-xl border border-indigo-900/50" style={{ background: 'rgba(15, 15, 45, 0.6)' }}>
                <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">No Projects Yet</h3>
                <p className="text-gray-400">
                  Projects will appear here once added through the admin panel.
                </p>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
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
          </div>
        )}

        {activeTab === "equipment" && (
          <div>
            {equipment.length === 0 ? (
              <div className="text-center py-16 rounded-xl border border-indigo-900/50" style={{ background: 'rgba(15, 15, 45, 0.6)' }}>
                <Wrench className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">No Equipment Yet</h3>
                <p className="text-gray-400">
                  Equipment will appear here once added through the admin panel.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipment.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-indigo-900/50 overflow-hidden hover:border-primary transition group"
                    style={{ background: 'rgba(15, 15, 45, 0.6)' }}
                  >
                    {item.image ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video flex items-center justify-center" style={{ background: 'rgba(20, 20, 60, 0.8)' }}>
                        <ImageIcon className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
