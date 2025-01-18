import { RequestsHistory } from "@/components/modules/level-three/requests-history";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MAX_PARALLEL_REQUESTS_COUNT } from "@/const/requests";
import { useSaveMutation } from "@/hooks/mutations/save";
import { cn } from "@/lib/utils";
import { ProcessedRequest, SortType } from "@/types";
import { Loader } from "lucide-react";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { Button } from "../../ui/button";

type LevelThreeSolutionProps = ComponentPropsWithoutRef<"section"> & {};

export const LevelThreeSolution = (props: LevelThreeSolutionProps) => {
  const { className, ...rest } = props;

  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [requests, setRequests] = useState<ProcessedRequest[]>([]);

  const { mutateAsync: save } = useSaveMutation();

  const updateRequest = (request: Omit<ProcessedRequest, "createdAt">) =>
    setRequests((prev) =>
      prev.map((req) => (req.id !== request.id ? req : { ...req, ...request }))
    );

  const saveHandler = async () => {
    if (pendingRequestsCount >= MAX_PARALLEL_REQUESTS_COUNT) return;

    const newRequest: ProcessedRequest = {
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: Date.now(),
    };

    try {
      setRequests((prev) => [...prev, newRequest]);
      const res = await save();

      updateRequest({
        id: newRequest.id,
        status: "success",
        message: res,
      });
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : "Error: something went wrong, try again";

      updateRequest({
        id: newRequest.id,
        status: "error",
        message,
      });
    }
  };

  const sortChange = () => {
    setSortBy((prev) => {
      if (prev === "asc") return "desc";
      if (prev === "desc") return "asc";
      return "desc";
    });
  };

  const sortedRequests = useMemo(() => {
    if (sortBy === null) return requests;
    return [...requests].sort((a, b) =>
      sortBy === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
    );
  }, [requests, sortBy]);

  const pendingRequestsCount = useMemo(
    () => requests.filter((r) => r.status === "pending").length,
    [requests]
  );

  const requestLimitExceeded =
    pendingRequestsCount >= MAX_PARALLEL_REQUESTS_COUNT;

  return (
    <section {...rest} className={cn("", className)}>
      <h3>You can only save up to 3 files at a time.</h3>
      <p>
        Status: {pendingRequestsCount}/{MAX_PARALLEL_REQUESTS_COUNT}
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block mt-4">
            <Button disabled={requestLimitExceeded} onClick={saveHandler}>
              {!requestLimitExceeded && "Save File"}
              {requestLimitExceeded && (
                <>
                  Saving...
                  <Loader className="ml-2 animate-spin" />
                </>
              )}
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent
          asChild
          className={cn(!requestLimitExceeded && "hidden")}
        >
          <p>Hold your horses, cowboy!</p>
        </TooltipContent>
      </Tooltip>

      <Accordion type="single" collapsible className="w-full mt-5">
        <AccordionItem value="history">
          <AccordionTrigger className="text-lg">History</AccordionTrigger>
          <AccordionContent asChild>
            <RequestsHistory
              data={sortedRequests}
              currentSort={sortBy}
              onSortChange={sortChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
