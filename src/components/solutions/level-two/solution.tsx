import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSaveMutation } from "@/hooks/mutations/save";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import { Button } from "../../ui/button";
import { MAX_PARALLEL_REQUESTS_COUNT } from "@/const/requests";

type LevelTwoSolutionProps = ComponentPropsWithoutRef<"section"> & {};

export const LevelTwoSolution = (props: LevelTwoSolutionProps) => {
  const { className, ...rest } = props;

  const [requests, setRequests] = useState<string[]>([]);

  const { mutateAsync: save } = useSaveMutation();

  const saveHandler = async () => {
    if (requests.length >= MAX_PARALLEL_REQUESTS_COUNT) return;

    const requestId = crypto.randomUUID();

    try {
      setRequests((prev) => [...prev, requestId]);
      await save();
    } catch {
      // inform user about error, in this solution I use tanstack, tanstack handle error in mutation
    } finally {
      setRequests((prev) => prev.filter((id) => id !== requestId));
    }
  };

  const requestLimitExceeded = requests.length >= MAX_PARALLEL_REQUESTS_COUNT;

  return (
    <section {...rest} className={cn("", className)}>
      <h3>You can only save up to 3 files at a time.</h3>
      <p>
        Status: {requests.length}/{MAX_PARALLEL_REQUESTS_COUNT}
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
    </section>
  );
};
