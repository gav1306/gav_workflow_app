import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Cpu,
  FileText,
  ScanSearch,
  CaseSensitive,
  Mail,
  Speech,
  Search,
} from "lucide-react";
import { InputNode } from "../components/nodes/input";
import { OutputNode } from "../components/nodes/output";
import { AskAiNode } from "../components/nodes/ask-ai";
import { TextNode } from "../components/nodes/text";
import { AnalyzeImageNode } from "../components/nodes/analyze-image";
import { TextFormatterNode } from "../components/nodes/text-formatter";
import { EmailNotificationNode } from "../components/nodes/email-notification";
import { TextToSpeechNode } from "../components/nodes/text-to-speech";
import { WebSearchNode } from "../components/nodes/web-search";
import type { NodeTypes } from "../types";
import { CustomEdge } from "../components/ui/custom-edge";

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
  ANALYZE_IMAGE: "analyze_image_node",
  TEXT_FORMATTER: "text_formatter_node",
  EMAIL_NOTIFICATION: "email_notification_node",
  TEXT_TO_SPEECH: "text_to_speech_node",
  WEB_SEARCH: "web_search_node",
} as const;

export const AI_MODELS = {
  CLAUDE_OPUS_4_5: "claude-opus-4.5",
  CLAUDE_SONNET_4_5: "claude-sonnet-4.5",
  GPT_5: "gpt-5",
  GPT_5_MINI: "gpt-5-mini",
  GPT_5_NANO: "gpt-5-nano",
  O3_MINI: "o3-mini",
  O1: "o1",
} as const;

export const TEXT_FORMATTERS = {
  UPPERCASE: "uppercase",
  LOWERCASE: "lowercase",
  TRUNCATE: "truncate",
  TRIM: "trim",
} as const;

export const TEXT_FORMATTER_OPTIONS = [
  { value: TEXT_FORMATTERS.UPPERCASE, label: "Uppercase" },
  { value: TEXT_FORMATTERS.LOWERCASE, label: "Lowercase" },
  { value: TEXT_FORMATTERS.TRUNCATE, label: "Truncate" },
  {
    value: TEXT_FORMATTERS.TRIM,
    label: "Trim (Remove leading/trailing whitespace)",
  },
] as const;

export const TTS_MODELS = {
  ELEVEN_LABS: "eleven-labs",
  OPENAI_TTS: "openai-tts",
  GOOGLE_TTS: "google-tts",
  AZURE_TTS: "azure-tts",
} as const;

export const TTS_MODELS_OPTIONS = [
  { value: TTS_MODELS.ELEVEN_LABS, label: "Eleven Labs" },
  { value: TTS_MODELS.OPENAI_TTS, label: "OpenAI TTS" },
  { value: TTS_MODELS.GOOGLE_TTS, label: "Google TTS" },
  { value: TTS_MODELS.AZURE_TTS, label: "Azure TTS" },
] as const;

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
    output: [],
    initialVariables: { value: "", type: OUTPUT_TYPE.STRING },
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
      { name: "model", type: OUTPUT_TYPE.STRING },
      { name: "response", type: OUTPUT_TYPE.STRING },
    ],
    initialVariables: {
      prompt: "",
      context: "",
      model: AI_MODELS.GPT_5_MINI,
      response: "",
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
  {
    Icon: ScanSearch,
    title: "analyze image",
    type: NODE_TYPES.ANALYZE_IMAGE,
    description:
      "Analyze images using AI vision models. Upload an image and provide a prompt to get detailed analysis results.",
    output: [
      { name: "image", type: OUTPUT_TYPE.FILE },
      { name: "prompt", type: OUTPUT_TYPE.STRING },
      { name: "model", type: OUTPUT_TYPE.STRING },
      { name: "analysis", type: OUTPUT_TYPE.STRING },
    ],
    initialVariables: {
      image: "",
      prompt: "",
      model: AI_MODELS.GPT_5_NANO,
      analysis: "",
    },
    Component: AnalyzeImageNode,
  },
  {
    Icon: CaseSensitive,
    title: "text formatter",
    type: NODE_TYPES.TEXT_FORMATTER,
    description:
      "Format text with various transformations like uppercase, lowercase, truncate, or trim whitespace.",
    output: [{ name: "output", type: OUTPUT_TYPE.STRING }],
    initialVariables: {
      input: "",
      formatter: TEXT_FORMATTERS.UPPERCASE,
      output: "",
    },
    Component: TextFormatterNode,
  },
  {
    Icon: Mail,
    title: "email notification",
    type: NODE_TYPES.EMAIL_NOTIFICATION,
    description:
      "Send email notifications to specified recipients with customizable subject and body content.",
    output: [{ name: "status", type: OUTPUT_TYPE.STRING }],
    initialVariables: {
      recipient: "",
      subject: "",
      body: "",
      status: "",
    },
    Component: EmailNotificationNode,
  },
  {
    Icon: Speech,
    title: "text to speech",
    type: NODE_TYPES.TEXT_TO_SPEECH,
    description:
      "Convert text to speech audio using various TTS models. Output the generated audio file.",
    output: [{ name: "output", type: OUTPUT_TYPE.FILE }],
    initialVariables: {
      text: "",
      filename: "",
      model: TTS_MODELS.ELEVEN_LABS,
      output: "",
    },
    Component: TextToSpeechNode,
  },
  {
    Icon: Search,
    title: "web search",
    type: NODE_TYPES.WEB_SEARCH,
    description:
      "Search the web using keywords and retrieve a list of relevant search results.",
    output: [{ name: "results", type: OUTPUT_TYPE.CHUNKS }],
    initialVariables: {
      query: "",
      results: "",
    },
    Component: WebSearchNode,
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
} as const;

export const NODE_COMPONENTS = NODES.reduce((acc, node) => {
  acc[node.type] = node.Component;
  return acc;
}, {} as Record<NodeTypes, React.FC<any>>);

export const EDGE_COMPONENTS = {
  custom: CustomEdge,
} as const;

export const AI_MODELS_OPTIONS = [
  {
    value: AI_MODELS.CLAUDE_OPUS_4_5,
    label: "Claude Opus 4.5",
  },
  {
    value: AI_MODELS.CLAUDE_SONNET_4_5,
    label: "Claude Sonnet 4.5",
  },
  {
    value: AI_MODELS.GPT_5,
    label: "GPT-5",
  },
  {
    value: AI_MODELS.GPT_5_MINI,
    label: "GPT-5 Mini",
  },
  {
    value: AI_MODELS.GPT_5_NANO,
    label: "GPT-5 Nano",
  },
  {
    value: AI_MODELS.O3_MINI,
    label: "O3 Mini",
  },
  {
    value: AI_MODELS.O1,
    label: "O1",
  },
] as const;
