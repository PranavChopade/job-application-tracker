import express from "express";
import { deleteJob, editJob, getAllJobs, addJob } from "../controllers/job.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-all-jobs", isAuth, getAllJobs);
router.post("/add-job", isAuth, addJob);
router.delete("/delete-job/:id", isAuth, deleteJob);
router.put("/edit-job/:id", isAuth, editJob);

export default router;
