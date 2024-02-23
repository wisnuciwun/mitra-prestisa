import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
  name: 'tokenList',
  initialState: { fcm_token: undefined },
  reducers: {
    setFcmToken: (state, action) => {
      state.fcm_token = action.payload
    },

    removeToken: (state, action) => {
      state.fcm_token = undefined
    },
  },
})

export const { setFcmToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer
