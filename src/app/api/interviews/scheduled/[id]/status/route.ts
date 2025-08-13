import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email
  const id = params.id

  await connectToDB()

  try {
    const { interviewStatus } = await req.json()

    if (!["missed", "completed"].includes(interviewStatus)) {
      return NextResponse.json({ error: "Invalid interview status" }, { status: 400 })
    }

    const updated = await JobApplication.findOneAndUpdate(
      { _id: id, userEmail, status: "interview" },
      { interviewStatus },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    return Response.json(
      { message: "Failed to update interview status" },
      { status: 500 }
    );
  }


}

