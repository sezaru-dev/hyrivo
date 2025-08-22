import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"

// PATCH /api/job-applications/applied/:id
export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email
  const { interviewAt, interviewMethod, interviewNote } = await req.json()

if (
  typeof interviewNote !== "string" ||
  typeof interviewMethod !== "string" ||
  isNaN(new Date(interviewAt).getTime()) // invalid date check
) {
  return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
}

  await connectToDB()

  try {
      const updated = await JobApplication.findOneAndUpdate(
        { _id: params.id, userEmail, status: 'applied', }, // Make sure the user owns the record
        { 
          interviewAt,
          interviewMethod,
          interviewNote,
          status: 'interview',
          interviewStatus: 'scheduled'
        },
        { new: true }
      )

      if (!updated) {
        return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
      }

      return NextResponse.json(updated, { status: 200 })
    } catch {
      return NextResponse.json({ error: "Failed to update job application" }, { status: 500 })
    }
}
