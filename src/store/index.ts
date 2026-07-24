import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import Reactotron from '../../reactotronConfig.cjs'
import authReducer from './features/auth/auth.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',

  enhancers: (getDefaultEnhancers) => {
    if (__DEV__) {
      return getDefaultEnhancers().concat(Reactotron.createEnhancer!())
    }
    return getDefaultEnhancers()
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
