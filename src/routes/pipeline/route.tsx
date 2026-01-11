import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PipelineSidebar } from "@/module/pipeline/components/layout/pipeline-sidebar";
import { Header } from "@/module/pipeline/components/layout/header";
import { SidebarInset } from "@/components/ui/sidebar";
import { ReactFlowProvider } from "@xyflow/react";

const RouteComponent = () => {
  return (
    <ReactFlowProvider>
      <PipelineSidebar />
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </ReactFlowProvider>
  );
};

export const Route = createFileRoute("/pipeline")({
  component: RouteComponent,
});
