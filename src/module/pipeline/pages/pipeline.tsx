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

const NODE_TYPES = {
  input_node: () => <div className="p-2 bg-white border">Input Node</div>,
  output_node: () => <div className="p-2 bg-white border">Output Node</div>,
  ask_ai_node: () => <div className="p-2 bg-white border">Ask AI Node</div>,
  text_node: () => <div className="p-2 bg-white border">Text Node</div>,
};

export const PipelinePage = () => {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect: OnConnect = (connection) =>
    setEdges((eds) => addEdge(connection, eds));

  console.log(nodes);

  return (
    <section className="w-dvw h-dvh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={NODE_TYPES}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </section>
  );
};
