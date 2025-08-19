'use client'
import { useJobApplications } from "@/lib/hooks/use-job-applications";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function RecentApplications() {
    const { 
        data, 
        isLoading, 
        isError, 
        isFetching
      } = useJobApplications(5)
  return (
    <div className="mt-4 col-span-2">
      {(isLoading) ? <p className="w-full text-center">loading...</p>
        : (
        <div className="p-4 border rounded-xl">
          <h1 className="text-lg font-bold tracking-tight mb-4">Recent Applications</h1>
          <DataTable columns={columns} data={data ?? []} />
        </div>
      )}
    </div>
  );
}