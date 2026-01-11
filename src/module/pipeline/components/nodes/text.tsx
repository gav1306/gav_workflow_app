import { Node } from "../ui/node";
import {
  Position,
  useReactFlow,
  type NodeProps,
  type Node as NodeType,
} from "@xyflow/react";
import { Field, FieldLabel } from "@/components/ui/field";
import type {
  CustomEdgeType,
  CustomNodeType,
  NodeDataType,
  NodeTypes,
} from "../../types";

import { CustomHandle } from "../ui/custom-handle";
import { MentionEditor } from "../ui/mention-editor";

export type TextNode = NodeType<
  NodeDataType & {
    variables: {
      text: string;
    };
  },
  NodeTypes
>;

export const TextNode = ({ data, id }: NodeProps<TextNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

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
          <MentionEditor nodeId={id} onChange={addTextChangeHandler} />
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
