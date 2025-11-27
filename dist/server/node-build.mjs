import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import fs from "fs";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const EQUIPMENT_FILE = path.join(DATA_DIR, "equipment.json");
const PO_PROJECTS_FILE = path.join(DATA_DIR, "po-projects.json");
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}
function readJsonFile(filePath, defaultValue) {
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
function writeJsonFile(filePath, data) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
const projectsStorage = {
  getAll: () => readJsonFile(PROJECTS_FILE, []),
  add: (project) => {
    const projects = projectsStorage.getAll();
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    projects.push(newProject);
    writeJsonFile(PROJECTS_FILE, projects);
    return newProject;
  },
  delete: (id) => {
    const projects = projectsStorage.getAll();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length < projects.length) {
      writeJsonFile(PROJECTS_FILE, filtered);
      return true;
    }
    return false;
  },
  update: (id, data) => {
    const projects = projectsStorage.getAll();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...data };
      writeJsonFile(PROJECTS_FILE, projects);
      return projects[index];
    }
    return null;
  }
};
const equipmentStorage = {
  getAll: () => readJsonFile(EQUIPMENT_FILE, []),
  add: (equipment) => {
    const items = equipmentStorage.getAll();
    const newEquipment = {
      ...equipment,
      id: Date.now().toString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    items.push(newEquipment);
    writeJsonFile(EQUIPMENT_FILE, items);
    return newEquipment;
  },
  delete: (id) => {
    const items = equipmentStorage.getAll();
    const filtered = items.filter((e) => e.id !== id);
    if (filtered.length < items.length) {
      writeJsonFile(EQUIPMENT_FILE, filtered);
      return true;
    }
    return false;
  },
  update: (id, data) => {
    const items = equipmentStorage.getAll();
    const index = items.findIndex((e) => e.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...data };
      writeJsonFile(EQUIPMENT_FILE, items);
      return items[index];
    }
    return null;
  }
};
const poProjectsStorage = {
  getAll: () => readJsonFile(PO_PROJECTS_FILE, []),
  add: (poProject) => {
    const projects = poProjectsStorage.getAll();
    const newProject = {
      ...poProject,
      id: Date.now().toString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    projects.push(newProject);
    writeJsonFile(PO_PROJECTS_FILE, projects);
    return newProject;
  },
  delete: (id) => {
    const projects = poProjectsStorage.getAll();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length < projects.length) {
      writeJsonFile(PO_PROJECTS_FILE, filtered);
      return true;
    }
    return false;
  },
  update: (id, data) => {
    const projects = poProjectsStorage.getAll();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...data };
      writeJsonFile(PO_PROJECTS_FILE, projects);
      return projects[index];
    }
    return null;
  }
};
const getProjects = (_req, res) => {
  try {
    const projects = projectsStorage.getAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};
const addProject = (req, res) => {
  try {
    const { projectName, customer, oem, operator, activity, noOfSites, image } = req.body;
    if (!projectName || !customer || !oem || !operator || !activity || noOfSites === void 0) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const project = projectsStorage.add({
      projectName,
      customer,
      oem,
      operator,
      activity,
      noOfSites: parseInt(noOfSites),
      image
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
};
const deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    const success = projectsStorage.delete(id);
    if (success) {
      res.json({ message: "Project deleted" });
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
const getEquipment = (_req, res) => {
  try {
    const equipment = equipmentStorage.getAll();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
};
const addEquipment = (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const equipment = equipmentStorage.add({
      title,
      description,
      image
    });
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add equipment" });
  }
};
const deleteEquipment = (req, res) => {
  try {
    const { id } = req.params;
    const success = equipmentStorage.delete(id);
    if (success) {
      res.json({ message: "Equipment deleted" });
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete equipment" });
  }
};
const getPOProjects = (_req, res) => {
  try {
    const projects = poProjectsStorage.getAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch P/O projects" });
  }
};
const addPOProject = (req, res) => {
  try {
    const { poDate, client, product, projectStatus } = req.body;
    if (!poDate || !client || !product || !projectStatus) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const project = poProjectsStorage.add({
      poDate,
      client,
      product,
      projectStatus
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to add P/O project" });
  }
};
const deletePOProject = (req, res) => {
  try {
    const { id } = req.params;
    const success = poProjectsStorage.delete(id);
    if (success) {
      res.json({ message: "P/O Project deleted" });
    } else {
      res.status(404).json({ error: "P/O Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete P/O project" });
  }
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json({ limit: "50mb" }));
  app2.use(express__default.urlencoded({ extended: true, limit: "50mb" }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.get("/api/projects", getProjects);
  app2.post("/api/projects", addProject);
  app2.delete("/api/projects/:id", deleteProject);
  app2.get("/api/equipment", getEquipment);
  app2.post("/api/equipment", addEquipment);
  app2.delete("/api/equipment/:id", deleteEquipment);
  app2.get("/api/po-projects", getPOProjects);
  app2.post("/api/po-projects", addPOProject);
  app2.delete("/api/po-projects/:id", deletePOProject);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 5e3;
const host = "0.0.0.0";
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, host, () => {
  console.log(`🚀 Fusion Starter server running on ${host}:${port}`);
  console.log(`📱 Frontend: http://${host}:${port}`);
  console.log(`🔧 API: http://${host}:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
