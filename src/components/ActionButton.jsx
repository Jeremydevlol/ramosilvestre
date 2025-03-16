"use client"
import { motion } from "framer-motion"

const ActionButton = ({ active, onClick, Icon, label, buttonRef }) => {
  const buttonVariants = {
    initial: {
      scale: 0.9,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    },
  }

  const iconVariants = {
    initial: { scale: 1 },
    active: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.button
      ref={buttonRef}
      className="w-11 h-11 backdrop-blur-sm bg-black/50 rounded-full
                hover:bg-black/70 active:bg-black/80 flex items-center justify-center font-playfair
                shadow-lg shadow-black/20 border border-white/10"
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      aria-label={label}
    >
      <motion.div variants={iconVariants} initial="initial" animate={active ? "active" : "initial"}>
        {/* Icon in pink */}
        <Icon className="text-[#E8B4B8] w-6 h-6" />
      </motion.div>
    </motion.button>
  )
}

export default ActionButton

