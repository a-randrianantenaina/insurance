"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

// Variantes d'animation réutilisables
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
}

// Composants d'animation réutilisables
interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variants?: any
  delay?: number
}

export function AnimatedSection({ 
  children, 
  className = "", 
  variants = fadeInUp, 
  delay = 0 
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCard({ 
  children, 
  className = "", 
  hoverScale = 1.02 
}: AnimatedSectionProps & { hoverScale?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInScale}
      whileHover={{ 
        scale: hoverScale,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedButton({ 
  children, 
  className = "", 
  onClick,
  ...props 
}: any) {
  return (
    <motion.button
      className={className}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 4px 8px rgba(0,0,0,0.12)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function AnimatedText({ 
  children, 
  className = "",
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2,
  className = ""
}: {
  from?: number
  to: number
  duration?: number
  className?: string
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ 
          duration,
          type: "spring",
          stiffness: 100
        }}
      >
        {to}
      </motion.span>
    </motion.span>
  )
}
