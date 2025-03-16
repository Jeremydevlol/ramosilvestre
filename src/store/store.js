import { create } from "zustand"

// Función para cargar el estado inicial desde localStorage
const loadFromStorage = () => {
  try {
    const storedState = localStorage.getItem("florist-storage")
    return storedState ? JSON.parse(storedState) : getDefaultState()
  } catch (error) {
    console.error("Error loading state from localStorage:", error)
    return getDefaultState()
  }
}

// Estado por defecto
const getDefaultState = () => ({
  cartItems: [],
  favorites: [],
  selectedItem: null,
  language: "es",
  isScrollEnabled: true,
})

// Función para guardar en localStorage
const saveToStorage = (state) => {
  try {
    localStorage.setItem("florist-storage", JSON.stringify(state))
  } catch (error) {
    console.error("Error saving state to localStorage:", error)
  }
}

// Crear el store
const useStore = create((set, get) => {
  // Cargar estado inicial
  const initialState = loadFromStorage()

  return {
    // Estado inicial
    ...initialState,

    // Set language
    setLanguage: (language) => {
      set((state) => {
        const newState = { ...state, language }
        saveToStorage(newState)
        return newState
      })
    },

    // Toggle scroll
    toggleScroll: () => {
      set((state) => {
        const newState = { ...state, isScrollEnabled: !state.isScrollEnabled }
        saveToStorage(newState)
        return newState
      })
    },

    // Set selected item
    setSelectedItem: (item) => {
      set((state) => {
        const newState = { ...state, selectedItem: item }
        saveToStorage(newState)
        return newState
      })
    },

    // Add to cart
    addToCart: (newItem) => {
      set((state) => {
        const existingItem = state.cartItems.find((item) => item.title === newItem.title)
        let newCartItems

        if (existingItem) {
          // If item exists, increment quantity
          newCartItems = state.cartItems.map((item) =>
            item.title === newItem.title ? { ...item, quantity: item.quantity + 1 } : item,
          )
        } else {
          // If item doesn't exist, add it with quantity 1
          newCartItems = [...state.cartItems, { ...newItem, quantity: 1 }]
        }

        const newState = { ...state, cartItems: newCartItems }
        saveToStorage(newState)
        return newState
      })
    },

    // Update quantity
    updateQuantity: (title, newQuantity) => {
      set((state) => {
        let newCartItems

        if (newQuantity <= 0) {
          // Remove item if quantity is zero or negative
          newCartItems = state.cartItems.filter((item) => item.title !== title)
        } else {
          // Update quantity
          newCartItems = state.cartItems.map((item) =>
            item.title === title ? { ...item, quantity: newQuantity } : item,
          )
        }

        const newState = { ...state, cartItems: newCartItems }
        saveToStorage(newState)
        return newState
      })
    },

    // Remove from cart
    removeFromCart: (title) => {
      set((state) => {
        const newCartItems = state.cartItems.filter((item) => item.title !== title)
        const newState = { ...state, cartItems: newCartItems }
        saveToStorage(newState)
        return newState
      })
    },

    // Toggle favorite
    toggleFavorite: (title) => {
      set((state) => {
        const isFavorite = state.favorites.includes(title)
        let newFavorites

        if (isFavorite) {
          newFavorites = state.favorites.filter((item) => item !== title)
        } else {
          newFavorites = [...state.favorites, title]
        }

        const newState = { ...state, favorites: newFavorites }
        saveToStorage(newState)
        return newState
      })
    },
  }
})

export default useStore

