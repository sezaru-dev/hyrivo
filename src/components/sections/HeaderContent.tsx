'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import LogoutButton from '../custom/buttons/LogoutButton'
import LoginSignupDialog from '../custom/modals/LoginSignupDialog'
import { motion } from 'framer-motion'
import { fade } from "@/motions/motionVariants";

type HeaderContentProps = {
  session: {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      provider?: string;
    };
  } | null;
};

const HeaderContent = ({session}:HeaderContentProps) => {
  
  return (
    <motion.header
      variants={fade({ duration: .4 })}
      initial="hidden" 
      animate="show"  
      className="fixed top-6 md:top-8 z-50 w-full flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl mx-4 px-4 sm:px-6 py-3 rounded-lg sm:rounded-2xl border border-zinc-800/50 
      bg-zinc-800/40 backdrop-blur-sm shadow-sm">
        <div className="sm:text-xl font-bold">Hyrivo</div>
          <nav className="flex items-center gap-2">
            {!session ? (
              <>
              <LoginSignupDialog triggerType="login">
                <Button className="px-3 text-sm sm:h-9 sm:px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                  Login
                </Button>
              </LoginSignupDialog>

              <LoginSignupDialog triggerType="signup">
                <Button className="px-3 text-sm sm:h-9 sm:px-4 hover:!bg-neutral-900 bg-neutral-950 border-neutral-700 text-white">
                  Sign up
                </Button>
              </LoginSignupDialog>
            </>
            ) : (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="default"
                    className="h-9 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
                <LogoutButton/>
              </>
            )}
          </nav>
        </div>
    </motion.header>
  )
}

export default HeaderContent
