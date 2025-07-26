import { CheckCircle, XCircle } from "lucide-react"

export default function WhyHyrivo() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Hyrivo?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Problems Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">The Struggle Without It</h3>
          <ul className="space-y-4 text-red-600 dark:text-red-400">
            <li className="flex items-start gap-3">
              <XCircle className="size-5 mt-1" />
              <span>Spreadsheets are hard to maintain</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="size-5 mt-1" />
              <span>Tracking follow-ups manually is stressful</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="size-5 mt-1" />
              <span>Missing interviews or offers due to disorganization</span>
            </li>
          </ul>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">What Hyrivo Gives You</h3>
          <ul className="space-y-4 text-green-600 dark:text-green-400">
            <li className="flex items-start gap-3">
              <CheckCircle className="size-5 mt-1" />
              <span>Everything in one clean dashboard</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="size-5 mt-1" />
              <span>Visual status & interview timeline</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="size-5 mt-1" />
              <span>Stay motivated and in control of your job hunt</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
