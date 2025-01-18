import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

const client = new QueryClient();

export const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
