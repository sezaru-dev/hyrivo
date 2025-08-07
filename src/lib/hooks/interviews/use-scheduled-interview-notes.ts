import { updateScheduledInterviewNote } from '@/lib/queries/interviews/scheduled'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JobApplicationType } from '@/types'

const useUpdateScheduledInterviewNotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,data}: {id: string, data: Pick<JobApplicationType, 'interviewNote'>}) => updateScheduledInterviewNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
    },
  })
}

export default useUpdateScheduledInterviewNotes