import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      
      cartSlice.caseReducers.calculateTotal(state)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotal(state)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        } else {
          item.quantity = quantity
        }
      }
      
      cartSlice.caseReducers.calculateTotal(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer 