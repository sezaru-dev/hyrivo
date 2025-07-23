// /app/dashboard/interviews/page.tsx

import { redirect } from 'next/navigation'

export default function InterviewsPage() {
  redirect('/dashboard/interviews/scheduled')
}