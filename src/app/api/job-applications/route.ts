
import { connectToDB } from "@/lib/backend/db";
import { verifySession } from "@/lib/backend/verify-session";
import JobApplication from "@/models/job-application-model";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const session = await verifySession()
  if (session instanceof NextResponse) return session

  try {
    await connectToDB();

    const applications = await JobApplication.find();
    return Response.json(applications, { status: 200 });
  } catch (error) {
    console.error("[GET_JOB_APPLICATIONS_ERROR]", error);
    return Response.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  /*const session = await verifySession()
  if (session instanceof NextResponse) return session */

  const mockEmail = "test@example.com"

  try {
    const data = await req.json()
    await connectToDB()

    const newApplication = await JobApplication.create({
      ...data,
      userEmail: mockEmail,
    })

    return NextResponse.json(newApplication, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Server error", details: err }, { status: 500 })
  }
}

