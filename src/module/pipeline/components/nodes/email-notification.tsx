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
import { Input } from "@/components/ui/input";

export type EmailNotificationNode = NodeType<
  NodeDataType & {
    variables: {
      recipient: string;
      subject: string;
      body: string;
      status: string;
    };
  },
  NodeTypes
>;

export const EmailNotificationNode = ({
  data,
  id,
}: NodeProps<EmailNotificationNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const recipientChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, recipient: e.target.value },
    });
  };

  const subjectChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, subject: value },
    });
  };

  const bodyChangeHandler = (value: string) => {
    updateNodeData(id, {
      ...data,
      variables: { ...data.variables, body: value },
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
          <FieldLabel htmlFor="recipient">Recipient Email</FieldLabel>
          <Input
            id="recipient"
            type="email"
            placeholder="email@example.com"
            value={data.variables.recipient}
            onChange={recipientChangeHandler}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="subject">Subject</FieldLabel>
          <MentionEditor nodeId={id} onChange={subjectChangeHandler} />
        </Field>
        <Field>
          <FieldLabel htmlFor="body">Body</FieldLabel>
          <MentionEditor nodeId={id} onChange={bodyChangeHandler} />
        </Field>
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
