import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { getCohereResponse } from "../../../config/cohere";
import { getContext } from "../../../helpers/cohereHelper";
import AppDataSource from "../../../config/db";
import { Client } from "../../models/Client";
import { Project } from "../../models/Project";

export class ClientController {

    getResponseFromLLM = async (req: Request, res: Response) => {
        try {
            const query = req.body.query;
            const clientEmail = req.body.email;
            const projectName = req.body.projectName;
            console.log(req.body, query, clientEmail, "body check")
            const client = await AppDataSource.manager.findOneBy(Client, { email: clientEmail })

            if (!client) throw Error(`Can't find any client with given email : ${clientEmail}`)
            const project = await AppDataSource.manager.findOneBy(Project, { name: projectName, client: { id: client.id } })

            if (!project) throw Error(`Can't find any project with given name : ${projectName} and client email : ${clientEmail}`)
            const context = await getContext(clientEmail, project.id)
            const content = `You are a helpful assistant that has access to a project's knowledge graph. 

The project contains the following nodes and their relationships:
${context}

Based on this knowledge graph, provide ONLY the direct answer to the user's question: "${query}"

Important: Give ONLY the answer itself. Do not include phrases like "Based on the provided knowledge graph", "The answer is", or any other explanatory text. Just provide the direct answer.

If the question cannot be answered using the provided context, respond with "I don't have enough information to answer that question."`
            const response = await getCohereResponse(content)
            console.log(response)
            res.status(201).json({
                response
            })
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).json({ errors: error });
            }
            res.status(500).json({ message: (error as Error).message });
        }
    }

}



