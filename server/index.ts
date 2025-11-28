import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
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
  getCareers,
  getActiveCareers,
  getCareerById,
  addCareer,
  updateCareer,
  deleteCareer,
  getJobApplications,
  addJobApplication,
  updateApplicationStatus,
  deleteJobApplication,
} from "./routes/data";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Serve echo folder statically
  app.use("/echo", express.static(path.join(process.cwd(), "echo")));

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

  // Careers API
  app.get("/api/careers", getCareers);
  app.get("/api/careers/active", getActiveCareers);
  app.get("/api/careers/:id", getCareerById);
  app.post("/api/careers", addCareer);
  app.put("/api/careers/:id", updateCareer);
  app.delete("/api/careers/:id", deleteCareer);

  // Job Applications API
  app.get("/api/job-applications", getJobApplications);
  app.post("/api/job-applications", addJobApplication);
  app.put("/api/job-applications/:id/status", updateApplicationStatus);
  app.delete("/api/job-applications/:id", deleteJobApplication);

  return app;
}
