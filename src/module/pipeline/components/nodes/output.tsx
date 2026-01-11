import { type LucideProps } from "lucide-react";
import { Node } from "../ui/node";
import type { NodeProps, Node as NodeType } from "@xyflow/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OUTPUT_TYPE, OUTPUT_TYPE_LABELS } from "../../utils/const";
import { Editor, EditorContainer } from "@/components/ui/editor";
import type { NodeTypes, OutputTypes } from "../../types";

export type OutputNode = NodeType<
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

export const OutputNode = ({ data }: NodeProps<OutputNode>) => {
  return (
    <Node
      title={data.title}
      description={data.description}
      Icon={data.Icon}
      name={data.name}
      output={data.output}
    >
      <Field>
        <FieldLabel htmlFor="node_type">Type</FieldLabel>
        <Select>
          <SelectTrigger id="node_type">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OUTPUT_TYPE).map((type) => (
              <SelectItem key={type} value={type}>
                {OUTPUT_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="variables">Type</FieldLabel>
        <EditorContainer className="border p-2 rounded-sm" id="variables">
          <Editor placeholder="Type {{ to utilize  variables" variant="ai" />
        </EditorContainer>
      </Field>
    </Node>
  );
};
