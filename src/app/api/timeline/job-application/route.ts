
import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplicationTimeline from "@/models/job-application-timeline";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  try {
    await connectToDB()

    const userEmail = session.user.email

    const { searchParams } = new URL(req.url)
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? Number(limitParam) : null

    let query = JobApplicationTimeline.find({ userEmail }).sort({ weekEnd: -1 })

    if (limit !== null && !isNaN(limit)) {
      query = query.limit(limit)
    }

    const timeline = await query.lean()

    return Response.json(timeline, { status: 200 })
  } catch (error) {
    return Response.json(
      { message: `Failed to fetch applications, ${error}` },
      { status: 500 }
    )
  }
}



import { endOfWeek, startOfWeek } from "date-fns";

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (session instanceof NextResponse) return session;

  try {
    const status = await req.json();

    if (!status) {
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    await connectToDB();
    const userEmail = session.user.email;

    // Calculate this week's range
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 }); // Sunday

    // Check if there's already a timeline entry for this user within this week
    const existingTimeline = await JobApplicationTimeline.findOne({
      userEmail,
      weekStart,
      weekEnd,
    });

    if (existingTimeline) {
      return NextResponse.json(
        { 
          error: "Timeline already exists",
          message: "A timeline entry already exists for this week. Use PATCH instead.",
          timelineId: existingTimeline._id,   // include _id here
        },
        { status: 409 } // Conflict
      );
    }
         // convert to Mongo $inc format
    const data = { [status]: 1 };

    // Create new timeline for this week
    const newApplication = await JobApplicationTimeline.create({
      userEmail,
      weekStart,
      weekEnd,
      ...data,
    }
  );

    return NextResponse.json(newApplication, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { 
        error: "Server error", 
        message: err instanceof Error ? err.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
