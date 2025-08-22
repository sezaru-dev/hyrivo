
import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplication from "@/models/job-application-model";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  try {
    await connectToDB()

    const userEmail = session.user.email

    const { searchParams } = new URL(req.url)
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? Number(limitParam) : null

    let query = JobApplication.find({ userEmail, status: 'applied' }).sort({ appliedDate: -1 })

    if (limit !== null && !isNaN(limit)) {
      query = query.limit(limit)
    }

    const applications = await query.lean()

    return Response.json(applications, { status: 200 })
  } catch (error) {
    console.error("[GET_JOB_APPLICATIONS_ERROR]", error)
    return Response.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}


export async function POST(req: NextRequest) {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  try {
    const data = await req.json()
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Invalid request", message: "Application data is required" },
        { status: 400 }
      )
    }

    await connectToDB()
    const userEmail = session.user.email
    
    const newApplication = await JobApplication.create({
      ...data,
      userEmail,
      status: 'applied'
    })

    return NextResponse.json(newApplication, { status: 201 })
  } catch (err) {
    return NextResponse.json(
  { error: "Server error", message: err instanceof Error ? err.message : "Unknown error" },
  { status: 500 }
)
  }
}

