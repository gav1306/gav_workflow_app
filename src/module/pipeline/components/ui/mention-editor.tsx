import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
} from "@/components/ui/mention";
import { Textarea } from "@/components/ui/textarea";
import { useEdges, useNodes, useReactFlow } from "@xyflow/react";
import type { CustomEdgeType, CustomNodeType } from "../../types";
import { FieldError } from "@/components/ui/field";
import { useMemo, useState } from "react";

type MentionEditorProps = {
  nodeId: string;
  onChange: (value: string) => void;
};

export const MentionEditor = ({ nodeId, onChange }: MentionEditorProps) => {
  const allNodes = useNodes<CustomNodeType>();
  const edges = useEdges<CustomEdgeType>();
  const { setEdges } = useReactFlow<CustomNodeType, CustomEdgeType>();
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);

  const variableNodes = allNodes.filter((node) => {
    if (node.id !== nodeId) {
      return node;
    }
  });

  const availableVariables = variableNodes.flatMap((node) => {
    return node.data.output.map((variable) => ({
      value: `${node.data.name}.${variable.name}`,
      label: `${node.data.name}.${variable.name}`,
    }));
  });

  const disconnectedVariables = useMemo(() => {
    return selectedVariables.filter((variable) => {
      const [nodeName] = variable.split(".");
      const sourceNode = allNodes.find((node) => node.data.name === nodeName);

      if (sourceNode) {
        const isConnected = edges.some(
          (edge) => edge.source === sourceNode.id && edge.target === nodeId
        );
        return !isConnected;
      }
      return true;
    });
  }, [selectedVariables, edges, allNodes, nodeId]);

  const verifyNodeConnectionHandler = (variables: string[]) => {
    setSelectedVariables(variables);

    variables.forEach((variable) => {
      const [nodeName] = variable.split(".");
      const sourceNode = allNodes.find((node) => node.data.name === nodeName);

      if (sourceNode) {
        const isAlreadyConnected = edges.some(
          (edge) => edge.source === sourceNode.id && edge.target === nodeId
        );

        if (!isAlreadyConnected) {
          setEdges((eds) => [
            ...eds,
            {
              id: `${sourceNode.id}-${nodeId}`,
              source: sourceNode.id,
              target: nodeId,
              type: "custom",
            },
          ]);
        }
      }
    });
  };
  return (
    <>
      <Mention
        onValueChange={verifyNodeConnectionHandler}
        onInputValueChange={onChange}
        trigger="$"
        className="w-full max-w-100"
      >
        <MentionInput placeholder="Type $ to add variables..." asChild>
          <Textarea />
        </MentionInput>
        {!!availableVariables.length && (
          <MentionContent>
            {availableVariables.map((variable) => (
              <MentionItem key={variable.value} value={variable.value}>
                <span className="text-sm">{variable.label}</span>
              </MentionItem>
            ))}
          </MentionContent>
        )}
      </Mention>
      {!!disconnectedVariables.length && (
        <FieldError className="text-xs">
          Missing connection for: {disconnectedVariables.join(", ")}
        </FieldError>
      )}
    </>
  );
};
