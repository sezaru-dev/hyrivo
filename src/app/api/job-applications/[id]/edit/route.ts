import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplication from "@/models/job-application-model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await verifySession();
  if (session instanceof NextResponse) return session;

  try {
    await connectToDB();

    const userEmail = session.user.email;
    const { id } = params;

    // Parse request body
    const body = await req.json();

    // Update application (only if it belongs to the current user)
    const updated = await JobApplication.findOneAndUpdate(
      { _id: id, userEmail },
      { $set: body },
      { new: true, runValidators: true, lean: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Application not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update application",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
