import { ArrowDownToLine, ArrowUpFromLine, Cpu, FileText } from "lucide-react";
import { InputNode } from "../components/nodes/input";
import { OutputNode } from "../components/nodes/output";
import { AskAiNode } from "../components/nodes/ask-ai";
import { TextNode } from "../components/nodes/text";
import type { NodeTypes } from "../types";

export const OUTPUT_TYPE = {
  STRING: "string",
  INTEGER: "integer",
  FLOAT: "float",
  BOOL: "bool",
  DECIMAL: "decimal",
  FILE: "file",
  CHUNKS: "chunks",
  ANY: "any",
} as const;

export const NODE_TYPES = {
  INPUT: "input_node",
  OUTPUT: "output_node",
  ASK_AI: "ask_ai_node",
  TEXT: "text_node",
} as const;

export const NODES = [
  {
    Icon: ArrowDownToLine,
    title: "input",
    type: NODE_TYPES.INPUT,
    description:
      "Entry point for input values in flow. Essential for taking inputs in subflows.",
    output: [{ name: "input", type: OUTPUT_TYPE.STRING }],
    initialVariables: { input: OUTPUT_TYPE.STRING },
    Component: InputNode,
  },
  {
    Icon: ArrowUpFromLine,
    title: "output",
    type: NODE_TYPES.OUTPUT,
    description:
      "Exit point for passing values out of flow. Useful for webhooks and subflows.",
    output: [{ name: "output", type: OUTPUT_TYPE.STRING }],
    initialVariables: { output: "" },
    Component: OutputNode,
  },
  {
    Icon: Cpu,
    title: "ask AI",
    type: NODE_TYPES.ASK_AI,
    description:
      "Prompt an Al language model (includes deep research). Provide all relevant context and use detailed prompts to get the best results",
    output: [
      { name: "prompt", type: OUTPUT_TYPE.STRING },
      { name: "context", type: OUTPUT_TYPE.STRING },
    ],
    initialVariables: {
      prompt: "",
      context: "",
    },
    Component: AskAiNode,
  },
  {
    Icon: FileText,
    title: "text",
    type: NODE_TYPES.TEXT,
    description:
      "Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes.",
    output: [{ name: "text", type: OUTPUT_TYPE.STRING }],
    initialVariables: { text: "" },
    Component: TextNode,
  },
];

export const OUTPUT_TYPE_LABELS = {
  [OUTPUT_TYPE.STRING]: "str",
  [OUTPUT_TYPE.INTEGER]: "int",
  [OUTPUT_TYPE.FLOAT]: "flt",
  [OUTPUT_TYPE.BOOL]: "bool",
  [OUTPUT_TYPE.DECIMAL]: "dec",
  [OUTPUT_TYPE.FILE]: "file",
  [OUTPUT_TYPE.CHUNKS]: "chks",
  [OUTPUT_TYPE.ANY]: "any",
};

export const NODE_COMPONENTS = NODES.reduce((acc, node) => {
  acc[node.type] = node.Component;
  return acc;
}, {} as Record<NodeTypes, React.FC<any>>);
