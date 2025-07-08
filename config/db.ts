import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "../src/models/Client";
import { Project } from "../src/models/Project";
import { Node } from "../src/models/Node";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Client, Project, Node],
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
});

export default AppDataSource