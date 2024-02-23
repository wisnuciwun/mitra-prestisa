import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { api } from '@/Services/api'
import theme from './Theme'
import zakat from './zakatSlice'
import login from './loginSlice'
import forgetPassword from './forgetPasswordSlice'
import ratioScreen from './ratioScreenSlice'
import guest from './guestSlice'
import subCategory from './subCategorySlice'
import category from './categorySlice'
import location from './location'
import makeOrder from './makeOrderSlice'
import cart from './cartSlice'
import statusUser from './statusUserSlice'
import makeOrderPengiriman from './makeOrderPengirimanSlice'
import ringkasanPesanan from './ringkasanPesananSlice'
import savedAddress from './savedAddressSlice'
import pointFilter from './pointFilter'
import tokenList from './tokenSlice'
import registerSlice from './registerSlice'
import taxSlice from './taxSlice'

const reducers = combineReducers({
  theme,
  api: api.reducer,
  cart,
  login: login,
  forgetPassword: forgetPassword,
  ratioScreen: ratioScreen,
  guest: guest,
  category: category,
  subCategory: subCategory,
  location: location,
  statusUser: statusUser,
  makeOrder: makeOrder,
  makeOrderPengiriman: makeOrderPengiriman,
  ringkasanPesanan: ringkasanPesanan,
  savedAddress: savedAddress,
  pointFilter: pointFilter,
  tokenList: tokenList,
  register: registerSlice,
  tax: taxSlice,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'theme',
    'login',
    // 'zakat',
    'forgetPassword',
    'ratioScreen',
    'guest',
    'category',
    'subCategory',
    'location',
    'cart',
    'statusUser',
    'makeOrder',
    'makeOrderPengiriman',
    'ringkasanPesanan',
    'savedAddress',
    'pointFilter',
    'tokenList',
    'register',
    'tax',
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      // const { logger } = require('redux-logger')
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
