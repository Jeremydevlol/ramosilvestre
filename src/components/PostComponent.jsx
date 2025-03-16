"use client"

import PropTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"
import { AiFillHeart, AiOutlineHeart, AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import ActionButton from "./ActionButton"
import { TiThMenuOutline } from "react-icons/ti"
import { useNavigate } from "react-router-dom"
import useStore from "../store/store"
import { useRef, useEffect, useState, memo } from "react"
import { translations } from "../data/constants"
import useInView from "../hooks/useInView"
import { handleAddToCart, handleAddToFavorite } from "../utils/utils"

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  tap: { scale: 0.95 },
}

const PostComponent = memo(({ post, expandedPost, handleExpand, activeSection }) => {
  const navigate = useNavigate()
  const { cartItems, addToCart, toggleFavorite, favorites, language } = useStore()
  const [isPlaying, setIsPlaying] = useState(false)

  // Variantes para animar la aparición del post
  const postVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const buttonRef = useRef(null)
  const favoriteRef = useRef(null)
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  // Detectar si el contenedor está en vista
  const isInView = useInView(containerRef, { threshold: 0 })
  // Detectar si el video debe reproducirse
  const shouldPlay = useInView(videoRef, { threshold: 0.85 })

  useEffect(() => {
    if (videoRef.current) {
      if (shouldPlay) {
        const playPromise = videoRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((err) => {
              console.log("Play error:", err)
              // Intentar reproducir nuevamente después de un breve retraso
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.play().catch((e) => console.log("Retry error:", e))
                }
              }, 300)
            })
        }
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [shouldPlay])

  const isMobile = () => /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Animation variants for text elements
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  }

  const priceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  }

  // Add section ID to the post when adding to cart
  const handleAddToCartWithSection = () => {
    const postWithSection = {
      ...post,
      sectionId: activeSection,
      // Asegurarse de que la imagen se incluya correctamente
      image: post.image,
    }
    handleAddToCart(postWithSection, buttonRef, addToCart)
  }

  return (
    <motion.div
      key={`${activeSection}-${post.id}`}
      id={`post-${activeSection}-${post.id}`}
      className="relative w-full h-screen overflow-hidden bg-black text-white font-playfair"
      variants={postVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* CONTENEDOR VIDEO/IMAGEN */}
      <motion.div
        className="absolute inset-0 z-0"
        ref={containerRef}
        initial={{ scale: 1.05, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Imagen de fondo (fallback) */}
        <motion.img
          src={post.image}
          alt={post.title}
          className="absolute w-full h-full object-cover pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          loading="eager"
        />
        {/* Video si está en vista */}
        {isInView && (
          <motion.video
            ref={videoRef}
            src={post.video}
            className="absolute w-full h-full object-cover pointer-events-none"
            loop
            muted
            playsInline
            preload="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            onPlaying={() => setIsPlaying(true)}
          />
        )}

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
      </motion.div>

      {/* BOTONES DERECHA (Favorito, Añadir, etc.) */}
      <div
        className="absolute flex flex-col gap-4 z-30 justify-center right-0"
        style={{
          bottom: isMobile() ? "var(--navbar-height-mobile)" : "var(--navbar-height)",
          padding: "0 18px 22px 0",
        }}
      >
        {/* Botón Menú */}
        <motion.button
          onClick={() => navigate("/menu/ramosilvestre")}
          className="w-11 h-11 backdrop-blur-sm bg-black/50 rounded-full
                   hover:bg-white/10 active:bg-white/20 flex items-center justify-center
                   shadow-lg shadow-black/10 border border-white/20"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          aria-label="Modo menu"
        >
          <TiThMenuOutline className="w-6 h-6" />
        </motion.button>

        {/* Botón Favorito */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <ActionButton
            active={favorites.includes(post.title)}
            onClick={() => handleAddToFavorite(post, favoriteRef, toggleFavorite)}
            Icon={favorites.includes(post.title) ? AiFillHeart : AiOutlineHeart}
            label={favorites.includes(post.title) ? "Eliminar favorito" : "Agregar a favoritos"}
            buttonRef={favoriteRef}
          />
        </motion.div>

        {/* Botón Añadir a Pedidos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <ActionButton
            active={cartItems.some((item) => item.id === post.id)}
            onClick={handleAddToCartWithSection}
            Icon={cartItems.some((item) => item.id === post.id) ? AiFillPlusCircle : AiOutlinePlusCircle}
            label={cartItems.some((item) => item.id === post.id) ? "Eliminar de pedidos" : "Agregar a pedidos"}
            buttonRef={buttonRef}
          />
        </motion.div>
      </div>

      {/* INFORMACIÓN DEL POST */}
      <div
        className="absolute bottom-0 flex z-10 w-full"
        style={{
          paddingBottom: isMobile() ? "calc(var(--navbar-height-mobile) + 20px)" : "calc(var(--navbar-height) + 20px)",
        }}
      >
        <section className="w-full items-end justify-between px-5 py-4">
          <div className="max-w-full w-[90%] md:w-[88%] h-full space-y-2">
            {/* TÍTULO */}
            <motion.h2
              className="text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {post.title}
            </motion.h2>

            {/* PRECIO y AUTOR */}
            <motion.div className="flex items-center gap-4" variants={priceVariants} initial="hidden" animate="visible">
              <motion.p
                className="text-xl font-bold text-[#E8B4B8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {post.price}
              </motion.p>

              <motion.p className="text-base text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                @{post.author}
              </motion.p>
            </motion.div>

            {/* DESCRIPCIÓN */}
            <motion.div
              className="flex flex-col text-base space-between mt-1"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-white text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                {expandedPost === post.id ? post.longDescription : post.description}
                {expandedPost !== post.id && (
                  <motion.span
                    onClick={() => handleExpand(post.id)}
                    className="underline cursor-pointer ml-2 text-[#E8B4B8] hover:text-[#F2D5D8] font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {translations[language].seeMore}
                  </motion.span>
                )}
              </p>

              {/* SI EXPANDIDO: VER MENOS */}
              <AnimatePresence>
                {expandedPost === post.id && (
                  <motion.p
                    onClick={() => handleExpand(post.id)}
                    className="underline cursor-pointer text-center mt-2 text-[#E8B4B8] hover:text-[#F2D5D8] font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {translations[language].seeLess}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  )
})

PostComponent.propTypes = {
  post: PropTypes.object.isRequired,
  expandedPost: PropTypes.number,
  handleExpand: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
}

export default PostComponent

