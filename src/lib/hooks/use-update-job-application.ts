import { toastPromise } from "@/components/custom/toastPromise";
import { JobApplicationType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobApplicationData } from "../queries/job-applications";

type SetInterviewScheduleProps = {
  id: string;
data: Omit<JobApplicationType, "_id">
};

const useUpdateJobApplicationData = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: SetInterviewScheduleProps ) => toastPromise(() => updateJobApplicationData(id,data), {
          loading: 'Updating application...',
          success: 'Application updated successfully!',
          error: 'Failed to update application.',
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
      queryClient.invalidateQueries({ queryKey: ["completed-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications-applied"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-job-applications-stats"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      options?.onSuccess?.();
    },
  })
}
export default useUpdateJobApplicationData