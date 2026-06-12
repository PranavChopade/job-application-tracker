import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected", "no response"],
    default: "applied"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export const Job = mongoose.model("Job", jobSchema);