import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootComponent = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Outlet />
    </SidebarProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
