import { create } from "zustand"
import { persist } from "zustand/middleware"

const useStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      favorites: [],
      selectedItem: null,
      language: "es",
      isScrollEnabled: true,

      // Set language
      setLanguage: (language) => set({ language }),

      // Toggle scroll
      toggleScroll: () => set((state) => ({ isScrollEnabled: !state.isScrollEnabled })),

      // Set selected item
      setSelectedItem: (item) => set({ selectedItem: item }),

      // Add to cart
      addToCart: (newItem) => {
        const { cartItems } = get()
        const existingItem = cartItems.find((item) => item.title === newItem.title)

        if (existingItem) {
          // If item exists, increment quantity
          const updatedItems = cartItems.map((item) =>
            item.title === newItem.title ? { ...item, quantity: item.quantity + 1 } : item,
          )
          set({ cartItems: updatedItems })
        } else {
          // If item doesn't exist, add it with quantity 1
          // Asegurarse de que la imagen se incluya correctamente
          set({ cartItems: [...cartItems, { ...newItem, quantity: 1 }] })
        }
      },

      // Update quantity
      updateQuantity: (title, newQuantity) => {
        const { cartItems } = get()

        if (newQuantity <= 0) {
          // Remove item if quantity is zero or negative
          set({ cartItems: cartItems.filter((item) => item.title !== title) })
        } else {
          // Update quantity
          const updatedItems = cartItems.map((item) =>
            item.title === title ? { ...item, quantity: newQuantity } : item,
          )
          set({ cartItems: updatedItems })
        }
      },

      // Remove from cart
      removeFromCart: (title) => {
        const { cartItems } = get()
        set({ cartItems: cartItems.filter((item) => item.title !== title) })
      },

      // Toggle favorite
      toggleFavorite: (title) => {
        const { favorites } = get()
        const isFavorite = favorites.includes(title)

        if (isFavorite) {
          set({ favorites: favorites.filter((item) => item !== title) })
        } else {
          set({ favorites: [...favorites, title] })
        }
      },
    }),
    {
      name: "florist-storage",
    },
  ),
)

export default useStore

