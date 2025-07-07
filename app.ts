import express from "express";
import AppDataSource from "./config/db";
import { User } from "./src/models/User";

const app = express();
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Example: Get all users
app.get("/users", async (req, res) => {
  const users = await AppDataSource.manager.find(User);
  res.json(users);
});

export default app;