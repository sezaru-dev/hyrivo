'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import LoginSignupDialog from '../custom/modals/LoginSignupDialog'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fade, fadeIn, staggerContainer } from '@/motions/motionVariants'

const Hero = () => {
  return (
    <section className="relative min-h-screen max-h-min w-full z-10">

      {/* blobs */}
      <div className="absolute top-[10%] lg:top-[8%] right-[12rem] lg:right-80 -z-10">
        <div className="block w-[40vh] h-[40vh] lg:w-[80vh] lg:h-[80vh] bg-cyan-500 opacity-30 blur-3xl animate-blob absolute top-0 left-0" />
      </div>
      <div className="absolute bottom-[12rem] lg:top-[36%] -left-[14rem] lg:-left-20 -z-10">
        <div className="block w-[60vh] h-[60vh] lg:w-[80vh] lg:h-[80vh] bg-blue-500 opacity-30 blur-3xl animate-blobTwo absolute top-0 left-0" />
      </div>

      <motion.div
        variants={staggerContainer(0.4, .5)}
        initial="hidden"
        animate="show"
        className='flex flex-col items-center justify-center text-center px-4 md:pt-56 md:max-w-3xl mx-auto h-screen md:h-auto pt-32'>
        <motion.h1
          variants={fade({duration: 0.3 })}
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Track your job applications effortlessly.
        </motion.h1>
        <motion.p
          variants={fade({duration: 0.3 })}
          className="text-lg md:text-xl text-slate-400 mb-8">
          Stay organized, focused, and confident in your job hunt — all from a powerful, distraction-free dashboard.
        </motion.p>
        <motion.div 
          variants={fade({duration: 0.3 })}
          className="flex gap-4 items-center flex-col sm:flex-row w-full sm:w-auto">
          <LoginSignupDialog triggerType='signup'>
            <Button className='h-12 px-6 w-full sm:w-min hover:!bg-blue-800 bg-blue-700 text-white'>Start with Hyrivo</Button>
          </LoginSignupDialog>
          <Link href='#howitworks' aria-label="Scroll to how Hyrivo works section" className='w-full'>
            <Button variant="outline" className='h-12 px-6 w-full sm:w-min text-white hover:text-white hover:!bg-neutral-900/60 bg-neutral-950/30 border-neutral-700'>See how it works</Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={fadeIn({ direction: 'up', type: 'spring', delay: 1, duration: 0.5 })}
        initial="hidden"   
        animate="show"  
        className="w-full max-w-7xl mx-auto mt-40 px-4 mb-4 hidden sm:block">
        <Image
          src="/hero-desktop.png"
          alt="Hero Image"
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl"
          priority
        />
      </motion.div>

    </section>
  )
}

export default Hero