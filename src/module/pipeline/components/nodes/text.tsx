import { type LucideProps } from "lucide-react";
import { Node } from "../ui/node";
import {
  Position,
  useNodes,
  useReactFlow,
  type NodeProps,
  type Node as NodeType,
} from "@xyflow/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import type {
  CustomEdgeType,
  CustomNodeType,
  NodeTypes,
  OutputTypes,
} from "../../types";
import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
} from "@/components/ui/mention";
import { Textarea } from "@/components/ui/textarea";
import { CustomHandle } from "../ui/custom-handle";

export type TextNode = NodeType<
  {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    name: string;
    variables: {
      text: string;
    };
    output: { name: string; type: OutputTypes }[];
  },
  NodeTypes
>;

export const TextNode = ({ data, id }: NodeProps<TextNode>) => {
  const allNodes = useNodes<CustomNodeType>();
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const variableNodes = allNodes.filter((node) => {
    if (node.id !== id) {
      return node;
    }
  });

  const availableVariables = variableNodes.flatMap((node) => {
    return node.data.variables
      ? Object.keys(node.data.variables).map((variable) => ({
          value: `${node.data.name}.${variable}`,
          label: `${node.data.name}.${variable}`,
        }))
      : [];
  });

  const verifyNodeConnectionHandler = (selectedVariables: string[]) => {
    selectedVariables.forEach((variable) => {
      const [nodeName, variableKey] = variable.split(".");
      console.log({ nodeName, variableKey });
    });
  };

  const addTextChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, text: value },
    });
  };

  return (
    <>
      <Node
        title={data.title}
        description={data.description}
        Icon={data.Icon}
        name={data.name}
        output={data.output}
      >
        <Field>
          <FieldLabel htmlFor="variables">Text</FieldLabel>
          <Mention
            onValueChange={verifyNodeConnectionHandler}
            onInputValueChange={addTextChangeHandler}
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
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
