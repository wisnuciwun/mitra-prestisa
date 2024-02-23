import { createSlice } from '@reduxjs/toolkit'

const ringkasanPesanan = createSlice({
  name: 'ringkasanPesanan',
  initialState: {
    data: [
      {
        id_page: null,
        product_info: undefined,
        ucapan: undefined,
        penerima: undefined,
        pengiriman: undefined,
      },
    ],
    city_seller: undefined,
    navRoutes: [],
  },
  reducers: {
    setRingkasanPesanan: (state, action) => {
      state.data = action.payload
    },
    setCitySeller: (state, action) => {
      state.city_seller = action.payload
    },
    setNavRoutes: (state, action) => {
      state.navRoutes = action.payload
    },
    updateRingkasanPesanan: (state, action) => {
      state.data = action.payload
    },
    clearRingkasanPesanan: (state, action) => {
      state.data = [
        {
          id_page: null,
          product_info: undefined,
          ucapan: undefined,
          penerima: undefined,
          pengiriman: undefined,
        },
      ]
      state.city_seller = undefined
    },
    clearNavRoutes: (state, action) => {
      state.navRoutes = []
    },
    setDataPage: (state, action) => {
      state.data = action.payload
    },
    setProperty: (state, action) => {
      const index = state.data.findIndex(
        x => x.id_page == action.payload.id_page,
      )
      console.log('index: ', index)
      console.log('data index: ', state.data[index])
      state.data[index] = {
        ...state.data[index],
        ...{ id_page: index + 1, ...action.payload.property },
      }
    },
    setUcapan: (state, action) => {},
  },
})

export const {
  setRingkasanPesanan,
  updateRingkasanPesanan,
  clearRingkasanPesanan,
  setDataPage,
  setUcapan,
  clearUcapan,
  setProperty,
  setCitySeller,
  setNavRoutes,
  clearNavRoutes,
} = ringkasanPesanan.actions

export default ringkasanPesanan.reducer
