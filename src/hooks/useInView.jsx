"use client"

import { useState, useEffect } from "react"

const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Usar un umbral más bajo para activar antes
        if (entry.isIntersecting) {
          // Pequeño retraso para evitar parpadeos durante el desplazamiento rápido
          const timer = setTimeout(() => {
            setIsInView(true)
          }, 50)

          return () => clearTimeout(timer)
        } else {
          // Sin retraso al salir de la vista
          setIsInView(false)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: options.threshold || 0.3, // Umbral más bajo
        ...options,
      },
    )

    const currentRef = ref.current
    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return isInView
}

export default useInView

