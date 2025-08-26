
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







function normalizeDate(d: Date) {
  // set time to 00:00:00 local
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export async function PATCH(req: NextRequest) {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  try {
    const body = await req.json()
    const { field, oldDate, newDate } = body
    // field: "applied" | "interview" etc.
    // oldDate: previous date (optional)
    // newDate: new or corrected date

    if (!field || !newDate) {
      return NextResponse.json(
        { message: "field and newDate are required" },
        { status: 400 }
      )
    }

    await connectToDB()
    const userEmail = session.user.email

    // --- Case 1: "edit" mode (oldDate + newDate given)
    if (oldDate) {
      const oldStart = normalizeDate(startOfWeek(new Date(oldDate), { weekStartsOn: 1 }))
      const oldEnd = normalizeDate(endOfWeek(new Date(oldDate), { weekStartsOn: 1 }))
      const newStart = normalizeDate(startOfWeek(new Date(newDate), { weekStartsOn: 1 }))
      const newEnd = normalizeDate(endOfWeek(new Date(newDate), { weekStartsOn: 1 }))

      // same week → nothing to update
      if (oldStart.getTime() === newStart.getTime()) {
        return NextResponse.json(
          { message: "Dates are in the same week, nothing to update" },
          { status: 200 }
        )
      }

      // decrement old week
      await JobApplicationTimeline.findOneAndUpdate(
        { userEmail, weekStart: oldStart, weekEnd: oldEnd },
        { $inc: { [field]: -1 } },
        { new: true }
      )

      // increment new week (upsert will create if missing)
      const newTimeline = await JobApplicationTimeline.findOneAndUpdate(
        { userEmail, weekStart: newStart, weekEnd: newEnd },
        { $inc: { [field]: 1 } },
        { new: true, upsert: true }
      )

      return NextResponse.json(
        { message: "Timeline adjusted", newTimeline },
        { status: 200 }
      )
    }

    // --- Case 2: "create" mode (only newDate given)
    const weekStart = normalizeDate(startOfWeek(new Date(newDate), { weekStartsOn: 1 }))
    const weekEnd = normalizeDate(endOfWeek(new Date(newDate), { weekStartsOn: 1 }))

    const newTimeline = await JobApplicationTimeline.findOneAndUpdate(
      { userEmail, weekStart, weekEnd },
      { $inc: { [field]: 1 } },
      { new: true, upsert: true }
    )

    return NextResponse.json(
      { message: "Timeline created/updated", newTimeline },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      {
        error: "Server error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

