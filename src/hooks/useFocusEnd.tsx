import { useEffect, useRef } from "react"

export function useFocusEnd<T extends HTMLTextAreaElement | HTMLInputElement>(
  autoFocus: boolean = true
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (autoFocus && ref.current) {
      const len = ref.current.value.length
      ref.current.focus()
      ref.current.setSelectionRange(len, len)
    }
  }, [autoFocus])

  return ref
}
