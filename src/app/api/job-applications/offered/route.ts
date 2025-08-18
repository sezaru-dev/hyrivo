import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email

  await connectToDB()

  try {
    const applications = await JobApplication.find({ userEmail, status: "offered", interviewStatus: "completed" })
    if (!applications) {
      return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
    }
    return Response.json(applications, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }


}

