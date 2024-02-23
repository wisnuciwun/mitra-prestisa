import { createSlice } from '@reduxjs/toolkit'

const forgetPassword = createSlice({
  name: 'forgetPasswordList',
  initialState: { forgetPassword: {} },
  reducers: {
    setForgetPassword: (state, action) => {
      state.forgetPassword = action.payload
    },

    updateForgetPassword: (state, action) => {
      console.log('STATE_2: ', state)
      console.log('ACTION_2:', action)
    },
  },
})

export const setForgetPassword = forgetPassword.actions.setForgetPassword
export const updateForgetPassword = forgetPassword.actions.updateForgetPassword

export default forgetPassword.reducer
