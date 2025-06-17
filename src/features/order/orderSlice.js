import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/api'

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (cartItems, { rejectWithValue }) => {
    try {
      const orderDetails = await apiService.postOrder(cartItems)
      return orderDetails
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  lastOrder: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.lastOrder = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { resetOrderStatus } = orderSlice.actions
export default orderSlice.reducer 