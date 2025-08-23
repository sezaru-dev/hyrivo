"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useDashboardJobApplicationsTimeline from "@/lib/hooks/dashboard/use-dashboard-job-appliactions-timeline"

type TimelineItem = {
  _id: string
  userEmail: string
  weekStart: string
  weekEnd: string
  applied: number
  interview: number
}
  

const chartConfig = {
  applied: {
    label: "Applied",
    color: "#3b82f6", // blue
  },
  interview: {
    label: "Interview",
    color: "#06b6d4", // cyan
  },
} satisfies ChartConfig

export function ApplicationsAreaChart() {
    const { 
      data, 
      isLoading, 
      isError, 
    } = useDashboardJobApplicationsTimeline()
    if (isLoading) {
      <p>Loading...</p>
    }
    if (isError) {
      <p>Error!</p>
    }
    
  const timelineData = (data as TimelineItem[] | undefined) ?? []

const areaData = [...timelineData] // copy so original isn't mutated
  .reverse()
  .map((item, index) => {
    return {
      week: `Week ${index + 1}`,
      applied: item.applied,
      interview: item.interview,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications Overview</CardTitle>
        <CardDescription>
          Weekly trends of total applications and interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={areaData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <defs>
              {/* Gradient for Applied */}
              <linearGradient id="fillApplied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.applied.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.applied.color} stopOpacity={0.1} />
              </linearGradient>

              {/* Gradient for Interview */}
              <linearGradient id="fillInterview" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.interview.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.interview.color} stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} />
            
            <YAxis allowDecimals={false} />
            <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
            {/* <Legend /> */}

            {/* Applied area */}
            <Area
              type="monotone"
              dataKey="applied"
              stroke={chartConfig.applied.color}
              fill="url(#fillApplied)"
            />

            {/* Interview area */}
            <Area
              type="monotone"
              dataKey="interview"
              stroke={chartConfig.interview.color}
              fill="url(#fillInterview)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>

      </CardContent>

    </Card>
  )
}


