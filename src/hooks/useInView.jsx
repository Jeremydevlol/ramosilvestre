"use client"

import { useState, useEffect } from "react"

const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use a small delay to prevent flickering during fast scrolling
        const timer = setTimeout(() => {
          setIsInView(entry.isIntersecting)
        }, 50)

        return () => clearTimeout(timer)
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: options.threshold || 0.5,
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
  }, [ref, options.threshold])

  return isInView
}

export default useInView

