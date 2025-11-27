import { RequestHandler } from "express";
import {
  projectsStorage,
  equipmentStorage,
  poProjectsStorage,
} from "../storage";

export const getProjects: RequestHandler = (_req, res) => {
  try {
    const projects = projectsStorage.getAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const addProject: RequestHandler = (req, res) => {
  try {
    const { projectName, customer, oem, operator, activity, noOfSites, image } = req.body;
    
    if (!projectName || !customer || !oem || !operator || !activity || noOfSites === undefined) {
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
      image,
    });
    
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
};

export const deleteProject: RequestHandler = (req, res) => {
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

export const getEquipment: RequestHandler = (_req, res) => {
  try {
    const equipment = equipmentStorage.getAll();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
};

export const addEquipment: RequestHandler = (req, res) => {
  try {
    const { title, description, image } = req.body;
    
    if (!title || !description) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const equipment = equipmentStorage.add({
      title,
      description,
      image,
    });
    
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add equipment" });
  }
};

export const deleteEquipment: RequestHandler = (req, res) => {
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

export const getPOProjects: RequestHandler = (_req, res) => {
  try {
    const projects = poProjectsStorage.getAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch P/O projects" });
  }
};

export const addPOProject: RequestHandler = (req, res) => {
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
      projectStatus,
    });
    
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to add P/O project" });
  }
};

export const deletePOProject: RequestHandler = (req, res) => {
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
