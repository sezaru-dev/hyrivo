'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { JobApplicationType } from '@/types'

type ThisComponentProps = {
  data: JobApplicationType
  isPending?: boolean
}
const BackButton = ({ data, isPending }:ThisComponentProps) => {
  const router = useRouter() 

  const clickHandler = () => {
    router.push(`/dashboard/job-applications/${data?._id}`)
    router.refresh()
  }

  return (
    <Button type='button' variant='outline' className='h-9 px-4' onClick={clickHandler} disabled={isPending}>
      Back
    </Button>
  )
}

export default BackButton
