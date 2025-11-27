import { RequestHandler } from "express";
import {
  projectsStorage,
  equipmentStorage,
  poProjectsStorage,
  careersStorage,
  jobApplicationsStorage,
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

export const getCareers: RequestHandler = (_req, res) => {
  try {
    const careers = careersStorage.getAll();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch careers" });
  }
};

export const getActiveCareers: RequestHandler = (_req, res) => {
  try {
    const careers = careersStorage.getActive();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch active careers" });
  }
};

export const getCareerById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const career = careersStorage.getById(id);
    if (career) {
      res.json(career);
    } else {
      res.status(404).json({ error: "Career not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch career" });
  }
};

export const addCareer: RequestHandler = (req, res) => {
  try {
    const { jobTitle, department, location, employmentType, description, requirements, salary, isActive } = req.body;
    
    if (!jobTitle || !department || !location || !employmentType || !description || !requirements) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const career = careersStorage.add({
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
    res.status(500).json({ error: "Failed to add career" });
  }
};

export const updateCareer: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const career = careersStorage.update(id, req.body);
    
    if (career) {
      res.json(career);
    } else {
      res.status(404).json({ error: "Career not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update career" });
  }
};

export const deleteCareer: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const success = careersStorage.delete(id);
    
    if (success) {
      res.json({ message: "Career deleted" });
    } else {
      res.status(404).json({ error: "Career not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete career" });
  }
};

export const getJobApplications: RequestHandler = (_req, res) => {
  try {
    const applications = jobApplicationsStorage.getAll();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
};

export const addJobApplication: RequestHandler = (req, res) => {
  try {
    const { careerId, jobTitle, fullName, email, phone, resume, coverLetter } = req.body;
    
    if (!careerId || !jobTitle || !fullName || !email || !phone) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const application = jobApplicationsStorage.add({
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
    res.status(500).json({ error: "Failed to submit application" });
  }
};

export const updateApplicationStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      res.status(400).json({ error: "Status is required" });
      return;
    }
    
    const application = jobApplicationsStorage.updateStatus(id, status);
    
    if (application) {
      res.json(application);
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update application status" });
  }
};

export const deleteJobApplication: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const success = jobApplicationsStorage.delete(id);
    
    if (success) {
      res.json({ message: "Application deleted" });
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
};
