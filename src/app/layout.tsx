import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "../components/providers/theme-provider";

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
