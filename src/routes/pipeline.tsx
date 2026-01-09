import { createFileRoute } from "@tanstack/react-router";

const PipelineComponent = () => {
  return <div>Pipeline</div>;
};

export const Route = createFileRoute("/pipeline")({
  component: PipelineComponent,
});
