import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from '../features/authSlice.js'

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
})
