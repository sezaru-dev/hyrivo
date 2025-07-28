"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"

type CountUpNumberProps = {
  to: number
  duration?: number
}

export const CountUpNumber = ({ to, duration = 1 }: CountUpNumberProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, latest => Math.floor(latest))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
    })

    const unsubscribe = rounded.on("change", latest => {
      setDisplay(latest)
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [to])

  return <motion.span>{display}</motion.span>
}
