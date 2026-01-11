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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEXT_FORMATTER_OPTIONS, TEXT_FORMATTERS } from "../../utils/const";

export type TextFormatterNode = NodeType<
  NodeDataType & {
    variables: {
      input: string;
      formatter: string;
      output: string;
    };
  },
  NodeTypes
>;

export const TextFormatterNode = ({
  data,
  id,
}: NodeProps<TextFormatterNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const inputChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, input: value },
    });
  };

  const formatterChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, formatter: value },
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
          <FieldLabel htmlFor="input">Input</FieldLabel>
          <MentionEditor nodeId={id} onChange={inputChangeHandler} />
        </Field>
        <Field>
          <FieldLabel htmlFor="formatter">Formatter</FieldLabel>
          <Select
            defaultValue={TEXT_FORMATTERS.UPPERCASE}
            value={data.variables.formatter}
            onValueChange={formatterChangeHandler}
          >
            <SelectTrigger id="formatter">
              <SelectValue placeholder="Select formatter" />
            </SelectTrigger>
            <SelectContent>
              {TEXT_FORMATTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
