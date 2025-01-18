import { cn } from "@/lib/utils";
import { CheckCircle2, Loader, XCircle } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type Request = {
  id: string;
  status: "pending" | "success" | "error";
  message?: string;
  createdAt: number;
};

type RequestItemProps = ComponentPropsWithoutRef<"li"> & {
  data: Request;
};

const iconStyles = "mr-2 mb-0.5 inline w-5 h-5 ";

export const RequestItem = (props: RequestItemProps) => {
  const { data, className, ...rest } = props;

  const icon =
    data.status === "pending" ? (
      <Loader className={cn("animate-spin text-blue-500", iconStyles)} />
    ) : data.status === "success" ? (
      <CheckCircle2 className={cn("text-green-500", iconStyles)} />
    ) : (
      <XCircle className={cn("text-red-500", iconStyles)} />
    );

  const message = data.status === "pending" ? "Pending request" : data.message;

  return (
    <li {...rest} className={cn("", className)}>
      <p>
        {icon}
        {message}
      </p>
    </li>
  );
};
