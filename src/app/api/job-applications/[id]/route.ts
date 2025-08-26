import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplication from "@/models/job-application-model";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  try {
    await connectToDB()

    const userEmail = session.user.email

    const { id } = params;
    
    // Fetch single application for this user
    const application = await JobApplication.findOne({ _id: id, userEmail }).lean();

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return Response.json(application, { status: 200 })
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch applications", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}