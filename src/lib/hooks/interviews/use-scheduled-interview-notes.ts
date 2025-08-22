import { updateScheduledInterviewNote } from '@/lib/queries/interviews/scheduled'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JobApplicationType } from '@/types'
import { toastPromise } from '@/components/custom/toastPromise';

const useUpdateScheduledInterviewNotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,data}: {id: string, data: Pick<JobApplicationType, 'interviewNote'>}) => toastPromise(() => updateScheduledInterviewNote(id, data),
    {
      loading: "Saving note...",
      success: "Your note has been saveds!",
      error: "Failed to save note.",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
    },
  })
}

export default useUpdateScheduledInterviewNotes