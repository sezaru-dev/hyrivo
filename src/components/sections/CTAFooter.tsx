import React from 'react'
import { Button } from '../ui/button'
import LoginSignupDialog from '../custom/modals/LoginSignupDialog'

const CTAFooter = () => {
  return (
    <section className="relative w-full z-10 overflow-hidden h-min">
      <div className="absolute top-[40%] lg:top-[40%] -left-[10%] lg:-left-[2%] -z-20">
        <div className="block w-[40vh] h-[40vh] lg:w-[70vh] lg:h-[70vh] bg-cyan-500 opacity-30 blur-3xl animate-blob absolute top-0 left-0" />
      </div>

      <div className='bg-zinc-900/40 backdrop-blur-sm text-white text-center py-20 sm:py-32 px-4'>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to stay on top of your job search?</h2>
        <LoginSignupDialog triggerType="signup">
          <Button variant="secondary" className="h-12 px-6 font-semibold bg-white hover:bg-neutral-200  text-neutral-900">Create your free account</Button>
        </LoginSignupDialog>
      </div>
    </section>
  )
}

export default CTAFooter