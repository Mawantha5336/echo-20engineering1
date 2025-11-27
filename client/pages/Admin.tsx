import { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, Loader2, Briefcase, Eye, EyeOff, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ProjectData {
  id: string;
  projectName: string;
  customer: string;
  oem: string;
  operator: string;
  activity: string;
  noOfSites: number;
  image?: string;
}

interface EquipmentData {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface POProjectData {
  id: string;
  poDate: string;
  client: string;
  product: string;
  projectStatus: string;
}

interface CareerData {
  id: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  salary?: string;
  isActive: boolean;
  createdAt: string;
}

interface JobApplicationData {
  id: string;
  careerId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  createdAt: string;
}

export default function Admin() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [equipment, setEquipment] = useState<EquipmentData[]>([]);
  const [poProjects, setPOProjects] = useState<POProjectData[]>([]);
  const [careers, setCareers] = useState<CareerData[]>([]);
  const [applications, setApplications] = useState<JobApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "projects" | "equipment" | "poProjects" | "careers" | "applications"
  >("projects");
  
  const [projectForm, setProjectForm] = useState({
    projectName: "",
    customer: "",
    oem: "",
    operator: "",
    activity: "",
    noOfSites: "",
  });

  const [equipmentForm, setEquipmentForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [poProjectForm, setPOProjectForm] = useState({
    poDate: "",
    client: "",
    product: "",
    projectStatus: "",
  });

  const [careerForm, setCareerForm] = useState({
    jobTitle: "",
    department: "",
    location: "",
    employmentType: "",
    description: "",
    requirements: "",
    salary: "",
    isActive: true,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projectsRes, equipmentRes, poProjectsRes, careersRes, applicationsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/equipment"),
        fetch("/api/po-projects"),
        fetch("/api/careers"),
        fetch("/api/job-applications"),
      ]);

      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setProjects(data);
      }

      if (equipmentRes.ok) {
        const data = await equipmentRes.json();
        setEquipment(data);
      }

      if (poProjectsRes.ok) {
        const data = await poProjectsRes.json();
        setPOProjects(data);
      }

      if (careersRes.ok) {
        const data = await careersRes.json();
        setCareers(data);
      }

      if (applicationsRes.ok) {
        const data = await applicationsRes.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !projectForm.projectName ||
      !projectForm.customer ||
      !projectForm.oem ||
      !projectForm.operator ||
      !projectForm.activity ||
      !projectForm.noOfSites
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: projectForm.projectName,
          customer: projectForm.customer,
          oem: projectForm.oem,
          operator: projectForm.operator,
          activity: projectForm.activity,
          noOfSites: parseInt(projectForm.noOfSites),
        }),
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects([...projects, newProject]);
        setProjectForm({
          projectName: "",
          customer: "",
          oem: "",
          operator: "",
          activity: "",
          noOfSites: "",
        });
        toast.success("Project added successfully");
      } else {
        toast.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEquipment: boolean = true,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (isEquipment) {
        setEquipmentForm({ ...equipmentForm, image: base64String });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddEquipment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipmentForm.title || !equipmentForm.description) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: equipmentForm.title,
          description: equipmentForm.description,
          image: equipmentForm.image,
        }),
      });

      if (response.ok) {
        const newEquipment = await response.json();
        setEquipment([...equipment, newEquipment]);
        setEquipmentForm({
          title: "",
          description: "",
          image: "",
        });
        toast.success("Equipment added successfully");
      } else {
        toast.error("Failed to add equipment");
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
      toast.error("Failed to add equipment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        toast.success("Project deleted");
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    try {
      const response = await fetch(`/api/equipment/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEquipment(equipment.filter((e) => e.id !== id));
        toast.success("Equipment deleted");
      } else {
        toast.error("Failed to delete equipment");
      }
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toast.error("Failed to delete equipment");
    }
  };

  const handleAddPOProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !poProjectForm.poDate ||
      !poProjectForm.client ||
      !poProjectForm.product ||
      !poProjectForm.projectStatus
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/po-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          poDate: poProjectForm.poDate,
          client: poProjectForm.client,
          product: poProjectForm.product,
          projectStatus: poProjectForm.projectStatus,
        }),
      });

      if (response.ok) {
        const newPOProject = await response.json();
        setPOProjects([...poProjects, newPOProject]);
        setPOProjectForm({
          poDate: "",
          client: "",
          product: "",
          projectStatus: "",
        });
        toast.success("P/O Project added successfully");
      } else {
        toast.error("Failed to add P/O project");
      }
    } catch (error) {
      console.error("Error adding P/O project:", error);
      toast.error("Failed to add P/O project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePOProject = async (id: string) => {
    try {
      const response = await fetch(`/api/po-projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPOProjects(poProjects.filter((p) => p.id !== id));
        toast.success("P/O Project deleted");
      } else {
        toast.error("Failed to delete P/O project");
      }
    } catch (error) {
      console.error("Error deleting P/O project:", error);
      toast.error("Failed to delete P/O project");
    }
  };

  const handleAddCareer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !careerForm.jobTitle ||
      !careerForm.department ||
      !careerForm.location ||
      !careerForm.employmentType ||
      !careerForm.description ||
      !careerForm.requirements
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(careerForm),
      });

      if (response.ok) {
        const newCareer = await response.json();
        setCareers([...careers, newCareer]);
        setCareerForm({
          jobTitle: "",
          department: "",
          location: "",
          employmentType: "",
          description: "",
          requirements: "",
          salary: "",
          isActive: true,
        });
        toast.success("Job vacancy added successfully");
      } else {
        toast.error("Failed to add job vacancy");
      }
    } catch (error) {
      console.error("Error adding career:", error);
      toast.error("Failed to add job vacancy");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleCareerStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/careers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        setCareers(careers.map((c) => 
          c.id === id ? { ...c, isActive: !currentStatus } : c
        ));
        toast.success(`Job ${!currentStatus ? "activated" : "deactivated"}`);
      } else {
        toast.error("Failed to update job status");
      }
    } catch (error) {
      console.error("Error updating career:", error);
      toast.error("Failed to update job status");
    }
  };

  const handleDeleteCareer = async (id: string) => {
    try {
      const response = await fetch(`/api/careers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCareers(careers.filter((c) => c.id !== id));
        toast.success("Job vacancy deleted");
      } else {
        toast.error("Failed to delete job vacancy");
      }
    } catch (error) {
      console.error("Error deleting career:", error);
      toast.error("Failed to delete job vacancy");
    }
  };

  const handleUpdateApplicationStatus = async (id: string, status: JobApplicationData["status"]) => {
    try {
      const response = await fetch(`/api/job-applications/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setApplications(applications.map((a) => 
          a.id === id ? { ...a, status } : a
        ));
        toast.success("Application status updated");
      } else {
        toast.error("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application status");
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/job-applications/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setApplications(applications.filter((a) => a.id !== id));
        toast.success("Application deleted");
      } else {
        toast.error("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    }
  };

  const getStatusColor = (status: JobApplicationData["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "reviewed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "shortlisted":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-card to-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage projects, equipment, careers, and applications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap ${
              activeTab === "projects"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap ${
              activeTab === "equipment"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Equipment
          </button>
          <button
            onClick={() => setActiveTab("poProjects")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap ${
              activeTab === "poProjects"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            P/O Projects
          </button>
          <button
            onClick={() => setActiveTab("careers")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "careers"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase size={18} />
            Careers
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "applications"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users size={18} />
            Applications
            {applications.filter(a => a.status === "pending").length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                {applications.filter(a => a.status === "pending").length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add New Project</h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Name</label>
                    <Input
                      type="text"
                      placeholder="Enter project name"
                      value={projectForm.projectName}
                      onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Customer</label>
                    <Input
                      type="text"
                      placeholder="Customer name"
                      value={projectForm.customer}
                      onChange={(e) => setProjectForm({ ...projectForm, customer: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">OEM</label>
                    <Input
                      type="text"
                      placeholder="OEM name"
                      value={projectForm.oem}
                      onChange={(e) => setProjectForm({ ...projectForm, oem: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Operator</label>
                    <Input
                      type="text"
                      placeholder="Operator name"
                      value={projectForm.operator}
                      onChange={(e) => setProjectForm({ ...projectForm, operator: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Activity</label>
                    <Input
                      type="text"
                      placeholder="e.g., Installation, Maintenance"
                      value={projectForm.activity}
                      onChange={(e) => setProjectForm({ ...projectForm, activity: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">No. of Sites</label>
                    <Input
                      type="number"
                      placeholder="Number of sites"
                      value={projectForm.noOfSites}
                      onChange={(e) => setProjectForm({ ...projectForm, noOfSites: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add Project
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="px-6 py-4 text-left text-sm font-semibold">Project Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">OEM</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Operator</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Activity</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Sites</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">No projects added yet</td>
                        </tr>
                      ) : (
                        projects.map((project) => (
                          <tr key={project.id} className="border-b border-border hover:bg-muted transition">
                            <td className="px-6 py-4 text-sm">{project.projectName}</td>
                            <td className="px-6 py-4 text-sm">{project.customer}</td>
                            <td className="px-6 py-4 text-sm">{project.oem}</td>
                            <td className="px-6 py-4 text-sm">{project.operator}</td>
                            <td className="px-6 py-4 text-sm">{project.activity}</td>
                            <td className="px-6 py-4 text-sm">{project.noOfSites}</td>
                            <td className="px-6 py-4 text-sm">
                              <button onClick={() => handleDeleteProject(project.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "equipment" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add Equipment</h2>
                <form onSubmit={handleAddEquipment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      type="text"
                      placeholder="Equipment title"
                      value={equipmentForm.title}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, title: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      placeholder="Equipment description"
                      value={equipmentForm.description}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    {equipmentForm.image && (
                      <div className="mt-3 relative">
                        <img src={equipmentForm.image} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-border" />
                        <button type="button" onClick={() => setEquipmentForm({ ...equipmentForm, image: "" })} className="absolute top-2 right-2 bg-destructive text-white p-1 rounded hover:bg-destructive/80 transition">✕</button>
                      </div>
                    )}
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add Equipment
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {equipment.length === 0 ? (
                  <div className="col-span-2 text-center py-16 bg-card rounded-xl border border-border">
                    <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No equipment added yet</p>
                  </div>
                ) : (
                  equipment.map((item) => (
                    <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                      ) : (
                        <div className="w-full h-40 bg-muted flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                          <button onClick={() => handleDeleteEquipment(item.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "poProjects" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add P/O Project</h2>
                <form onSubmit={handleAddPOProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">P/O Date</label>
                    <Input
                      type="text"
                      placeholder="e.g., January 2024"
                      value={poProjectForm.poDate}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, poDate: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client</label>
                    <Input
                      type="text"
                      placeholder="Client name"
                      value={poProjectForm.client}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, client: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Product</label>
                    <Input
                      type="text"
                      placeholder="Product name"
                      value={poProjectForm.product}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, product: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Status</label>
                    <Input
                      type="text"
                      placeholder="e.g., Completed, In Progress"
                      value={poProjectForm.projectStatus}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, projectStatus: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add P/O Project
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="px-6 py-4 text-left text-sm font-semibold">P/O Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {poProjects.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No P/O projects added yet</td>
                        </tr>
                      ) : (
                        poProjects.map((project) => (
                          <tr key={project.id} className="border-b border-border hover:bg-muted transition">
                            <td className="px-6 py-4 text-sm">{project.poDate}</td>
                            <td className="px-6 py-4 text-sm">{project.client}</td>
                            <td className="px-6 py-4 text-sm">{project.product}</td>
                            <td className="px-6 py-4 text-sm">{project.projectStatus}</td>
                            <td className="px-6 py-4 text-sm">
                              <button onClick={() => handleDeletePOProject(project.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "careers" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add Job Vacancy</h2>
                <form onSubmit={handleAddCareer} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Title *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Senior Engineer"
                      value={careerForm.jobTitle}
                      onChange={(e) => setCareerForm({ ...careerForm, jobTitle: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Department *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Engineering"
                      value={careerForm.department}
                      onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Colombo, Sri Lanka"
                      value={careerForm.location}
                      onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Employment Type *</label>
                    <select
                      value={careerForm.employmentType}
                      onChange={(e) => setCareerForm({ ...careerForm, employmentType: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Salary (Optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g., $50,000 - $70,000"
                      value={careerForm.salary}
                      onChange={(e) => setCareerForm({ ...careerForm, salary: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      placeholder="Job description..."
                      value={careerForm.description}
                      onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Requirements *</label>
                    <textarea
                      placeholder="Job requirements (one per line)..."
                      value={careerForm.requirements}
                      onChange={(e) => setCareerForm({ ...careerForm, requirements: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={careerForm.isActive}
                      onChange={(e) => setCareerForm({ ...careerForm, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-border"
                    />
                    <label htmlFor="isActive" className="text-sm">Active (visible to candidates)</label>
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add Job Vacancy
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {careers.length === 0 ? (
                  <div className="text-center py-16 bg-card rounded-xl border border-border">
                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No job vacancies added yet</p>
                  </div>
                ) : (
                  careers.map((career) => (
                    <div key={career.id} className="bg-card rounded-xl border border-border p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg">{career.jobTitle}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${career.isActive ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                              {career.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {career.department} • {career.location} • {career.employmentType}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleCareerStatus(career.id, career.isActive)}
                            className={`p-2 rounded transition ${career.isActive ? "hover:bg-yellow-500/10 text-yellow-500" : "hover:bg-green-500/10 text-green-500"}`}
                            title={career.isActive ? "Deactivate" : "Activate"}
                          >
                            {career.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          <button onClick={() => handleDeleteCareer(career.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                      {career.salary && <p className="text-sm font-medium text-primary">Salary: {career.salary}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div>
            {applications.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No applications received yet</p>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="px-6 py-4 text-left text-sm font-semibold">Applicant</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Applied</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((application) => (
                        <tr key={application.id} className="border-b border-border hover:bg-muted transition">
                          <td className="px-6 py-4">
                            <div className="font-medium">{application.fullName}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">{application.jobTitle}</td>
                          <td className="px-6 py-4 text-sm">
                            <div>{application.email}</div>
                            <div className="text-muted-foreground">{application.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={application.status}
                              onChange={(e) => handleUpdateApplicationStatus(application.id, e.target.value as JobApplicationData["status"])}
                              className={`px-3 py-1.5 rounded-full text-sm border ${getStatusColor(application.status)} bg-transparent focus:outline-none cursor-pointer`}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(application.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button onClick={() => handleDeleteApplication(application.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition">
                              <Trash2 size={16} />
                            </button>
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
      </div>
    </div>
  );
}
