'use client'

import { motion } from 'framer-motion'
import { HowItWorksSteps } from "@/constant/constant-data";
import { fade, staggerContainer } from '@/motions/motionVariants';

export default function HowItWorks() {
  const stepsCount = HowItWorksSteps.length
  const stagger = 0.3
  const stepDuration = 0.5

  // total time it takes for all steps to appear
  const totalStepsTime = (stepsCount - 1) * stagger + stepDuration

  return (
    <section className="py-36 sm:py-24 px-4 max-w-6xl mx-auto scroll-pt-20" id="howitworks">
      <motion.h2 
        variants={fade({ duration: .5 })}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </motion.h2>

      <motion.div
        className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
        variants={staggerContainer(stagger, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {HowItWorksSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center max-w-sm relative z-20"
            variants={fade({ duration: stepDuration })}
          >
            <div className="relative z-10 p-4 bg-sky-700 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground w-11/12">{step.description}</p>
          </motion.div>
        ))}

        {/* connector line between steps */}
        <motion.div
          className="hidden md:block absolute top-[2.2rem] left-[7%] right-[7%] h-0.5 bg-white z-0 origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: totalStepsTime, // line fills across the total step animation time
            ease: 'easeInOut'
          }}
          viewport={{ once: true, amount: 0.3 }}
        />
      </motion.div>
    </section>
  )
}
