import NewApplicationModal from "@/components/custom/modals/NewApplicationModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Dashboard",
  description:
    "Overview of your job applications, stats, and upcoming interviews.",
  keywords: [
    "job application tracker",
    "job search dashboard",
    "application status tracker",
    "job application management",
    "upcoming interviews",
    "job application overview",
    "job tracker dashboard",
    "job application stats",
    "job search organizer",
    "career tracking system",
  ],
};

export default function OverviewPage() {
  return (
    <div className="p-6 md:p-8 mt-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Get a snapshot of your job search — track applications, interviews, offers, and more in one place.
          </p>
        </div>
        <NewApplicationModal />
      </div>
    </div>
  )
}