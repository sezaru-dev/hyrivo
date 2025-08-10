// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      provider?: string
    } & DefaultSession["user"]
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string 
  }

  interface User {
    id: string
    provider?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
  }

  interface JWT {
    id?: string
    provider?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string // Optional if you want JWT to carry errors too
  }
}
