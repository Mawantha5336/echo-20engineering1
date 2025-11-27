import { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
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

export default function Admin() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [equipment, setEquipment] = useState<EquipmentData[]>([]);
  const [poProjects, setPOProjects] = useState<POProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "projects" | "equipment" | "poProjects"
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

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projectsRes, equipmentRes, poProjectsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/equipment"),
        fetch("/api/po-projects"),
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
      {/* Page Header */}
      <div className="bg-gradient-to-r from-card to-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage projects and equipment data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
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
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add New Project</h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter project name"
                      value={projectForm.projectName}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          projectName: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Customer
                    </label>
                    <Input
                      type="text"
                      placeholder="Customer name"
                      value={projectForm.customer}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          customer: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      OEM
                    </label>
                    <Input
                      type="text"
                      placeholder="OEM name"
                      value={projectForm.oem}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, oem: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Operator
                    </label>
                    <Input
                      type="text"
                      placeholder="Operator name"
                      value={projectForm.operator}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          operator: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Activity
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Installation, Maintenance"
                      value={projectForm.activity}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          activity: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      No. of Sites
                    </label>
                    <Input
                      type="number"
                      placeholder="Number of sites"
                      value={projectForm.noOfSites}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          noOfSites: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                  >
                    {submitting ? (
                      <Loader2 size={20} className="mr-2 animate-spin" />
                    ) : (
                      <Plus size={20} className="mr-2" />
                    )}
                    Add Project
                  </Button>
                </form>
              </div>
            </div>

            {/* Table */}
            <div className="lg:col-span-2">
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
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-6 py-8 text-center text-muted-foreground"
                          >
                            No projects added yet
                          </td>
                        </tr>
                      ) : (
                        projects.map((project) => (
                          <tr
                            key={project.id}
                            className="border-b border-border hover:bg-muted transition"
                          >
                            <td className="px-6 py-4 text-sm">
                              {project.projectName}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {project.customer}
                            </td>
                            <td className="px-6 py-4 text-sm">{project.oem}</td>
                            <td className="px-6 py-4 text-sm">
                              {project.operator}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {project.activity}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {project.noOfSites}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                              >
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

        {/* Equipment Tab */}
        {activeTab === "equipment" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add Equipment</h2>
                <form onSubmit={handleAddEquipment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title
                    </label>
                    <Input
                      type="text"
                      placeholder="Equipment title"
                      value={equipmentForm.title}
                      onChange={(e) =>
                        setEquipmentForm({
                          ...equipmentForm,
                          title: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Equipment description"
                      value={equipmentForm.description}
                      onChange={(e) =>
                        setEquipmentForm({
                          ...equipmentForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    {equipmentForm.image && (
                      <div className="mt-3 relative">
                        <img
                          src={equipmentForm.image}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEquipmentForm({ ...equipmentForm, image: "" })
                          }
                          className="absolute top-2 right-2 bg-destructive text-white p-1 rounded hover:bg-destructive/80 transition"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                  >
                    {submitting ? (
                      <Loader2 size={20} className="mr-2 animate-spin" />
                    ) : (
                      <Plus size={20} className="mr-2" />
                    )}
                    Add Equipment
                  </Button>
                </form>
              </div>
            </div>

            {/* Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {equipment.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No equipment added yet
                  </div>
                ) : (
                  equipment.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card rounded-xl border border-border p-6 hover:border-primary transition"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      ) : (
                        <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
                          <ImageIcon
                            size={40}
                            className="text-muted-foreground"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {item.description}
                      </p>
                      <button
                        onClick={() => handleDeleteEquipment(item.id)}
                        className="w-full text-destructive hover:bg-destructive/10 p-2 rounded transition flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* P/O Projects Tab */}
        {activeTab === "poProjects" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add P/O Project</h2>
                <form onSubmit={handleAddPOProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      P/O Date
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 26.5.2009"
                      value={poProjectForm.poDate}
                      onChange={(e) =>
                        setPOProjectForm({
                          ...poProjectForm,
                          poDate: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Client
                    </label>
                    <Input
                      type="text"
                      placeholder="Client name"
                      value={poProjectForm.client}
                      onChange={(e) =>
                        setPOProjectForm({
                          ...poProjectForm,
                          client: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Product
                    </label>
                    <Input
                      type="text"
                      placeholder="Product name/description"
                      value={poProjectForm.product}
                      onChange={(e) =>
                        setPOProjectForm({
                          ...poProjectForm,
                          product: e.target.value,
                        })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Status
                    </label>
                    <textarea
                      placeholder="Project status or details"
                      value={poProjectForm.projectStatus}
                      onChange={(e) =>
                        setPOProjectForm({
                          ...poProjectForm,
                          projectStatus: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                  >
                    {submitting ? (
                      <Loader2 size={20} className="mr-2 animate-spin" />
                    ) : (
                      <Plus size={20} className="mr-2" />
                    )}
                    Add P/O Project
                  </Button>
                </form>
              </div>
            </div>

            {/* Table */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col style={{ width: "15%" }} />
                      <col style={{ width: "15%" }} />
                      <col style={{ width: "35%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "10%" }} />
                    </colgroup>
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          P/O Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Client
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {poProjects.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-8 text-center text-muted-foreground"
                          >
                            No P/O projects added yet
                          </td>
                        </tr>
                      ) : (
                        poProjects.map((project) => (
                          <tr
                            key={project.id}
                            className="border-b border-border hover:bg-muted transition"
                          >
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {project.poDate}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {project.client}
                            </td>
                            <td
                              className="px-4 py-4 text-sm truncate"
                              title={project.product}
                            >
                              {project.product}
                            </td>
                            <td
                              className="px-4 py-4 text-sm truncate"
                              title={project.projectStatus}
                            >
                              {project.projectStatus}
                            </td>
                            <td className="px-4 py-4 text-sm flex justify-center">
                              <button
                                onClick={() =>
                                  handleDeletePOProject(project.id)
                                }
                                className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                              >
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
      </div>
    </div>
  );
}
