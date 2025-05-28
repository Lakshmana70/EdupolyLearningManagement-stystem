import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { technologyApi } from '../services/technology'


export const store = configureStore({
  reducer: {
    [technologyApi.reducerPath] : technologyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(technologyApi.middleware),
})

setupListeners(store.dispatch)
