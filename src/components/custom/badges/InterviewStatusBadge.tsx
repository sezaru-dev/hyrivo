import { Badge } from "@/components/ui/badge";
import { InterviewStatus } from "@/types";
import { capitalize } from "@/utils/capitalize";
import React from "react";

type InterviewStatusBadgeProps = {
  status: InterviewStatus;
};

const statusStyles: Record<InterviewStatus, string> = {
  none: "text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600",
  scheduled: "text-amber-600 dark:text-amber-400 border-amber-500 dark:border-amber-400",
  completed: "text-green-600 dark:text-green-400 border-green-500 dark:border-green-400",
  missed: "text-rose-600 dark:text-rose-400 border-rose-500 dark:border-rose-400",
};

const InterviewStatusBadge = ({ status }: InterviewStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={`px-2 py-0.5 rounded-md font-normal border ${statusStyles[status]}`}
    >
      {capitalize(status)}
    </Badge>
  );
};

export default InterviewStatusBadge;
