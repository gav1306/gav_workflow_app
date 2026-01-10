import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PipelineSidebar } from "@/module/pipeline/components/layout/pipeline-sidebar";
import { Header } from "@/module/pipeline/components/layout/header";
import { SidebarInset } from "@/components/ui/sidebar";

const RouteComponent = () => {
  return (
    <>
      <PipelineSidebar />
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </>
  );
};

export const Route = createFileRoute("/pipeline")({
  component: RouteComponent,
});
