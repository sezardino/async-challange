import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProcessedRequest, SortType } from "@/types";
import { ComponentPropsWithoutRef } from "react";
import { RequestItem } from "./requests-item";

type RequestItemProps = ComponentPropsWithoutRef<"div"> & {
  data: ProcessedRequest[];
  currentSort: SortType | null;
  onSortChange: () => void;
};

export const RequestsHistory = (props: RequestItemProps) => {
  const { data, currentSort, onSortChange, className, ...rest } = props;

  return (
    <div {...rest} className={cn("flex flex-col gap-4", className)}>
      {data.length === 0 && (
        <p>
          There are no requests, try to save, by clicking the button "Save file"
        </p>
      )}
      {!!data.length && (
        <>
          <Button
            type="button"
            variant="outline"
            className="mr-auto"
            onClick={onSortChange}
          >
            Sort{currentSort ? `: ${currentSort.toUpperCase()}` : ""}
          </Button>

          <ul className="flex flex-col gap-1">
            {data.map((req) => (
              <RequestItem key={req.id} data={req} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
