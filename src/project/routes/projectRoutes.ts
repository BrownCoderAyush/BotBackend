import express from "express";
import { ProjectController } from "../controllers/projectController";

const router = express.Router();
const projectController = new ProjectController();
router.post("/", projectController.createProject);

export default router;
