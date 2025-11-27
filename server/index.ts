import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getProjects,
  addProject,
  deleteProject,
  getEquipment,
  addEquipment,
  deleteEquipment,
  getPOProjects,
  addPOProject,
  deletePOProject,
} from "./routes/data";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Projects API
  app.get("/api/projects", getProjects);
  app.post("/api/projects", addProject);
  app.delete("/api/projects/:id", deleteProject);

  // Equipment API
  app.get("/api/equipment", getEquipment);
  app.post("/api/equipment", addEquipment);
  app.delete("/api/equipment/:id", deleteEquipment);

  // P/O Projects API
  app.get("/api/po-projects", getPOProjects);
  app.post("/api/po-projects", addPOProject);
  app.delete("/api/po-projects/:id", deletePOProject);

  return app;
}
