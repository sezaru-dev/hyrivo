import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/types";
import { capitalize } from "@/utils/capitalize";
import React from "react";

type StatusBadgeProps = {
  status: JobStatus;
};

const statusStyles: Record<JobStatus, string> = {
  applied: "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600",
  interview: "text-blue-600 dark:text-blue-400 border-blue-400",
  offered: "text-amber-600 dark:text-amber-400 border-amber-400",
  hired: "text-green-600 dark:text-green-400 border-green-400",
  rejected: "text-red-600 dark:text-red-400 border-red-400",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={`px-2 py-0.5 rounded-md font-normal border ${statusStyles[status] ?? "text-gray-600 border-gray-300"}`}
    >
      {capitalize(status)}
    </Badge>
  );
};

export default StatusBadge;
