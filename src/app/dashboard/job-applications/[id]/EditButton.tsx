'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { JobApplicationType } from '@/types'
import { PenLine } from 'lucide-react'

type ThisComponentProps = {
  data: JobApplicationType
  isPending?: boolean
}
const EditButton = ({ data, isPending }:ThisComponentProps) => {
  const router = useRouter()

  const clickHandler = () => {
    router.push(`/dashboard/job-applications/${data?._id}/edit`)
    router.refresh()
  }

  return (
    <Button type='button' className='h-9 px-4 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 text-white' onClick={clickHandler} disabled={isPending}>
      <PenLine/>
      Edit
    </Button>
  )
}

export default EditButton
