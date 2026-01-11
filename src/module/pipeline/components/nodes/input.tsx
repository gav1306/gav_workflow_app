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

export type InputNode = NodeType<
  NodeDataType & {
    variables: {
      input: string;
    };
  },
  NodeTypes
>;

export const InputNode = ({ data, id }: NodeProps<InputNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const addInputTypeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, input: value },
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
            onValueChange={addInputTypeHandler}
            value={data.variables.input}
          >
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
      </Node>
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
