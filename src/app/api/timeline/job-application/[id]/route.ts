import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplicationTimeline from "@/models/job-application-timeline";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await verifySession();
  if (session instanceof NextResponse) return session;

  try {
    const status = await req.json();
    if (!params.id || !status) {
      return NextResponse.json(
        { message: "timelineId and updates are required" },
        { status: 400 }
      );
    }

    await connectToDB();
    const userEmail = session.user.email;

     // convert to Mongo $inc format
    const updates = { [status]: 1 };

    // Find and update
    const updatedTimeline = await JobApplicationTimeline.findOneAndUpdate(
      { _id: params.id, userEmail },
      { $inc: updates }, // example: { applied: 1 } or { interview: 1 }
      { new: true }
    );

    if (!updatedTimeline) {
      return NextResponse.json(
        { message: "Timeline not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTimeline, { status: 200 });
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
