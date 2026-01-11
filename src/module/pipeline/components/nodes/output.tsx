import { Node } from "../ui/node";
import {
  Position,
  useReactFlow,
  type NodeProps,
  type Node as NodeType,
} from "@xyflow/react";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OUTPUT_TYPE, OUTPUT_TYPE_LABELS } from "../../utils/const";
import type {
  CustomEdgeType,
  CustomNodeType,
  NodeDataType,
  NodeTypes,
} from "../../types";
import { CustomHandle } from "../ui/custom-handle";
import { MentionEditor } from "../ui/mention-editor";

export type OutputNode = NodeType<
  NodeDataType & {
    variables: {
      value: string;
      type: string;
    };
  },
  NodeTypes
>;

export const OutputNode = ({ data, id }: NodeProps<OutputNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const valueChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, value },
    });
  };

  const typeChangeHandler = (type: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, type },
    });
  };

  return (
    <>
      <Node
        title={data.title}
        description={data.description}
        Icon={data.Icon}
        name={data.name}
        id={id}
        output={data.output}
      >
        <Field>
          <FieldLabel htmlFor="node_type">Type</FieldLabel>
          <Select
            defaultValue={OUTPUT_TYPE.STRING}
            value={data.variables?.type}
            onValueChange={typeChangeHandler}
          >
            <SelectTrigger id="node_type" className="w-full">
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
          <FieldLabel htmlFor="value">Value</FieldLabel>
          <MentionEditor nodeId={id} onChange={valueChangeHandler} />
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
    </>
  );
};
