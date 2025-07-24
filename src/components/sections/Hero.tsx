import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen w-full">

      {/* blobs */}
      <div className="absolute top-[10%] lg:top-[8%] right-[12rem] lg:right-80 -z-10">
        <div className="hidden dark:block w-[40vh] h-[40vh] lg:w-[80vh] lg:h-[80vh] bg-cyan-500 opacity-30 blur-3xl animate-blob absolute top-0 left-0" />
        <div className="block dark:hidden w-[40vh] h-[40vh] lg:w-[80vh] lg:h-[80vh] bg-cyan-300 opacity-20 blur-xl animate-blob absolute top-0 left-0" />
      </div>
      <div className="absolute bottom-[12rem] lg:top-[36%] -left-[6rem] lg:-left-20 -z-10">
        <div className="hidden dark:block w-[40vh] h-[40vh] lg:w-[80vh] lg:h-[80vh] bg-blue-500 opacity-30 blur-3xl animate-blobTwo absolute top-0 left-0" />
        <div className="block dark:hidden w-[40vh] h-[40vh] lg:w-[80vh] lg:h-[80vh] bg-blue-300 opacity-20 blur-xl animate-blobTwo absolute top-0 left-0" />
      </div>

      <div className='flex flex-col items-center justify-center text-center px-4 mt-56 md:max-w-3xl mx-auto'>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Track your job applications effortlessly.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8">
          Stay organized, focused, and confident in your job hunt — all from a powerful, distraction-free dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button size="lg" className='w-full sm:w-min hover:!bg-blue-700 dark:hover:!bg-blue-800 bg-blue-600 dark:bg-blue-700 text-white'>Get Started</Button>
          <Button variant="outline" size="lg" className='w-full sm:w-min'>See how it works</Button>
        </div>
      </div>


<div className="w-full max-w-7xl mx-auto mt-40 px-4 mb-4 hidden sm:block">
      <Image
        src="/hero-desktop.png"
        alt="Hero Image"
        width={1200}
        height={800}
        className="w-full h-auto rounded-xl"
        priority
      />
    </div>


      





    </section>
  )
}

export default Hero