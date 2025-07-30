import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplication from "@/models/job-application-model";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  //verify session
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  //connection to the database
  await connectToDB()
  const userEmail = session.user.email

  try {
    const pipeline = [
      {
        $match: {
          userEmail // Replace with actual session email if needed
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]

    const results = await JobApplication.aggregate(pipeline);

    const defaultStats: Record<string, number> = {
      applied: 0,
      interview: 0,
      offered: 0,
      hired: 0,
      rejected: 0,
    }

    let total = 0

    for (const { _id, count } of results) {
      const key = _id?.toLowerCase()
      if (key in defaultStats) {
        defaultStats[key] = count
        total += count
      }
    } 

    return NextResponse.json({total, ...defaultStats}, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}