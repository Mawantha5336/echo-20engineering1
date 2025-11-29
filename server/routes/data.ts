import { RequestHandler } from "express";
import {
  projectsStorage,
  equipmentStorage,
  poProjectsStorage,
  careersStorage,
  jobApplicationsStorage,
} from "../supabase-storage";

export const getProjects: RequestHandler = async (_req, res) => {
  try {
    const projects = await projectsStorage.getAll();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const addProject: RequestHandler = async (req, res) => {
  try {
    const { projectName, customer, oem, operator, activity, noOfSites, image } = req.body;
    
    if (!projectName || !customer || !oem || !operator || !activity || noOfSites === undefined) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const project = await projectsStorage.add({
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
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Failed to add project" });
  }
};

export const deleteProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await projectsStorage.delete(id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

export const getEquipment: RequestHandler = async (_req, res) => {
  try {
    const equipment = await equipmentStorage.getAll();
    res.json(equipment);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
};

export const addEquipment: RequestHandler = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    
    if (!title || !description) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const equipment = await equipmentStorage.add({
      title,
      description,
      image,
    });
    
    res.status(201).json(equipment);
  } catch (error) {
    console.error("Error adding equipment:", error);
    res.status(500).json({ error: "Failed to add equipment" });
  }
};

export const deleteEquipment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await equipmentStorage.delete(id);
    res.json({ message: "Equipment deleted" });
  } catch (error) {
    console.error("Error deleting equipment:", error);
    res.status(500).json({ error: "Failed to delete equipment" });
  }
};

export const getPOProjects: RequestHandler = async (_req, res) => {
  try {
    const projects = await poProjectsStorage.getAll();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching P/O projects:", error);
    res.status(500).json({ error: "Failed to fetch P/O projects" });
  }
};

export const addPOProject: RequestHandler = async (req, res) => {
  try {
    const { poDate, client, product, projectStatus } = req.body;
    
    if (!poDate || !client || !product || !projectStatus) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const project = await poProjectsStorage.add({
      poDate,
      client,
      product,
      projectStatus,
    });
    
    res.status(201).json(project);
  } catch (error) {
    console.error("Error adding P/O project:", error);
    res.status(500).json({ error: "Failed to add P/O project" });
  }
};

export const deletePOProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await poProjectsStorage.delete(id);
    res.json({ message: "P/O Project deleted" });
  } catch (error) {
    console.error("Error deleting P/O project:", error);
    res.status(500).json({ error: "Failed to delete P/O project" });
  }
};

export const getCareers: RequestHandler = async (_req, res) => {
  try {
    const careers = await careersStorage.getAll();
    res.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    res.status(500).json({ error: "Failed to fetch careers" });
  }
};

export const getActiveCareers: RequestHandler = async (_req, res) => {
  try {
    const careers = await careersStorage.getActive();
    res.json(careers);
  } catch (error) {
    console.error("Error fetching active careers:", error);
    res.status(500).json({ error: "Failed to fetch active careers" });
  }
};

export const getCareerById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await careersStorage.getById(id);
    if (career) {
      res.json(career);
    } else {
      res.status(404).json({ error: "Career not found" });
    }
  } catch (error) {
    console.error("Error fetching career:", error);
    res.status(500).json({ error: "Failed to fetch career" });
  }
};

export const addCareer: RequestHandler = async (req, res) => {
  try {
    const { jobTitle, department, location, employmentType, description, requirements, salary, isActive } = req.body;
    
    if (!jobTitle || !department || !location || !employmentType || !description || !requirements) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const career = await careersStorage.add({
      jobTitle,
      department,
      location,
      employmentType,
      description,
      requirements,
      salary,
      isActive: isActive ?? true,
    });
    
    res.status(201).json(career);
  } catch (error) {
    console.error("Error adding career:", error);
    res.status(500).json({ error: "Failed to add career" });
  }
};

export const updateCareer: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await careersStorage.update(id, req.body);
    
    if (career) {
      res.json(career);
    } else {
      res.status(404).json({ error: "Career not found" });
    }
  } catch (error) {
    console.error("Error updating career:", error);
    res.status(500).json({ error: "Failed to update career" });
  }
};

export const deleteCareer: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await careersStorage.delete(id);
    res.json({ message: "Career deleted" });
  } catch (error) {
    console.error("Error deleting career:", error);
    res.status(500).json({ error: "Failed to delete career" });
  }
};

export const getJobApplications: RequestHandler = async (_req, res) => {
  try {
    const applications = await jobApplicationsStorage.getAll();
    res.json(applications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
};

export const addJobApplication: RequestHandler = async (req, res) => {
  try {
    const { careerId, jobTitle, fullName, email, phone, resume, coverLetter } = req.body;
    
    if (!careerId || !jobTitle || !fullName || !email || !phone) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const application = await jobApplicationsStorage.add({
      careerId,
      jobTitle,
      fullName,
      email,
      phone,
      resume,
      coverLetter,
    });
    
    res.status(201).json(application);
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
};

export const updateApplicationStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      res.status(400).json({ error: "Status is required" });
      return;
    }
    
    const application = await jobApplicationsStorage.updateStatus(id, status);
    
    if (application) {
      res.json(application);
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
};

export const deleteJobApplication: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await jobApplicationsStorage.delete(id);
    res.json({ message: "Application deleted" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};
