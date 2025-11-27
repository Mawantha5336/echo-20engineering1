import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const EQUIPMENT_FILE = path.join(DATA_DIR, "equipment.json");
const PO_PROJECTS_FILE = path.join(DATA_DIR, "po-projects.json");

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
