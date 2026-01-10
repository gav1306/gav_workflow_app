import { ArrowDownToLine, ArrowUpFromLine, Cpu, FileText } from "lucide-react";

export const SIDEBAR_NODES = [
  {
    icon: ArrowDownToLine,
    title: "input",
    type: "input_node",
    text: "Entry point for input values in flow. Essential for taking inputs in subflows.",
  },
  {
    icon: ArrowUpFromLine,
    title: "output",
    type: "output_node",
    text: "Exit point for passing values out of flow. Useful for webhooks and subflows.",
  },
  {
    icon: Cpu,
    title: "ask AI",
    type: "ask_ai_node",
    text: "Prompt an Al language model (includes deep research). Provide all relevant context and use detailed prompts to get the best results",
  },
  {
    icon: FileText,
    title: "text",
    type: "text_node",
    text: "Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes.",
  },
];
