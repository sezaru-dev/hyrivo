import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobApplication } from "@/lib/queries/job-applications";
import { toastPromise } from "@/components/custom/toastPromise";

export function useDeleteJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toastPromise(() => deleteJobApplication(id), {
        loading: "Deleting...",
        success: "Deleted successfully!",
        error: "Failed to delete.",
      }),
     
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications-applied"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications-stats"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
    },
  });
}
