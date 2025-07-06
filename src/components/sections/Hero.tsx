import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 py-32 max-w-3xl mx-auto">
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
    </section>
  )
}

export default Hero