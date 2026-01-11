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
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export type AnalyzeImageNode = NodeType<
  NodeDataType & {
    variables: {
      image: string;
      prompt: string;
      model: string;
      analysis: string;
    };
  },
  NodeTypes
>;

export const AnalyzeImageNode = ({ data, id }: NodeProps<AnalyzeImageNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateNodeData(id, {
          ...data,
          variables: { ...data.variables, image: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const promptChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, prompt: value },
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
        id={id}
        output={data.output}
      >
        <Field>
          <FieldLabel htmlFor="model">AI Model</FieldLabel>
          <Select
            defaultValue={AI_MODELS.GPT_5_NANO}
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
          <FieldLabel htmlFor="image">Image</FieldLabel>
          <Input
            ref={fileInputRef}
            id="image"
            type="file"
            accept="image/*"
            onChange={imageChangeHandler}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="prompt">Prompt</FieldLabel>
          <MentionEditor nodeId={id} onChange={promptChangeHandler} />
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
