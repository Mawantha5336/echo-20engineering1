import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY.");
    }
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export interface Project {
  id: string;
  project_name: string;
  customer: string;
  oem: string;
  operator: string;
  activity: string;
  no_of_sites: number;
  image?: string;
  created_at: string;
}

export interface Equipment {
  id: string;
  title: string;
  description: string;
  image?: string;
  created_at: string;
}

export interface POProject {
  id: string;
  po_date: string;
  client: string;
  product: string;
  project_status: string;
  created_at: string;
}

export interface Career {
  id: string;
  job_title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  salary?: string;
  is_active: boolean;
  created_at: string;
}

export interface JobApplication {
  id: string;
  career_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  resume?: string;
  cover_letter?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  created_at: string;
}

export interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}

function toCamelCase(project: Project) {
  return {
    id: project.id,
    projectName: project.project_name,
    customer: project.customer,
    oem: project.oem,
    operator: project.operator,
    activity: project.activity,
    noOfSites: project.no_of_sites,
    image: project.image,
    createdAt: project.created_at,
  };
}

function toSnakeCase(data: any) {
  return {
    project_name: data.projectName,
    customer: data.customer,
    oem: data.oem,
    operator: data.operator,
    activity: data.activity,
    no_of_sites: data.noOfSites,
    image: data.image,
  };
}

export const projectsStorage = {
  getAll: async () => {
    const { data, error } = await getSupabaseClient()
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map(toCamelCase);
  },
  
  add: async (project: { projectName: string; customer: string; oem: string; operator: string; activity: string; noOfSites: number; image?: string }) => {
    const { data, error } = await getSupabaseClient()
      .from("projects")
      .insert([toSnakeCase(project)])
      .select()
      .single();
    
    if (error) throw error;
    return toCamelCase(data);
  },
  
  delete: async (id: string): Promise<boolean> => {
    const { data, error } = await getSupabaseClient()
      .from("projects")
      .delete()
      .eq("id", id)
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  },
  
  update: async (id: string, data: any) => {
    const updateData: any = {};
    if (data.projectName) updateData.project_name = data.projectName;
    if (data.customer) updateData.customer = data.customer;
    if (data.oem) updateData.oem = data.oem;
    if (data.operator) updateData.operator = data.operator;
    if (data.activity) updateData.activity = data.activity;
    if (data.noOfSites !== undefined) updateData.no_of_sites = data.noOfSites;
    if (data.image !== undefined) updateData.image = data.image;
    
    const { data: updated, error } = await getSupabaseClient()
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select();
    
    if (error) throw error;
    if (!updated || updated.length === 0) return null;
    return toCamelCase(updated[0]);
  },
};

export const equipmentStorage = {
  getAll: async () => {
    const { data, error } = await getSupabaseClient()
      .from("equipment")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map((e: Equipment) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      image: e.image,
      createdAt: e.created_at,
    }));
  },
  
  add: async (equipment: { title: string; description: string; image?: string }) => {
    const { data, error } = await getSupabaseClient()
      .from("equipment")
      .insert([equipment])
      .select()
      .single();
    
    if (error) throw error;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      createdAt: data.created_at,
    };
  },
  
  delete: async (id: string): Promise<boolean> => {
    const { data, error } = await getSupabaseClient()
      .from("equipment")
      .delete()
      .eq("id", id)
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  },
  
  update: async (id: string, updateData: Partial<{ title: string; description: string; image?: string }>) => {
    const { data, error } = await getSupabaseClient()
      .from("equipment")
      .update(updateData)
      .eq("id", id)
      .select();
    
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      image: data[0].image,
      createdAt: data[0].created_at,
    };
  },
};

export const poProjectsStorage = {
  getAll: async () => {
    const { data, error } = await getSupabaseClient()
      .from("po_projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map((p: POProject) => ({
      id: p.id,
      poDate: p.po_date,
      client: p.client,
      product: p.product,
      projectStatus: p.project_status,
      createdAt: p.created_at,
    }));
  },
  
  add: async (poProject: { poDate: string; client: string; product: string; projectStatus: string }) => {
    const { data, error } = await getSupabaseClient()
      .from("po_projects")
      .insert([{
        po_date: poProject.poDate,
        client: poProject.client,
        product: poProject.product,
        project_status: poProject.projectStatus,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return {
      id: data.id,
      poDate: data.po_date,
      client: data.client,
      product: data.product,
      projectStatus: data.project_status,
      createdAt: data.created_at,
    };
  },
  
  delete: async (id: string): Promise<boolean> => {
    const { data, error } = await getSupabaseClient()
      .from("po_projects")
      .delete()
      .eq("id", id)
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  },
  
  update: async (id: string, updateData: any) => {
    const dbData: any = {};
    if (updateData.poDate) dbData.po_date = updateData.poDate;
    if (updateData.client) dbData.client = updateData.client;
    if (updateData.product) dbData.product = updateData.product;
    if (updateData.projectStatus) dbData.project_status = updateData.projectStatus;
    
    const { data, error } = await getSupabaseClient()
      .from("po_projects")
      .update(dbData)
      .eq("id", id)
      .select();
    
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return {
      id: data[0].id,
      poDate: data[0].po_date,
      client: data[0].client,
      product: data[0].product,
      projectStatus: data[0].project_status,
      createdAt: data[0].created_at,
    };
  },
};

export const careersStorage = {
  getAll: async () => {
    const { data, error } = await getSupabaseClient()
      .from("careers")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map((c: Career) => ({
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
  },
  
  getActive: async () => {
    const { data, error } = await getSupabaseClient()
      .from("careers")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map((c: Career) => ({
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
  },
  
  getById: async (id: string) => {
    const { data, error } = await getSupabaseClient()
      .from("careers")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) return undefined;
    return {
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
    };
  },
  
  add: async (career: { jobTitle: string; department: string; location: string; employmentType: string; description: string; requirements: string; salary?: string; isActive: boolean }) => {
    const { data, error } = await getSupabaseClient()
      .from("careers")
      .insert([{
        job_title: career.jobTitle,
        department: career.department,
        location: career.location,
        employment_type: career.employmentType,
        description: career.description,
        requirements: career.requirements,
        salary: career.salary,
        is_active: career.isActive,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return {
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
    };
  },
  
  delete: async (id: string): Promise<boolean> => {
    const { data, error } = await getSupabaseClient()
      .from("careers")
      .delete()
      .eq("id", id)
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  },
  
  update: async (id: string, updateData: any) => {
    const dbData: any = {};
    if (updateData.jobTitle !== undefined) dbData.job_title = updateData.jobTitle;
    if (updateData.department !== undefined) dbData.department = updateData.department;
    if (updateData.location !== undefined) dbData.location = updateData.location;
    if (updateData.employmentType !== undefined) dbData.employment_type = updateData.employmentType;
    if (updateData.description !== undefined) dbData.description = updateData.description;
    if (updateData.requirements !== undefined) dbData.requirements = updateData.requirements;
    if (updateData.salary !== undefined) dbData.salary = updateData.salary;
    if (updateData.isActive !== undefined) dbData.is_active = updateData.isActive;
    
    const { data, error } = await getSupabaseClient()
      .from("careers")
      .update(dbData)
      .eq("id", id)
      .select();
    
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return {
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
    };
  },
};

export const jobApplicationsStorage = {
  getAll: async () => {
    const { data, error } = await getSupabaseClient()
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map((a: JobApplication) => ({
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
  },
  
  getByCareerId: async (careerId: string) => {
    const { data, error } = await getSupabaseClient()
      .from("job_applications")
      .select("*")
      .eq("career_id", careerId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map((a: JobApplication) => ({
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
  },
  
  add: async (application: { careerId: string; jobTitle: string; fullName: string; email: string; phone: string; resume?: string; coverLetter?: string }) => {
    const { data, error } = await getSupabaseClient()
      .from("job_applications")
      .insert([{
        career_id: application.careerId,
        job_title: application.jobTitle,
        full_name: application.fullName,
        email: application.email,
        phone: application.phone,
        resume: application.resume,
        cover_letter: application.coverLetter,
        status: "pending",
      }])
      .select()
      .single();
    
    if (error) throw error;
    return {
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
    };
  },
  
  delete: async (id: string): Promise<boolean> => {
    const { data, error } = await getSupabaseClient()
      .from("job_applications")
      .delete()
      .eq("id", id)
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  },
  
  updateStatus: async (id: string, status: "pending" | "reviewed" | "shortlisted" | "rejected") => {
    const { data, error } = await getSupabaseClient()
      .from("job_applications")
      .update({ status })
      .eq("id", id)
      .select();
    
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return {
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
    };
  },
};

export const contactMessagesStorage = {
  getAll: async () => {
    const { data, error } = await getSupabaseClient()
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return (data || []).map((m: ContactMessage) => ({
      id: m.id,
      firstName: m.first_name,
      lastName: m.last_name,
      email: m.email,
      phone: m.phone,
      subject: m.subject,
      message: m.message,
      status: m.status,
      createdAt: m.created_at,
    }));
  },
  
  add: async (message: { firstName: string; lastName: string; email: string; phone?: string; subject: string; message: string }) => {
    const { data, error } = await getSupabaseClient()
      .from("contact_messages")
      .insert([{
        first_name: message.firstName,
        last_name: message.lastName,
        email: message.email,
        phone: message.phone,
        subject: message.subject,
        message: message.message,
        status: "unread",
      }])
      .select()
      .single();
    
    if (error) throw error;
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      status: data.status,
      createdAt: data.created_at,
    };
  },
  
  delete: async (id: string): Promise<boolean> => {
    const { data, error } = await getSupabaseClient()
      .from("contact_messages")
      .delete()
      .eq("id", id)
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  },
  
  updateStatus: async (id: string, status: "unread" | "read" | "replied") => {
    const { data, error } = await getSupabaseClient()
      .from("contact_messages")
      .update({ status })
      .eq("id", id)
      .select();
    
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return {
      id: data[0].id,
      firstName: data[0].first_name,
      lastName: data[0].last_name,
      email: data[0].email,
      phone: data[0].phone,
      subject: data[0].subject,
      message: data[0].message,
      status: data[0].status,
      createdAt: data[0].created_at,
    };
  },
};
