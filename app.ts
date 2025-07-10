import express from "express";
import AppDataSource from "./config/db";
import { Client } from "./src/models/Client";
import projectRouter from "./src/project/routes/projectRoutes"
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { getCohereResponse } from "./config/cohere";
import clientRouter from "./src/client/routes/clientRoutes"

const app = express();
app.use(express.json());
initializeTransactionalContext();


app.get("/", (req, res) => {
  res.send("Hello, world!");
});


app.get("/clients", async (req, res) => {
  const users = await AppDataSource.manager.find(Client);
  res.json(users);
});

// Register project routes
app.use("/projects", projectRouter);

app.use("/clients", clientRouter);

// app.post("/response", async (req, res) => {
//   const query = req.body.query;
//   const clientEmail = req.body.email;
//   const context = getContext(clientEmail) 
//   const content = `From the following context ${context} containing nodes and edges, give me only the final bot response string to this user message ${query}`
//   const response = await getCohereResponse(JSON.stringify(content))
//   console.log(response)
//   res.status(201).json({
//     response
//   })
// })

export default app;