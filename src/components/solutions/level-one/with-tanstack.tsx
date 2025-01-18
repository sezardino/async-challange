import { useSaveMutation } from "@/hooks/mutations/save";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { Button } from "../../ui/button";

type SolutionWithTanstackProps = ComponentPropsWithoutRef<"section"> & {};

export const SolutionWithTanstack = (props: SolutionWithTanstackProps) => {
  const { className, ...rest } = props;

  const { mutate: saveHandler, isPending: isSavePending } = useSaveMutation();

  return (
    <section
      {...rest}
      className={cn("flex items-center flex-wrap gap-2", className)}
    >
      <Button disabled={isSavePending} onClick={() => saveHandler()}>
        {!isSavePending && "Save File"}
        {isSavePending && (
          <>
            Saving...
            <Loader className="ml-2 animate-spin" />
          </>
        )}
      </Button>
    </section>
  );
};
