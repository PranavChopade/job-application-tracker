import { getJobs, createJob, deleteJob, editJob } from "../api/jobs";

export const useJobs = () => {
  const getJobsList = async () => {
    try {
      const data = await getJobs();
      return data;
    } catch (error) {
      console.log("error in getJobsList function", error);
      return { message: "Failed to fetch jobs" };
    }
  }

  const createJobPost = async ({ company, role, description, resume, status, date }) => {
    try {
      const data = await createJob({ company, role, description, resume, status, date });
      return data;
    } catch (error) {
      console.log("error in createJobPost function", error);
      const message = error.response?.data?.message || "Failed to create job";
      return { message };
    }
  }
  const deleteJobPost = async (id) => {
    try {
      const data = await deleteJob(id);
      return data;
    } catch (error) {
      console.log("error in deleteJobPost function", error);
      const message = error.response?.data?.message || "Failed to delete job";
      return { message };
    }
  }
  const editJobPost = async (id, jobData) => {
    try {
      const data = await editJob(id, jobData);
      return data;
    } catch (error) {
      console.log("error in editJobPost function", error);
      const message = error.response?.data?.message || "Failed to update job";
      return { message };
    }
  }

  return { getJobsList, createJobPost, deleteJobPost, editJobPost };
}