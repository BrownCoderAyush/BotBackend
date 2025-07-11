import AppDataSource from "../../../config/db";
import { Client } from "../../models/Client";
import { Node } from "../../models/Node";
import { Project } from "../../models/Project";
import { SubmitProjectDto } from "../../project/dtos/SubmitProjectDto";
import { CreateNodeDto } from "../dtos/createNodeDto";


export class NodeService {

    async bulkCreateNode(input: CreateNodeDto[]) {

    }

    async createNodes(input: SubmitProjectDto): Promise<Node[]> {

        const client = await AppDataSource.manager.findOneBy(Client, { email: input.clientEmail })

        if (!client) throw Error(`Can't find any client with given email : ${input.clientEmail}`)
        const project = await AppDataSource.manager.findOneBy(Project, { name: input.projectName, client: { id: client.id } })

        if (!project) throw Error(`Can't find any project with given name : ${input.projectName} and client email : ${input.clientEmail}`)
        const projectNodes: Map<string, Node> = new Map();
        for (const value of input.nodes) {
            if (value.id == "start") continue;

            const nodeData = {
                nodeId: value.id,
                projectId: project.id,
                content: value.data.message,
                type: value.type,
                x: value.position.x,
                y: value.position.y,
                childNodes: []
            };
            const node = AppDataSource.manager.create(Node, nodeData);
            projectNodes.set(value.id, node);
        }

        for (const edge of input.edges) {
            const sourceNode = edge.source;
            const targetNode = edge.target;

            if (sourceNode == 'start') continue;
            projectNodes.get(sourceNode)!.childNodes.push(projectNodes.get(targetNode)!);
        }

        return await AppDataSource.manager.save(Node, Array.from(projectNodes.values()));

    }
}