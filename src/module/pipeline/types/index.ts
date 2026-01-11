import type { InputNode } from "../components/nodes/input";
import type { AskAiNode } from "../components/nodes/ask-ai";
import type { OutputNode } from "../components/nodes/output";
import type { TextNode } from "../components/nodes/text";
import type { NODE_TYPES, OUTPUT_TYPE } from "../utils/const";

export type CustomNodeType = InputNode | TextNode | AskAiNode | OutputNode;
export type NodeTypes = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];
export type InputVariableType = { input: string };
export type AskAiVariableType = { prompt: string; context: string };
export type OutputVariableType = { output: string };
export type TextVariableType = { text: string };
export type VariableType =
  | InputVariableType
  | AskAiVariableType
  | OutputVariableType
  | TextVariableType;

export type OutputTypes = (typeof OUTPUT_TYPE)[keyof typeof OUTPUT_TYPE];
