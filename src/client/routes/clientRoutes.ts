import express from "express";
import { ClientController } from "../controllers/clientController";


const router = express.Router();
const clientController = new ClientController();
router.post("/response", clientController.getResponseFromLLM);

export default router;
