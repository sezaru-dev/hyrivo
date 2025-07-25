'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const LoginToaster = () => {
  const { data: session, status } = useSession()
  const previousStatus = useRef<string | null>(null)
  console.log(previousStatus, status);
  
  useEffect(() => {
    if (previousStatus.current !== status) {
      if (status === 'authenticated' && previousStatus.current === 'loading') {
        toast.success(`Welcome, ${session?.user?.name || 'User'}!`)
      }

      if (status === 'unauthenticated' && previousStatus.current === 'loading') {
        toast.info('You have been logged out.')
      }

      previousStatus.current = status
    }
  }, [status, session])

  return null
}
