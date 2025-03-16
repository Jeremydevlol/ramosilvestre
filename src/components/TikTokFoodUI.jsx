"use client"

/***********************
 * TikTokFoodUI.jsx
 * - Al iniciar, todas las secciones empiezan en su primer plato
 * - Si dejas una sección a la mitad y vuelves luego, se retoma desde ahí
 ***********************/
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FiShoppingCart } from "react-icons/fi"

// ====== SWIPER IMPORTS (versión 10+)
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { SECTIONS, LogoImage } from "../data/constants"
import PostComponent from "./PostComponent"
import useStore from "../store/store"

// =============== GlobalStyles ===============
import "./TikTokFoodUI.css"

// IMPORTAMOS LOS HOOKS DE REACT ROUTER
import { useNavigate, useParams } from "react-router-dom"

// Import LogoImage
// import LogoImage from "./LogoImage"

const TikTokFoodUI = () => {
  // LEEMOS EL PARÁMETRO :id DE LA URL
  const { id } = useParams()
  console.log("Parámetro de la URL (id):", id)

  const [expandedPost, setExpandedPost] = useState(null)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [activeMode, setActiveMode] = useState("restaurante")
  const [isSwiping, setIsSwiping] = useState(false)

  const { cartItems, language, setLanguage, isScrollEnabled, toggleScroll } = useStore()
  const navigate = useNavigate()

  // Índice de sección activa (Swiper horizontal)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [swiperRef, setSwiperRef] = useState(null)

  // Guardaremos refs a cada Swiper vertical
  const verticalSwipersRef = useRef([])
  const sectionsSwiperRef = useRef(null)

  const [paddingLeft, setPaddingLeft] = useState("10px")
  const [paddingRight, setPaddingRight] = useState("10px")

  const currentSections = SECTIONS

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

    // Sincronizar el swiper de secciones con el swiper principal
    const sectionRef = sectionsSwiperRef.current
    if (sectionRef) {
      const isVisible =
        activeIndex >= sectionRef.activeIndex && activeIndex < sectionRef.activeIndex + sectionRef.params.slidesPerView

      if (!isVisible) {
        sectionRef.slideTo(activeIndex)
      }
    }
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
  }

  // Uso de useEffect si hay un :id en la URL
  useEffect(() => {
    if (id) {
      // Aquí podrías, por ejemplo, buscar datos de ese "id" en tu base de datos
      // o cambiar a una sección específica, etc.
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
        <div className="flex items-center justify-center h-full relative">
          {/* Invisible spacer to balance the cart button */}
          <div className="w-9 h-9 opacity-0"></div>

          {/* Center - Logo/Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="mx-auto"
          >
            <LogoImage className="h-8 w-auto" />
          </motion.div>

          {/* Right - Cart button */}
          <motion.button
            onClick={() => navigate("/cart/atv4ruedasgalipan")}
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
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </motion.button>
        </div>
      </motion.header>

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
              onTouchEnd={() => setIsSwiping(false)}
              className="w-full h-full"
              mousewheel={true}
              keyboard={{
                enabled: true,
              }}
              allowTouchMove={true}
            >
              {section.posts.map((post) => (
                <SwiperSlide
                  key={post.id}
                  className="m-0 p-0 w-full h-full overflow-y-auto"
                  style={{ backgroundColor: "#000" }}
                >
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

      {/* NAVEGACIÓN INFERIOR (ICONOS) */}
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
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          initialSlide={activeSectionIndex}
          onSwiper={(swiper) => {
            sectionsSwiperRef.current = swiper
            if (swiper.isBeginning) {
              setPaddingLeft("10px")
              setPaddingRight("35px")
            }
            if (swiper.isEnd) {
              setPaddingRight("10px")
              setPaddingLeft("35px")
            }
          }}
          onSlideChange={(swiper) => {
            if (swiper.isBeginning) {
              setPaddingLeft("10px")
              setPaddingRight("35px")
            }
            if (swiper.isEnd) {
              setPaddingRight("10px")
              setPaddingLeft("35px")
            }
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          style={{ display: "flex", position: "static" }}
          className="justify-center items-center w-full px-8 h-full"
        >
          {currentSections.map((section, index) => {
            const IconComp = section.icon
            return (
              <SwiperSlide
                key={section.id}
                className="w-auto flex justify-center items-center"
                style={{ width: "20%", display: "flex" }}
              >
                <motion.button
                  onClick={() => handleSectionChange(index)}
                  className={`flex flex-col items-center p-2 focus:outline-none rounded-lg nav-item ${
                    activeSectionIndex === index ? "active text-customPink-500" : "text-white-400 hover:text-white"
                  }`}
                  whileHover={buttonVariants.hover}
                  whileTap={buttonVariants.tap}
                  aria-label={typeof section.label === "string" ? section.label : "Ramo Silvestre"}
                >
                  <IconComp className="text-3xl" />
                </motion.button>
              </SwiperSlide>
            )
          })}
          <motion.button
            className="swiper-button-prev"
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
          />
          <motion.button
            className="swiper-button-next absolute right-0 p-2 text-gray-300 hover:text-white"
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
          />
        </Swiper>
      </motion.nav>
    </div>
  )
}

export default TikTokFoodUI
