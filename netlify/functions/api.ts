import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

function jsonResponse(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, {});
  }

  const path = event.path.replace("/.netlify/functions/api", "").replace("/api", "") || "/";
  const method = event.httpMethod;
  
  try {
    if (path === "/ping" && method === "GET") {
      return jsonResponse(200, { message: "pong", env: !!process.env.SUPABASE_URL });
    }

    if (path === "/projects" && method === "GET") {
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
      
      return jsonResponse(200, projects);
    }

    if (path === "/projects" && method === "POST") {
      const supabase = getSupabaseClient();
      const body = JSON.parse(event.body || "{}");
      const { projectName, customer, oem, operator, activity, noOfSites, image } = body;
      
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
      
      return jsonResponse(200, {
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
    }

    if (path.startsWith("/projects/") && method === "DELETE") {
      const supabase = getSupabaseClient();
      const id = path.replace("/projects/", "");
      
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      
      return jsonResponse(200, { success: true });
    }

    if (path === "/equipment" && method === "GET") {
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
      
      return jsonResponse(200, equipment);
    }

    if (path === "/equipment" && method === "POST") {
      const supabase = getSupabaseClient();
      const body = JSON.parse(event.body || "{}");
      const { title, description, image } = body;
      
      const { data, error } = await supabase
        .from("equipment")
        .insert([{ title, description, image }])
        .select()
        .single();
      
      if (error) throw error;
      
      return jsonResponse(200, {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        createdAt: data.created_at,
      });
    }

    if (path.startsWith("/equipment/") && method === "DELETE") {
      const supabase = getSupabaseClient();
      const id = path.replace("/equipment/", "");
      
      const { error } = await supabase.from("equipment").delete().eq("id", id);
      if (error) throw error;
      
      return jsonResponse(200, { success: true });
    }

    if (path === "/po-projects" && method === "GET") {
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
      
      return jsonResponse(200, poProjects);
    }

    if (path === "/po-projects" && method === "POST") {
      const supabase = getSupabaseClient();
      const body = JSON.parse(event.body || "{}");
      const { poDate, client, product, projectStatus } = body;
      
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
      
      return jsonResponse(200, {
        id: data.id,
        poDate: data.po_date,
        client: data.client,
        product: data.product,
        projectStatus: data.project_status,
        createdAt: data.created_at,
      });
    }

    if (path.startsWith("/po-projects/") && method === "DELETE") {
      const supabase = getSupabaseClient();
      const id = path.replace("/po-projects/", "");
      
      const { error } = await supabase.from("po_projects").delete().eq("id", id);
      if (error) throw error;
      
      return jsonResponse(200, { success: true });
    }

    if (path === "/careers" && method === "GET") {
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
      
      return jsonResponse(200, careers);
    }

    if (path === "/careers/active" && method === "GET") {
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
      
      return jsonResponse(200, careers);
    }

    if (path === "/careers" && method === "POST") {
      const supabase = getSupabaseClient();
      const body = JSON.parse(event.body || "{}");
      const { jobTitle, department, location, employmentType, description, requirements, salary, isActive } = body;
      
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
      
      return jsonResponse(200, {
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
    }

    if (path.match(/^\/careers\/[^/]+$/) && method === "GET") {
      const supabase = getSupabaseClient();
      const id = path.replace("/careers/", "");
      
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        return jsonResponse(404, { error: "Career not found" });
      }
      
      return jsonResponse(200, {
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
    }

    if (path.match(/^\/careers\/[^/]+$/) && method === "PUT") {
      const supabase = getSupabaseClient();
      const id = path.replace("/careers/", "");
      const body = JSON.parse(event.body || "{}");
      
      const updateData: any = {};
      if (body.jobTitle !== undefined) updateData.job_title = body.jobTitle;
      if (body.department !== undefined) updateData.department = body.department;
      if (body.location !== undefined) updateData.location = body.location;
      if (body.employmentType !== undefined) updateData.employment_type = body.employmentType;
      if (body.description !== undefined) updateData.description = body.description;
      if (body.requirements !== undefined) updateData.requirements = body.requirements;
      if (body.salary !== undefined) updateData.salary = body.salary;
      if (body.isActive !== undefined) updateData.is_active = body.isActive;
      
      const { data, error } = await supabase
        .from("careers")
        .update(updateData)
        .eq("id", id)
        .select();
      
      if (error) throw error;
      if (!data || data.length === 0) {
        return jsonResponse(404, { error: "Career not found" });
      }
      
      return jsonResponse(200, {
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
    }

    if (path.match(/^\/careers\/[^/]+$/) && method === "DELETE") {
      const supabase = getSupabaseClient();
      const id = path.replace("/careers/", "");
      
      const { error } = await supabase.from("careers").delete().eq("id", id);
      if (error) throw error;
      
      return jsonResponse(200, { success: true });
    }

    if (path === "/job-applications" && method === "GET") {
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
      
      return jsonResponse(200, applications);
    }

    if (path === "/job-applications" && method === "POST") {
      const supabase = getSupabaseClient();
      const body = JSON.parse(event.body || "{}");
      const { careerId, jobTitle, fullName, email, phone, resume, coverLetter } = body;
      
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
      
      return jsonResponse(200, {
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
    }

    if (path.match(/^\/job-applications\/[^/]+\/status$/) && method === "PUT") {
      const supabase = getSupabaseClient();
      const id = path.replace("/job-applications/", "").replace("/status", "");
      const body = JSON.parse(event.body || "{}");
      const { status } = body;
      
      const { data, error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", id)
        .select();
      
      if (error) throw error;
      if (!data || data.length === 0) {
        return jsonResponse(404, { error: "Application not found" });
      }
      
      return jsonResponse(200, {
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
    }

    if (path.match(/^\/job-applications\/[^/]+$/) && method === "DELETE") {
      const supabase = getSupabaseClient();
      const id = path.replace("/job-applications/", "");
      
      const { error } = await supabase.from("job_applications").delete().eq("id", id);
      if (error) throw error;
      
      return jsonResponse(200, { success: true });
    }

    return jsonResponse(404, { error: "Not found", path, method });
    
  } catch (error: any) {
    console.error("API Error:", error);
    return jsonResponse(500, { error: error.message });
  }
};

export { handler };
