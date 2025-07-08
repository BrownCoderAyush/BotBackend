import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import ProjectService from "../services/projectService";
import { CreateProjectDto } from "../dtos/CreateProjectDto";

export class ProjectController {
    ProjectService: ProjectService = new ProjectService();

     createProject = async (req: Request, res: Response) =>{
        try {
            const dto = plainToInstance(CreateProjectDto, req.body);
            await validateOrReject(dto);

            const project = await this.ProjectService.createProject(dto);

            res.status(201).json(project);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).json({ errors: error });
            }
            res.status(500).json({ message: (error as Error).message });
        }
    }

}