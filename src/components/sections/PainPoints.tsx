import { BellOff, Building2, FileSpreadsheet } from 'lucide-react'
import React from 'react'

const painPoints = [
  {
    icon: <Building2 className="w-6 h-6 text-red-500 mb-2" />,
    text: "Lost track of which companies you've applied to?",
  },
  {
    icon: <BellOff className="w-6 h-6 text-yellow-500 mb-2" />,
    text: "Forgot to follow up after interviews?",
  },
  {
    icon: <FileSpreadsheet className="w-6 h-6 text-blue-500 mb-2" />,
    text: "Drowning in spreadsheets or Notion tables?",
  },
]

const PainPoints = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-10">You're not alone — job hunting is messy.</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {painPoints.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col items-start"
            >
              {item.icon}
              <p className="text-slate-700 dark:text-slate-300 text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PainPoints
