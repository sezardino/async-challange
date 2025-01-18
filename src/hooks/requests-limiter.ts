import { MAX_PARALLEL_REQUESTS_COUNT } from "@/const/requests";
import { ProcessedRequest } from "@/types";
import { useCallback, useMemo, useState } from "react";

export const useRequestsLimiter = (
  callback: () => Promise<string>,
  limit = MAX_PARALLEL_REQUESTS_COUNT
) => {
  const [list, setList] = useState<ProcessedRequest[]>([]);

  const pendingRequestsCount = useMemo(
    () => list.filter((r) => r.status === "pending").length,
    [list]
  );

  const updateRequest = useCallback(
    (request: Omit<ProcessedRequest, "createdAt">) => {
      setList((prev) =>
        prev.map((req) =>
          req.id !== request.id ? req : { ...req, ...request }
        )
      );
    },
    []
  );

  const saveRequest = useCallback(async () => {
    if (pendingRequestsCount >= limit) return;

    const newRequest: ProcessedRequest = {
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: Date.now(),
    };

    try {
      setList((prev) => [...prev, newRequest]);
      const res = await callback();
      updateRequest({
        id: newRequest.id,
        status: "success",
        message: res,
      });
    } catch (error) {
      updateRequest({
        id: newRequest.id,
        status: "error",
        message:
          typeof error === "string"
            ? error
            : "Error: something went wrong, try again",
      });
    }
  }, [limit, callback, updateRequest, pendingRequestsCount]);

  return {
    requests: list,
    pendingCount: pendingRequestsCount,
    saveRequest,
  };
};
