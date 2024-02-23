import { createSlice } from '@reduxjs/toolkit'

const location = createSlice({
  name: 'location',
  initialState: {
    shipping_address: { data: {}, isLoading: false },
    pin_point_map: {},
    is_location_first: false,
  },
  reducers: {
    setShippingAddress: (state, action) => {
      state.shipping_address.data = action.payload.data
      state.shipping_address.isLoading = action.payload.isLoading
    },
    removeShippingAddress: (state, action) => {
      state.shipping_address = {}
    },
    setPinPointMap: (state, action) => {
      state.shipping_address = action.payload
    },
    removePinPointMap: (state, action) => {
      state.pin_point_map = {}
    },
    setLocationFirst: (state, action) => {
      state.is_location_first = action.payload
    },
  },
})

export const setShippingAddress = location.actions.setShippingAddress
export const removeShippingAddress = location.actions.removeShippingAddress
export const setPinPointMap = location.actions.setPinPointMap
export const removePinPointMap = location.actions.removePinPointMap
export const setLocationFirst = location.actions.setLocationFirst

export default location.reducer
