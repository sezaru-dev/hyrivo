import {
  ClipboardList,
  CalendarClock,
  Search,
  Briefcase,
  BarChart3,
  FileText,
} from "lucide-react"

const features = [
  {
    icon: <ClipboardList className="w-6 h-6 text-white" />,
    title: "Track Applications",
    description: "Monitor your application statuses with clarity.",
  },
  {
    icon: <CalendarClock className="w-6 h-6 text-white" />,
    title: "Schedule Interviews",
    description: "Log interview dates and times with ease.",
  },
  {
    icon: <FileText className="w-6 h-6 text-white" />,
    title: "Add Notes",
    description: "Keep track of important details for each application.",
  },
  {
    icon: <Search className="w-6 h-6 text-white" />,
    title: "Filter & Sort",
    description: "Quickly find what you need with powerful filters.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-white" />,
    title: "Label by Type & Salary",
    description: "Categorize jobs by type, location, or salary.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    title: "Dashboard Summary",
    description: "Visualize progress with stats and summaries.",
  },
]

export default function WhatYouCanDo() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        What You Can Do with Hyrivo
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-neutral-700/20 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-sky-700 rounded-full w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
