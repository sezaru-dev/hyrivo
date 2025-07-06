import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const CTAFooter = () => {
  return (
    <section className="bg-blue-600 text-white text-center py-20 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to stay on top of your job search?</h2>
      <Link href="/signup">
        <Button variant="secondary" className="text-blue-600 bg-white hover:bg-slate-100">Create your free account</Button>
      </Link>
    </section>
  )
}

export default CTAFooter