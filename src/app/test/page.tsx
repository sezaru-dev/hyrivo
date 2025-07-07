'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
/* import { Separator } from '@/components/ui/separator' */
import { Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Replace with your signup logic
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-6 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm bg-white dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create your Hyrivo account</h1>
          <p className="text-sm text-muted-foreground">Track your job applications effortlessly</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" required placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>

        {/* <Separator className="my-4" /> */}

        <div className="space-y-2">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4" />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}
