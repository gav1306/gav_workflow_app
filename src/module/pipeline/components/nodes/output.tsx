import { Node } from "../ui/node";
import { Position, type NodeProps, type Node as NodeType } from "@xyflow/react";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OUTPUT_TYPE, OUTPUT_TYPE_LABELS } from "../../utils/const";
import type { NodeDataType, NodeTypes } from "../../types";
import { CustomHandle } from "../ui/custom-handle";

export type OutputNode = NodeType<
  NodeDataType & {
    variables: null;
  },
  NodeTypes
>;

export const OutputNode = ({ data }: NodeProps<OutputNode>) => {
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
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
    </>
  );
};
