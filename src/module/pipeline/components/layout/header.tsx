import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowDownToLine, Play, Save } from "lucide-react";
import logoIcon from "@/assets/icons/logo.webp";
import { Link } from "@tanstack/react-router";
import { PipelineBreadcrumb } from "../ui/pipeline-breadcrumb";
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import type { CustomEdgeType, CustomNodeType } from "../../types";
import { toPng } from "html-to-image";
import { EXPORT_IMAGE_CONFIG } from "../../utils/const";
import { downloadImage } from "../../utils/helper";
import { useParsePipeline } from "../../hooks/use-parse-pipeline";
import { WorkflowResult } from "../ui/workflow-result";
import { useDisclosure } from "../../hooks/use-disclosure";

export const Header = () => {
  const { getNodes, getEdges } = useReactFlow<CustomNodeType, CustomEdgeType>();
  const workflowResultDisclosure = useDisclosure();

  const parsePipelineMutate = useParsePipeline({
    onSuccess: () => {
      workflowResultDisclosure.onOpen();
    },
  });

  const runPipelineHandler = () => {
    const nodes = getNodes();
    const edges = getEdges();
    parsePipelineMutate.mutate({ nodes, edges });
  };

  const downloadPngHandler = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      EXPORT_IMAGE_CONFIG.WIDTH,
      EXPORT_IMAGE_CONFIG.HEIGHT,
      0.5,
      2,
      5
    );

    const pipelineGraphElement = document.querySelector(
      ".react-flow__viewport"
    );
    if (!pipelineGraphElement) return;

    toPng(pipelineGraphElement as HTMLElement, {
      backgroundColor: "#fff",
      width: EXPORT_IMAGE_CONFIG.WIDTH,
      height: EXPORT_IMAGE_CONFIG.HEIGHT,
      style: {
        width: `${EXPORT_IMAGE_CONFIG.WIDTH}px`,
        height: `${EXPORT_IMAGE_CONFIG.HEIGHT}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      downloadImage(dataUrl, "pipeline-graph");
    });
  };
  return (
    <>
      <Panel position="top-left">
        <div className="border py-2 px-3 flex gap-2.5 rounded-sm shadow-md bg-white">
          <SidebarTrigger size="icon" />
          <Link to="/" className="h-9 w-9">
            <img src={logoIcon} alt="gav-workflow-logo" />
          </Link>
          <PipelineBreadcrumb />
        </div>
      </Panel>
      <Panel position="top-right">
        <div className="border py-2 px-3 flex gap-2.5 rounded-sm shadow-md bg-white">
          <Button variant="outline">
            <Save />
            Save
          </Button>
          <Button
            variant="outline"
            onClick={downloadPngHandler}
            className="rounded-sm"
          >
            <ArrowDownToLine />
            Download
          </Button>
          <Button
            className="bg-primary text-white rounded-sm"
            onClick={runPipelineHandler}
            disabled={parsePipelineMutate.isPending}
          >
            <Play /> {parsePipelineMutate.isPending ? "Running..." : "Run"}
          </Button>
        </div>
      </Panel>
      {parsePipelineMutate.data && (
        <WorkflowResult
          {...workflowResultDisclosure}
          {...parsePipelineMutate.data}
        />
      )}
    </>
  );
};
