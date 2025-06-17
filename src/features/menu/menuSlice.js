import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '@/services/api'

// This is the thunk that will fetch the menu data asynchronously
export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const menu = await apiService.getMenu()
  return menu
})

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add the fetched menu items to the state
        state.items = action.payload
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default menuSlice.reducer 