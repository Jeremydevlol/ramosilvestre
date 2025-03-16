"use client"
import { useState, useEffect } from "react"
import useStore from "../store/store"
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { FaHeart, FaPlus, FaTrash } from "react-icons/fa"
import { SECTIONS, translations } from "../data/constants"

const CartComponent = () => {
  const { cartItems, updateQuantity, removeFromCart, favorites, toggleFavorite, setSelectedItem, language } = useStore()
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState("Colección")

  // Determine the section title based on cart items
  useEffect(() => {
    if (cartItems.length > 0) {
      // Get all unique section IDs from cart items
      const sectionIds = [...new Set(cartItems.map((item) => item.sectionId))]

      if (sectionIds.length === 1) {
        // If all items are from the same section, use that section's name
        const sectionId = sectionIds[0]
        const section = SECTIONS.find((s) => s.id === sectionId)

        if (section) {
          // Map section IDs to user-friendly names
          const sectionNames = {
            florist: translations[language]?.collection || "Colección",
            iconoir: translations[language]?.collection || "Colección",
            mingcute: translations[language]?.collection || "Colección",
            workshops: translations[language]?.workshops || "Talleres",
          }

          setCurrentSection(sectionNames[sectionId] || translations[language]?.collection || "Colección")
        }
      } else if (sectionIds.length > 1) {
        // If items are from multiple sections
        setCurrentSection(translations[language]?.collection || "Colección")
      }
    } else {
      setCurrentSection(translations[language]?.collection || "Colección")
    }
  }, [cartItems, language])

  const totalBeforeDiscount = cartItems.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("€", "").split("-")[0].trim())
    return sum + price * item.quantity
  }, 0)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Handle "Ver Más" button click
  const handleViewMore = (item) => {
    setSelectedItem(item)
    navigate(`/details/ramosilvestre`)
  }

  // Handle remove item from cart with animation
  const handleRemoveItem = (title) => {
    // Animate the item before removing it
    const itemElement = document.getElementById(`cart-item-${title.replace(/\s+/g, "-")}`)
    if (itemElement) {
      itemElement.style.transition = "all 0.3s ease"
      itemElement.style.transform = "translateX(-100%)"
      itemElement.style.opacity = "0"

      setTimeout(() => {
        removeFromCart(title)
      }, 300)
    } else {
      removeFromCart(title)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col font-playfair">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-10 bg-black py-4 px-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => navigate(-1)}
            className="text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon icon="pepicons-pencil:arrow-left" width="28" height="28" />
          </motion.button>

          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            key={currentSection} // Add key to trigger animation when title changes
          >
            {currentSection}
          </motion.h1>

          <div className="w-7 h-7 relative">
            <span className="absolute -top-1 -right-1 bg-[#E8B4B8] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 pb-24 px-4 mt-4">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center h-full gap-6 p-4"
          >
            <Icon icon="pepicons-pencil:cart" className="w-24 h-24 text-white/20" />
            <p className="text-white/50 text-lg text-center">{translations[language]?.emptyCart}</p>
            <motion.button
              onClick={() => navigate(-1)}
              className="bg-[#E8B4B8] hover:bg-[#F2D5D8] text-white py-3 px-6 rounded-xl transition-colors font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations[language]?.continueShopping}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            {cartItems.map((item, index) => (
              <motion.div
                id={`cart-item-${item.title.replace(/\s+/g, "-")}`}
                key={`${item.id}-${item.title}`}
                variants={itemVariants}
                className="bg-[#001a1a] rounded-2xl overflow-hidden p-4"
              >
                <div className="flex items-start gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xl font-bold text-[#E8B4B8] mb-1">{item.price}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white/80 text-sm">{item.description || "Primer arreglo"}</p>
                      <motion.button
                        className="text-[#E8B4B8] text-sm hover:underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewMore(item)}
                      >
                        {translations[language]?.viewMore}
                      </motion.button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <motion.button
                      onClick={() => toggleFavorite(item.title)}
                      className="text-white hover:text-[#E8B4B8]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaHeart className={favorites.includes(item.title) ? "text-[#E8B4B8]" : ""} />
                    </motion.button>

                    <motion.button
                      onClick={() => updateQuantity(item.title, (item.quantity || 0) + 1)}
                      className="text-white hover:text-[#E8B4B8]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaPlus />
                    </motion.button>

                    {/* Nuevo botón para eliminar del carrito */}
                    <motion.button
                      onClick={() => handleRemoveItem(item.title)}
                      className="text-white hover:text-red-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={translations[language]?.remove}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>

                {/* Quantity display and controls */}
                <div className="flex items-center justify-end mt-2">
                  <div className="flex items-center bg-black/30 rounded-lg px-2 py-1">
                    <motion.button
                      onClick={() => updateQuantity(item.title, Math.max(1, (item.quantity || 1) - 1))}
                      className="text-white/80 hover:text-white px-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <span className="text-white mx-2 min-w-[20px] text-center">{item.quantity || 1}</span>
                    <motion.button
                      onClick={() => updateQuantity(item.title, (item.quantity || 1) + 1)}
                      className="text-white/80 hover:text-white px-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Summary */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-[#001a1a] p-6"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between text-xl mb-4">
                <span className="text-white">{translations[language]?.total}:</span>
                <span className="text-[#E8B4B8] font-bold">€{totalBeforeDiscount.toFixed(2)}</span>
              </div>

              <motion.button
                onClick={() =>
                  window.open("https://wa.me/34638680539?text=Hola,%20quiero%20más%20información!", "_blank")
                }
                className="w-full bg-[#E8B4B8] hover:bg-[#F2D5D8] text-white py-4 rounded-xl transition-colors font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {translations[language]?.continue}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default CartComponent

