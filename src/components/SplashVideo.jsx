"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { LogoImage } from "../data/constants"

const SplashVideo = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirige tras 3 segundos
    const timer = setTimeout(() => {
      navigate("/slider/ramosilvestre")
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  // Animation variants for the logo
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  }

  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      opacity: [0, 0.5, 0.2, 0.8, 0.3],
      scale: [0.9, 1.1, 1, 1.05, 1],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="
       h-screen
       overflow-hidden
       bg-gradient-to-b
       from-customPink-300
       to-black
       flex
       items-center
       justify-center
       font-playfair
     "
    >
      <div className="relative flex items-center justify-center">
        {/* Glow effect behind the logo */}
        <motion.div variants={glowVariants} className="absolute w-48 h-48 rounded-full bg-customPink-500/30 blur-xl" />

        {/* Logo with animation */}
        <motion.div variants={logoVariants} className="relative z-10 bg-white/10 backdrop-blur-sm px-8 py-6 rounded-xl">
          <LogoImage className="h-16 w-auto" />

          {/* Subtle loading indicator */}
          <motion.div
            className="mt-6 h-0.5 bg-white/20 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SplashVideo

