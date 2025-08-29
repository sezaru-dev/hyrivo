'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion'
import { fade, staggerContainer } from "@/motions/motionVariants";

export default function FAQSection() {
  const faqData = [
    { value: 'q1', question: 'Do I need to sign up?', answer: "Yes, you can sign up with email/password or GitHub. Password recovery isn’t available yet, so remember your credentials." },
    { value: 'q2', question: 'Can I upload my resume?', answer: "Hyrivo currently focuses only on tracking and organizing your applications — no file uploads." },
    { value: 'q3', question: 'Will I get notifications?', answer: "Not yet. We’re focused on a simple, distraction-free workflow you control manually." },
    { value: 'q4', question: 'Can I download my data into Excel or CSV?', answer: "Not yet — your data stays secure in your account. Exporting to a Excel or CSV is on our roadmap." },
  ];

  return (
    <motion.section 
      variants={staggerContainer(0.3, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="py-20 px-4 max-w-3xl mx-auto"
    >
      <motion.h2
        variants={fade({ duration: 0.5 })}
        className="text-3xl font-bold text-center mb-8"
      >
        Frequently Asked Questions
      </motion.h2>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqData.map((item) => (
          <motion.div
            key={item.value}
            variants={fade({ duration: 0.4 })}
          >
            <AccordionItem value={item.value} className="border-b border-neutral-800">
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.section>
  )
}
