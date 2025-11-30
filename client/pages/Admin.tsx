import { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, Loader2, Briefcase, Eye, EyeOff, Users, FileText, Download, Mail, Phone, Printer, LayoutDashboard, FolderKanban, Wrench, ClipboardList, TrendingUp, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  resume?: string;
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
    "welcome" | "projects" | "equipment" | "poProjects" | "careers" | "applications"
  >("welcome");
  
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

  const generateProjectsPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(20);
    doc.text("Projects Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total Projects: ${projects.length}`, 14, 36);

    autoTable(doc, {
      startY: 42,
      head: [["#", "Project Name", "Customer", "OEM", "Operator", "Activity", "No. of Sites"]],
      body: projects.map((p, idx) => [
        idx + 1,
        p.projectName,
        p.customer,
        p.oem,
        p.operator,
        p.activity,
        p.noOfSites,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [139, 195, 74] },
    });

    doc.save("projects-report.pdf");
    toast.success("Projects PDF downloaded");
  };

  const printProjects = () => {
    const printContent = `
      <html>
        <head>
          <title>Projects Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background-color: #8bc34a; color: white; }
            .meta { color: #666; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Projects Report</h1>
          <p class="meta">Generated on: ${new Date().toLocaleDateString()} | Total Projects: ${projects.length}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Customer</th>
                <th>OEM</th>
                <th>Operator</th>
                <th>Activity</th>
                <th>No. of Sites</th>
              </tr>
            </thead>
            <tbody>
              ${projects.map((p, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${p.projectName}</td>
                  <td>${p.customer}</td>
                  <td>${p.oem}</td>
                  <td>${p.operator}</td>
                  <td>${p.activity}</td>
                  <td>${p.noOfSites}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const generateEquipmentPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(20);
    doc.text("Equipment Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total Equipment: ${equipment.length}`, 14, 36);

    autoTable(doc, {
      startY: 42,
      head: [["#", "Title", "Description"]],
      body: equipment.map((e, idx) => [idx + 1, e.title, e.description]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [139, 195, 74] },
      columnStyles: { 2: { cellWidth: 150 } },
    });

    doc.save("equipment-report.pdf");
    toast.success("Equipment PDF downloaded");
  };

  const printEquipment = () => {
    const printContent = `
      <html>
        <head>
          <title>Equipment Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background-color: #8bc34a; color: white; }
            .meta { color: #666; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Equipment Report</h1>
          <p class="meta">Generated on: ${new Date().toLocaleDateString()} | Total Equipment: ${equipment.length}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${equipment.map((e, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${e.title}</td>
                  <td>${e.description}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const generatePOProjectsPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(20);
    doc.text("P/O Projects Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total P/O Projects: ${poProjects.length}`, 14, 36);

    autoTable(doc, {
      startY: 42,
      head: [["#", "P/O Date", "Client", "Product", "Status"]],
      body: poProjects.map((p, idx) => [idx + 1, p.poDate, p.client, p.product, p.projectStatus]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [139, 195, 74] },
    });

    doc.save("po-projects-report.pdf");
    toast.success("P/O Projects PDF downloaded");
  };

  const printPOProjects = () => {
    const printContent = `
      <html>
        <head>
          <title>P/O Projects Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background-color: #8bc34a; color: white; }
            .meta { color: #666; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>P/O Projects Report</h1>
          <p class="meta">Generated on: ${new Date().toLocaleDateString()} | Total P/O Projects: ${poProjects.length}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>P/O Date</th>
                <th>Client</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${poProjects.map((p, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${p.poDate}</td>
                  <td>${p.client}</td>
                  <td>${p.product}</td>
                  <td>${p.projectStatus}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const generateApplicationsPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(20);
    doc.text("Job Applications Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total Applications: ${applications.length}`, 14, 36);
    doc.text(`Pending: ${applications.filter(a => a.status === "pending").length} | Reviewed: ${applications.filter(a => a.status === "reviewed").length} | Shortlisted: ${applications.filter(a => a.status === "shortlisted").length} | Rejected: ${applications.filter(a => a.status === "rejected").length}`, 14, 42);

    autoTable(doc, {
      startY: 48,
      head: [["#", "Applicant Name", "Position", "Email", "Phone", "Status", "Applied Date"]],
      body: applications.map((a, idx) => [
        idx + 1,
        a.fullName,
        a.jobTitle,
        a.email,
        a.phone,
        a.status.charAt(0).toUpperCase() + a.status.slice(1),
        new Date(a.createdAt).toLocaleDateString(),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [139, 195, 74] },
    });

    doc.save("applications-report.pdf");
    toast.success("Applications PDF downloaded");
  };

  const printApplications = () => {
    const printContent = `
      <html>
        <head>
          <title>Job Applications Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background-color: #8bc34a; color: white; }
            .meta { color: #666; margin-bottom: 10px; }
            .stats { margin-bottom: 10px; }
            .stats span { margin-right: 15px; }
          </style>
        </head>
        <body>
          <h1>Job Applications Report</h1>
          <p class="meta">Generated on: ${new Date().toLocaleDateString()} | Total Applications: ${applications.length}</p>
          <p class="stats">
            <span>Pending: ${applications.filter(a => a.status === "pending").length}</span>
            <span>Reviewed: ${applications.filter(a => a.status === "reviewed").length}</span>
            <span>Shortlisted: ${applications.filter(a => a.status === "shortlisted").length}</span>
            <span>Rejected: ${applications.filter(a => a.status === "rejected").length}</span>
          </p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Applicant Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              ${applications.map((a, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${a.fullName}</td>
                  <td>${a.jobTitle}</td>
                  <td>${a.email}</td>
                  <td>${a.phone}</td>
                  <td>${a.status.charAt(0).toUpperCase() + a.status.slice(1)}</td>
                  <td>${new Date(a.createdAt).toLocaleDateString()}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 50%, #0d1f3c 100%)' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-blue-200/70">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 50%, #0d1f3c 100%)' }}>
      <div className="bg-gradient-to-r from-[#0d1f3c] via-[#1a365d] to-[#0d1f3c] border-b border-blue-500/20 shadow-lg shadow-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2 text-white">Admin Panel</h1>
          <p className="text-blue-200/70">
            Manage projects, equipment, careers, and applications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-4 mb-8 border-b border-blue-500/20 overflow-x-auto">
          <button
            onClick={() => setActiveTab("welcome")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "welcome"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-blue-200/60 hover:text-blue-200"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "projects"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-blue-200/60 hover:text-blue-200"
            }`}
          >
            <FolderKanban size={18} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "equipment"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-blue-200/60 hover:text-blue-200"
            }`}
          >
            <Wrench size={18} />
            Equipment
          </button>
          <button
            onClick={() => setActiveTab("poProjects")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "poProjects"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-blue-200/60 hover:text-blue-200"
            }`}
          >
            <ClipboardList size={18} />
            P/O Projects
          </button>
          <button
            onClick={() => setActiveTab("careers")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "careers"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-blue-200/60 hover:text-blue-200"
            }`}
          >
            <Briefcase size={18} />
            Careers
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === "applications"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-blue-200/60 hover:text-blue-200"
            }`}
          >
            <Users size={18} />
            Applications
            {applications.filter(a => a.status === "pending").length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                {applications.filter(a => a.status === "pending").length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "welcome" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white">Welcome to Admin Dashboard</h2>
              <p className="text-blue-200/70">Manage your projects, equipment, careers, and applications from here</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 cursor-pointer hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-900/30"
                onClick={() => setActiveTab("projects")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{projects.length}</p>
                    <p className="text-sm text-blue-200/70">Total Projects</p>
                  </div>
                </div>
                <p className="text-xs text-blue-300/50">Click to manage projects</p>
              </div>
              
              <div 
                className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 cursor-pointer hover:border-emerald-400/50 transition-all hover:shadow-lg hover:shadow-emerald-900/30"
                onClick={() => setActiveTab("equipment")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{equipment.length}</p>
                    <p className="text-sm text-blue-200/70">Equipment Items</p>
                  </div>
                </div>
                <p className="text-xs text-blue-300/50">Click to manage equipment</p>
              </div>
              
              <div 
                className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 cursor-pointer hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-900/30"
                onClick={() => setActiveTab("poProjects")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{poProjects.length}</p>
                    <p className="text-sm text-blue-200/70">P/O Projects</p>
                  </div>
                </div>
                <p className="text-xs text-blue-300/50">Click to manage P/O projects</p>
              </div>
              
              <div 
                className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 cursor-pointer hover:border-amber-400/50 transition-all hover:shadow-lg hover:shadow-amber-900/30"
                onClick={() => setActiveTab("careers")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{careers.filter(c => c.isActive).length}</p>
                    <p className="text-sm text-blue-200/70">Active Openings</p>
                  </div>
                </div>
                <p className="text-xs text-blue-300/50">Click to manage careers</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 cursor-pointer hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-900/30"
                onClick={() => setActiveTab("applications")}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Users className="w-5 h-5 text-blue-400" />
                    Job Applications
                  </h3>
                  {applications.filter(a => a.status === "pending").length > 0 && (
                    <span className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full">
                      {applications.filter(a => a.status === "pending").length} Pending
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-white">{applications.length}</p>
                    <p className="text-xs text-blue-200/70">Total</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-yellow-400">{applications.filter(a => a.status === "pending").length}</p>
                    <p className="text-xs text-blue-200/70">Pending</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-emerald-400">{applications.filter(a => a.status === "shortlisted").length}</p>
                    <p className="text-xs text-blue-200/70">Shortlisted</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-red-400">{applications.filter(a => a.status === "rejected").length}</p>
                    <p className="text-xs text-blue-200/70">Rejected</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-white">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200/70">Total Projects</span>
                    <span className="font-semibold text-white">{projects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200/70">Equipment Items</span>
                    <span className="font-semibold text-white">{equipment.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200/70">Active Job Listings</span>
                    <span className="font-semibold text-white">{careers.filter(c => c.isActive).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200/70">Pending Applications</span>
                    <span className="font-semibold text-blue-400">{applications.filter(a => a.status === "pending").length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6 text-white">Add New Project</h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Project Name</label>
                    <Input
                      type="text"
                      placeholder="Enter project name"
                      value={projectForm.projectName}
                      onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Customer</label>
                    <Input
                      type="text"
                      placeholder="Customer name"
                      value={projectForm.customer}
                      onChange={(e) => setProjectForm({ ...projectForm, customer: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">OEM</label>
                    <Input
                      type="text"
                      placeholder="OEM name"
                      value={projectForm.oem}
                      onChange={(e) => setProjectForm({ ...projectForm, oem: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Operator</label>
                    <Input
                      type="text"
                      placeholder="Operator name"
                      value={projectForm.operator}
                      onChange={(e) => setProjectForm({ ...projectForm, operator: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Activity</label>
                    <Input
                      type="text"
                      placeholder="e.g., Installation, Maintenance"
                      value={projectForm.activity}
                      onChange={(e) => setProjectForm({ ...projectForm, activity: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">No. of Sites</label>
                    <Input
                      type="number"
                      placeholder="Number of sites"
                      value={projectForm.noOfSites}
                      onChange={(e) => setProjectForm({ ...projectForm, noOfSites: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg hover:shadow-blue-900/30">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add Project
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Projects List</h2>
                <div className="flex gap-2">
                  <button
                    onClick={generateProjectsPDF}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                    title="Download PDF"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={printProjects}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                    title="Print Report"
                  >
                    <Printer size={18} />
                  </button>
                </div>
              </div>
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20 bg-[#1a2d4a]/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Project Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">OEM</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Operator</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Activity</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Sites</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-8 text-center text-blue-200/50">No projects added yet</td>
                        </tr>
                      ) : (
                        projects.map((project) => (
                          <tr key={project.id} className="border-b border-blue-500/10 hover:bg-[#1a2d4a]/30 transition">
                            <td className="px-6 py-4 text-sm text-white">{project.projectName}</td>
                            <td className="px-6 py-4 text-sm text-blue-200/80">{project.customer}</td>
                            <td className="px-6 py-4 text-sm text-blue-200/80">{project.oem}</td>
                            <td className="px-6 py-4 text-sm text-blue-200/80">{project.operator}</td>
                            <td className="px-6 py-4 text-sm text-blue-200/80">{project.activity}</td>
                            <td className="px-6 py-4 text-sm text-blue-400">{project.noOfSites}</td>
                            <td className="px-6 py-4 text-sm">
                              <button onClick={() => handleDeleteProject(project.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded transition">
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
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6 text-white">Add Equipment</h2>
                <form onSubmit={handleAddEquipment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Title</label>
                    <Input
                      type="text"
                      placeholder="Equipment title"
                      value={equipmentForm.title}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, title: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Description</label>
                    <textarea
                      placeholder="Equipment description"
                      value={equipmentForm.description}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1a2d4a] border border-blue-500/30 rounded-lg text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="w-full px-3 py-2 bg-[#1a2d4a] border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer file:bg-blue-500/20 file:border-0 file:text-blue-200 file:mr-3 file:px-3 file:py-1 file:rounded"
                    />
                    {equipmentForm.image && (
                      <div className="mt-3 relative">
                        <img src={equipmentForm.image} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-blue-500/30" />
                        <button type="button" onClick={() => setEquipmentForm({ ...equipmentForm, image: "" })} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition">✕</button>
                      </div>
                    )}
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg hover:shadow-blue-900/30">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add Equipment
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Equipment List</h2>
                <div className="flex gap-2">
                  <button
                    onClick={generateEquipmentPDF}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                    title="Download PDF"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={printEquipment}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                    title="Print Report"
                  >
                    <Printer size={18} />
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {equipment.length === 0 ? (
                  <div className="col-span-2 text-center py-16 bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20">
                    <ImageIcon className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
                    <p className="text-blue-200/50">No equipment added yet</p>
                  </div>
                ) : (
                  equipment.map((item) => (
                    <div key={item.id} className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden hover:border-blue-400/40 transition">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                      ) : (
                        <div className="w-full h-40 bg-[#1a2d4a]/50 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-blue-300/50" />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-white">{item.title}</h3>
                            <p className="text-sm text-blue-200/70 mt-1">{item.description}</p>
                          </div>
                          <button onClick={() => handleDeleteEquipment(item.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded transition">
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
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6 text-white">Add P/O Project</h2>
                <form onSubmit={handleAddPOProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">P/O Date</label>
                    <Input
                      type="text"
                      placeholder="e.g., January 2024"
                      value={poProjectForm.poDate}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, poDate: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Client</label>
                    <Input
                      type="text"
                      placeholder="Client name"
                      value={poProjectForm.client}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, client: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Product</label>
                    <Input
                      type="text"
                      placeholder="Product name"
                      value={poProjectForm.product}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, product: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Project Status</label>
                    <Input
                      type="text"
                      placeholder="e.g., Completed, In Progress"
                      value={poProjectForm.projectStatus}
                      onChange={(e) => setPOProjectForm({ ...poProjectForm, projectStatus: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg hover:shadow-blue-900/30">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add P/O Project
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">P/O Projects List</h2>
                <div className="flex gap-2">
                  <button
                    onClick={generatePOProjectsPDF}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                    title="Download PDF"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={printPOProjects}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                    title="Print Report"
                  >
                    <Printer size={18} />
                  </button>
                </div>
              </div>
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20 bg-[#1a2d4a]/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">P/O Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Product</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {poProjects.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-blue-200/50">No P/O projects added yet</td>
                        </tr>
                      ) : (
                        poProjects.map((project) => (
                          <tr key={project.id} className="border-b border-blue-500/10 hover:bg-[#1a2d4a]/30 transition">
                            <td className="px-6 py-4 text-sm text-white">{project.poDate}</td>
                            <td className="px-6 py-4 text-sm text-blue-200/80">{project.client}</td>
                            <td className="px-6 py-4 text-sm text-blue-200/80">{project.product}</td>
                            <td className="px-6 py-4 text-sm text-blue-400">{project.projectStatus}</td>
                            <td className="px-6 py-4 text-sm">
                              <button onClick={() => handleDeletePOProject(project.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded transition">
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
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6 text-white">Add Job Vacancy</h2>
                <form onSubmit={handleAddCareer} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Job Title *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Senior Engineer"
                      value={careerForm.jobTitle}
                      onChange={(e) => setCareerForm({ ...careerForm, jobTitle: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Department *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Engineering"
                      value={careerForm.department}
                      onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Location *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Colombo, Sri Lanka"
                      value={careerForm.location}
                      onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Employment Type *</label>
                    <select
                      value={careerForm.employmentType}
                      onChange={(e) => setCareerForm({ ...careerForm, employmentType: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1a2d4a] border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="" className="bg-[#1a2d4a]">Select type</option>
                      <option value="Full-time" className="bg-[#1a2d4a]">Full-time</option>
                      <option value="Part-time" className="bg-[#1a2d4a]">Part-time</option>
                      <option value="Contract" className="bg-[#1a2d4a]">Contract</option>
                      <option value="Internship" className="bg-[#1a2d4a]">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Salary (Optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g., $50,000 - $70,000"
                      value={careerForm.salary}
                      onChange={(e) => setCareerForm({ ...careerForm, salary: e.target.value })}
                      className="bg-[#1a2d4a] border-blue-500/30 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Description *</label>
                    <textarea
                      placeholder="Job description..."
                      value={careerForm.description}
                      onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1a2d4a] border border-blue-500/30 rounded-lg text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">Requirements *</label>
                    <textarea
                      placeholder="Job requirements (one per line)..."
                      value={careerForm.requirements}
                      onChange={(e) => setCareerForm({ ...careerForm, requirements: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1a2d4a] border border-blue-500/30 rounded-lg text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={careerForm.isActive}
                      onChange={(e) => setCareerForm({ ...careerForm, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-blue-500/30 bg-[#1a2d4a]"
                    />
                    <label htmlFor="isActive" className="text-sm text-blue-200">Active (visible to candidates)</label>
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg hover:shadow-blue-900/30">
                    {submitting ? <Loader2 size={20} className="mr-2 animate-spin" /> : <Plus size={20} className="mr-2" />}
                    Add Job Vacancy
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {careers.length === 0 ? (
                  <div className="text-center py-16 bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20">
                    <Briefcase className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
                    <p className="text-blue-200/50">No job vacancies added yet</p>
                  </div>
                ) : (
                  careers.map((career) => (
                    <div key={career.id} className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 hover:border-blue-400/40 transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-white">{career.jobTitle}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${career.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"}`}>
                              {career.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <p className="text-sm text-blue-200/70 mt-1">
                            {career.department} • {career.location} • {career.employmentType}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleCareerStatus(career.id, career.isActive)}
                            className={`p-2 rounded transition ${career.isActive ? "hover:bg-yellow-500/10 text-yellow-400" : "hover:bg-emerald-500/10 text-emerald-400"}`}
                            title={career.isActive ? "Deactivate" : "Activate"}
                          >
                            {career.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          <button onClick={() => handleDeleteCareer(career.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-blue-200/70 mb-2">{career.description}</p>
                      {career.salary && <p className="text-sm font-medium text-blue-400">Salary: {career.salary}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Job Applications</h2>
              <div className="flex gap-2">
                <button
                  onClick={generateApplicationsPDF}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                  title="Download PDF"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={printApplications}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                  title="Print Report"
                >
                  <Printer size={18} />
                </button>
              </div>
            </div>
            {applications.length === 0 ? (
              <div className="text-center py-16 bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20">
                <Users className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
                <p className="text-blue-200/50">No applications received yet</p>
              </div>
            ) : (
              <div className="bg-[#0d1f3c]/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20 bg-[#1a2d4a]/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Applicant</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Position</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">CV/Resume</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Applied</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((application) => (
                        <tr key={application.id} className="border-b border-blue-500/10 hover:bg-[#1a2d4a]/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{application.fullName}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-blue-200/80">{application.jobTitle}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-1.5 mb-1 text-blue-200/80">
                              <Mail size={14} className="text-blue-400" />
                              <span>{application.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-blue-200/60">
                              <Phone size={14} className="text-blue-400" />
                              <span>{application.phone}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {application.resume ? (
                              <div className="flex items-center gap-2">
                                <a
                                  href={application.resume}
                                  download={`CV_${application.fullName.replace(/\s+/g, '_')}.pdf`}
                                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                                  title="Download CV"
                                >
                                  <Download size={16} />
                                </a>
                                <button
                                  onClick={() => {
                                    const newWindow = window.open();
                                    if (newWindow) {
                                      newWindow.document.write(`
                                        <html>
                                          <head><title>CV - ${application.fullName}</title></head>
                                          <body style="margin:0;padding:0;">
                                            <embed src="${application.resume}" type="application/pdf" width="100%" height="100%" style="position:absolute;top:0;left:0;right:0;bottom:0;" />
                                          </body>
                                        </html>
                                      `);
                                    }
                                  }}
                                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                                  title="View CV"
                                >
                                  <FileText size={16} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-blue-200/50 text-sm">No CV uploaded</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={application.status}
                              onChange={(e) => handleUpdateApplicationStatus(application.id, e.target.value as JobApplicationData["status"])}
                              className={`px-3 py-1.5 rounded-full text-sm border ${getStatusColor(application.status)} bg-[#1a2d4a] focus:outline-none cursor-pointer`}
                            >
                              <option value="pending" className="bg-[#1a2d4a]">Pending</option>
                              <option value="reviewed" className="bg-[#1a2d4a]">Reviewed</option>
                              <option value="shortlisted" className="bg-[#1a2d4a]">Shortlisted</option>
                              <option value="rejected" className="bg-[#1a2d4a]">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-blue-200/60">
                            {new Date(application.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button onClick={() => handleDeleteApplication(application.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded transition">
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
