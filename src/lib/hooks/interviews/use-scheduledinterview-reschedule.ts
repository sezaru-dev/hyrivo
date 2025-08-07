import { rescheduleInterview } from '@/lib/queries/interviews/scheduled'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useScheduledInterviewReschedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,interviewAt}: {id: string, interviewAt:string}) => rescheduleInterview(id, interviewAt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
    },
  })
}

export default useScheduledInterviewReschedule