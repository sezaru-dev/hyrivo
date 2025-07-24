import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ThemeToggle } from '../custom/toggles/ThemeToggle'
import { LoginDialog } from '../custom/modals/LoginDialog'

const Header = () => {
  return (
    <header className="fixed top-6 md:top-8 z-50 w-full flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl mx-4 px-6 py-3 rounded-2xl border-border dark:border-slate-800 bg-muted-foreground/10 backdrop-blur-sm shadow-sm">
        <div className="text-xl font-bold">Hyrivo</div>
        <div className="flex items-center gap-4">
          <ThemeToggle/>
          <nav className="space-x-2">
            <LoginDialog>
              <Button className='hover:!bg-blue-700 dark:hover:!bg-blue-800 bg-blue-600 dark:bg-blue-700 text-white'>Login</Button>
            </LoginDialog>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

/* flex items-center justify-center px-6 py-3 */