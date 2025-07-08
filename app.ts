import express from "express";
import AppDataSource from "./config/db";
import { Client } from "./src/models/Client";
import projectRouter from "./src/project/routes/projectRoutes"
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

const app = express();
app.use(express.json());
initializeTransactionalContext();
// Example route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Example: Get all users
app.get("/clients", async (req, res) => {
  const users = await AppDataSource.manager.find(Client);
  res.json(users);
});

// Register project routes
app.use("/projects", projectRouter);

export default app;