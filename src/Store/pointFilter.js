import { createSlice } from '@reduxjs/toolkit'

const pointFilter = createSlice({
  name: 'pointFilter',
  initialState: {
    masuk: { point_type: null, periode: null },
    keluar: { point_type: null, periode: null },
    semua: { point_type: null, periode: null },
  },
  reducers: {
    setPointFilterTypeMasuk: (state, action) => {
      state.masuk.point_type = action.payload
    },
    setPointFilterKeluar: (state, action) => {
      state.keluar.point_type = null
    },
    setPointFilterTypeSemua: (state, action) => {
      state.semua.point_type = action.payload
    },
    setPointFilterPeriodeMasuk: (state, action) => {
      state.masuk.periode = action.payload
    },
    setPointFilterPeriodeKeluar: (state, action) => {
      state.keluar.periode = action.payload
    },
    setPointFilterPeriodeSemua: (state, action) => {
      state.semua.periode = action.payload
    },
    clearPointFilterPeriodeMasuk: (state, action) => {
      state.masuk.periode = null
    },
    clearPointFilterPeriodeKeluar: (state, action) => {
      state.keluar.periode = null
    },
    clearPointFilterPeriodeSemua: (state, action) => {
      state.semua.periode = null
    },
  },
})

export const {
  setPointFilterTypeMasuk,
  setPointFilterPeriodeMasuk,
  setPointFilterKeluar,
  setPointFilterPeriodeKeluar,
  setPointFilterSemua,
  setPointFilterPeriodeSemua,
  clearPointFilterPeriodeMasuk,
  clearPointFilterPeriodeKeluar,
  clearPointFilterPeriodeSemua,
} = pointFilter.actions

export default pointFilter.reducer
