import { CustomEdge } from "./../components/ui/custom-edge";
import type { InputNode } from "../components/nodes/input";
import type { AskAiNode } from "../components/nodes/ask-ai";
import type { OutputNode } from "../components/nodes/output";
import type { TextNode } from "../components/nodes/text";
import type { AnalyzeImageNode } from "../components/nodes/analyze-image";
import type { TextFormatterNode } from "../components/nodes/text-formatter";
import type { EmailNotificationNode } from "../components/nodes/email-notification";
import type { TextToSpeechNode } from "../components/nodes/text-to-speech";
import type { WebSearchNode } from "../components/nodes/web-search";
import type { NODE_TYPES, OUTPUT_TYPE } from "../utils/const";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

export type CustomNodeType =
  | InputNode
  | TextNode
  | AskAiNode
  | OutputNode
  | AnalyzeImageNode
  | TextFormatterNode
  | EmailNotificationNode
  | TextToSpeechNode
  | WebSearchNode;
export type NodeTypes = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];
export type InputVariableType = { input: string };
export type OutputVariableType = null;
export type AskAiVariableType = {
  prompt: string;
  context: string;
  model: string;
  response: number;
};
export type TextVariableType = { text: string };
export type AnalyzeImageVariableType = {
  image: File;
  prompt: string;
  model: string;
  analysis: string;
};
export type TextFormatterVariableType = {
  output: string;
};
export type EmailNotificationVariableType = {
  status: string;
};
export type TextToSpeechVariableType = {
  output: File;
};
export type WebSearchVariableType = {
  results: string[];
};
export type VariableType =
  | InputVariableType
  | AskAiVariableType
  | OutputVariableType
  | TextVariableType
  | AnalyzeImageVariableType
  | TextFormatterVariableType
  | EmailNotificationVariableType
  | TextToSpeechVariableType
  | WebSearchVariableType;

export type OutputTypes = (typeof OUTPUT_TYPE)[keyof typeof OUTPUT_TYPE];
export type CustomEdgeType = CustomEdge;
export type NodeDataType = {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  name: string;
  output: { name: string; type: OutputTypes }[];
};

export type PipelineParseResponse = {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
};

export type PipelineParseRequest = {
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
};
