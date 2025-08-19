import { connectToDB } from "@/lib/backend/db"
import { verifySession } from "@/lib/backend/verify-session"
import JobApplication from "@/models/job-application-model"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  const userEmail = session.user.email
  await connectToDB()

  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get("limit")
  const limit = limitParam ? Number(limitParam) : null

  try {
    let query = JobApplication.find({
      userEmail,
      status: "interview",
      interviewStatus: "scheduled",
    }).sort({ interviewAt: 1 })

    if (limit && !isNaN(limit)) {
      query = query.limit(limit)
    }

    const interviews = await query

    if (!interviews || interviews.length === 0) {
      return NextResponse.json(
        { error: "No interviews found" },
        { status: 404 }
      )
    }

    return NextResponse.json(interviews, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch interviews" },
      { status: 500 }
    )
  }
}
