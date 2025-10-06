import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/shared/Loader/Spinner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  </StrictMode>
);
