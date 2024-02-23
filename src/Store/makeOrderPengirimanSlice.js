import { createSlice } from '@reduxjs/toolkit'

const makeOrderPengiriman = createSlice({
  name: 'makeOrderPengiriman',
  initialState: {
    data: [
      {
        id_page: undefined,
        data_product: undefined,
        ucapan: undefined,
        pengiriman: undefined,
        penerima: undefined,
      },
    ],
  },
  reducers: {
    setMakeOrderPengiriman: (state, action) => {},
    clearMakeOrderPengiriman: (state, action) => {},
  },
})

export const { setMakeOrderPengiriman, clearMakeOrderPengiriman } =
  makeOrderPengiriman.actions

export default makeOrderPengiriman.reducer
