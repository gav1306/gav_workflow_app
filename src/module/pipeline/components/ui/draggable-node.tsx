import { useReactFlow, type XYPosition } from "@xyflow/react";
import {
  useRef,
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { useDraggable } from "@neodrag/react";
import type { LucideProps } from "lucide-react";
import type {
  CustomNodeType,
  NodeTypes,
  OutputTypes,
  VariableType,
} from "../../types";

interface DraggableNodeProps extends React.PropsWithChildren {
  type: NodeTypes;
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  initialVariables: VariableType;
  output: { name: string; type: OutputTypes }[];
}

export const DraggableNode = ({
  children,
  type,
  title,
  description,
  Icon,
  initialVariables,
  output,
}: DraggableNodeProps) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });
  const { setNodes, screenToFlowPosition, getNodes } =
    useReactFlow<CustomNodeType>();

  useDraggable(draggableRef as React.RefObject<HTMLElement>, {
    position: position,
    onDrag: ({ offsetX, offsetY }) => {
      setPosition({
        x: offsetX,
        y: offsetY,
      });
    },
    onDragEnd: ({ event }) => {
      setPosition({ x: 0, y: 0 });
      handleNodeDrop(type, {
        x: event.clientX,
        y: event.clientY,
      });
    },
  });

  const handleNodeDrop = (nodeType: NodeTypes, screenPosition: XYPosition) => {
    const existingNodes = getNodes();
    const existingTypeNodes = existingNodes.filter(
      (node) => node.type === nodeType
    );
    let nodeName = `${nodeType}_0`;
    if (existingTypeNodes.length) {
      const latestNode = existingTypeNodes[existingTypeNodes.length - 1];
      const nameParts = latestNode.data.name.split("_") || [];
      const latestIndex =
        nameParts.length > 1 ? parseInt(nameParts[nameParts.length - 1]) : -1;
      nodeName = `${nodeType}_${latestIndex + 1}`;
    }
    const flow = document.querySelector(".react-flow");
    const flowRect = flow?.getBoundingClientRect();
    const isInFlow =
      flowRect &&
      screenPosition.x >= flowRect.left &&
      screenPosition.x <= flowRect.right &&
      screenPosition.y >= flowRect.top &&
      screenPosition.y <= flowRect.bottom;

    if (isInFlow) {
      const position = screenToFlowPosition(screenPosition);

      const newNode = {
        id: crypto.randomUUID(),
        type: nodeType,
        position,
        data: {
          title,
          description,
          Icon,
          name: nodeName,
          variables: initialVariables,
          output,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    }
  };

  return (
    <div ref={draggableRef} className="cursor-grab touch-none">
      {children}
    </div>
  );
};
