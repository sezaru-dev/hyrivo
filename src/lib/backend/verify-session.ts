
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { NextResponse } from "next/server"
import type { Session } from "next-auth"

export async function verifySession(): Promise<NextResponse | Session> {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return session
}
