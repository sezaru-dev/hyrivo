import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JobApplicationType } from '@/types'
import { updateCompletedInterviewRemarks } from '@/lib/queries/interviews/completed';

const useUpdateCompletedInterviewRemarks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,data}: {id: string, data: Pick<JobApplicationType, 'interviewRemarks'>}) => updateCompletedInterviewRemarks(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completed-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["completed-interview-stats"] });
    },
  })
}

export default useUpdateCompletedInterviewRemarks