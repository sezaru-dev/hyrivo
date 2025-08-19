"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}
