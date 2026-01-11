import { useReactFlow } from "@xyflow/react";
import type { CustomEdgeType, CustomNodeType, NodeTypes } from "../../types";

export const useNodeName = () => {
  const { getNodes } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const generateNodeName = (nodeType: NodeTypes): string => {
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
    return nodeName;
  };

  return {
    generateNodeName,
  };
};
