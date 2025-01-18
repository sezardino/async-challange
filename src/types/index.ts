export type ProcessedRequest = {
  id: string;
  status: "pending" | "success" | "error";
  message?: string;
  createdAt: number;
};

export type SortType = "asc" | "desc";
