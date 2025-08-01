import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobApplication } from "@/lib/queries/job-applications";

export function useDeleteJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  });
}
