import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {displayName: "Not Logged In "},
}

export const logUserSlice = createSlice({
  name: 'logUser',
  initialState,
  reducers: {

    logOut: (state, props) => {
      state.value = props.payload
    },
    logIn: (state, props) => {
     state.value = props.payload
    }
    
  }})

// Action creators are generated for each case reducer function
export const { logIn, logOut } = logUserSlice.actions

export default logUserSlice.reducer