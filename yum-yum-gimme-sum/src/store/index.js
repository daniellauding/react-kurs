import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/store/cartSlice'
import orderReducer from '../features/order/store/orderSlice'
import menuReducer from '../features/menu/store/menuSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    menu: menuReducer,
  },
})

export default store 