import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";

export const taskRoutes = Router();

taskRoutes.get("/tasks", taskControllers.read);
