import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/types";
import { capitalize } from "@/utils/capitalize";
import React from "react";

type StatusBadgeProps = {
  status: JobStatus;
};

const StatusBadge = ({ status }:StatusBadgeProps) => {
  switch (status) {
    case "applied":
      return (
        <Badge
          variant="outline"
          className="px-1.5 rounded-md border border-gray-400 bg-gray-300 dark:bg-gray-500/30 text-gray-600 dark:text-neutral-50 font-medium"
        >
          {capitalize(status)}
        </Badge>
      );
    case "interview":
      return (
        <Badge
          variant="outline"
          className="px-1.5 rounded-md border border-blue-400 bg-blue-500/30 text-blue-600 dark:text-neutral-50 font-medium"
        >
          {capitalize(status)}
        </Badge>
      );
    case "offered":
      return (
        <Badge
          variant="outline"
          className="px-1.5 rounded-md border border-amber-400 bg-amber-500/30 text-amber-600 dark:text-neutral-50 font-medium"
        >
          {capitalize(status)}
        </Badge>
      );
    case "hired":
      return (
        <Badge
          variant="outline"
          className="px-1.5 rounded-md border border-green-400 bg-green-500/30 text-green-600 dark:text-neutral-50 font-medium"
        >
          {capitalize(status)}
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          className="px-1.5 rounded-md border border-red-400 bg-red-500/30 text-red-600 dark:text-neutral-50 font-medium"
        >
          {capitalize(status)}
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="px-1.5 rounded-md">
          {capitalize(status)}
        </Badge>
      );
  }
};

export default StatusBadge;
