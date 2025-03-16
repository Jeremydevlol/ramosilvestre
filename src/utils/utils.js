// Improve the utility functions to prevent any black screen issues

// Add this function to prevent touch event issues
export const preventDefaultTouchMove = (event) => {
  // Only prevent default for vertical swipes
  const touchStartY = event.touches[0].clientY

  const handleTouchMove = (moveEvent) => {
    const touchY = moveEvent.touches[0].clientY
    const deltaY = touchY - touchStartY

    // If it's a significant vertical movement
    if (Math.abs(deltaY) > 10) {
      moveEvent.preventDefault()
    }
  }

  document.addEventListener("touchmove", handleTouchMove, { passive: false })

  const cleanup = () => {
    document.removeEventListener("touchmove", handleTouchMove)
    document.removeEventListener("touchend", cleanup)
    document.removeEventListener("touchcancel", cleanup)
  }

  document.addEventListener("touchend", cleanup, { once: true })
  document.addEventListener("touchcancel", cleanup, { once: true })
}

// Improve the cart and favorite functions to prevent UI glitches
export const handleAddToCart = (item, buttonRef, addToCart) => {
  if (buttonRef.current) {
    // Add animation class
    buttonRef.current.classList.add("animate-pulse")

    // Remove animation class after animation completes
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.classList.remove("animate-pulse")
      }
    }, 500)
  }

  // Add item to cart with a small delay to allow animation to complete
  setTimeout(() => {
    addToCart(item)
  }, 100)
}

export const handleAddToFavorite = (item, favoriteRef, toggleFavorite) => {
  if (favoriteRef.current) {
    // Add animation class
    favoriteRef.current.classList.add("animate-pulse")

    // Remove animation class after animation completes
    setTimeout(() => {
      if (favoriteRef.current) {
        favoriteRef.current.classList.remove("animate-pulse")
      }
    }, 500)
  }

  // Toggle favorite with a small delay to allow animation to complete
  setTimeout(() => {
    toggleFavorite(item.title)
  }, 100)
}

