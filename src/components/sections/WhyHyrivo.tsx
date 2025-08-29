'use client'

import Image from "next/image";
import { motion } from 'framer-motion'
import { fade, staggerContainer } from "@/motions/motionVariants";

export default function WhyHyrivo() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        variants={fade({ duration: .5 })}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Hyrivo?
      </motion.h2>

      <motion.div
        variants={staggerContainer(0.3, .5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Before */}
        <motion.div
          variants={fade({ duration: .4 })}
          className="relative group rounded-2xl overflow-hidden w-full h-80">
          <Image
            src="/sticky-notes-stress.jpg"
            alt="Messy spreadsheets and stress"
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/40 transition duration-500 group-hover:bg-black/60"></div>
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center text-xl font-semibold transition duration-500 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl">
              Spreadsheets, sticky notes,<br/>stress
            </p>
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          variants={fade({ duration: .4 })}
          className="relative group rounded-2xl overflow-hidden w-full h-80">
          <Image
            src="/dashboard-2.png"
            alt="Hyrivo dashboard"
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/40 transition duration-500 group-hover:bg-black/50"></div>
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center text-xl font-semibold transition duration-500 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl">
              One clean, organized <br/>dashboard
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}
