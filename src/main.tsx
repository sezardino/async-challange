import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import App from "./App.tsx";

import { Toaster } from "./components/ui/sonner.tsx";
import { TanstackQueryProvider } from "./libs/tanstack-query/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <App />
      <Toaster position="top-right" />
    </TanstackQueryProvider>
  </StrictMode>
);
