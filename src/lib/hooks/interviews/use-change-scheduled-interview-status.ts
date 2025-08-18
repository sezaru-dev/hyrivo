import { toastPromise } from '@/components/custom/toastPromise';
import { changeInterviewStatus } from '@/lib/queries/interviews/scheduled'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useChangeScheduledInterviewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,interviewStatus}: {id: string, interviewStatus: "missed" | "completed"}) => toastPromise(() => changeInterviewStatus(id, interviewStatus), {
      loading: `Marking as ${interviewStatus}...`,
      success: `Marked as ${interviewStatus}`,
      error: `Failed to mark as ${interviewStatus}.`,
    }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
    },
  })
}

export default useChangeScheduledInterviewStatus