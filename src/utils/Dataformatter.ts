interface NodeInput {
    id: string;
    type: string;
    data: any;
}

interface EdgeInput {
    source: string;
    target: string;
}

interface FlowData {
    nodes: NodeInput[];
    edges: EdgeInput[];
}

export const sanitizeFlowData = (rawNodes: any[], rawEdges: any[]): FlowData => {
    const cleanedNodes = rawNodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
            ...node.data,
            isEditing: undefined,
        },
    })).map((node) => {
        const { isEditing, ...cleanedData } = node.data;
        return {
            id: node.id,
            type: node.type,
            position: node.position,
            data: cleanedData,
        };
    });

    const cleanedEdges = rawEdges.map((edge) => ({
        source: edge.source,
        target: edge.target,
    }));
    //user this so u can read the object in return choose whichever data u wanna return
    //   return JSON.stringify({ nodes: cleanedNodes, edges: cleanedEdges }, null, 2);

    return {
        nodes: cleanedNodes,
        edges: cleanedEdges,
    };
};
