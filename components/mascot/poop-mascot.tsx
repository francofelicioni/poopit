"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export type MascotMood = "happy" | "sad" | "surprised" | "excited" | "sleepy" | "neutral" | "proud" | "sick"

interface PoopMascotProps {
  mood?: MascotMood
  size?: "sm" | "md" | "lg" | "xl"
  animate?: boolean
  message?: string
  className?: string
}

export function PoopMascot({ mood = "happy", size = "md", animate = true, message, className = "" }: PoopMascotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [randomBlink, setRandomBlink] = useState(false)
  const { theme } = useTheme()

  // Random blinking effect  setRandomBlink] = useState(false)
  //const { theme } = useTheme() // Removed duplicate theme declaration

  // Random blinking effect
  useEffect(() => {
    if (!animate) return

    const blinkInterval = setInterval(
      () => {
        setRandomBlink(true)
        setTimeout(() => setRandomBlink(false), 200)
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(blinkInterval)
  }, [animate])

  // Size mapping
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  // Get poop color based on theme
  const getPoopColor = () => {
    if (theme === "dark") return "#6B4226"
    if (theme === "toilet") return "#5D3A1F"
    return "#8B5A2B" // light theme
  }

  const getPoopHighlightColor = () => {
    if (theme === "dark") return "#7D5231"
    if (theme === "toilet") return "#6E4A2A"
    return "#A0522D" // light theme
  }

  // Get eyes based on mood
  const getEyes = () => {
    const eyeColor = theme === "toilet" ? "#E0E0E0" : "#000000"

    switch (mood) {
      case "happy":
        return (
          <>
            <circle cx="35" cy="40" r={randomBlink ? 1 : 5} fill={eyeColor} />
            <circle cx="65" cy="40" r={randomBlink ? 1 : 5} fill={eyeColor} />
          </>
        )
      case "sad":
        return (
          <>
            <circle cx="35" cy="45" r={randomBlink ? 1 : 5} fill={eyeColor} />
            <circle cx="65" cy="45" r={randomBlink ? 1 : 5} fill={eyeColor} />
          </>
        )
      case "surprised":
        return (
          <>
            <circle cx="35" cy="40" r="8" fill={eyeColor} />
            <circle cx="65" cy="40" r="8" fill={eyeColor} />
            <circle cx="35" cy="40" r="3" fill="white" />
            <circle cx="65" cy="40" r="3" fill="white" />
          </>
        )
      case "excited":
        return (
          <>
            <path d="M30,40 Q35,30 40,40" strokeWidth="3" stroke={eyeColor} fill="none" />
            <path d="M60,40 Q65,30 70,40" strokeWidth="3" stroke={eyeColor} fill="none" />
          </>
        )
      case "sleepy":
        return (
          <>
            <path d="M30,40 Q35,45 40,40" strokeWidth="3" stroke={eyeColor} fill="none" />
            <path d="M60,40 Q65,45 70,40" strokeWidth="3" stroke={eyeColor} fill="none" />
          </>
        )
      case "proud":
        return (
          <>
            <path d="M30,35 L40,40 L30,45" strokeWidth="3" stroke={eyeColor} fill="none" />
            <path d="M70,35 L60,40 L70,45" strokeWidth="3" stroke={eyeColor} fill="none" />
          </>
        )
      case "sick":
        return (
          <>
            <path d="M30,45 Q35,35 40,45" strokeWidth="3" stroke={eyeColor} fill="none" />
            <path d="M60,45 Q65,35 70,45" strokeWidth="3" stroke={eyeColor} fill="none" />
          </>
        )
      default:
        return (
          <>
            <circle cx="35" cy="40" r={randomBlink ? 1 : 5} fill={eyeColor} />
            <circle cx="65" cy="40" r={randomBlink ? 1 : 5} fill={eyeColor} />
          </>
        )
    }
  }

  // Get mouth based on mood
  const getMouth = () => {
    const mouthColor = theme === "toilet" ? "#E0E0E0" : "#000000"

    switch (mood) {
      case "happy":
        return <path d="M40,65 Q50,75 60,65" strokeWidth="3" stroke={mouthColor} fill="none" />
      case "sad":
        return <path d="M40,70 Q50,60 60,70" strokeWidth="3" stroke={mouthColor} fill="none" />
      case "surprised":
        return <circle cx="50" cy="70" r="10" fill={mouthColor} />
      case "excited":
        return <path d="M35,65 Q50,80 65,65" strokeWidth="4" stroke={mouthColor} fill="none" />
      case "sleepy":
        return <path d="M40,70 L60,70" strokeWidth="3" stroke={mouthColor} fill="none" />
      case "neutral":
        return <path d="M40,70 L60,70" strokeWidth="3" stroke={mouthColor} fill="none" />
      case "proud":
        return <path d="M35,65 Q50,75 65,65" strokeWidth="3" stroke={mouthColor} fill="none" />
      case "sick":
        return (
          <path d="M35,70 L40,65 L45,70 L50,65 L55,70 L60,65 L65,70" strokeWidth="3" stroke={mouthColor} fill="none" />
        )
      default:
        return <path d="M40,65 Q50,75 60,65" strokeWidth="3" stroke={mouthColor} fill="none" />
    }
  }

  // Animation variants
  const bounceVariants = {
    initial: { y: 0 },
    animate: { y: [0, -10, 0], transition: { duration: 1, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 } },
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        initial="initial"
        animate={isHovered || mood === "excited" ? "animate" : "initial"}
        variants={bounceVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative ${sizeMap[size]}`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Base poop shape */}
          <motion.path
            d="M50,10 C70,10 85,25 85,45 C85,65 70,90 50,90 C30,90 15,65 15,45 C15,25 30,10 50,10 Z"
            fill={getPoopColor()}
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Highlights */}
          <path
            d="M30,30 C35,25 45,25 50,30 C55,35 65,35 70,30"
            stroke={getPoopHighlightColor()}
            strokeWidth="3"
            fill="none"
          />
          {/* Face */}
          {getEyes()}
          {getMouth()}
        </svg>
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-center text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
        >
          {message}
        </motion.div>
      )}
    </div>
  )
}
