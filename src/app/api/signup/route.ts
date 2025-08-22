import { hashPassword } from "@/lib/backend/auth-bcrypt"
import { connectToDB } from "@/lib/backend/db"
import Users from "@/models/users-model"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/

  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters and include uppercase, lowercase, number, and special character." },
      { status: 400 }
    )
  }

    await connectToDB()
    const existingUser = await Users.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: "User created", userId: newUser._id }, { status: 201 })
  } catch (err) {
    console.error("Signup error:", err)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
