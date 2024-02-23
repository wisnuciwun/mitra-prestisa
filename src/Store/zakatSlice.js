import { createSlice } from '@reduxjs/toolkit'

const zakatSlice = createSlice({
  name: 'zakatlist',
  initialState: { listZakat: [], reportZakat: [] },
  reducers: {
    setZakat: (state, action) => {
      console.log('set ZAkat')
      state.listZakat = action.payload
    },
    addZakat: (state, action) => {
      state.listZakat.unshift(action.payload)
      console.log('DIspatch Add Data: ', state)
    },
    deleteZakat: (state, action) => {
      const selected = state.listZakat.findIndex(obj => {
        console.log(action.payload, obj.id)
        return action.payload == obj.id
      })
      console.log('selected id: ', selected)
      state.listZakat.splice(selected, 1)
    },
    updateZakat: (state, action) => {
      var foundIndex = state.listZakat.findIndex(
        x => x.invoice == action.payload.invoice,
      )
      console.log('ditemukan :', foundIndex)
      console.log('sebelum :', state.listZakat[foundIndex])

      state.listZakat[foundIndex] = action.payload
      console.log('setelah :', state.listZakat[foundIndex])
    },
    setReport: (state, action) => {
      state.reportZakat = action.payload
    },
  },
})

export const setReport = zakatSlice.actions.setReport
export const setZakat = zakatSlice.actions.setZakat
export const addZakat = zakatSlice.actions.addZakat
export const deleteZakat = zakatSlice.actions.deleteZakat
export const updateZakat = zakatSlice.actions.updateZakat
export default zakatSlice.reducer
