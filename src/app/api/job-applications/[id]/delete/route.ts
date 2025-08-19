import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(_req:NextRequest, { params }: { params: { id: string } }) {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email
  const id = params.id

  await connectToDB()

  try {
    const deleted = await JobApplication.findOneAndDelete({ _id: id, userEmail })

    if (!deleted) {
      return NextResponse.json({ error: "Job application not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json({ message: "Job application deleted" }, { status: 200 })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
