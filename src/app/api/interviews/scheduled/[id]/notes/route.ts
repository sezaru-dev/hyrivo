import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email
  await connectToDB()

  try {
      const updated = await JobApplication.findOne(
        { _id: params.id, userEmail }, // Make sure the user owns the record
      )

      if (!updated) {
        return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
      }

      return NextResponse.json(updated, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: "Failed to update interviewNote" }, { status: 500 })
    }
}


// PATCH /api/job-applications/:id/interview-note
export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email
  const { interviewNote } = await req.json()

  if (typeof interviewNote !== "string") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  await connectToDB()

  try {
      const updated = await JobApplication.findOneAndUpdate(
        { _id: params.id, userEmail }, // Make sure the user owns the record
        { interviewNote },
        { new: true }
      )

      if (!updated) {
        return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
      }

      return NextResponse.json(updated, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: "Failed to update interviewNote" }, { status: 500 })
    }
}
