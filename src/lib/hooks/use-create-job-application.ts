import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobApplication } from "@/lib/queries/job-applications";

export function useCreateJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJobApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  });
}
