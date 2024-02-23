import { Config } from '@/Config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

let APIKit = axios.create({
  baseURL: Config.CUSTOMER_APP,
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
})

APIKit.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('@fcm_token')

    if (token) {
      // config.data['fbasekey'] = 'testvoucher'
      config.data['fbasekey'] = token
    }
    console.log('Config API : ', config.data)
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

const auth = {
  login: payload => APIKit.post('/auth/login', payload),
  checkStatus: () => APIKit.post('/auth/check-status'),
  updateSettingNotif: payload =>
    APIKit.post('/auth/update-setting-notif', payload),
  getSettingNotif: payload => APIKit.post('/auth/get-setting-notif', payload),
}

const account = {
  deleteSavedAddress: payload => APIKit.post('/delete-saved-address', payload),
  getSavedAddress: payload => APIKit.post('/get-saved-address', payload),
  vouchers: payload => APIKit.post('/vouchers', payload),
  historyEp: payload => APIKit.post('/history-ep', payload),
}

const order = {
  orderDetail: payload => APIKit.post('/order-detail', payload),
  reviewOrder: payload => APIKit.post('/review-order', payload),
}

const category = {
  catByLocId: params => APIKit.get('/categories?location_id=' + params),
}

const product = {
  recomendByLocId: (params, payload) =>
    APIKit.get('/products/recomendation?location_id=' + params, payload),
  noRevision: payload => APIKit.post('/no-revision', payload),
  addRevision: payload => APIKit.post('/product-revision', payload),
  previewProduct: payload => APIKit.post('/preview-product', payload),
  productRating: payload => APIKit.post('/product-rating', payload),
}

const bussiness = {
  // csInfo: () => API,
  requestPayment: payload => APIKit.post('/request-payment', payload),
}

export { APIKit, auth, account, order, category, product, bussiness }
