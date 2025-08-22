import { toastPromise } from "@/components/custom/toastPromise";
import { setInterviewSchedule } from "@/lib/queries/applied";
import { JobApplicationType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SetInterviewScheduleProps = {
  id: string;
  data: Pick<JobApplicationType, "interviewAt" | "interviewMethod" | "interviewNote">;
};

const useSetInterviewSchedule = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: SetInterviewScheduleProps ) => toastPromise(() => setInterviewSchedule(id,data), {
          loading: 'Setting interview...',
          success: 'Interview set successfully!',
          error: 'Failed to set interview.',
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
      queryClient.invalidateQueries({ queryKey: ["completed-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications-applied"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications-stats"] });
      options?.onSuccess?.();
    },
  })
}

export default useSetInterviewSchedule