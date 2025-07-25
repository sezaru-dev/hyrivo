import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ThemeToggle } from '../custom/toggles/ThemeToggle'
import { LoginDialog } from '../custom/modals/LoginDialog'
import { authOptions } from '@/lib/backend/auth'
import { getServerSession } from 'next-auth'
import LogoutButton from '../custom/buttons/LogoutButton'

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className="fixed top-6 md:top-8 z-50 w-full flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl mx-4 px-6 py-3 rounded-2xl border border-border dark:border-slate-800 bg-muted-foreground/10 backdrop-blur-sm shadow-sm">
        <div className="text-xl font-bold">Hyrivo</div>
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <nav className="flex items-center gap-2">
            {!session ? (
              <LoginDialog>
                <Button
                  className="h-9 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                >
                  Login
                </Button>
              </LoginDialog>
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
      </div>
    </header>
  )
}

export default Header
