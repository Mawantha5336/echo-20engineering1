import { useState, useEffect } from "react";
import { Briefcase, MapPin, Loader2, Sparkles, Send, X, CheckCircle, Building2, Users, FileText, Upload, DollarSign, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logoImage from "@assets/4_1764310807924.png";

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

export default function Careers() {
  const [careers, setCareers] = useState<CareerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<CareerData | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [cvFileName, setCvFileName] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: "",
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/careers/active");
      if (response.ok) {
        const data = await response.json();
        setCareers(data);
      }
    } catch (error) {
      console.error("Error fetching careers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    setCvFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setApplicationForm({ ...applicationForm, resume: base64String });
    };
    reader.readAsDataURL(file);
  };

  const removeCv = () => {
    setCvFileName("");
    setApplicationForm({ ...applicationForm, resume: "" });
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!applicationForm.fullName || !applicationForm.email || !applicationForm.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!applicationForm.resume) {
      toast.error("Please upload your CV/Resume");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerId: selectedJob.id,
          jobTitle: selectedJob.jobTitle,
          ...applicationForm,
        }),
      });

      if (response.ok) {
        setApplicationSuccess(true);
        setTimeout(() => {
          setShowApplicationForm(false);
          setSelectedJob(null);
          setApplicationSuccess(false);
          setCvFileName("");
          setApplicationForm({
            fullName: "",
            email: "",
            phone: "",
            coverLetter: "",
            resume: "",
          });
        }, 2000);
      } else {
        toast.error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const getEmploymentTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("full")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (lowerType.includes("part")) return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    if (lowerType.includes("contract")) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    if (lowerType.includes("intern")) return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    return "bg-primary/10 text-primary border-primary/30";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a1a0a 25%, #0a0a0a 50%, #1a1a0a 75%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
          <p className="text-gray-400 text-lg font-light tracking-wide">Loading career opportunities...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0a1a0a 50%, #0a0a0a 100%)' }}>
      {/* Navigation Header - same style as ProjectsEquipment */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_2px_10px_rgba(255,255,255,0.1)]" style={{ backgroundColor: '#030a3a' }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex justify-between items-center py-4">
            <a href="/echo/index1.html" className="flex items-center">
              <img src={logoImage} alt="Eco Engineering Logo" className="h-[90px] w-auto" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <ul className="flex">
                <li className="ml-8">
                  <a 
                    href="/echo/index1.html" 
                    className="text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
                  >
                    Home
                  </a>
                </li>
                <li className="ml-8">
                  <a 
                    href="/echo/aboutUs.html" 
                    className="text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
                  >
                    About Us
                  </a>
                </li>
                <li className="ml-8 relative group">
                  <button 
                    className="flex items-center gap-1 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
                  >
                    Services <ChevronDown className="w-4 h-4" />
                  </button>
                  <div 
                    className="absolute top-full left-0 min-w-[200px] rounded shadow-[0_8px_16px_rgba(255,255,255,0.1)] py-2.5 border border-[#4CAF50] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                    style={{ backgroundColor: '#030a3a' }}
                  >
                    <a 
                      href="/projects-equipment" 
                      className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                    >
                      Install & Maintenance Telecommunications Infrastructure System
                    </a>
                    <a 
                      href="/echo/Supply_Telecommunication_Equipment" 
                      className="block px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#4CAF50] hover:text-[#030a3a]"
                    >
                      Supply Telecommunication Equipment
                    </a>
                  </div>
                </li>
                <li className="ml-8">
                  <a 
                    href="/echo/projects.html" 
                    className="text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
                  >
                    Projects
                  </a>
                </li>
                <li className="ml-8">
                  <a 
                    href="/echo/contact.html" 
                    className="text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white text-2xl cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-[#4CAF50]/30 pt-4">
              <a 
                href="/echo/index1.html" 
                className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              >
                Home
              </a>
              <a 
                href="/echo/aboutUs.html" 
                className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              >
                About Us
              </a>
              <div>
                <button 
                  className="flex items-center gap-2 py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50] w-full"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                >
                  Services <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="pl-4 border-l-2 border-[#4CAF50] ml-2 mt-1">
                    <a 
                      href="/projects-equipment" 
                      className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                    >
                      Install & Maintenance Telecommunications
                    </a>
                    <a 
                      href="/echo/Supply_Telecommunication_Equipment" 
                      className="block py-2 text-white/80 transition-all duration-300 hover:text-[#4CAF50] text-sm"
                    >
                      Supply Telecommunication Equipment
                    </a>
                  </div>
                )}
              </div>
              <a 
                href="/echo/projects.html" 
                className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              >
                Projects
              </a>
              <a 
                href="/echo/contact.html" 
                className="block py-3 text-white font-medium transition-colors duration-300 hover:text-[#4CAF50]"
              >
                Contact
              </a>
            </nav>
          )}
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative h-[500px] md:h-[600px] overflow-hidden pt-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url(/images/hero-banner.png)',
          }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)',
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
              <span className="text-sm text-primary font-medium">Join Our Team</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              Build Your Career
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
              With Eco Engineering
            </h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="text-white font-semibold">{careers.length}</span>
                <span className="text-gray-400">Open Positions</span>
              </div>
            </motion.div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
                <span className="text-gray-400 text-sm">Growth Focused</span>
              </div>
              <p className="text-white font-medium">Career Development</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-sm">Collaborative</span>
              </div>
              <p className="text-white font-medium">Team Environment</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-sm">Competitive</span>
              </div>
              <p className="text-white font-medium">Benefits Package</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Open Positions</h3>
          <p className="text-gray-400">Find your next opportunity with us</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {careers.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">No Open Positions</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  We don't have any open positions at the moment. Please check back later for new opportunities.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {careers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-primary/50 transition-all duration-500"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                            {career.jobTitle}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs border ${getEmploymentTypeColor(career.employmentType)}`}>
                            {career.employmentType}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            <span>{career.department}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{career.location}</span>
                          </div>
                          {career.salary && (
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4" />
                              <span>{career.salary}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedJob(career);
                          setShowApplicationForm(true);
                        }}
                        className="bg-gradient-to-r from-primary to-yellow-500 text-black font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold text-white mb-2">Description</h5>
                        <p className="text-gray-400 text-sm leading-relaxed">{career.description}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-white mb-2">Requirements</h5>
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{career.requirements}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showApplicationForm && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => {
              if (!submitting) {
                setShowApplicationForm(false);
                setSelectedJob(null);
                setCvFileName("");
                setApplicationForm({
                  fullName: "",
                  email: "",
                  phone: "",
                  coverLetter: "",
                  resume: "",
                });
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-950 p-6 md:p-8 relative overflow-hidden my-8"
            >
              {applicationSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-gray-400">Thank you for applying. We'll review your CV and be in touch soon.</p>
                </motion.div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedJob(null);
                      setCvFileName("");
                      setApplicationForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        coverLetter: "",
                        resume: "",
                      });
                    }}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">Apply for Position</h3>
                    <p className="text-primary font-medium">{selectedJob.jobTitle}</p>
                    <p className="text-gray-400 text-sm mt-1">{selectedJob.department} • {selectedJob.location}</p>
                  </div>
                  
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={applicationForm.fullName}
                        onChange={(e) => setApplicationForm({ ...applicationForm, fullName: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Upload CV/Resume <span className="text-red-400">*</span>
                      </label>
                      {!cvFileName ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary mb-2 transition-colors" />
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PDF or Word document (Max 5MB)</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleCvUpload}
                          />
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/30">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white truncate max-w-[200px]">{cvFileName}</p>
                              <p className="text-xs text-gray-400">CV uploaded successfully</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeCv}
                            className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cover Letter <span className="text-gray-500">(Optional)</span>
                      </label>
                      <textarea
                        placeholder="Tell us why you're interested in this position..."
                        value={applicationForm.coverLetter}
                        onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        rows={4}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-primary to-yellow-500 text-black font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - same style as ProjectsEquipment */}
      <footer style={{ backgroundColor: '#030a3a' }} className="border-t border-[#4CAF50]/20 mt-16">
        <div className="max-w-[1200px] mx-auto px-5 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src={logoImage} alt="Eco Engineering Logo" className="h-16 w-auto mb-4" />
              <p className="text-[#e0e0e0] text-sm leading-relaxed">
                Innovative engineering solutions with a commitment to sustainability and environmental responsibility.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4CAF50] transition-colors duration-300">
                  <span className="text-white text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4CAF50] transition-colors duration-300">
                  <span className="text-white text-sm">t</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4CAF50] transition-colors duration-300">
                  <span className="text-white text-sm">in</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/echo/index1.html" className="text-[#bbbbbb] hover:text-[#4CAF50] transition-colors duration-300 text-sm">Home</a></li>
                <li><a href="/echo/aboutUs.html" className="text-[#bbbbbb] hover:text-[#4CAF50] transition-colors duration-300 text-sm">About Us</a></li>
                <li><a href="#" className="text-[#bbbbbb] hover:text-[#4CAF50] transition-colors duration-300 text-sm">Services</a></li>
                <li><a href="/echo/projects.html" className="text-[#bbbbbb] hover:text-[#4CAF50] transition-colors duration-300 text-sm">Projects</a></li>
                <li><a href="/echo/contact.html" className="text-[#bbbbbb] hover:text-[#4CAF50] transition-colors duration-300 text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-[#bbbbbb] text-sm">
                <li className="flex items-center gap-2">
                  <span>Waliwita Junction, Kaduwela</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>011 234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>ecoengineering@.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#4CAF50]/20 mt-8 pt-8 text-center">
            <p className="text-[#bbbbbb]/60 text-sm">&copy; 2023 Eco Engineering. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
