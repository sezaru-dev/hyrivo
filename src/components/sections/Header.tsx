import React from 'react'
import { authOptions } from '@/lib/backend/auth'
import { getServerSession } from 'next-auth'
import HeaderContent from './HeaderContent'

const Header = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <HeaderContent session={session}/>
  )
}

export default Header
