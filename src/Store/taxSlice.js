import { createSlice } from '@reduxjs/toolkit'

const taxSlice = createSlice({
  name: 'tax',
  initialState: { data: {} },
  reducers: {
    setTax: (state, action) => {
      state.data = action.payload
    },

    removeTax: state => {
      state.data = {}
    },
  },
})

export const { setTax, removeTax } = taxSlice.actions

export default taxSlice.reducer
