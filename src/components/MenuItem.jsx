"use client"

import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useStore from "../store/store"
import { translations } from "../data/constants"
import { FaHeart, FaPlus } from "react-icons/fa"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { handleAddToCart, handleAddToFavorite } from "../utils/utils"
import { MdOutlineRestaurantMenu } from "react-icons/md"

const MenuItem = ({ post, postIndex }) => {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const isInView = useInView(containerRef, { threshold: 0.3, once: false })

  // Usar valores por defecto en caso de que el store no esté inicializado
  const store = useStore()
  const language = store?.language || "es"
  const favorites = store?.favorites || []
  const addToCart = store?.addToCart || (() => {})
  const toggleFavorite = store?.toggleFavorite || (() => {})
  const setSelectedItem = store?.setSelectedItem || (() => {})

  const buttonRefs = useRef([])
  const favoritesRefs = useRef([])

  const handleContainerClick = () => {
    setSelectedItem(post)
    navigate(`/details/ramosilvestre`)
  }

  // Función para abrir Instagram
  const openInstagram = (e) => {
    e.stopPropagation()
    window.open("https://www.instagram.com/ramosilvestre_/", "_blank")
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: postIndex * 0.1,
      },
    },
  }

  // Simplified description for display
  const getShortDescription = (text) => {
    if (!text) return ""
    return text.length > 100 ? text.substring(0, 100) + "..." : text
  }

  return (
    <motion.div
      ref={containerRef}
      onClick={handleContainerClick}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-black/80 rounded-2xl overflow-hidden backdrop-blur-sm border border-customPink-500/10 mb-4"
    >
      <div className="p-4">
        <div className="flex gap-4">
          {/* Image Container */}
          <motion.div
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="absolute w-full h-full object-cover object-center"
              style={{
                opacity: isPlaying ? 0 : 1,
                transition: "opacity 0.5s ease-in",
              }}
              loading="lazy"
            />
            {isInView && post.video && (
              <motion.video
                ref={videoRef}
                src={post.video}
                className="absolute w-full h-full object-cover object-center"
                style={{
                  opacity: isPlaying ? 1 : 0,
                  transition: "opacity 0.5s ease-in",
                }}
                loop
                muted
                playsInline
                preload="auto"
              />
            )}
          </motion.div>

          <div className="flex-1 min-w-0">
            {/* Title and Price */}
            <div className="flex flex-col mb-2">
              <motion.h3
                className="text-xl font-semibold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {post.title}
              </motion.h3>
              <div className="flex items-center justify-between">
                <motion.p
                  className="text-lg font-bold text-[#E8B4B8]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {post.price}
                </motion.p>

                <motion.button
                  onClick={(e) => openInstagram(e)}
                  className="text-sm text-white/70 hover:text-[#E8B4B8] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  @{post.author}
                </motion.button>
              </div>
            </div>

            {/* Chef's suggestion badge */}
            {post.isChefSuggestion && (
              <motion.div
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MdOutlineRestaurantMenu className="text-[#E8B4B8]" />
                <span className="text-sm text-[#E8B4B8] font-medium">{translations[language]?.chefSuggestion}</span>
              </motion.div>
            )}

            {/* Description */}
            <motion.p
              className="text-white/80 text-sm mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {getShortDescription(post.description)}
              <motion.span
                className="ml-2 text-[#E8B4B8] hover:text-[#F2D5D8] text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations[language]?.seeMore}
              </motion.span>
            </motion.p>
          </div>

          {/* Action Buttons Column */}
          <div className="flex flex-col justify-center gap-3 ml-2">
            <motion.button
              ref={(el) => (favoritesRefs.current[postIndex] = el)}
              onClick={(e) => {
                e.stopPropagation()
                handleAddToFavorite(post, { current: favoritesRefs.current[postIndex] }, toggleFavorite)
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHeart className={`text-xl ${favorites.includes(post.title) ? "text-[#E8B4B8]" : "text-white/50"}`} />
            </motion.button>

            <motion.button
              ref={(el) => (buttonRefs.current[postIndex] = el)}
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart(post, { current: buttonRefs.current[postIndex] }, addToCart)
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="text-xl text-white/80" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MenuItem

