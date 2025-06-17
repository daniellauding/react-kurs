import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentOrder: null,
  customerInfo: {
    name: '',
    email: '',
    phone: '',
    address: ''
  },
  orderHistory: [],
  orderStatus: 'idle', // idle, preparing, ready, delivered
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload }
    },
    createOrder: (state, action) => {
      const orderId = Date.now().toString()
      const newOrder = {
        id: orderId,
        items: action.payload.items,
        total: action.payload.total,
        customerInfo: state.customerInfo,
        timestamp: new Date().toISOString(),
        status: 'preparing'
      }
      
      state.currentOrder = newOrder
      state.orderHistory.push(newOrder)
      state.orderStatus = 'preparing'
    },
    updateOrderStatus: (state, action) => {
      if (state.currentOrder) {
        state.currentOrder.status = action.payload
        state.orderStatus = action.payload
        
        // Update in order history as well
        const orderInHistory = state.orderHistory.find(order => order.id === state.currentOrder.id)
        if (orderInHistory) {
          orderInHistory.status = action.payload
        }
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
      state.orderStatus = 'idle'
    },
    resetCustomerInfo: (state) => {
      state.customerInfo = {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
})

export const { 
  setCustomerInfo, 
  createOrder, 
  updateOrderStatus, 
  clearCurrentOrder, 
  resetCustomerInfo 
} = orderSlice.actions

export default orderSlice.reducer 