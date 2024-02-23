import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const savedAddressSlice = createSlice({
  name: 'savedAddress',
  initialState: { data: [], default: null },
  reducers: {
    setSavedAddress: (state, action) => {
      state.data = action.payload
    },
    setDefaultAddress: (state, action) => {
      state.default = action.payload
    },
    updateSavedAddress: (state, action) => {
      const index = _.findIndex(
        state.data,
        e => e.id === action.payload.parent_data.id,
      )

      if (index == -1) {
        state.data = [
          ...state.data,
          { ...action.payload.parent_data, data: [action.payload.child_data] },
        ]
      } else {
        state.data[index] = {
          ...state.data[index],
          data: [...state.data[index].data, action.payload.child_data],
        }
      }
    },
    clearSavedAddress: (state, action) => {
      state.data = []
    },
    clearDefaultAddress: (state, action) => {
      state.default = null
    },
  },
})

export const {
  setSavedAddress,
  setDefaultAddress,
  updateSavedAddress,
  clearSavedAddress,
  clearDefaultAddress,
} = savedAddressSlice.actions

export default savedAddressSlice.reducer
