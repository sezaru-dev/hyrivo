import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const JobStatus = ["applied", "interview", "offered", "hired", "rejected"]
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email
  const id = params.id

  await connectToDB()

  try {
    const { status } = await req.json()
    if (!JobStatus.includes(status)) {
      return NextResponse.json({ error: "Invalid application status" }, { status: 400 })
    }

    const updated = await JobApplication.findOneAndUpdate(
      { _id: id, userEmail,  },
      { status },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json(updated, { status: 200 })
  } catch {
    return Response.json(
      { message: "Failed to update application status" },
      { status: 500 }
    );
  }


}

