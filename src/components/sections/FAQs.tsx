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
        <AccordionItem value="q1">
          <AccordionTrigger>Do I need to sign up?</AccordionTrigger>
          <AccordionContent>
            No, you can get started right away. We store your data securely per session or account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>Can I upload my resume?</AccordionTrigger>
          <AccordionContent>
            Hyrivo currently focuses only on tracking and organizing your applications — no file uploads.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Will I get notifications?</AccordionTrigger>
          <AccordionContent>
            Not yet. We&apos;re focused on a simple, distraction-free workflow you control manually.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
