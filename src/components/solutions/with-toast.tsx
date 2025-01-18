import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type SolutionWithToastProps = ComponentPropsWithoutRef<"section"> & {
  onSave: () => Promise<string>;
};

export const SolutionWithToast = (props: SolutionWithToastProps) => {
  const { onSave, className, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);

  const saveHandler = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const res = await onSave();

      toast.success(res);
    } catch (error) {
      if (typeof error === "string") toast.error(error);
      else toast.error("Error: something went wrong, try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      {...rest}
      className={cn("flex items-center flex-wrap gap-2", className)}
    >
      <Button disabled={isLoading} onClick={saveHandler}>
        {!isLoading && "Save File"}
        {isLoading && (
          <>
            Saving...
            <Loader className="ml-2 animate-spin" />
          </>
        )}
      </Button>
    </section>
  );
};
