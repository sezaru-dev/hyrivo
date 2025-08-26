import { Badge } from "@/components/ui/badge";
import { InterviewMethod } from "@/types";
import { capitalize } from "@/utils/capitalize";
import React from "react";

type InterviewMethodBadgeProps = {
  status: InterviewMethod;
};

const statusStyles: Record<InterviewMethod, string> = {
  online: "text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400",   // trust, calm
  onsite: "text-amber-600 dark:text-amber-400 border-amber-500 dark:border-amber-400", // energetic, friendly
  phone: "text-purple-600 dark:text-purple-400 border-purple-500 dark:border-purple-400", // creative, standout
};

const InterviewMethodBadge = ({ status }: InterviewMethodBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={`px-2 py-0.5 rounded-md font-normal border ${statusStyles[status]}`}
    >
      {capitalize(status)}
    </Badge>
  );
};

export default InterviewMethodBadge;
