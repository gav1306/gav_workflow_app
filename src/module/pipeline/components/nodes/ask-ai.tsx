import { type LucideProps } from "lucide-react";
import { Node } from "../ui/node";
import { Position, type NodeProps, type Node as NodeType } from "@xyflow/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { NodeTypes, OutputTypes } from "../../types";
import { CustomHandle } from "../ui/custom-handle";

export type AskAiNode = NodeType<
  {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    name: string;
    variables: {
      prompt: string;
      context: string;
    };
    output: { name: string; type: OutputTypes }[];
  },
  NodeTypes
>;

export const AskAiNode = ({ data }: NodeProps<AskAiNode>) => {
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
          <FieldLabel htmlFor="variables">Type</FieldLabel>
        </Field>
        <Field>
          <FieldLabel htmlFor="prompt">Prompt</FieldLabel>
          <Textarea placeholder="Type your prompt here..." id="prompt" />
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
