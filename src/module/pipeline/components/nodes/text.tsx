import { type LucideProps } from "lucide-react";
import { Node } from "../ui/node";
import type { NodeProps, Node as NodeType } from "@xyflow/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { Field, FieldLabel } from "@/components/ui/field";
import type { NodeTypes, OutputTypes } from "../../types";

export type TextNode = NodeType<
  {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    name: string;
    output: { name: string; type: OutputTypes }[];
  },
  NodeTypes
>;

export const TextNode = ({ data }: NodeProps<TextNode>) => {
  return (
    <Node
      title={data.title}
      description={data.description}
      Icon={data.Icon}
      name={data.name}
      output={data.output}
    >
      <Field>
        <FieldLabel htmlFor="variables">Type</FieldLabel>
        <EditorContainer className="border p-2 rounded-sm" id="variables">
          <Editor placeholder="Type {{ to utilize  variables" variant="ai" />
        </EditorContainer>
      </Field>
    </Node>
  );
};
