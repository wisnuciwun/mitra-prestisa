import { createSlice } from '@reduxjs/toolkit'

const registerSlice = createSlice({
  name: 'register',
  initialState: { isShowModal: false },
  reducers: {
    setShowModalRegisterSuccess: (state, action) => {
      state.isShowModal = action.payload
    },
  },
})

export const { setShowModalRegisterSuccess } = registerSlice.actions

export default registerSlice.reducer
