import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import jobsRoutes from "./routes/job.routes.js";
import ENV from "./config/ENV.js";

const app = express();

app.use(cors({
  origin: ENV.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobsRoutes);

export default app;
