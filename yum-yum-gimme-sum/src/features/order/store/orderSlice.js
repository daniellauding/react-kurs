import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiService } from '../../../services/api'

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const { customerInfo } = getState().order
      const orderPayload = {
        ...orderData,
        customerInfo
      }
      const response = await apiService.createOrder(orderPayload)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchOrderHistory = createAsyncThunk(
  'order/fetchOrderHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getOrders()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    orderHistory: [],
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    loading: false,
    error: null
  },
  reducers: {
    setCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // submitOrder cases
      .addCase(submitOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = {
          ...action.payload,
          timestamp: new Date().toISOString(),
          status: 'confirmed'
        }
        state.orderHistory.push(state.currentOrder)
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // fetchOrderHistory cases
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false
        state.orderHistory = action.payload
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { setCustomerInfo, clearCurrentOrder, clearError } = orderSlice.actions
export default orderSlice.reducer 