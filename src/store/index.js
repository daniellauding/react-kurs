import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '@/features/menu/menuSlice'
import cartReducer from '@/features/cart/cartSlice'
import orderReducer from '@/features/order/orderSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
}) 