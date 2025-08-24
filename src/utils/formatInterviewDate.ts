import { format } from "date-fns"

export const formatInterviewDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "No date"

  const parsedDate = new Date(dateString)
  if (isNaN(parsedDate.getTime())) {
    return "Invalid date"
  }

  return format(parsedDate, "MMM d, yyyy h:mm a")
}
