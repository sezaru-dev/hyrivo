import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ThemeToggle } from '../custom/toggles/ThemeToggle'

const Header = () => {
  return (
    <header className="flex items-center justify-center px-6 py-3 sticky top-4 z-50">
      <div className="flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur shadow-sm">
        <div className="text-xl font-bold">Hyrivo</div>
        <div className="flex items-center gap-4">
          <ThemeToggle/>
          <nav className="space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header