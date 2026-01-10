import { useReactFlow, type XYPosition } from "@xyflow/react";
import { useRef, useState } from "react";
import { useDraggable } from "@neodrag/react";

interface DraggableNodeProps extends React.PropsWithChildren {
  type: string;
}

export const DraggableNode = ({ children, type }: DraggableNodeProps) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });
  const { setNodes, screenToFlowPosition } = useReactFlow();

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

  const handleNodeDrop = (nodeType: string, screenPosition: XYPosition) => {
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
        data: {},
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
