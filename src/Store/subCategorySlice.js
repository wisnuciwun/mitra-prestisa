import { createSlice } from '@reduxjs/toolkit'

const subCategory = createSlice({
  name: 'subCategory',
  initialState: {
    data: { showFirstSubCategory: false, showSecondSubCategory: false },
  },
  reducers: {
    setSubCategory: (state, action) => {
      state.data = action.payload
    },
    clearSubCategory: (state, action) => {
      state.data = action.payload
    },
  },
})

export const setSubCategory = subCategory.actions.setSubCategory
export const clearSubCategory = subCategory.actions.clearSubCategory

export default subCategory.reducer
