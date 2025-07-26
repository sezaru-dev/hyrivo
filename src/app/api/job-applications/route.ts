
import { authOptions } from "@/lib/backend/auth";
import { connectToDB } from "@/lib/backend/db";
import JobApplication from "@/models/job-application-model";
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
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
  /* const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } */
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

