
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import AppDataSource from "../../../config/db";
import { CreateProjectDto } from "../dtos/CreateProjectDto";
import { Client } from "../../models/Client";
import { Project } from "../../models/Project";

import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Service } from 'typedi'; 



export default class ProjectService {

  async createProject(input: CreateProjectDto): Promise<Project> {

    const dto = plainToInstance(CreateProjectDto, input);
    await validateOrReject(dto);

    const client = AppDataSource.manager.create(Client, dto.client);
    const savedClient = await AppDataSource.manager.save(client); 
    const project = AppDataSource.manager.create(Project, {
      name: dto.name,
      client: savedClient 
    });

    return await AppDataSource.manager.save(project);
  }
} 