import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const EQUIPMENT_FILE = path.join(DATA_DIR, "equipment.json");
const PO_PROJECTS_FILE = path.join(DATA_DIR, "po-projects.json");
const CAREERS_FILE = path.join(DATA_DIR, "careers.json");
const JOB_APPLICATIONS_FILE = path.join(DATA_DIR, "job-applications.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, defaultValue: T[]): T[] {
  ensureDataDir();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultValue;
}

function writeJsonFile<T>(filePath: string, data: T[]) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export interface Project {
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

export interface Equipment {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

export interface POProject {
  id: string;
  poDate: string;
  client: string;
  product: string;
  projectStatus: string;
  createdAt: string;
}

export interface Career {
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

export interface JobApplication {
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

export const projectsStorage = {
  getAll: (): Project[] => readJsonFile<Project>(PROJECTS_FILE, []),
  
  add: (project: Omit<Project, "id" | "createdAt">): Project => {
    const projects = projectsStorage.getAll();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    writeJsonFile(PROJECTS_FILE, projects);
    return newProject;
  },
  
  delete: (id: string): boolean => {
    const projects = projectsStorage.getAll();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length < projects.length) {
      writeJsonFile(PROJECTS_FILE, filtered);
      return true;
    }
    return false;
  },
  
  update: (id: string, data: Partial<Project>): Project | null => {
    const projects = projectsStorage.getAll();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...data };
      writeJsonFile(PROJECTS_FILE, projects);
      return projects[index];
    }
    return null;
  },
};

export const equipmentStorage = {
  getAll: (): Equipment[] => readJsonFile<Equipment>(EQUIPMENT_FILE, []),
  
  add: (equipment: Omit<Equipment, "id" | "createdAt">): Equipment => {
    const items = equipmentStorage.getAll();
    const newEquipment: Equipment = {
      ...equipment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    items.push(newEquipment);
    writeJsonFile(EQUIPMENT_FILE, items);
    return newEquipment;
  },
  
  delete: (id: string): boolean => {
    const items = equipmentStorage.getAll();
    const filtered = items.filter((e) => e.id !== id);
    if (filtered.length < items.length) {
      writeJsonFile(EQUIPMENT_FILE, filtered);
      return true;
    }
    return false;
  },
  
  update: (id: string, data: Partial<Equipment>): Equipment | null => {
    const items = equipmentStorage.getAll();
    const index = items.findIndex((e) => e.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...data };
      writeJsonFile(EQUIPMENT_FILE, items);
      return items[index];
    }
    return null;
  },
};

export const poProjectsStorage = {
  getAll: (): POProject[] => readJsonFile<POProject>(PO_PROJECTS_FILE, []),
  
  add: (poProject: Omit<POProject, "id" | "createdAt">): POProject => {
    const projects = poProjectsStorage.getAll();
    const newProject: POProject = {
      ...poProject,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    writeJsonFile(PO_PROJECTS_FILE, projects);
    return newProject;
  },
  
  delete: (id: string): boolean => {
    const projects = poProjectsStorage.getAll();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length < projects.length) {
      writeJsonFile(PO_PROJECTS_FILE, filtered);
      return true;
    }
    return false;
  },
  
  update: (id: string, data: Partial<POProject>): POProject | null => {
    const projects = poProjectsStorage.getAll();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...data };
      writeJsonFile(PO_PROJECTS_FILE, projects);
      return projects[index];
    }
    return null;
  },
};

export const careersStorage = {
  getAll: (): Career[] => readJsonFile<Career>(CAREERS_FILE, []),
  
  getActive: (): Career[] => {
    return careersStorage.getAll().filter((c) => c.isActive);
  },
  
  getById: (id: string): Career | undefined => {
    return careersStorage.getAll().find((c) => c.id === id);
  },
  
  add: (career: Omit<Career, "id" | "createdAt">): Career => {
    const careers = careersStorage.getAll();
    const newCareer: Career = {
      ...career,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    careers.push(newCareer);
    writeJsonFile(CAREERS_FILE, careers);
    return newCareer;
  },
  
  delete: (id: string): boolean => {
    const careers = careersStorage.getAll();
    const filtered = careers.filter((c) => c.id !== id);
    if (filtered.length < careers.length) {
      writeJsonFile(CAREERS_FILE, filtered);
      return true;
    }
    return false;
  },
  
  update: (id: string, data: Partial<Career>): Career | null => {
    const careers = careersStorage.getAll();
    const index = careers.findIndex((c) => c.id === id);
    if (index !== -1) {
      careers[index] = { ...careers[index], ...data };
      writeJsonFile(CAREERS_FILE, careers);
      return careers[index];
    }
    return null;
  },
};

export const jobApplicationsStorage = {
  getAll: (): JobApplication[] => readJsonFile<JobApplication>(JOB_APPLICATIONS_FILE, []),
  
  getByCareerId: (careerId: string): JobApplication[] => {
    return jobApplicationsStorage.getAll().filter((a) => a.careerId === careerId);
  },
  
  add: (application: Omit<JobApplication, "id" | "createdAt" | "status">): JobApplication => {
    const applications = jobApplicationsStorage.getAll();
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    applications.push(newApplication);
    writeJsonFile(JOB_APPLICATIONS_FILE, applications);
    return newApplication;
  },
  
  delete: (id: string): boolean => {
    const applications = jobApplicationsStorage.getAll();
    const filtered = applications.filter((a) => a.id !== id);
    if (filtered.length < applications.length) {
      writeJsonFile(JOB_APPLICATIONS_FILE, filtered);
      return true;
    }
    return false;
  },
  
  updateStatus: (id: string, status: JobApplication["status"]): JobApplication | null => {
    const applications = jobApplicationsStorage.getAll();
    const index = applications.findIndex((a) => a.id === id);
    if (index !== -1) {
      applications[index].status = status;
      writeJsonFile(JOB_APPLICATIONS_FILE, applications);
      return applications[index];
    }
    return null;
  },
};
