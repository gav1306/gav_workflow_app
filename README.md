# GAV Workflow App

A modern, visual workflow builder application UI built with React, Vite and React Flow. Create, connect, and execute AI-powered pipelines with an intuitive drag-and-drop interface.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![React Flow](https://img.shields.io/badge/React%20Flow-12.10-FF6B6B?style=flat-square&logo=reactflow)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)
![Shadcn](https://img.shields.io/badge/Shadcn%20UI-Latest-000000?style=flat-square&logo=shadcnui)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=flat-square&logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/FastAPI-0.128-009688?style=flat-square&logo=fastapi)

## Features

### Visual Pipeline Builder

- **Drag-and-Drop Interface** - Intuitive node-based workflow creation using React Flow
- **Real-time Connections** - Connect nodes with visual edges to define data flow
- **Mini Map & Controls** - Navigate complex workflows with built-in navigation tools
- **Export to PNG** - Download your pipeline designs as images

### Node Types

The application includes a comprehensive set of pre-built nodes:

| Node                   | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Input**              | Entry point for input values in flow. Essential for taking inputs in subflows          |
| **Output**             | Exit point for passing values out of flow. Useful for webhooks and subflows            |
| **Ask AI**             | Prompt an AI language model with support for multiple models (GPT-5, Claude, O1, etc.) |
| **Text**               | Accepts text from upstream nodes and allows concatenation with variable interpolation  |
| **Analyze Image**      | Analyze images using AI vision models with customizable prompts                        |
| **Text Formatter**     | Format text with transformations (uppercase, lowercase, truncate, trim)                |
| **Email Notification** | Send email notifications with customizable subject and body                            |
| **Text to Speech**     | Convert text to speech using various TTS models (Eleven Labs, OpenAI, Google, Azure)   |
| **Web Search**         | Search the web and retrieve relevant results                                           |

### Smart Variable System

- **$ Trigger Mentions** - Type `$` to access available variables from connected nodes
- **Auto-Connection** - Automatically creates edges when selecting variables from other nodes
- **Connection Validation** - Real-time validation of variable connections with error feedback

### Pipeline Validation

- **DAG Detection** - Validates that pipelines form a Directed Acyclic Graph
- **Node & Edge Counting** - Provides statistics about your pipeline structure
- **Visual Feedback** - Celebration confetti on successful pipeline execution

## Project Structure

```
gav_workflow_app/
├── backend/                    # FastAPI backend
│   ├── main.py                 # API endpoints and DAG validation
│   └── pyproject.toml          # Python dependencies
├── src/
│   ├── app.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles
│   ├── assets/
│   │   └── icons/              # Application icons
│   ├── components/
│   │   └── ui/                 # Shared UI components (Shadcn-based)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── mention.tsx
│   │       ├── select.tsx
│   │       ├── sidebar.tsx
│   │       └── ...
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.ts
│   │   └── use-mounted.ts
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── module/
│   │   └── pipeline/           # Pipeline feature module
│   │       ├── components/
│   │       │   ├── layout/
│   │       │   │   ├── header.tsx
│   │       │   │   └── pipeline-sidebar.tsx
│   │       │   ├── nodes/      # Node implementations
│   │       │   │   ├── analyze-image.tsx
│   │       │   │   ├── ask-ai.tsx
│   │       │   │   ├── email-notification.tsx
│   │       │   │   ├── input.tsx
│   │       │   │   ├── output.tsx
│   │       │   │   ├── text-formatter.tsx
│   │       │   │   ├── text-to-speech.tsx
│   │       │   │   ├── text.tsx
│   │       │   │   └── web-search.tsx
│   │       │   └── ui/         # Pipeline UI components
│   │       │       ├── custom-edge.tsx
│   │       │       ├── custom-handle.tsx
│   │       │       ├── draggable-node.tsx
│   │       │       ├── mention-editor.tsx
│   │       │       ├── node.tsx
│   │       │       └── workflow-result.tsx
│   │       ├── hooks/
│   │       │   ├── use-disclosure.tsx
│   │       │   ├── use-node-name.tsx
│   │       │   └── use-parse-pipeline.ts
│   │       ├── pages/
│   │       │   └── pipeline.tsx
│   │       ├── types/
│   │       │   └── index.ts
│   │       └── utils/
│   │           ├── const.tsx
│   │           └── helper.ts
│   └── routes/                 # TanStack Router routes
│       ├── __root.tsx
│       ├── index.tsx
│       └── pipeline/
│           ├── index.tsx
│           └── route.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
└── components.json             # Shadcn UI configuration
```

## Tech Stack

### Frontend

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| **React 19**        | UI framework with React Compiler support |
| **TypeScript**      | Type-safe development                    |
| **Vite**            | Build tool and dev server                |
| **TailwindCSS 4**   | Utility-first styling                    |
| **@xyflow/react**   | Node-based workflow editor               |
| **TanStack Router** | Type-safe routing                        |
| **TanStack Query**  | Server state management                  |
| **Radix UI**        | Accessible UI primitives                 |
| **Shadcn UI**       | Component library                        |
| **Axios**           | HTTP client                              |
| **Sonner**          | Toast notifications                      |
| **Lucide React**    | Icons                                    |
| **@neodrag/react**  | Drag and drop functionality              |
| **@diceui/mention** | Mention/autocomplete functionality       |

### Backend

| Technology       | Purpose         |
| ---------------- | --------------- |
| **Python 3.10+** | Runtime         |
| **FastAPI**      | Web framework   |
| **Pydantic**     | Data validation |
| **Uvicorn**      | ASGI server     |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (v9.0.0 or higher)
- **Python** (v3.10 or higher)
- **uv** (recommended) or pip

```bash
# Verify installations
node --version    # Should be v20+
pnpm --version    # Should be v9+
python --version  # Should be 3.10+
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:gav1306/gav_workflow_app.git
cd gav_workflow_app
```

### 2. Install Frontend Dependencies

```bash
pnpm install
```

### 3. Set Up Backend

```bash
cd backend

# Using uv (recommended)
uv sync
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 5. Start Development Servers

**Terminal 1 - Frontend:**

```bash
pnpm dev
```

**Terminal 2 - Backend:**

```bash
cd backend
uv run uvicorn main:app --reload
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000

## API Endpoints

### Health Check

```http
GET /
```

**Response:**

```json
{
  "Ping": "Pong"
}
```

### Parse Pipeline

```http
POST /pipelines/parse
```

**Request Body:**

```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## Creating Custom Nodes

The application uses a flexible node abstraction system. To create a new node:

### 1. Define the Node Type

Add your node type to `src/module/pipeline/utils/const.tsx`:

```tsx
export const NODE_TYPES = {
  // ...existing types
  MY_CUSTOM_NODE: "my_custom_node",
} as const;
```

### 2. Create the Node Component

Create a new file in `src/module/pipeline/components/nodes/`:

```tsx
import { Node } from "../ui/node";
import {
  Position,
  useReactFlow,
  type NodeProps,
  type Node as NodeType,
} from "@xyflow/react";
import { CustomHandle } from "../ui/custom-handle";
import type {
  CustomEdgeType,
  CustomNodeType,
  NodeDataType,
  NodeTypes,
} from "../../types";

export type MyCustomNode = NodeType<
  NodeDataType & {
    variables: {
      myField: string;
    };
  },
  NodeTypes
>;

export const MyCustomNode = ({ data, id }: NodeProps<MyCustomNode>) => {
  const { updateNodeData } = useReactFlow<CustomNodeType, CustomEdgeType>();

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
        {/* Your custom node content */}
      </Node>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
```

### 3. Register the Node

Add your node configuration to the `NODES` array in `const.tsx`:

```tsx
export const NODES = [
  // ...existing nodes
  {
    Icon: YourIcon,
    title: "my custom node",
    type: NODE_TYPES.MY_CUSTOM_NODE,
    description: "Description of your custom node",
    output: [{ name: "output", type: OUTPUT_TYPE.STRING }],
    initialVariables: { myField: "" },
    Component: MyCustomNode,
  },
];
```

## Node Abstraction System

The application implements a powerful node abstraction pattern that enables rapid node development:

### Base Node Component

The `Node` component (`src/module/pipeline/components/ui/node.tsx`) provides:

- Consistent styling across all nodes
- Copy/Delete functionality with confirmation dialogs
- Output type badges with hover cards
- Name input with automatic generation

### Custom Handles

The `CustomHandle` component provides styled connection points for nodes.

### Draggable Integration

The `DraggableNode` component enables drag-and-drop from the sidebar to the canvas with automatic node creation.

## Variable Interpolation

The Text node (and others using `MentionEditor`) supports dynamic variable interpolation:

1. Type `$` in any text field to trigger the mention dropdown
2. Select a variable from connected nodes
3. The system automatically creates edges if not already connected
4. Real-time validation shows missing connections

## 📦 Production Build

### Frontend

```bash
pnpm build
```

The build output will be in the `dist/` directory.

### Backend

For production deployment, use:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) - For the amazing node-based UI library
- [Shadcn UI](https://ui.shadcn.com/) - For the beautiful component system
- [TanStack](https://tanstack.com/) - For Router and Query libraries
- [FastAPI](https://fastapi.tiangolo.com/) - For the blazing fast Python backend
