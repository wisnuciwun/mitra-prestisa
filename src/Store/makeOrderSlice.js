import { createSlice } from '@reduxjs/toolkit'

const makeOrder = createSlice({
  name: 'makeOrder',
  initialState: {
    data: [
      {
        id_page: '',
        data_product: {},
        ucapan: {},
        penerima: {},
        pengiriman: {},
      },
    ],
  },
  reducers: {
    setDataPage: (state, action) => {
      state.data = action.payload
    },
    setUcapan: (state, action) => {
      const index = state.data.findIndex(
        x => (x.id_page = action.payload.id_page),
      )

      if (index != undefined) {
        state.data[index].ucapan = action.payload.data_ucapan
      } else {
      }
    },
    clearUcapan: (state, action) => {
      state.data[index].ucapan = ''
    },
  },
})

export const { setUcapan, clearUcapan, setDataPage } = makeOrder.actions

export default makeOrder.reducer
