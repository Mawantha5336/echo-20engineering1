import { useState, useEffect } from "react";
import { Wrench, Building2, Image as ImageIcon, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";

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
      <div className="border-b border-indigo-900/50" style={{ background: 'linear-gradient(to right, rgba(20, 20, 60, 0.8), rgba(15, 15, 45, 0.6))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Projects & Equipment</h1>
              <p className="text-gray-400">
                View all our projects and specialized equipment
              </p>
            </div>
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

      <Footer />
    </div>
  );
}
