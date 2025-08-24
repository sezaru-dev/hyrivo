import { format } from "date-fns"

export const formatAppliedDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "No date"

  const parsedDate = new Date(dateString)

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date"
  }

  return format(parsedDate, "MMM d, yyyy") // e.g. Jun 25, 2025
}
