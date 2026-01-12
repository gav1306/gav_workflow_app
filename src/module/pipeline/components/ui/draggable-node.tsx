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
  CustomEdgeType,
  CustomNodeType,
  NodeTypes,
  OutputTypes,
  VariableType,
} from "../../types";
import { useNodeName } from "../../hooks/use-node-name";

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const { setNodes, screenToFlowPosition } = useReactFlow<
    CustomNodeType,
    CustomEdgeType
  >();
  const { generateNodeName } = useNodeName();

  const { isDragging, dragState } = useDraggable(
    draggableRef as React.RefObject<HTMLElement>,
    {
      position: {
        x: 0,
        y: 0,
      },
      onDragStart: ({ event }) => {
        const rect = draggableRef.current?.getBoundingClientRect();
        if (rect) {
          setDragStartOffset({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
          setElementSize({
            width: rect.width,
            height: rect.height,
          });
          setPosition({
            x: event.clientX,
            y: event.clientY,
          });
        }
      },
      onDrag: ({ event }) => {
        setPosition({
          x: event.clientX,
          y: event.clientY,
        });
      },
      onDragEnd: ({ event }) => {
        setPosition({ x: 0, y: 0 });
        setDragStartOffset({ x: 0, y: 0 });
        setElementSize({ width: 0, height: 0 });
        handleNodeDrop(type, {
          x: event.clientX,
          y: event.clientY,
        });
      },
    }
  );

  const handleNodeDrop = (nodeType: NodeTypes, screenPosition: XYPosition) => {
    const nodeName = generateNodeName(type);
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

      const newNode: CustomNodeType = {
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
      } as CustomNodeType;
      setNodes((nds) => nds.concat(newNode));
    }
  };

  return (
    <>
      <div ref={draggableRef} className="cursor-grab active:cursor-grabbing">
        {children}
      </div>
      {isDragging && (
        <div
          className="pointer-events-none fixed z-50 opacity-70"
          style={{
            left: position.x - dragStartOffset.x,
            top: position.y - dragStartOffset.y,
            width: elementSize.width,
            height: elementSize.height,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};
