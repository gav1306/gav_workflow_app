import axios from "axios";
import type { PipelineParseRequest, PipelineParseResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const parsePipeline = async (
  data: PipelineParseRequest
): Promise<PipelineParseResponse> => {
  const response = await axios.post<PipelineParseResponse>(
    `${API_BASE_URL}/pipelines/parse`,
    data
  );

  return response.data;
};

export const useParsePipeline = (
  options?: Parameters<typeof useMutation>[0]
) => {
  return useMutation<PipelineParseResponse, unknown, PipelineParseRequest>({
    ...options,
    mutationFn: parsePipeline,
    onError: () => {
      toast.error("Failed to parse pipeline");
    },
  });
};
