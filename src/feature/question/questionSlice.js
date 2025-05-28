import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  question: {
   
  },
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateQuestion: (state, action) => {
      state.question = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer