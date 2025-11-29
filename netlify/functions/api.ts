import serverless from "serverless-http";
import express, { Router } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const router = Router();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

router.get("/ping", (_req, res) => {
  res.json({ message: "pong", env: !!process.env.SUPABASE_URL });
});

router.get("/projects", async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    const projects = (data || []).map((p: any) => ({
      id: p.id,
      projectName: p.project_name,
      customer: p.customer,
      oem: p.oem,
      operator: p.operator,
      activity: p.activity,
      noOfSites: p.no_of_sites,
      image: p.image,
      createdAt: p.created_at,
    }));
    
    res.json(projects);
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { projectName, customer, oem, operator, activity, noOfSites, image } = req.body;
    
    const { data, error } = await supabase
      .from("projects")
      .insert([{
        project_name: projectName,
        customer,
        oem,
        operator,
        activity,
        no_of_sites: noOfSites,
        image,
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({
      id: data.id,
      projectName: data.project_name,
      customer: data.customer,
      oem: data.oem,
      operator: data.operator,
      activity: data.activity,
      noOfSites: data.no_of_sites,
      image: data.image,
      createdAt: data.created_at,
    });
  } catch (error: any) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/projects/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", req.params.id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/equipment", async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    const equipment = (data || []).map((e: any) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      image: e.image,
      createdAt: e.created_at,
    }));
    
    res.json(equipment);
  } catch (error: any) {
    console.error("Error fetching equipment:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/equipment", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { title, description, image } = req.body;
    
    const { data, error } = await supabase
      .from("equipment")
      .insert([{ title, description, image }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      createdAt: data.created_at,
    });
  } catch (error: any) {
    console.error("Error adding equipment:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/equipment/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("equipment")
      .delete()
      .eq("id", req.params.id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting equipment:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/po-projects", async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("po_projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    const poProjects = (data || []).map((p: any) => ({
      id: p.id,
      poDate: p.po_date,
      client: p.client,
      product: p.product,
      projectStatus: p.project_status,
      createdAt: p.created_at,
    }));
    
    res.json(poProjects);
  } catch (error: any) {
    console.error("Error fetching P/O projects:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/po-projects", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { poDate, client, product, projectStatus } = req.body;
    
    const { data, error } = await supabase
      .from("po_projects")
      .insert([{
        po_date: poDate,
        client,
        product,
        project_status: projectStatus,
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({
      id: data.id,
      poDate: data.po_date,
      client: data.client,
      product: data.product,
      projectStatus: data.project_status,
      createdAt: data.created_at,
    });
  } catch (error: any) {
    console.error("Error adding P/O project:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/po-projects/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("po_projects")
      .delete()
      .eq("id", req.params.id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting P/O project:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/careers", async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("careers")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    const careers = (data || []).map((c: any) => ({
      id: c.id,
      jobTitle: c.job_title,
      department: c.department,
      location: c.location,
      employmentType: c.employment_type,
      description: c.description,
      requirements: c.requirements,
      salary: c.salary,
      isActive: c.is_active,
      createdAt: c.created_at,
    }));
    
    res.json(careers);
  } catch (error: any) {
    console.error("Error fetching careers:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/careers/active", async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("careers")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    const careers = (data || []).map((c: any) => ({
      id: c.id,
      jobTitle: c.job_title,
      department: c.department,
      location: c.location,
      employmentType: c.employment_type,
      description: c.description,
      requirements: c.requirements,
      salary: c.salary,
      isActive: c.is_active,
      createdAt: c.created_at,
    }));
    
    res.json(careers);
  } catch (error: any) {
    console.error("Error fetching active careers:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/careers/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("careers")
      .select("*")
      .eq("id", req.params.id)
      .single();
    
    if (error) {
      res.status(404).json({ error: "Career not found" });
      return;
    }
    
    res.json({
      id: data.id,
      jobTitle: data.job_title,
      department: data.department,
      location: data.location,
      employmentType: data.employment_type,
      description: data.description,
      requirements: data.requirements,
      salary: data.salary,
      isActive: data.is_active,
      createdAt: data.created_at,
    });
  } catch (error: any) {
    console.error("Error fetching career:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/careers", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { jobTitle, department, location, employmentType, description, requirements, salary, isActive } = req.body;
    
    const { data, error } = await supabase
      .from("careers")
      .insert([{
        job_title: jobTitle,
        department,
        location,
        employment_type: employmentType,
        description,
        requirements,
        salary,
        is_active: isActive,
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({
      id: data.id,
      jobTitle: data.job_title,
      department: data.department,
      location: data.location,
      employmentType: data.employment_type,
      description: data.description,
      requirements: data.requirements,
      salary: data.salary,
      isActive: data.is_active,
      createdAt: data.created_at,
    });
  } catch (error: any) {
    console.error("Error adding career:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/careers/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const updateData: any = {};
    
    if (req.body.jobTitle !== undefined) updateData.job_title = req.body.jobTitle;
    if (req.body.department !== undefined) updateData.department = req.body.department;
    if (req.body.location !== undefined) updateData.location = req.body.location;
    if (req.body.employmentType !== undefined) updateData.employment_type = req.body.employmentType;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.requirements !== undefined) updateData.requirements = req.body.requirements;
    if (req.body.salary !== undefined) updateData.salary = req.body.salary;
    if (req.body.isActive !== undefined) updateData.is_active = req.body.isActive;
    
    const { data, error } = await supabase
      .from("careers")
      .update(updateData)
      .eq("id", req.params.id)
      .select();
    
    if (error) throw error;
    if (!data || data.length === 0) {
      res.status(404).json({ error: "Career not found" });
      return;
    }
    
    res.json({
      id: data[0].id,
      jobTitle: data[0].job_title,
      department: data[0].department,
      location: data[0].location,
      employmentType: data[0].employment_type,
      description: data[0].description,
      requirements: data[0].requirements,
      salary: data[0].salary,
      isActive: data[0].is_active,
      createdAt: data[0].created_at,
    });
  } catch (error: any) {
    console.error("Error updating career:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/careers/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("careers")
      .delete()
      .eq("id", req.params.id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting career:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/job-applications", async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    const applications = (data || []).map((a: any) => ({
      id: a.id,
      careerId: a.career_id,
      jobTitle: a.job_title,
      fullName: a.full_name,
      email: a.email,
      phone: a.phone,
      resume: a.resume,
      coverLetter: a.cover_letter,
      status: a.status,
      createdAt: a.created_at,
    }));
    
    res.json(applications);
  } catch (error: any) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/job-applications", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { careerId, jobTitle, fullName, email, phone, resume, coverLetter } = req.body;
    
    const { data, error } = await supabase
      .from("job_applications")
      .insert([{
        career_id: careerId,
        job_title: jobTitle,
        full_name: fullName,
        email,
        phone,
        resume,
        cover_letter: coverLetter,
        status: "pending",
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({
      id: data.id,
      careerId: data.career_id,
      jobTitle: data.job_title,
      fullName: data.full_name,
      email: data.email,
      phone: data.phone,
      resume: data.resume,
      coverLetter: data.cover_letter,
      status: data.status,
      createdAt: data.created_at,
    });
  } catch (error: any) {
    console.error("Error adding job application:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/job-applications/:id/status", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from("job_applications")
      .update({ status })
      .eq("id", req.params.id)
      .select();
    
    if (error) throw error;
    if (!data || data.length === 0) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    
    res.json({
      id: data[0].id,
      careerId: data[0].career_id,
      jobTitle: data[0].job_title,
      fullName: data[0].full_name,
      email: data[0].email,
      phone: data[0].phone,
      resume: data[0].resume,
      coverLetter: data[0].cover_letter,
      status: data[0].status,
      createdAt: data[0].created_at,
    });
  } catch (error: any) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/job-applications/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("job_applications")
      .delete()
      .eq("id", req.params.id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting job application:", error);
    res.status(500).json({ error: error.message });
  }
});

app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
