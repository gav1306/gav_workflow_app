import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PipelineSidebar } from "@/module/pipeline/components/layout/pipeline-sidebar";
import { Header } from "@/module/pipeline/components/layout/header";
import { SidebarInset } from "@/components/ui/sidebar";
import { ReactFlowProvider } from "@xyflow/react";
import { Plate, usePlateEditor } from "platejs/react";
import { MentionKit } from "@/components/editor/plugins/mention-kit";

const RouteComponent = () => {
  const editor = usePlateEditor({
    plugins: [...MentionKit],
  });
  return (
    <Plate editor={editor}>
      <ReactFlowProvider>
        <PipelineSidebar />
        <SidebarInset>
          <Header />
          <Outlet />
        </SidebarInset>
      </ReactFlowProvider>
    </Plate>
  );
};

export const Route = createFileRoute("/pipeline")({
  component: RouteComponent,
});
