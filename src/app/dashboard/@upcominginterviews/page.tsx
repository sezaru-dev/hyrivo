'use client'

import useGetScheduledInterviews from "@/lib/hooks/interviews/use-scheduled-interviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { JobApplicationType } from "@/types";

export default function UpcomingInterviews() {
  const { 
    data, 
    isLoading, 
    isError, 
  } = useGetScheduledInterviews(5)

  if (isLoading) {
    return <p className="w-full text-center">Loading...</p>
  }

  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-red-500">Failed to load interviews. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mt-4 col-span-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data?.length ? (
            data.map((interview: JobApplicationType) => {
              const date = interview.interviewAt
                ? new Date(interview.interviewAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "TBD"

              return (
                <div
                  key={interview._id}
                  className="rounded-xl border p-4 hover:bg-muted/50"
                >
                  <p className="font-medium">{interview.companyName}</p>
                  <p className="text-sm text-muted-foreground">
                    {interview.jobTitle} – {date}
                  </p>
                  {interview.interviewNote && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{interview.interviewNote}</span>
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <p className="text-center text-muted-foreground">No upcoming interviews.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
