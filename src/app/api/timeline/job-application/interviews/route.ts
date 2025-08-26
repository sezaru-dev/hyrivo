import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplicationTimeline from "@/models/job-application-timeline";
import { NextRequest, NextResponse } from "next/server";
import { startOfWeek, endOfWeek } from "date-fns";

function normalizeDate(d: Date) {
  // reset time to 00:00:00 local
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export async function PATCH(req: NextRequest) {
  const session = await verifySession();
  if (session instanceof NextResponse) return session;

  try {
    const body = await req.json();
    const { interviewAt } = body;

    if (!interviewAt) {
      return NextResponse.json(
        { message: "interviewAt date is required" },
        { status: 400 }
      );
    }

    await connectToDB();
    const userEmail = session.user.email;

    // Compute the week for this interview
    const weekStart = normalizeDate(startOfWeek(new Date(interviewAt), { weekStartsOn: 1 }));
    const weekEnd = normalizeDate(endOfWeek(new Date(interviewAt), { weekStartsOn: 1 }));

    // Increment or create the weekly snapshot
    const updatedTimeline = await JobApplicationTimeline.findOneAndUpdate(
      { userEmail, weekStart, weekEnd },
      { $inc: { interview: 1 } },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      { message: "Interview snapshot recorded", updatedTimeline },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Server error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
