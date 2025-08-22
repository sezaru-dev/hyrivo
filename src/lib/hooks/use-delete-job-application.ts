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
      queryClient.invalidateQueries({ queryKey: ["dashboard-job-applications-stats"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications-applied"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications-stats"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
      queryClient.invalidateQueries({ queryKey: ["completed-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["completed-interview-stats"] });
      queryClient.invalidateQueries({ queryKey: ["missed-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["offered-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["hired-applications"] });
      queryClient.invalidateQueries({ queryKey: ["rejected-applications"] });
    },
  });
}
