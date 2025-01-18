import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import App from "./App.tsx";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "./components/ui/sonner.tsx";
import { TanstackQueryProvider } from "./libs/tanstack-query/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <TooltipProvider delayDuration={0}>
        <App />
      </TooltipProvider>
      <Toaster position="top-right" />
    </TanstackQueryProvider>
  </StrictMode>
);
