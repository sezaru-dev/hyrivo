import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user?.email
  const { interviewAt } = await req.json()

  const parsedDate = new Date(interviewAt)
  const now = new Date()

  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
  }

   if (parsedDate.getTime() <= now.getTime()) {
    return NextResponse.json(
      { error: "interviewAt must be a future date" },
      { status: 400 }
    )
  }

  const timeBufferMs = 10 * 1000 // ⬅️ 10-second buffer
  const nowWithBuffer = new Date(Date.now() + timeBufferMs)

  if (parsedDate <= nowWithBuffer) {
    return NextResponse.json(
      { error: "Interview must be scheduled at least 10 seconds in the future." },
      { status: 400 }
    )
  }

  await connectToDB()

  try {
      const newSchedule = await JobApplication.findOneAndUpdate(
        { _id: params.id, userEmail }, // Make sure the user owns the record
        { interviewAt: interviewAt },
        { new: true }
      )

      if (!newSchedule) {
        return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
      }

      return NextResponse.json({ message: "Interview rescheduled" }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: "Failed to reschedule interview" }, { status: 500 })
    }
}
