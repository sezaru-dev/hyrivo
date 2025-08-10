import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./db";
import { verifyPassword } from "./auth-bcrypt";
import Users from "@/models/users-model";
import { env } from "@/utils/env";
import { refreshAccessToken } from "./refresh-token";


export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials are present
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await connectToDB(); // Make sure DB is connected

        // Look up user and explicitly select password
        const user = await Users.findOne({ email: credentials.email }).select("+password");
        if (!user) throw new Error("No user found");

        // Compare hashed password
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // Return user data to store in JWT
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          accessToken: env.ACCESS_KEY, 
          refreshToken: env.REFRESH_KEY, 
          accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // Switch to JWT-based sessions
    maxAge: 15 * 60, // 15 minutes
  },

  pages: {
    signIn: "/", // Your custom sign-in page route
  },

  callbacks: {
    async jwt({ token, user }) {
      // First time login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        return token;
      }

      // Return token if access token not expired
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token expired — refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.error = token.error as string | undefined;
      }
      return session;
    },
  },
};
