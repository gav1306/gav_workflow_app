import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { QueryClient } from "@tanstack/react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};

export const App = () => {
  return <RouterProvider router={getRouter()} />;
};
