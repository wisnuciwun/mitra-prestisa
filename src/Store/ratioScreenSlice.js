import { createSlice } from '@reduxjs/toolkit'

const ratioScreenSlice = createSlice({
  name: 'ratioScreenSlice',
  initialState: { ratio: { isFit: false } },
  reducers: {
    setRatioScreen: (state, action) => {
      state.ratio = action.payload
    },
  },
})

export const setRatioScreen = ratioScreenSlice.actions.setRatioScreen

export default ratioScreenSlice.reducer
