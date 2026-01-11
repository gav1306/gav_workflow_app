import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NODE_COMPONENTS } from "../utils/const";

export const PipelinePage = () => {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect: OnConnect = (connection) =>
    setEdges((eds) => addEdge(connection, eds));

  return (
    <section className="w-dvw h-dvh flex items-center justify-center">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={NODE_COMPONENTS}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </section>
  );
};
