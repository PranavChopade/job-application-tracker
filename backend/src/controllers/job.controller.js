import { Job } from "../models/jobs.model.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.userId }).sort({ date: -1 });
    res.status(200).json({ message: "jobs fetched successfully", jobs });
  } catch (error) {
    console.log("error in getAllJobs", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const addJob = async (req, res) => {
  try {
    const { company, role, description, resume, status } = req.body;
    if (!company || !role || !description) {
      return res.status(400).json({ message: "company, role and description are required" })
    }
    const job = await Job.create({
      user: req.userId,
      company,
      role,
      description,
      resume: resume || "",
      status: status || "applied",
      date: Date.now()
    });
    res.status(201).json({ message: "job added successfully", job });
  } catch (error) {
    console.log("error in adding job", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!job) {
      return res.status(404).json({ message: "job not found" })
    }
    res.status(200).json({ message: "job deleted successfully" });
  } catch (error) {
    console.log("error in deleteJob", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const editJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: "job not found" })
    }
    res.status(200).json({ message: "job updated successfully", job });
  } catch (error) {
    console.log("error in editJob", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
