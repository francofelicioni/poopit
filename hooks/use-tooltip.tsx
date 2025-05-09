"use client"

import type React from "react"

import { useCallback } from "react"

export function useTooltip(tooltipRef: React.RefObject<HTMLDivElement>) {
  const showTooltip = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block"
    }
  }, [tooltipRef])

  const hideTooltip = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none"
    }
  }, [tooltipRef])

  const moveTooltip = useCallback(
    (x: number, y: number) => {
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${x + 10}px`
        tooltipRef.current.style.top = `${y + 10}px`
      }
    },
    [tooltipRef],
  )

  return { showTooltip, hideTooltip, moveTooltip }
}
