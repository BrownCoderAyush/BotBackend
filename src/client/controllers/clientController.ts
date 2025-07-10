import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { getCohereResponse } from "../../../config/cohere";
import { getContext } from "../../../helpers/cohereHelper";

export class ClientController {

    getResponseFromLLM = async (req: Request, res: Response) => {
        try {
            const query = req.body.query;
            const clientEmail = req.body.email;
            console.log(req.body , query, clientEmail, "body check")
            const context = getContext(clientEmail)
            const content = `From the fllowing context ${context} containing nodes and edges, give me only the final bot response string to this user message ${query}`
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