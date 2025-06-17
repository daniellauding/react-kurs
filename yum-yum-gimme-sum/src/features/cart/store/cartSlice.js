import { createSlice } from '@reduxjs/toolkit'

// localStorage helpers
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('yum-cart')
    if (serializedCart === null) {
      return { items: [], total: 0 }
    }
    return JSON.parse(serializedCart)
  } catch (error) {
    console.warn('Could not load cart from localStorage:', error)
    return { items: [], total: 0 }
  }
}

const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem('yum-cart', JSON.stringify(cartState))
  } catch (error) {
    console.warn('Could not save cart to localStorage:', error)
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        })
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      // Save to localStorage
      saveCartToStorage(state)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      // Save to localStorage
      saveCartToStorage(state)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        const item = state.items.find(item => item.id === id)
        if (item) {
          item.quantity = quantity
        }
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      // Save to localStorage
      saveCartToStorage(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      
      // Save to localStorage
      saveCartToStorage(state)
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer 