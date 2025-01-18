import { saveFile } from "@/api/app";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSaveMutation = () =>
  useMutation<string, string>({
    mutationFn: saveFile,
    onSuccess: (res) => toast.success(res),
    onError: (error) => toast.error(error),
  });
