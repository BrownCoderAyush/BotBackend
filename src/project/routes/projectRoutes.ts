import express from "express";
import { ProjectController } from "../controllers/projectController";

const router = express.Router();
const projectController = new ProjectController();
router.post("/", projectController.createProject);
router.post("/submit", projectController.submitProject);
export default router;
