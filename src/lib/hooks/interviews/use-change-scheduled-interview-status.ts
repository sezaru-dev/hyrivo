import { changeInterviewStatus } from '@/lib/queries/interviews/scheduled'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useChangeScheduledInterviewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,interviewStatus}: {id: string, interviewStatus: "missed" | "completed"}) => changeInterviewStatus(id, interviewStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
    },
  })
}

export default useChangeScheduledInterviewStatus