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
            const content = `KNOWLEDGE GRAPH CONTEXT:
${context}

USER QUESTION: "${query}"

INSTRUCTIONS:
1. Search the knowledge graph for the most relevant information
2. Extract ONLY the specific answer to the question
3. If multiple nodes contain relevant information, prioritize the most specific match
4. Return ONLY the answer - no explanations, no context references
5. If no relevant information exists, respond: "I don't have enough information to answer that question"
6. Keep the response under 100 words
7. Use exact terms and names from the context when possible

ANSWER:`
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



