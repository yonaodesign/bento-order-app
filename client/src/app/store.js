import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import logUserReducer from '../features/logUser/logUserSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    logUser: logUserReducer,
  },
})