"use client"

import { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import useStore from "../store/store"
import "swiper/css"
import "swiper/css/navigation"
// Aquí tienes tus secciones
import { getSections, LogoImage, translations, languageFlags } from "../data/constants"
import MenuItem from "./MenuItem"

const RestaurantLayout = () => {
  const navigate = useNavigate()
  const store = useStore()
  const cartItems = store?.cartItems || []
  const language = store?.language || "es"
  const setLanguage = store?.setLanguage || (() => {})

  // -- Estado para popup (opcional, puedes quitarlo)
  const [showRatePopup, setShowRatePopup] = useState(false)
  const [popupMessage] = useState("Califica este plato en Google Maps para recibir un 15% de descuento.")
  const [showLanguageModal, setShowLanguageModal] = useState(false)

  // Obtener secciones localizadas según el idioma actual
  const currentSections = getSections(language)

  // -- Sección activa para el header (y resaltar en la barra)
  const [activeSectionId, setActiveSectionId] = useState(currentSections[0].id)

  const [paddingLeft, setPaddingLeft] = useState("10px")
  const [paddingRight, setPaddingRight] = useState("10px")
  const swiperRef = useRef(null)
  // -- IntersectionObserver para que, al hacer scroll, se actualice la sección activa
  const sectionsRef = useRef([])
  const handleSectionRef = (el, index) => {
    if (el) {
      sectionsRef.current[index] = el
    }
  }

  // Cambio de idioma
  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setShowLanguageModal(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    // Asegurarse de que todas las secciones estén observadas
    sectionsRef.current.forEach((sectionEl) => {
      if (sectionEl) observer.observe(sectionEl)
    })

    return () => {
      sectionsRef.current.forEach((sectionEl) => {
        if (sectionEl) observer.unobserve(sectionEl)
      })
    }
  }, [])

  useEffect(() => {
    if (swiperRef.current) {
      const index = currentSections.findIndex((sec) => sec.id === activeSectionId)
      if (index !== -1) {
        swiperRef.current.slideTo(index)
      }
    }
  }, [activeSectionId, currentSections])

  // -- Función para scrollear al hacer clic en un ícono
  const scrollToSection = (sectionId, offset = 100) => {
    setActiveSectionId(sectionId)
    const sectionElement = document.getElementById(sectionId)

    if (sectionElement) {
      const elementPosition = sectionElement.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
    }
  }

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const navVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.95 },
  }

  return (
    <div className="min-h-screen bg-black text-white relative font-playfair">
      {/* Popup (opcional) */}
      <AnimatePresence>
        {showRatePopup && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gray-950/80 border border-gray-800/50 rounded-2xl p-8 shadow-2xl w-full max-w-md text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FFFFFF] to-[#E8B4B8] bg-clip-text text-transparent mb-4">
                ¡Atención!
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{popupMessage}</p>
              <motion.button
                onClick={() => setShowRatePopup(false)}
                className="bg-gradient-to-r from-[#FFFFFF] to-[#E8B4B8] 
                     hover:from-[#E8B4B8] hover:to-[#FFFFFF] 
                     text-white py-3 px-6 rounded-xl transition-all duration-500 
                     transform hover:-translate-y-1 font-semibold shadow-lg 
                     hover:shadow-[#FFFFFF]/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations[language]?.close}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLanguageModal(false)}
          >
            <motion.div
              className="bg-gradient-to-b from-customPink-500/20 to-black/90 rounded-2xl p-6 w-[85%] max-w-sm border border-customPink-500/30 shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {translations[language]?.selectLanguage || "Seleccionar idioma"}
              </h2>

              <div className="space-y-4">
                {Object.keys(translations).map((langCode) => (
                  <motion.button
                    key={langCode}
                    onClick={() => handleLanguageChange(langCode)}
                    className={`flex items-center gap-4 w-full p-4 rounded-xl transition-colors ${
                      language === langCode
                        ? "bg-gradient-to-r from-customPink-500 to-customPink-600 text-white"
                        : "bg-black/50 text-white/80 hover:bg-black/70 border border-white/10"
                    }`}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
                      <Icon
                        icon={languageFlags[langCode]}
                        width="28"
                        height="28"
                        className="rounded-md overflow-hidden"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{translations[langCode].language}</span>
                      <span className="text-xs opacity-70">{translations[langCode].languageCode}</span>
                    </div>
                    {language === langCode && (
                      <Icon icon="ph:check-circle-fill" className="ml-auto text-white" width="20" height="20" />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => setShowLanguageModal(false)}
                className="mt-6 w-full bg-gradient-to-r from-black/70 to-black/90 hover:from-black/80 hover:to-black/100 text-white py-3 rounded-xl transition-colors border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {translations[language]?.close || "Cerrar"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== HEADER ========== */}
      <motion.header
        className="
     backdrop-blur-lg
     bg-gradient-to-b from-customPink-200/40 via-customPink-100/30 to-transparent
     shadow-lg
     border-b
     border-customPink-300/20
     sticky
     top-0
     z-10
   "
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="relative flex items-center justify-between h-[42px]">
            {/* Left - Back Button */}
            <div className="flex-1">
              <motion.button
                className="text-white transition-colors duration-300 z-10 flex items-center gap-2"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Icon icon="pepicons-pencil:arrow-left" width="24" height="24" />
              </motion.button>
            </div>

            {/* Logo central */}
            <div className="flex-1 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <LogoImage className="h-8 w-auto" />
              </motion.div>
            </div>

            {/* Carrito a la derecha */}
            <div className="flex-1 flex justify-end">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => navigate("/cart/ramosilvestre")}
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    icon="mdi:shopping-cart"
                    width="24"
                    height="24"
                    className="text-white transition-colors duration-300"
                  />
                  {cartItems.length > 0 && (
                    <motion.span
                      className="
          absolute
          -top-2
          -right-2
          bg-gradient-to-r
          from-customPink-500
          to-customPink-600
          text-white
          text-xs
          rounded-full
          h-5
          w-5
          flex
          items-center
          justify-center
        "
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {cartItems.reduce((sum, it) => sum + (it.quantity || 1), 0)}
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Language Selector Button - Positioned below header */}
      <motion.div
        className="sticky top-[70px] z-40 flex justify-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.button
          onClick={() => setShowLanguageModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-customPink-500/80 to-customPink-600/80 backdrop-blur-md shadow-lg border border-white/20"
          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={languageFlags[language]} width="20" height="20" className="rounded-sm" />
          <span className="font-medium text-white">{translations[language]?.language}</span>
          <Icon icon="mdi:chevron-down" className="text-white ml-1" width="16" height="16" />
        </motion.button>
      </motion.div>

      <main className="container mx-auto px-4 pt-4 pb-32 overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
        <motion.div className="space-y-10" variants={sectionVariants} initial="hidden" animate="visible">
          {currentSections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              ref={(el) => handleSectionRef(el, index)}
              className="scroll-mt-24"
            >
              <motion.h2 className="text-2xl font-bold text-white mb-6 py-2 z-10" variants={sectionTitleVariants}>
                {section.id === "workshops" ? translations[language]?.workshops : translations[language]?.collection}
              </motion.h2>
              <div className="space-y-6">
                {section.posts.map((post, postIndex) => (
                  <MenuItem key={postIndex} post={post} postIndex={postIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* ========== BARRA INFERIOR (ÍCONOS) ========== */}
      <motion.nav
        className="fixed bottom-0 backdrop-blur-md w-full z-50 h-[65px]"
        style={{
          boxShadow: "0px -5px 8px #00000040",
          backgroundColor: "rgba(17, 16, 42, 0.57)",
          borderRadius: "10px 10px 0 0",
          padding: "0px",
          paddingLeft,
          paddingRight,
        }}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-around items-center h-full px-2">
          {currentSections.map((section, index) => {
            const IconComp = section.icon
            const isActive = activeSectionId === section.id
            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex flex-col items-center p-2 focus:outline-none rounded-lg nav-item 
               ${isActive ? "active text-[#E8B4B8]" : "text-gray-400 hover:text-white"}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                aria-label={section.label}
              >
                <IconComp className="text-3xl" />
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}

export default RestaurantLayout

