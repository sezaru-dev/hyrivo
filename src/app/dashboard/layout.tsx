'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { DynamicBreadcrumbs } from "@/components/custom/breadcrumbs/DynamicBreadcrumbs";
import { ThemeToggle } from "@/components/custom/toggles/ThemeToggle";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
  stats,
  areachart,
  piechart,
  recentapplications,
  upcominginterviews
}: {
  children: React.ReactNode
  stats: React.ReactNode
  areachart: React.ReactNode
  piechart: React.ReactNode
  recentapplications: React.ReactNode
  upcominginterviews: React.ReactNode
}) {
  const pathname = usePathname()
  const isOverview = pathname === "/dashboard"
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header className='sticky top-0 z-50 flex flex-col'>
              <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background/30 backdrop-blur-xl px-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <DynamicBreadcrumbs/>
                  </div>
                  <div className="mr-4 flex items-center gap-2">
                    <ThemeToggle/>
                  </div>
                </div>
              </div>
            </header>

            <>
            {children}
            {isOverview && (
            <div className="flex flex-col gap-4 px-6 md:px-8 pb-6 md:pb-8">
              {stats}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                <div className="col-span-1 lg:col-span-2">{areachart}</div>
                <div className="col-span-1">{piechart}</div>
              </div>
              {recentapplications}
              {upcominginterviews}
            </div>
          )}
            </>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
