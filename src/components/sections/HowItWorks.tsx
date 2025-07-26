import { HowItWorksSteps } from "@/constant/constant-data";

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {HowItWorksSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center max-w-sm">
            <div className="relative z-10 p-4 bg-blue-100 dark:bg-blue-600 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground w-11/12">{step.description}</p>
          </div>
        ))}

        {/* connector line between steps */}
        <div className="hidden md:block absolute top-[2.2rem] left-[7%] right-[7%] h-0.5 bg-border z-0" />
      </div>
    </section>
  )
}
