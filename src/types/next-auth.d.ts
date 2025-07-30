// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      provider?: string
    }
  }

  interface User {
    id: string
    provider?: string
  }

  interface JWT {
    id?: string
    provider?: string
  }
}
