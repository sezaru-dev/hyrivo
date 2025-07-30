import bcrypt from "bcrypt"

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(input: string, hashed: string) {
  return bcrypt.compare(input, hashed)
}
