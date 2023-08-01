import React from 'react';
import ReactFlow, {Edge, Node, Position, useEdgesState, useNodesState,} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes:Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'node1' }, type:"input", sourcePosition:Position.Right, },
    { id: '2', position: { x: 0, y: 80 }, data: { label: 'node2' }, type:"output",  targetPosition: Position.Left},
    { id: '3', position: { x: 200, y: 70 }, data: { label: 'node3' }, type:"output", targetPosition: Position.Left },
    { id: '4', position: { x: 200, y: 120 }, data: { label: 'node4' } ,type:"output", sourcePosition: Position.Right},
    { id: '5', position: { x:400, y: 70}, data: { label: 'node5' } ,type:"output"},
    { id: '6', position: { x: 0, y: 160 }, data: { label: 'node6' } ,type:"output"}
];
const initialEdges: Edge[]= [
    { id: 'e1a-2', source: '1', target: '2', sourceHandle:'a' },
    { id: 'e1b-3', source: '1', target: '3', sourceHandle:'b' },
    { id: 'e1-4', source: '1', target: '4' ,animated: true },
    { id: 'e3-5', source: '3', target: '5' ,animated: true },
    { id: 'e2-6', source: '2', target: '6'},

];

export const Test=()=> {
    const [nodes] = useNodesState(initialNodes);
    const [edges] = useEdgesState(initialEdges);
    return (
        <div style={{ width: '100vw', height: '100vh', direction: "ltr" }}>

            <ReactFlow nodes={nodes} edges={edges} fitView zoomOnScroll={false} panOnDrag={false} nodesConnectable={false}/>
        </div>
    );
}

