"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const areaData = [
  { week: "Week 1", applied: 2, interview: 1 },
  { week: "Week 2", applied: 4, interview: 2 },
  { week: "Week 3", applied: 3, interview: 0 },
  { week: "Week 4", applied: 1, interview: 3 },
  { week: "Week 5", applied: 6, interview: 2 },
  { week: "Week 6", applied: 5, interview: 4 },
  { week: "Week 7", applied: 3, interview: 1 },
  { week: "Week 8", applied: 2, interview: 5 },
]

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications Overview</CardTitle>
        <CardDescription>
          Weekly trends of total applications and interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
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
              <Tooltip />
              <Legend />

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
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

      </CardContent>

    </Card>
  )
}


