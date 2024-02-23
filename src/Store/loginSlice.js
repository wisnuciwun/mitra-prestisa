import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'loginlist',
  initialState: { data: {}, autofill: {} },
  reducers: {
    setLogin: (state, action) => {
      state.data = action.payload
    },

    setAutoFill: (state, action) => {
      state.autofill = action.payload
    },

    removeLogin: (state, action) => {
      state.data = { user: { full_name: '', avatar_image: '' } }
    },
    EnableEPStatus: (state, action) => {
      state.data.user.ep_status = 1
    },
  },
})

export const { setLogin, setAutoFill, removeLogin, EnableEPStatus } =
  loginSlice.actions

export default loginSlice.reducer
