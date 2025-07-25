/* import GitHub from "next-auth/providers/github"
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
 */

import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/", // optional: redirect here when not signed in
  },
};
