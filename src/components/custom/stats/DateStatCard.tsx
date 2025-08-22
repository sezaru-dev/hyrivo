'use client'

import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string;
  value: string;
}
export function DateStatCard({ title, value }: StatCardProps) {

  return (
    <Card className="w-full bg-muted/20">
      <CardContent className="p-6 flex items-start justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-xs sm:text-sm text-muted-foreground mb-0 sm:mb-2">{title}</h2>
          <p className="text-lg sm:text-xl font-semibold text-primary">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
