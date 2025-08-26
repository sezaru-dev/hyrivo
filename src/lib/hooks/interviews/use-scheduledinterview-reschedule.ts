import { toastPromise } from '@/components/custom/toastPromise';
import { rescheduleInterview } from '@/lib/queries/interviews/scheduled'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useScheduledInterviewReschedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,interviewAt}: {id: string, interviewAt:string}) => toastPromise(() => rescheduleInterview(id, interviewAt), {
        loading: "Rescheduling...",
        success: "Rescheduled successfully!",
        error: "Failed to Reschedule.",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  })
}

export default useScheduledInterviewReschedule