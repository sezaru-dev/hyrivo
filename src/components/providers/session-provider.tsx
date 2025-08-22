"use client"

import { createContext, useContext } from "react"
import type { Session } from "next-auth"

type SessionContextType = {
  session: Session | null
}

const SessionContext = createContext<SessionContextType>({ session: null })

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  return useContext(SessionContext)
}
