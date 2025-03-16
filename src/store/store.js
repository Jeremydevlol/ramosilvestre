import { create } from "zustand"

// Estado por defecto
const defaultState = {
  cartItems: [],
  favorites: [],
  selectedItem: null,
  language: "es",
  isScrollEnabled: true,
}

// Crear el store con valores por defecto
const useStore = create((set) => ({
  // Estado inicial con valores por defecto
  ...defaultState,

  // Set language
  setLanguage: (language) => {
    set({ language })
    try {
      const currentState = useStore.getState()
      localStorage.setItem(
        "florist-storage",
        JSON.stringify({
          ...currentState,
          language,
        }),
      )
    } catch (error) {
      console.error("Error saving language to localStorage:", error)
    }
  },

  // Toggle scroll
  toggleScroll: () => {
    set((state) => {
      const newValue = !state.isScrollEnabled
      try {
        const currentState = useStore.getState()
        localStorage.setItem(
          "florist-storage",
          JSON.stringify({
            ...currentState,
            isScrollEnabled: newValue,
          }),
        )
      } catch (error) {
        console.error("Error saving scroll state to localStorage:", error)
      }
      return { isScrollEnabled: newValue }
    })
  },

  // Set selected item
  setSelectedItem: (item) => {
    set({ selectedItem: item })
    try {
      const currentState = useStore.getState()
      localStorage.setItem(
        "florist-storage",
        JSON.stringify({
          ...currentState,
          selectedItem: item,
        }),
      )
    } catch (error) {
      console.error("Error saving selected item to localStorage:", error)
    }
  },

  // Add to cart
  addToCart: (newItem) => {
    set((state) => {
      const existingItem = state.cartItems?.find((item) => item.title === newItem.title)
      let newCartItems

      if (existingItem) {
        // If item exists, increment quantity
        newCartItems = state.cartItems.map((item) =>
          item.title === newItem.title ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
        )
      } else {
        // If item doesn't exist, add it with quantity 1
        newCartItems = [...(state.cartItems || []), { ...newItem, quantity: 1 }]
      }

      try {
        const currentState = useStore.getState()
        localStorage.setItem(
          "florist-storage",
          JSON.stringify({
            ...currentState,
            cartItems: newCartItems,
          }),
        )
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }

      return { cartItems: newCartItems }
    })
  },

  // Update quantity
  updateQuantity: (title, newQuantity) => {
    set((state) => {
      if (!state.cartItems) return { cartItems: [] }

      let newCartItems
      if (newQuantity <= 0) {
        // Remove item if quantity is zero or negative
        newCartItems = state.cartItems.filter((item) => item.title !== title)
      } else {
        // Update quantity
        newCartItems = state.cartItems.map((item) => (item.title === title ? { ...item, quantity: newQuantity } : item))
      }

      try {
        const currentState = useStore.getState()
        localStorage.setItem(
          "florist-storage",
          JSON.stringify({
            ...currentState,
            cartItems: newCartItems,
          }),
        )
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }

      return { cartItems: newCartItems }
    })
  },

  // Remove from cart
  removeFromCart: (title) => {
    set((state) => {
      if (!state.cartItems) return { cartItems: [] }

      const newCartItems = state.cartItems.filter((item) => item.title !== title)

      try {
        const currentState = useStore.getState()
        localStorage.setItem(
          "florist-storage",
          JSON.stringify({
            ...currentState,
            cartItems: newCartItems,
          }),
        )
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }

      return { cartItems: newCartItems }
    })
  },

  // Toggle favorite
  toggleFavorite: (title) => {
    set((state) => {
      if (!state.favorites) return { favorites: [title] }

      const isFavorite = state.favorites.includes(title)
      let newFavorites

      if (isFavorite) {
        newFavorites = state.favorites.filter((item) => item !== title)
      } else {
        newFavorites = [...state.favorites, title]
      }

      try {
        const currentState = useStore.getState()
        localStorage.setItem(
          "florist-storage",
          JSON.stringify({
            ...currentState,
            favorites: newFavorites,
          }),
        )
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error)
      }

      return { favorites: newFavorites }
    })
  },
}))

// Cargar estado desde localStorage al iniciar
try {
  const savedState = localStorage.getItem("florist-storage")
  if (savedState) {
    const parsedState = JSON.parse(savedState)
    // Establecer el estado inicial con los valores guardados
    Object.keys(parsedState).forEach((key) => {
      useStore.setState({ [key]: parsedState[key] })
    })
  }
} catch (error) {
  console.error("Error loading state from localStorage:", error)
}

export default useStore

