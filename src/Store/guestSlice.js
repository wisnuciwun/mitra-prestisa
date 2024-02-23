import { createSlice } from '@reduxjs/toolkit'

const guestSlice = createSlice({
  name: 'guestlist',
  initialState: { data: { isGuest: true } },
  reducers: {
    setGuest: (state, action) => {
      state.data = action.payload
    },
    deleteGuest: (state, action) => {
      state.data = action.payload
    },
  },
})

export const setGuest = guestSlice.actions.setGuest
export const deleteGuest = guestSlice.actions.deleteGuest

export default guestSlice.reducer
