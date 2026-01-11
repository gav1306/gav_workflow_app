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
import { AI_MODELS, AI_MODELS_OPTIONS } from "../../utils/const";

export type AskAiNode = NodeType<
  NodeDataType & {
    variables: {
      prompt: string;
      context: string;
      response: string;
      model: string;
    };
  },
  NodeTypes
>;

export const AskAiNode = ({ data, id }: NodeProps<AskAiNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const promptChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, prompt: value },
    });
  };

  const contextChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, context: value },
    });
  };

  const modelChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, model: value },
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
          <FieldLabel htmlFor="model">AI Model</FieldLabel>
          <Select
            defaultValue={AI_MODELS.GPT_5_MINI}
            value={data.variables.model}
            onValueChange={modelChangeHandler}
          >
            <SelectTrigger id="model">
              <SelectValue placeholder="Select AI model" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS_OPTIONS.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="prompt">Prompt</FieldLabel>
          <MentionEditor nodeId={id} onChange={promptChangeHandler} />
        </Field>
        <Field>
          <FieldLabel htmlFor="context">Context</FieldLabel>
          <MentionEditor nodeId={id} onChange={contextChangeHandler} />
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
