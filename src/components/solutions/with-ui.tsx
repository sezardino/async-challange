import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import { Button } from "../ui/button";

type ResponseStatus = {
  isSuccess: boolean;
  message: string;
};

type SolutionWithUIProps = ComponentPropsWithoutRef<"section"> & {
  onSave: () => Promise<string>;
};

export const SolutionWithUI = (props: SolutionWithUIProps) => {
  const { onSave, className, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ResponseStatus | null>();

  const saveHandler = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setStatus(null);

    try {
      const res = await onSave();

      setStatus({ isSuccess: true, message: res });
    } catch (error) {
      if (typeof error === "string")
        setStatus({ isSuccess: false, message: error });
      else
        setStatus({
          isSuccess: false,
          message: "Error: something went wrong, try again later",
        });
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

      {status && (
        <p
          className={cn(
            "text-sm",
            status.isSuccess ? "text-green-500" : "text-red-500"
          )}
        >
          {status.message}
        </p>
      )}
    </section>
  );
};
