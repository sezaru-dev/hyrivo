import NewApplicationModal from "@/components/custom/modals/NewApplicationModal";

export default function OverviewPage() {
  return (
    <div className="p-6 md:p-8 mt-8">
      <div className="flex items-end justify-between mb-4">
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