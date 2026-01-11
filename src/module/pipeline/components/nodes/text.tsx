import { type LucideProps } from "lucide-react";
import { Node } from "../ui/node";
import { useNodes, type NodeProps, type Node as NodeType } from "@xyflow/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import type { CustomNodeType, NodeTypes, OutputTypes } from "../../types";
import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
} from "@/components/ui/mention";
import { Textarea } from "@/components/ui/textarea";

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

  const variableNodes = allNodes.filter((node) => {
    if (node.id !== id) {
      return node;
    }
  });

  const availableVariables = variableNodes.flatMap((node) => {
    return Object.keys(node.data.variables).map((variable) => ({
      value: `${node.id}-${variable}`,
      label: `${node.data.name}.${variable}`,
    }));
  });

  return (
    <Node
      title={data.title}
      description={data.description}
      Icon={data.Icon}
      name={data.name}
      output={data.output}
    >
      <Field>
        <FieldLabel htmlFor="variables">Text</FieldLabel>
        <Mention trigger="$" className="w-full max-w-100">
          <MentionInput placeholder="Type $ to add variables..." asChild>
            <Textarea />
          </MentionInput>
          {!!availableVariables.length && (
            <MentionContent>
              {availableVariables.map((variable) => (
                <MentionItem key={variable.value} value={variable.label}>
                  <span className="text-sm">{variable.label}</span>
                </MentionItem>
              ))}
            </MentionContent>
          )}
        </Mention>
      </Field>
    </Node>
  );
};
