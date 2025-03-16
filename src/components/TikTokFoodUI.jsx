"use client"

/***********************
 * TikTokFoodUI.jsx
 * - Al iniciar, todas las secciones empiezan en su primer plato
 * - Si dejas una sección a la mitad y vuelves luego, se retoma desde ahí
 ***********************/
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiShoppingCart } from "react-icons/fi"
import { Icon } from "@iconify/react"

// ====== SWIPER IMPORTS (versión 10+)
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { getSections, LogoImage, translations, languageFlags } from "../data/constants"
import PostComponent from "./PostComponent"
import useStore from "../store/store"

// =============== GlobalStyles ===============
import "./TikTokFoodUI.css"

// IMPORTAMOS LOS HOOKS DE REACT ROUTER
import { useNavigate, useParams } from "react-router-dom"

const TikTokFoodUI = () => {
  // LEEMOS EL PARÁMETRO :id DE LA URL
  const { id } = useParams()
  console.log("Parámetro de la URL (id):", id)

  const [expandedPost, setExpandedPost] = useState(null)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [activeMode, setActiveMode] = useState("restaurante")
  const [isSwiping, setIsSwiping] = useState(false)

  // Usar valores por defecto en caso de que el store no esté inicializado
  const store = useStore()
  const cartItems = store?.cartItems || []
  const language = store?.language || "es"
  const isScrollEnabled = store?.isScrollEnabled !== undefined ? store.isScrollEnabled : true
  const setLanguage = store?.setLanguage || (() => {})
  const toggleScroll = store?.toggleScroll || (() => {})

  const navigate = useNavigate()

  // Índice de sección activa (Swiper horizontal)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [swiperRef, setSwiperRef] = useState(null)

  // Guardaremos refs a cada Swiper vertical
  const verticalSwipersRef = useRef([])
  const sectionsSwiperRef = useRef(null)

  // Obtener secciones localizadas según el idioma actual
  const currentSections = getSections(language)

  // Expandir/cerrar un Post
  const handleExpand = (postId) => {
    setExpandedPost((prev) => {
      const isSamePost = prev === postId
      return isSamePost ? null : postId
    })
    toggleScroll()
  }

  // Cambio de idioma
  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setShowLanguageModal(false)
  }

  // Cuando se inicia un Swiper vertical
  const handleVerticalSwiperInit = (verticalSwiper, index) => {
    verticalSwipersRef.current[index] = verticalSwiper
  }

  const onHorizontalSlideChange = (swiperInstance) => {
    const activeIndex = swiperInstance.activeIndex
    setActiveSectionIndex(activeIndex)
  }

  // Animaciones para botones y modal
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.95 },
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

  // Uso de useEffect si hay un :id en la URL
  useEffect(() => {
    if (id) {
      console.log("Se recibió un ID en la URL:", id)
    }
  }, [id])

  // Función para cambiar de sección
  const handleSectionChange = (index) => {
    setActiveSectionIndex(index)
    if (swiperRef) {
      swiperRef.slideTo(index)
    }

    // También asegurarse de que el swiper vertical esté en la primera slide
    if (verticalSwipersRef.current[index]) {
      verticalSwipersRef.current[index].slideTo(0)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-black text-white relative font-playfair">
      {/* HEADER */}
      <motion.header
        key={activeSectionIndex}
        className="fixed top-0 left-0 right-0 z-50 
   backdrop-blur-md bg-gradient-to-t from-transparent via-customPink-400/40 to-customPink-500/60
   py-4 px-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between h-full relative">
          {/* Left - Empty space (no back button in main view) */}
          <div className="w-9 h-9"></div>

          {/* Center - Logo */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <LogoImage className="h-8 w-auto" />
          </motion.div>

          {/* Right - Cart button */}
          <motion.button
            onClick={() => navigate("/cart/ramosilvestre")}
            className="w-9 h-9 relative flex items-center justify-center"
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            aria-label="Ver carrito"
          >
            <FiShoppingCart className="w-5 h-5 text-white" />
            {cartItems.length > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-customPink-500 
               text-white text-xs rounded-full h-4 w-4 
               flex items-center justify-center"
              >
                {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </span>
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Language Selector Button - Positioned at left side below header */}
      <motion.div
        className="fixed top-20 left-4 z-40"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.button
          onClick={() => setShowLanguageModal(true)}
          className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md shadow-lg border border-white/10 bg-white/5"
          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={languageFlags[language]} width="20" height="20" className="rounded-sm" />
        </motion.button>
      </motion.div>

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
                        ? "bg-gradient-to-r from-customPink-500/80 to-customPink-600/80 text-white"
                        : "bg-black/30 text-white/80 hover:bg-black/40 border border-white/10"
                    }`}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center backdrop-blur-sm bg-white/10">
                      <Icon icon={languageFlags[langCode]} width="24" height="24" />
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

      {/* SWIPER HORIZONTAL (SECCIONES) */}
      <Swiper
        className="w-full h-full"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        nested={true}
        onSwiper={(instance) => setSwiperRef(instance)}
        onSlideChange={onHorizontalSlideChange}
      >
        {currentSections.map((section, hIndex) => (
          <SwiperSlide key={section.id} className="m-0 p-0 w-full h-full" style={{ backgroundColor: "#000" }}>
            {/* SWIPER VERTICAL (POSTS) */}
            <Swiper
              direction="vertical"
              modules={[Pagination]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={0}
              nested={true}
              onSwiper={(verticalSwiper) => handleVerticalSwiperInit(verticalSwiper, hIndex)}
              onTouchStart={() => setIsSwiping(true)}
              onTouchEnd={() => setIsSwiping(false)}
              className="w-full h-full"
              mousewheel={true}
              keyboard={{
                enabled: true,
              }}
              allowTouchMove={true}
              touchStartPreventDefault={false}
              simulateTouch={true}
              resistance={false}
              resistanceRatio={0}
              watchSlidesProgress={true}
              observer={true}
              observeParents={true}
            >
              {section.posts.map((post) => (
                <SwiperSlide key={post.id} className="m-0 p-0 w-full h-full" style={{ backgroundColor: "#000" }}>
                  <PostComponent
                    post={post}
                    expandedPost={expandedPost}
                    handleExpand={handleExpand}
                    activeSection={section.id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVEGACIÓN INFERIOR (ICONOS) - Versión simplificada sin Swiper para mejor compatibilidad */}
      <motion.nav
        className="fixed bottom-0 backdrop-blur-md w-full z-50 h-[65px]"
        style={{
          boxShadow: "0px -5px 8px #00000040",
          backgroundColor: "rgba(17, 16, 42, 0.57)",
          borderRadius: "10px 10px 0 0",
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-around items-center h-full px-2">
          {currentSections.map((section, index) => {
            const IconComp = section.icon
            return (
              <motion.button
                key={section.id}
                onClick={() => handleSectionChange(index)}
                className={`flex flex-col items-center p-2 focus:outline-none rounded-lg ${
                  activeSectionIndex === index ? "text-customPink-500" : "text-white/80 hover:text-white"
                }`}
                whileHover={buttonVariants.hover}
                whileTap={buttonVariants.tap}
                aria-label={typeof section.label === "string" ? section.label : "Ramo Silvestre"}
              >
                <IconComp className="text-2xl" />
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}

export default TikTokFoodUI

