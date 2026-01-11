import { CustomEdge } from "./../components/ui/custom-edge";
import type { InputNode } from "../components/nodes/input";
import type { AskAiNode } from "../components/nodes/ask-ai";
import type { OutputNode } from "../components/nodes/output";
import type { TextNode } from "../components/nodes/text";
import type { AnalyzeImageNode } from "../components/nodes/analyze-image";
import type { TextFormatterNode } from "../components/nodes/text-formatter";
import type { NODE_TYPES, OUTPUT_TYPE } from "../utils/const";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

export type CustomNodeType =
  | InputNode
  | TextNode
  | AskAiNode
  | OutputNode
  | AnalyzeImageNode
  | TextFormatterNode;
export type NodeTypes = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];
export type InputVariableType = { input: string };
export type AskAiVariableType = { prompt: string; context: string };
export type OutputVariableType = null;
export type TextVariableType = { text: string };
export type VariableType =
  | InputVariableType
  | AskAiVariableType
  | OutputVariableType
  | TextVariableType;

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
