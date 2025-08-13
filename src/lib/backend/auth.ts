import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./db";
import { verifyPassword } from "./auth-bcrypt";
import Users from "@/models/users-model";


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
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // Switch to JWT-based sessions
  },

  pages: {
    signIn: "/", // Your custom sign-in page route
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // On first login, add user data to token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.provider = account?.provider; // Store the login provider (github or credentials)
      }
      return token;
    },

    async session({ session, token }) {
      // Expose extra token fields to session object
      if (token && session.user) {
        if (typeof token.id === "string") {
          session.user.id = token.id
        }
        if (typeof token.provider === "string") {
          session.user.provider = token.provider
        }
      }
      return session;
    },
  },
};