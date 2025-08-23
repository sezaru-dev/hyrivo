import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="q1" className="border-b border-neutral-800">
          <AccordionTrigger>Do I need to sign up?</AccordionTrigger>
          <AccordionContent>
             Yes, you can sign up with email/password or GitHub. Password recovery isn&apos;t available yet, so remember your credentials.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2" className="border-b border-neutral-800">
          <AccordionTrigger>Can I upload my resume?</AccordionTrigger>
          <AccordionContent>
            Hyrivo currently focuses only on tracking and organizing your applications — no file uploads.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3" className="border-b border-neutral-800">
          <AccordionTrigger>Will I get notifications?</AccordionTrigger>
          <AccordionContent>
            Not yet. We&apos;re focused on a simple, distraction-free workflow you control manually.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4" className="border-b border-neutral-800">
          <AccordionTrigger>Can I download my data into Excel or CSV?</AccordionTrigger>
          <AccordionContent>
            Not yet — your data stays secure in your account. Exporting to a Excel or CSV is on our roadmap.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
