import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import NextAuthProvider from "@/components/providers/next-auth-provider";
import TanstackProviders from "@/components/providers/tanstack-providers";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/backend/auth";
import { SessionProvider } from "@/components/providers/session-provider";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '800'],
});

export const metadata: Metadata = {
  title: "Hyrivo – Job Application Tracker",
  description:
    "Hyrivo is a smart job application tracker that helps you manage, organize, and streamline your job hunt. Track applications, deadlines, statuses, and notes all in one place.",
  keywords: [
    "job application tracker",
    "track job applications",
    "job tracker tool",
    "job search organizer",
    "job hunting software",
    "applicant tracking",
    "job interview tracker",
    "job tracking app",
    "career tracking system",
    "internship application tracker",
    "job search management",
    "job application dashboard",
    "resume tracker",
    "job portal organizer",
    "application tracking system",
    "ATS for job seekers",
    "job search productivity tool",
    "track remote job applications",
    "organize job hunt",
    "job seeker CRM"
  ],
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en"  className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>

            <NextAuthProvider>
              <SessionProvider session={session}>
                <TanstackProviders>
                  {children}
                </TanstackProviders>
              </SessionProvider>
            </NextAuthProvider>
          <Toaster position="top-right"/>
      </body>
    </html>
  );
}
