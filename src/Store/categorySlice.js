import { createSlice } from '@reduxjs/toolkit'

const category = createSlice({
  name: 'category',
  initialState: {
    data: {},
    rawData: {},
  },
  reducers: {
    setCategory: (state, action) => {
      state.data = action.payload
    },
    clearCategory: (state, action) => {
      state.data = action.payload
    },
    setRawCatData: (state, action) => {
      state.rawData = action.payload
    },
  },
})

export const setCategory = category.actions.setCategory
export const clearCategory = category.actions.clearCategory
export const setRawCatData = category.actions.setRawCatData

export default category.reducer
