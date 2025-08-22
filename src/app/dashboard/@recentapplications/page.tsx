'use client'
import { useJobApplications } from "@/lib/hooks/use-job-applications";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentApplications() {
    const { 
        data, 
        isLoading, 
      } = useJobApplications(5)
  return (
    <section className="mt-4 col-span-2">
      
        <div className="p-4 border rounded-xl">
          <h2 className="text-lg font-bold tracking-tight mb-4">Recent Applications</h2>
          {(isLoading) ? 
            <div className="space-y-4 w-full">
              {/* Header skeleton */}
              <Skeleton className="h-6 w-full" />

              {/* Body skeleton */}
              <Skeleton className="h-44 w-full" />
            </div>
            : (
            <DataTable columns={columns} data={data ?? []} />
          )}
        </div>
    </section>
  );
}