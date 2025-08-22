"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useDashboardJobApplicationsStats from "@/lib/hooks/dashboard/use-dashboard-job-appliactions-stats"


const chartConfig = {
  applied: {
    label: "Applied",
    color: "#3b82f6",
  },
  interview: {
    label: "Interview",
    color: "#06b6d4",
  },
  offer: {
    label: "Offer",
    color: "#22c55e",
  },
  hired: {
    label: "Hired",
    color: "#f59e0b",
  },
  rejected: {
    label: "Rejected",
    color: "#ef4444",
  },
} satisfies ChartConfig

export function ApplicationsPieChart() {
  const { 
    data, 
    isLoading, 
    isError, 
  } = useDashboardJobApplicationsStats()
  if (isLoading) {
    <p>Loading...</p>
  }
  if (isError) {
    <p>Error!</p>
  }

  const chartData = [
  { status: "Applied", value: data?.applied },
  { status: "Interview", value: data?.interview },
  { status: "Offer", value: data?.offered },
  { status: "Hired", value: data?.hired },
  { status: "Rejected", value: data?.rejected },
]

const totalApplications = data?.total


  return (
    <Card className="flex flex-col h-full w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Application Status Distribution</CardTitle>
        <CardDescription>Breakdown of applications by status</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => {
                const key = entry.status.toLowerCase() as keyof typeof chartConfig
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartConfig[key].color}
                  />
                )
              })}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalApplications}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Applications
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legends added here */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {Object.entries(chartConfig).map(([key, { label, color }]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
