import GitHub from "next-auth/providers/github"
import { NextAuthOptions } from "next-auth"
import { env } from "@/utils/env"

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: env.GITHUB_ID!,
      clientSecret: env.GITHUB_SECRET!,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
}
