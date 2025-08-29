'use client'
import Link from "next/link"
import React from "react"
import { FaGithub } from "react-icons/fa"
import { motion } from 'framer-motion'
import { fade, staggerContainer } from "@/motions/motionVariants";

const Footer = () => {
  return (
    <motion.footer
      variants={staggerContainer(0.3, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-6 space-y-1">
      
      <motion.div
        variants={fade({ duration: .4 })}
      >
        © {new Date().getFullYear()} Hyrivo. Built by Cezarlito O. Baguhin
      </motion.div>
      
      <motion.div
        variants={fade({ duration: .4 })}
      >
        <Link
          href="https://github.com/sezaru-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-neutral-400 hover:text-white transition"
          aria-label="Sezaru-dev GitHub"
        >
          <FaGithub className="w-4 h-4 mr-1" />
          sezaru-dev
        </Link>
      </motion.div>

      <motion.div
        variants={fade({ duration: .4 })}
      >All rights reserved.</motion.div>
    </motion.footer>
  )
}

export default Footer
