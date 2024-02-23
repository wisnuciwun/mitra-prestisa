import { createSlice, current } from '@reduxjs/toolkit'

const cart = createSlice({
  name: 'cart',
  initialState: { data: [], voucher: [] },
  reducers: {
    setCart: (state, action) => {
      // console.log(action)
      state.data = action.payload
    },
    clearCart: (state, action) => {
      state = action.payload
    },
    selectCart: (state, action) => {
      const xxxx = { city: 123123, id_prod: 123 }
      var idcity = state.data.findIndex(
        x => x.location_id == action.payload.city,
      )
      const idx = state.data[idcity].cart_items.findIndex(
        x => x.id == action.payload.id_prod,
      )
      state.data[idcity].cart_items[idx] = {
        ...state.data[idcity].cart_items[idx],
        selected: true,
      }
    },
    unselectCart: (state, action) => {
      const xxxx = { city: 123123, id_prod: 123 }
      var idcity = state.data.findIndex(
        x => x.location_id == action.payload.city,
      )

      const idx = state.data[idcity].cart_items.findIndex(
        x => x.id == action.payload.id_prod,
      )

      state.data[idcity].cart_items[idx] = {
        ...state.data[idcity].cart_items[idx],
        selected: false,
      }
    },

    decreaseCounterCart: (state, action) => {
      const xxxx = { city: 123123, id_prod: 123 }
      var idcity = state.data.findIndex(
        x => x.location_id == action.payload.city,
      )

      const idx = state.data[idcity].cart_items.findIndex(
        x => x.id == action.payload.id_prod,
      )

      state.data[idcity].cart_items[idx] = {
        ...state.data[idcity].cart_items[idx],
        counter:
          state.data[idcity].cart_items[idx].counter > 1
            ? state.data[idcity].cart_items[idx].counter - 1
            : 1,
      }
      console.log(state.data[idcity].cart_items[idx].counter)
      // console.log(state.data)
    },
    increaseCounterCart: (state, action) => {
      const xxxx = { city: 123123, id_prod: 123 }
      var idcity = state.data.findIndex(
        x => x.location_id == action.payload.city,
      )

      const idx = state.data[idcity].cart_items.findIndex(
        x => x.id == action.payload.id_prod,
      )

      state.data[idcity].cart_items[idx] = {
        ...state.data[idcity].cart_items[idx],
        counter: state.data[idcity].cart_items[idx].counter + 1,
      }
      console.log(state.data[idcity].cart_items[idx].counter)
      // console.log(state.data)
    },
    setCatatanCart: (state, action) => {
      const xxxx = { city: 123123, id_prod: 123 }
      var idcity = state.data.findIndex(
        x => x.location_id == action.payload.city,
      )

      const idx = state.data[idcity].cart_items.findIndex(
        x => x.id == action.payload.id_prod,
      )

      state.data[idcity].cart_items[idx] = {
        ...state.data[idcity].cart_items[idx],
        notes: action.payload.catatan,
      }
      console.log('dispacth simpan catatan: ', action.payload.catatan)
    },
    deleteCart: (state, action) => {
      console.log(action.payload)
      const xxxx = { city: 123123, id_prod: 123 }
      var idcity = state.data.findIndex(
        x => x.location_id == action.payload.city,
      )

      const idx = state.data[idcity].cart_items.findIndex(
        x => x.id == action.payload.id_prod,
      )
      console.log('idx: ', idx)

      state.data[idcity].cart_items.splice(idx, 1)
    },

    addCart: (state, action) => {
      const city = action.payload.city
      const data = {
        ...action.payload.data,
        ...{ counter: 1, notes: '', selected: false },
      }

      let xxkota = 0
      let xxprod = 0
      console.log(state.data.length)
      if (state.data.length > 0) {
        const cari = state.data.find(x => city.id == x.location_id)
        if (cari != undefined) {
          const cariprod = cari.cart_items.find(x => x.id == data.id)
          console.log('cariprod', cariprod)
          if (cariprod != undefined) {
            state.data
              .find(x => city.id == x.location_id)
              .cart_items.find(x => x.id == data.id).counter += 1
          } else {
            state.data
              .find(x => city.id == x.location_id)
              .cart_items.unshift(data)
          }
        } else {
          const cdata = {
            location_id: `${city.id}`,
            city: city.city,
            cart_items: [data],
          }
          console.log('buat baru dalem')
          state.data = [...state.data, cdata]
        }
      } else {
        const cdata = {
          location_id: `${city.id}`,
          city: city.city,
          cart_items: [data],
        }
        console.log('buat baru karena kosong')
        state.data = [...state.data, cdata]
      }
      // .cart_items.find(x => {
      //   return x.id.toString() == data.id.toString()
      // })

      // console.log(cari.location_id)

      //   state.data.map((item, index) => {
      //     item.cart_items.map((it, ind) => {
      //       if (city.id.toString() == item.location_id.toString()) {
      //         if (it.id.toString() == data.id.toString()) {
      //           xxprod += 1

      //           state.data[index].cart_items[ind] = {
      //             ...state.data[index].cart_items[ind],
      //             counter: state.data[index].cart_items[ind].counter + 1,
      //           }
      //         } else {
      //           let cari = 0

      //           state.data[index].cart_items.map((item, i) => {
      //             if (item.id == state.data[index].cart_items[i].id) {
      //               cari += 1
      //             }
      //           })

      //           if (cari == 0) {
      //             console.log(cari.data[index].cart_items)
      //           }
      //         }
      //       }
      //     })
      //   })

      //   if (xxprod == 0 && xxkota == 0) {
      //     const cdata = {
      //       location_id: `${city.id}`,
      //       city: city.city,
      //       cart_items: [data],
      //     }
      //     console.log('buat baru')
      //     state.data = [...state.data, cdata]
      //   }
    },

    setVoucher: (state, action) => {
      state.voucher = action.payload
    },
  },
})

export const setCart = cart.actions.setCart
export const clearCart = cart.actions.clearCart
export const selectCart = cart.actions.selectCart
export const unselectCart = cart.actions.unselectCart
export const decreaseCounterCart = cart.actions.decreaseCounterCart
export const increaseCounterCart = cart.actions.increaseCounterCart
export const setCatatanCart = cart.actions.setCatatanCart
export const deleteCart = cart.actions.deleteCart
export const addCart = cart.actions.addCart
export const setVoucher = cart.actions.setVoucher

export default cart.reducer
