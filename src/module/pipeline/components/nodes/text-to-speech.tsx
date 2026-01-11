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
import { TTS_MODELS, TTS_MODELS_OPTIONS } from "../../utils/const";
import { Input } from "@/components/ui/input";

export type TextToSpeechNode = NodeType<
  NodeDataType & {
    variables: {
      text: string;
      filename: string;
      model: string;
      output: string;
    };
  },
  NodeTypes
>;

export const TextToSpeechNode = ({ data, id }: NodeProps<TextToSpeechNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const textChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, text: value },
    });
  };

  const filenameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, filename: e.target.value },
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
          <FieldLabel htmlFor="model">TTS Model</FieldLabel>
          <Select
            defaultValue={TTS_MODELS.ELEVEN_LABS}
            value={data.variables.model}
            onValueChange={modelChangeHandler}
          >
            <SelectTrigger id="model">
              <SelectValue placeholder="Select TTS model" />
            </SelectTrigger>
            <SelectContent>
              {TTS_MODELS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="text">Text</FieldLabel>
          <MentionEditor nodeId={id} onChange={textChangeHandler} />
        </Field>
        <Field>
          <FieldLabel htmlFor="filename">Filename</FieldLabel>
          <Input
            id="filename"
            type="text"
            placeholder="output.mp3"
            value={data.variables?.filename || ""}
            onChange={filenameChangeHandler}
          />
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
