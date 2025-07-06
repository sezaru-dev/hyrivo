import React from 'react'
import { Activity, CalendarClock, CircleCheckBig, StickyNote } from "lucide-react"

const Features = () => {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          Everything you need to stay on track.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              icon: <Activity className="w-6 h-6 text-blue-600 mb-2" />,
              title: "Application Timeline",
              description: "View your progress at a glance.",
            },
            {
              icon: <CircleCheckBig className="w-6 h-6 text-green-600 mb-2" />,
              title: "Status Tracking",
              description: "Know exactly where each application stands.",
            },
            {
              icon: <CalendarClock className="w-6 h-6 text-yellow-600 mb-2" />,
              title: "Reminders",
              description: "Never miss a follow-up again.",
            },
            {
              icon: <StickyNote className="w-6 h-6 text-purple-600 mb-2" />,
              title: "Notes & Resume Versions",
              description: "Keep everything in one place.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm"
            >
              <div className="flex flex-col items-start">
                {item.icon}
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
