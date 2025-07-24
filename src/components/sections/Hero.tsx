import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen w-full">
      <div className="absolute top-[20%] right-80 -z-10">
        <div className="hidden dark:block w-[80vh] h-[80vh] bg-cyan-500 opacity-30 blur-3xl animate-blob absolute top-0 left-0" />
        <div className="block dark:hidden w-[80vh] h-[80vh] bg-cyan-300 opacity-20 blur-xl animate-blob absolute top-0 left-0" />
      </div>
      <div className="absolute bottom-36 left-0 -z-10">
        <div className="hidden dark:block w-96 h-96 bg-blue-500 opacity-30 blur-3xl animate-blobFloat absolute top-0 left-0" />
        <div className="block dark:hidden w-96 h-96 bg-blue-300 opacity-20 blur-xl animate-blobFloat absolute top-0 left-0" />
      </div>

      <div className='flex flex-col items-center justify-center text-center px-4 pt-60 max-w-3xl mx-auto'>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Track your job applications effortlessly.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8">
          Stay organized, focused, and confident in your job hunt — all from a powerful, distraction-free dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="#features">
            <Button variant="ghost" size="lg">See how it works</Button>
          </Link>
        </div>
      </div>


    </section>
  )
}

export default Hero