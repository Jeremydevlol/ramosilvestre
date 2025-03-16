"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import useStore from "../store/store"
import { FaHeart, FaPlus } from "react-icons/fa"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import { translations, languageFlags } from "../data/constants"

const ItemDetailLayout = () => {
  const navigate = useNavigate()
  const { addToCart, selectedItem, favorites, toggleFavorite, language } = useStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Para volver a la vista anterior
  const handleBack = () => {
    navigate("/cart/ramosilvestre")
  }

  // Añadir al carrito y navegar a /cart
  const handleAddToCartAndGoCart = () => {
    addToCart(selectedItem)
    navigate("/cart/ramosilvestre")
  }

  // Asegura que al montar el componente, se scrollee al top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!selectedItem) {
    navigate("/")
    return null
  }

  const isFavorite = favorites.includes(selectedItem.title)

  return (
    // Fondo general
    <div className="min-h-screen bg-[#001a1a] font-playfair text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <motion.button
          onClick={handleBack}
          className="text-white bg-black/30 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon icon="pepicons-pencil:arrow-left" width="28" height="28" />
        </motion.button>

        <div className="flex space-x-4">
          <Icon icon="clarity:note-line" className="text-white" width="24" height="24" />
          <Icon icon={languageFlags[language]} width="24" height="24" />
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 pb-24">
        {/* Large image */}
        <motion.div
          className="rounded-3xl overflow-hidden w-full aspect-square mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isPlaying ? (
            <video
              src={selectedItem.video}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onPlaying={() => setIsPlaying(true)}
            />
          ) : (
            <img
              src={selectedItem.image || "/placeholder.svg"}
              alt={selectedItem.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-4 mb-4">
          <motion.button
            onClick={() => toggleFavorite(selectedItem.title)}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart className={`text-xl ${isFavorite ? "text-red-500" : "text-gray-400"}`} />
          </motion.button>

          <motion.button
            onClick={handleAddToCartAndGoCart}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaPlus className="text-xl text-black" />
          </motion.button>
        </div>

        {/* Title and price */}
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {selectedItem.title}
        </motion.h1>

        <div className="flex items-center gap-4 mb-4">
          <motion.p
            className="text-3xl font-bold text-[#E8B4B8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {selectedItem.price}
          </motion.p>

          {selectedItem.isChefSuggestion && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MdOutlineRestaurantMenu className="text-[#E8B4B8]" />
              <span className="text-[#E8B4B8] font-medium">{translations[language]?.chefSuggestion}</span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg leading-relaxed text-white/90">
            {selectedItem.longDescription || selectedItem.description}
          </p>
        </motion.div>

        {/* Allergens section */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">{translations[language]?.allergens}</h2>
            <div className="space-y-3">
              {["Cereals containing gluten", "Dairy", "Eggs"].map((allergen, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Icon icon="mdi:wheat" className="text-[#31ada1]" width="20" height="20" />
                  </div>
                  <span className="text-white/80">{allergen}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ItemDetailLayout

