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
import { EDGE_COMPONENTS, NODE_COMPONENTS } from "../utils/const";
import type { CustomEdgeType, CustomNodeType } from "../types";

export const PipelinePage = () => {
  const [nodes, , onNodesChange] = useNodesState<CustomNodeType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdgeType>([]);

  const onConnect: OnConnect = (connection) =>
    setEdges((eds) => addEdge({ ...connection, type: "custom" }, eds));

  return (
    <section className="w-dvw h-dvh flex items-center justify-center">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={NODE_COMPONENTS}
        edgeTypes={EDGE_COMPONENTS}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </section>
  );
};
