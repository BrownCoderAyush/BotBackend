import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { getBotFlowFromCohere, getCohereResponse } from "../../../config/cohere";
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
8. If the user query is a single word and it's not a greeting (e.g., "hi", "hello") or a yes/no response (e.g., "yes", "no"), then respond with: "Can you please be more specific?"
9. If the user query exactly or closely matches an existing bot response, return the full bot response without modifying it. Do not rephrase or shorten the bot response.
10. If the query is unclear or you're unsure which response to use, return a short fallback answer such as: "I'm not sure how to respond to that. Could you rephrase?"
11. If the user query is a greeting such as "hi", "hello", "hey", etc. or any other texts , search the knowledge graph specifically for a greeting node or response. Return that full greeting response exactly as stored, even if the user greeting is worded slightly differently or if query is worded slightly differently .

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
    createFlow = async (req: Request, res: Response) => {
        try {
            const query = req.body.query;
            const clientEmail = req.body.email;
            const projectName = req.body.projectName;

            // const client = await AppDataSource.manager.findOneBy(Client, { email: clientEmail });
            // if (!client) throw Error(`Can't find any client with given email: ${clientEmail}`);

            // const project = await AppDataSource.manager.findOneBy(Project, { name: projectName, client: { id: client.id } });
            // if (!project) throw Error(`Can't find any project with given name: ${projectName} and client email: ${clientEmail}`);

            // const context = await getContext(clientEmail, project.id);

            const content = `You are a bot flow generator.

INSTRUCTION:
Create a visual bot flow  based on the Query : ${query} in the following exact JSON format:

{
  "nodes": [...],
  "edges": [...]
}

IMPORTANT RULES:
- Only output a single valid JSON object with "nodes" and "edges". Do NOT add any explanations, comments, markdown, or extra text.
- If you cannot output a valid JSON object for any reason, output this minimal valid JSON object instead:
{"nodes":[{"id":"start","type":"startNode","position":{"x":100,"y":20},"data":{"label":"${projectName}"}}],"edges":[]}
- Do not add trailing commas. Do not leave any property unfinished. Only output a valid JSON object that can be parsed with JSON.parse().
- Always begin with a node of type "startNode".
- The "startNode" must have its "data.label" value set to the project name: "${projectName}"
- Use the following types for nodes: "startNode", "userMessage", "botResponse"
- Each node must include:
  - a unique "id" (e.g., "1", "start", "2")
  - a valid "position" object like { "x": ..., "y": ... }
  - a "data" object with appropriate fields:
    - "label" for startNode
    - "message", "sender", and "isEditing" for userMessage and botResponse
- Edges must include:
  - "source", "target", "id"
  - "style": { "stroke": "#6366f1", "strokeWidth": 2 }
  - "animated": true
- The flow should represent a conversation based on this user query: "${query}"
- Your output MUST be valid JSON. If you are unsure, output the minimal valid JSON above.`;


            const response = await getBotFlowFromCohere(content);
            console.log("Response--------------------------",JSON.stringify(response))

            // Extract valid JSON from LLM response
            let flowJson = null;
            let errorMsg = '';
            try {
                let responseStr = typeof response === 'string' ? response : JSON.stringify(response);
                // Try to extract the first JSON object
                const match = responseStr.match(/\{[\s\S]*\}/);
                if (!match) {
                    errorMsg = 'No valid JSON found in LLM output.';
                } else {
                    flowJson = JSON.parse(match[0]);
                    if (!Array.isArray(flowJson.nodes) || !Array.isArray(flowJson.edges)) {
                        errorMsg = 'JSON missing nodes or edges array.';
                        flowJson = null;
                    }
                }
            } catch (err) {
                errorMsg = 'Malformed JSON from LLM: ' + (err as Error).message;
            }
            if (!flowJson) {
                return res.status(400).json({ message: errorMsg });
            }
            res.status(201).json(flowJson);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).json({ errors: error });
            }
            res.status(500).json({ message: (error as Error).message });
        }
    };


}



