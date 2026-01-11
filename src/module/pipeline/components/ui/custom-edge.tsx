import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeText,
  getBezierPath,
  useReactFlow,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import type { CustomEdgeType, CustomNodeType } from "../../types";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

export type CustomEdge = Edge<Record<string, unknown>, "custom">;

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  label,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps<CustomEdge>) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { setEdges } = useReactFlow<CustomNodeType, CustomEdgeType>();
  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <svg className="absolute top-0 left-0">
        <defs>
          <marker
            className="react-flow__arrowhead"
            id="selected-marker"
            markerWidth="30"
            markerHeight="30"
            viewBox="-10 -10 20 20"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              style={{
                strokeWidth: 4,
                stroke: "#db2475",
                fill: "#db2475",
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              points="-5,-4 0,0 -5,4 -5,-4"
            />
          </marker>
        </defs>
      </svg>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd="url(#selected-marker)"
        style={{
          stroke: "#db2475",
          strokeWidth: 4,
          strokeDasharray: "6",
        }}
        label={label}
      />
      <EdgeText x={labelX} y={labelY} label={label} />
      <EdgeLabelRenderer>
        <div
          className="absolute pointer-events-auto"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <Button
            variant="outline"
            className="rounded-full size-6 group hover:bg-destructive border-destructive"
            size="icon-sm"
            onClick={onEdgeClick}
          >
            <CircleX className="text-destructive group-hover:text-white" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
