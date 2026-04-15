import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 1. Define your nodes (The Boxes)
const initialNodes = [
  { 
    id: '1', 
    position: { x: 0, y: 150 }, 
    data: { label: 'React Frontend (Vite)' },
    style: { background: '#61dafb', color: '#000', borderRadius: '8px', padding: '10px' }
  },
  { 
    id: '2', 
    position: { x: 250, y: 150 }, 
    data: { label: 'FastAPI Backend' },
    style: { background: '#05998b', color: '#fff', borderRadius: '8px', padding: '10px' } 
  },
  { 
    id: '3', 
    position: { x: 500, y: 50 }, 
    data: { label: 'Gemini Worker Agent 1' },
    style: { border: '2px solid #ea580c', borderRadius: '8px' }
  },
  { 
    id: '4', 
    position: { x: 500, y: 250 }, 
    data: { label: 'Gemini Worker Agent 2' },
    style: { border: '2px solid #ea580c', borderRadius: '8px' }
  },
  { 
    id: '5', 
    position: { x: 750, y: 150 }, 
    data: { label: 'Supabase DB' },
    style: { background: '#3ecf8e', color: '#fff', borderRadius: '8px' }
  },
];

// 2. Define your edges (The Animated Lines)
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Upload Audio' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', label: 'Chunk Success' },
  { id: 'e4-5', source: '4', target: '5', label: 'Chunk Success' },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 4, color: 'white' }}>
        <h1 className="text-2xl font-bold">Someet Sahoo | Interactive Architecture</h1>
        <p className="text-gray-400">Scribe: Multi-Agent Audio Pipeline</p>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#333" gap={20} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}