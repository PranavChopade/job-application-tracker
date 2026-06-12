import { api } from "./axiosInstance";

export const getJobs = async () => {
  try {
    const response = await api.get("/jobs/get-all-jobs");
    return response.data;
  } catch (error) {
    console.log("error in get jobs api", error);
    throw error;
  }
}
export const createJob = async ({ company, role, description, resume, status, date }) => {
  try {
    const response = await api.post("/jobs/add-job", {
      company, role, description, resume, status, date
    });
    return response.data;
  } catch (error) {
    console.log("error in create job api", error);
    throw error;
  }
}

export const deleteJob = async (id) => {
  try {
    const response = await api.delete(`/jobs/delete-job/${id}`);
    return response.data;
  } catch (error) {
    console.log("error in delete job api", error);
    throw error;
  }
}

export const editJob = async (id, jobData) => {
  try {
    const response = await api.put(`/jobs/edit-job/${id}`, {
      ...jobData
    });
    return response.data;
  } catch (error) {
    console.log("error in edit job api", error);
    throw error;
  }
}
