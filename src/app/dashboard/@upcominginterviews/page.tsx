'use client'

import useGetScheduledInterviews from "@/lib/hooks/interviews/use-scheduled-interviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobApplicationType } from "@/types";
import InterviewMethodBadge from "@/components/custom/badges/InterviewMethodBadge";

export default function UpcomingInterviews() {
  const { 
    data, 
    isLoading, 
    isError, 
  } = useGetScheduledInterviews(5)

  if (isLoading) {
    return (
      <section className="mt-4 col-span-1 p-4 border rounded-xl">
        <div className="w-full">
          <h2 className="text-lg font-bold tracking-tight mb-4">Upcoming Interviews</h2>

          <div className="space-y-4">
            {/* Skeleton Loader */}
            {[...Array(5)].map((_, index) => (
              <article
                key={index}
                className="rounded-xl border p-4 animate-pulse space-y-2"
              >
                {/* Company Name */}
                <div className="h-5 bg-muted rounded w-3/4"></div>

                {/* Job Title + Date + Method */}
                <div className="h-4 bg-muted rounded w-5/6"></div>

                {/* Interview Note */}
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </article>
            ))}
          </div>
        </div>
      </section>

    )
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
    <section className="mt-4 col-span-1 p-4 border rounded-xl">
      <div className="w-full">
        <h2 className="text-lg font-bold tracking-tight mb-4">Upcoming Interviews</h2>
        <div className="space-y-4">
          {data?.length ? (
            data.map((interview: JobApplicationType) => {
              const date = interview.interviewAt
                ? new Date(interview.interviewAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "TBD"

              return (
                <article 
                  key={interview._id}
                  className="rounded-xl border p-4 hover:bg-muted/50"
                >
                  {/* Company Name */}
                  <p className="font-semibold text-lg">{interview.companyName}</p>

                  {/* Job Title + Date + Method */}
                  <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 mt-1">
                    <p>
                      <span className="font-medium">{interview.jobTitle}</span> –{" "}
                      <time dateTime={interview.interviewAt ?? ""}>{date}</time> 
                    </p>
                    <InterviewMethodBadge status={interview.interviewMethod} /> 
                  </div>

                  {/* Interview Note */}
                  {interview.interviewNote && (
                    <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                      
                      <span>{interview.interviewNote}</span>
                    </div>
                  )}
                </article>
              )
            })
          ) : (
            <p className="text-center text-muted-foreground">No upcoming interviews.</p>
          )}
        </div>
      </div>


    </section>
  );
}
