import { jobApplications } from "@/constant/constant-data";
import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplication from "@/models/job-application-model";
import { endOfWeek, startOfWeek, subWeeks, format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await verifySession();
  if (session instanceof NextResponse) return session;

  await connectToDB();
  const userEmail = session.user.email;

  try {
    const now = new Date(); // current UTC time

    const interviews = await JobApplication.find({ userEmail, status: "interview" })

    const completedInterviews = await JobApplication.find({
      userEmail,
      status: "interview",
      interviewStatus: "completed",
    });

    const lastCompletedInterview = await JobApplication.find({
      userEmail,
      status: "interview",
      interviewStatus: "completed",
    })
      .sort({ interviewAt: -1 })
      .limit(1)


    //COMPLETED THIS WEEK
    // Get Monday to Sunday of current week (in UTC)
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });     // Sunday

    const completedThisWeek = completedInterviews.filter((interview) => {
      const interviewDate = new Date(interview.interviewAt);
      return interviewDate >= weekStart && interviewDate <= weekEnd;
    });

    //TOTAL COMPLETED INTERVIEWS
    const totalCompleted = completedInterviews.length


    const totalInterviews = interviews.length
    const totalCompletedInterviews = completedInterviews.length

    const completionRate = totalInterviews > 0 ?
      Math.round((totalCompletedInterviews / totalInterviews) * 100) : 0


    // PREVIOUS WEEK
    const prevWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
    const prevWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });

    const prevWeekInterviews = completedInterviews.filter((interview) => {
      const interviewDate = new Date(interview.interviewAt);
      return interviewDate >= prevWeekStart && interviewDate <= prevWeekEnd;
    });

     const prevWeekCompleted = completedInterviews.filter((interview) => {
      const interviewDate = new Date(interview.interviewAt);
      return interviewDate >= prevWeekStart && interviewDate <= prevWeekEnd;
    });

    const prevWeekRate = prevWeekInterviews.length > 0
      ? Math.round((prevWeekCompleted.length / prevWeekInterviews.length) * 100)
      : 0;

    //TREND
    const trend = completionRate - prevWeekRate; // Positive or negative

    //DIRECTION
    let trendDirection
    if (completionRate === prevWeekRate) {
      trendDirection = 'neutral'
    }else if (completionRate > prevWeekRate) {
      trendDirection = 'positive'
    }else if (completionRate < prevWeekRate) {
      trendDirection = 'negative'
    }


  //LAST COMPLETED INTERVIEW DATE
  let lastCompletedInterviewDate
  if (lastCompletedInterview) {
  lastCompletedInterviewDate = format(
    new Date(lastCompletedInterview[0].interviewAt),
    "MMMM d, yyyy"
  );
}


    return NextResponse.json(
      {
        "completedThisWeek": completedThisWeek.length,
        "totalCompleted": totalCompleted,
        "completionRate": {
          rate: completionRate,
          trend: {
            value: trend,
            direction: trendDirection
          },
        },
        "lastCompletedInterview": lastCompletedInterviewDate
      }, { status: 200 });
  } catch (error) {
    console.error("[GET_OVERDUE_INTERVIEWS_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
