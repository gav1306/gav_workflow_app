import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootComponent = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
