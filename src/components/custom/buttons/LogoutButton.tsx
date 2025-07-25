'use client'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
  return (
    <Button variant="secondary" className="h-9 px-4"
      onClick={() => signOut({ callbackUrl: "/" })}
      >
      Log out
    </Button>
  )
}

export default LogoutButton