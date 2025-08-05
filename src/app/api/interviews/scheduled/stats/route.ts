import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplication from "@/models/job-application-model";
import { endOfWeek, startOfWeek } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await verifySession();
  if (session instanceof NextResponse) return session;

  await connectToDB();
  const userEmail = session.user.email;

  try {
    const now = new Date(); // current UTC time

    const interviews = await JobApplication.find({
      userEmail,
      status: "interview",
      interviewStatus: "scheduled",
    });

    // Filter out only the ones where interviewAt is in the past
    const overdueOnly = interviews.filter((interview) => {
      return new Date(interview.interviewAt) < now;
    });

    const upcomingOnly = interviews.filter((interview) => {
      return new Date(interview.interviewAt) > now;
    });
    const upcomingInterviews = interviews
  .filter((interview) => new Date(interview.interviewAt) > now)
  .sort((a, b) => new Date(a.interviewAt).getTime() - new Date(b.interviewAt).getTime());

  const soonestUpcoming = upcomingInterviews[0] ?? null;

  // Get Monday to Sunday of current week (in UTC)
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });     // Sunday

    const thisWeeksInterviews = interviews.filter((interview) => {
      const interviewDate = new Date(interview.interviewAt);
      return interviewDate >= weekStart && interviewDate <= weekEnd;
    });

    return NextResponse.json(
      {
        "overdue": overdueOnly.length,
        "upcoming": upcomingOnly.length,
        "thisWeek": thisWeeksInterviews.length,
        "nextInterviewIn": soonestUpcoming ? soonestUpcoming : null,
      }, { status: 200 });
  } catch (error) {
    console.error("[GET_OVERDUE_INTERVIEWS_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
