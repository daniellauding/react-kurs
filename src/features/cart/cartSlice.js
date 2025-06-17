import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // Will store objects like { id, title, price, quantity }
  lastReceiptItems: [], // To store the items for the receipt
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload
      const existingItem = state.items.find((i) => i.id === item.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      const idToRemove = action.payload
      const existingItem = state.items.find((i) => i.id === idToRemove)

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== idToRemove)
      } else {
        existingItem.quantity--
      }
    },
    clearCart: (state) => {
      // Before clearing the cart, save its state for the receipt
      state.lastReceiptItems = state.items
      state.items = []
    },
  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer 