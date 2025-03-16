"use client"

import { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import useStore from "../store/store"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
// Aquí tienes tus secciones
import { SECTIONS } from "../data/constants"
import MenuItem from "./MenuItem"

const RestaurantLayout = () => {
  const navigate = useNavigate()
  const { cartItems } = useStore()

  // -- Estado para popup (opcional, puedes quitarlo)
  const [showRatePopup, setShowRatePopup] = useState(false)
  const [popupMessage] = useState("Califica este plato en Google Maps para recibir un 15% de descuento.")

  // -- Sección activa para el header (y resaltar en la barra)
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0].id)

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
      const index = SECTIONS.findIndex((sec) => sec.id === activeSectionId)
      if (index !== -1) {
        swiperRef.current.slideTo(index)
      }
    }
  }, [activeSectionId])
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
                Calificar
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
          <div className="relative flex items-center h-[42px]">
            {/* Flecha atrás */}
            <motion.button
              className="
              absolute
              left-0
              text-white
              transition-colors
              duration-300
              z-10
            "
              onClick={() => navigate("/slider/ramosilvestre")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Icon icon="pepicons-pencil:arrow-left" width="28" height="28" className="inline-block" />
            </motion.button>

            {/* Aquí el "Gourmet" (o la sección activa) GRANDOTE */}
            <motion.h1
              className="
              absolute
              inset-0
              text-center
              text-3xl
              md:text-4xl
              font-bold
              text-white
            "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {SECTIONS.find((sec) => sec.id === activeSectionId)?.label || "Menú"}
            </motion.h1>

            {/* Carrito a la derecha */}
            <div className="absolute right-0 flex items-center space-x-4">
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
                      {cartItems.reduce((sum, it) => sum + it.quantity, 0)}
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
      <main className="container mx-auto px-4 pt-16 pb-32 overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
        <motion.div className="space-y-10" variants={sectionVariants} initial="hidden" animate="visible">
          {SECTIONS.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              ref={(el) => handleSectionRef(el, index)}
              className="scroll-mt-24"
            >
              <motion.h2
                className="text-xl font-bold text-white mb-4 sticky top-0 bg-black/80 backdrop-blur-sm py-2 z-10"
                variants={sectionTitleVariants}
              >
                {section.id === "workshops" ? "Talleres" : "Colección"}
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
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          initialSlide={SECTIONS.findIndex((s) => s.id === activeSectionId) || 0}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          style={{ display: "flex", position: "static" }}
          className="justify-center items-center w-full px-8 h-full"
        >
          {SECTIONS.map((section, index) => {
            const IconComp = section.icon
            const isActive = activeSectionId === section.id
            return (
              <SwiperSlide
                key={section.id}
                className="w-auto flex justify-center items-center"
                style={{ width: "20%", display: "flex" }}
              >
                <motion.button
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
                  {section.id === "workshops" && <span className="text-xs mt-1">Talleres</span>}
                </motion.button>
              </SwiperSlide>
            )
          })}
          <motion.button className="swiper-button-prev"></motion.button>
          <motion.button className="swiper-button-next absolute right-0 p-2 text-gray-300 hover:text-white"></motion.button>
        </Swiper>
      </motion.nav>
    </div>
  )
}

export default RestaurantLayout

