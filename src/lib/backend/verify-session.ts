
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { NextResponse } from "next/server"

export async function verifySession() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return session
}
