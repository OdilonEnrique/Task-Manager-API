import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

export const taskRoutes = Router();

taskRoutes.post("/tasks", authMiddleware, taskControllers.create);
