import { PipelinePage } from "@/module/pipeline/components/pages/pipeline";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pipeline/")({
  component: PipelinePage,
});
