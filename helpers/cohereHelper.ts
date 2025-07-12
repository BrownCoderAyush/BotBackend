import AppDataSource from "../config/db"
import { Node } from "../src/models/Node"



export async function getContext(email : string, projectId : number) : Promise<string>{

    const nodes = await AppDataSource.manager.find(Node, {
        where: { projectId: projectId }
    });

    const nodeRelations = await AppDataSource.manager.query(`
        SELECT childNodeId, parentNodeId 
        FROM NodeParentRelations 
        WHERE childProjectId = @0 OR parentProjectId = @1
    `, [projectId, projectId]);

    const nodesObj: { [key: string]: { description: string; x: number; y: number } } = {};
    nodes.forEach(node => {
        nodesObj[node.nodeId.toString()] = {
            description: node.content,
            x: node.x,
            y: node.y
        };
    });

    const edgesObj: { [key: string]: string } = {};
    nodeRelations.forEach((relation: any) => {
        const parentId = relation.parentNodeId.toString();
        const childId = relation.childNodeId.toString();
        edgesObj[parentId] = childId;
    });

    const contextData = {
        nodes: nodesObj,
        edges: edgesObj
    };

    return JSON.stringify(contextData);

}