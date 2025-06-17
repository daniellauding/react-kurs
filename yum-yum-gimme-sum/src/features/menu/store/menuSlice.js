import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../../services/api';

export const initializeTenant = createAsyncThunk(
  'menu/initializeTenant',
  async (tenantName, { rejectWithValue }) => {
    try {
      const result = await apiService.createTenant(tenantName);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      const menu = await apiService.getMenu();
      console.log('Menu data received:', menu);
      
      // Handle different possible response structures
      if (Array.isArray(menu)) {
        return menu;
      } else if (menu && Array.isArray(menu.items)) {
        return menu.items;
      } else if (menu && Array.isArray(menu.data)) {
        return menu.data;
      } else if (menu && menu.menu && Array.isArray(menu.menu)) {
        return menu.menu;
      }
      
      console.warn('Unexpected menu data structure:', menu);
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
    error: null,
    tenantInitialized: false,
    tenantName: ''
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMenu: (state) => {
      state.items = [];
      state.tenantInitialized = false;
      state.tenantName = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // initializeTenant cases
      .addCase(initializeTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenantInitialized = true;
        state.tenantName = action.meta.arg;
      })
      .addCase(initializeTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchMenu cases
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearMenu } = menuSlice.actions;
export default menuSlice.reducer; 