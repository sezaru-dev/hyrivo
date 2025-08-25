// lib/hooks/use-job-applications.ts
import { useQuery } from "@tanstack/react-query"
import { fetchJobApplicationById, fetchJobApplications, updateApplicationStatus } from "../queries/job-applications"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toastPromise } from "@/components/custom/toastPromise"

export function useJobApplications(limit?: number) {
  return useQuery({
    queryKey: ["job-applications", limit ?? "all"],
    queryFn: () => fetchJobApplications(limit),
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export function useJobApplicationById(id?: string) {
  return useQuery({
    queryKey: ["job-applications", id],
    queryFn: () => fetchJobApplicationById(id),
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}

type Status = 'applied' | 'interview' | 'offered' | 'hired' | 'rejected'

const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id,status}: {id: string, status: Status }) => toastPromise(() => updateApplicationStatus(id, status), {
          loading: `Marking as ${status}...`,
          success: `Marked as ${status}`,
          error: `Failed to mark as ${status}.`,
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
      queryClient.invalidateQueries({ queryKey: ["completed-interviews"] });
    },
  })
}



export default useUpdateApplicationStatus


