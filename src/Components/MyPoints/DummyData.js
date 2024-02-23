/**
 *
 * point_type:
 *      { "name":"Cashback Pembelian", "type":"cashback-pembelian", "id":"1"}
 *      { "name":"Cashback Member", "type":"cashback-member", "id":"2"}
 *      { "name":"Penukaran voucher",
 *        "type":"tukar-voucher",
 *        "id":"3", //parent
 *        "child":[
 *              {  "name": "Penukaran Voucher Gopay", "id":4, "type":"tukar-voucher-gopay"},
 *              {  "name": "Penukaran Voucher Merchant", "id":5, "type":"tukar-voucher-merchant"},
 *              {  "name": "Penukaran Voucher Listrik", "id":6, "type":"tukar-voucher-listrik"}
 *              ]
 *      }
 *
 * status_point:
 *      {"status":"berhasil", "id":"1"}
 *      {"status":"gagak", "id":"2"}
 *      {"status":"proses", "id":"3"}
 *
 * point_type: tukar voucher (keluar)
 *      - voucher gopay
 *      - voucher merchant
 *      - voucher listrik
 *
 *
 *
 *
 */

import { add, eachDayOfInterval } from 'date-fns'
import { toArray, uniqueId } from 'lodash'
import moment from 'moment'

export const my_points = [
  {
    id: 1,
    date: '2022-02-22', //created_at
    point_type: 'cashback-pembelian',
    point_name: 'Cashback pembelian',
    point_id: 1,
    point_ammounts: 120000,
    status: 'berhasil',
    is_redeemed: false,
    order_id: 111121,
    //
    //digrouping biar memahaminya enak
    detail_info: [
      {
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
    ],
  },
  {
    id: 2,
    date: '2022-02-22', //created_at
    point_type: 'cashback-member',
    point_name: 'Cashback Member',
    point_id: 2,
    point_ammounts: 120000,
    status: 'berhasil',
    is_redeemed: false,
    downline_name: 'mr.sucat',
    detail_info: {
      pembelanjaan: 999999999,
      layer: 2,
    },
  },
  {
    id: 3,
    date: '2022-02-22', //created_at
    point_type: 'cashback-member',
    point_name: 'Cashback Member',
    point_id: 2,
    point_ammounts: 120000,
    status: 'berhasil',
    is_redeemed: false,
    downline_name: 'mr.wahyuhamburger',
    detail_info: {
      pembelanjaan: 999999999,
      layer: 3,
    },
  },
  {
    id: 4,
    date: '2022-02-22', //created_at
    point_type: 'cashback-pembelian',
    point_name: 'Cashback pembelian',
    point_id: 1,
    point_ammounts: 120000,
    status: 'berhasil',
    is_redeemed: false,
    order_id: 111127,
    detail_info: [
      {
        product_id: 11,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 12,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 13,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 14,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 15,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 16,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 17,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 18,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 19,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
      {
        product_id: 20,
        product_name: 'Yellow Bouquet -1',
        total_price: 999999999,
        qty: 999,
        product_img:
          'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
      },
    ],
  },
  {
    id: 5,
    date: '2022-02-22', //created_at
    point_type: 'cashback-member',
    point_name: 'Cashback Member',
    point_id: 2,
    point_ammounts: 120000,
    status: 'berhasil',
    is_redeemed: false,
    downline_name: 'mrs.niscap',
    detail_info: {
      pembelanjaan: 999999999,
      layer: 2,
    },
  },
  {
    id: 6,
    date: '2022-02-22', //created_at atau penggunaan voucher
    point_type: 'tukar-voucher-gopay',
    point_name: 'Penukaran Voucher Gopay',
    point_id: 3,
    point_ammounts: 120000,
    status: 'gagal',
    is_redeemed: true,
    tukar_info: 'Gopay 999.999.999',
    order_id: 111123,
    detail_info: {
      voucher_point_expense_name: 'Penukaran Voucher Gopay',
      voucher_point_expense_info: 'Rp10.000',
      voucher_point_expense_id: 1,
      voucher_point_expese_category: 'prestisa reward',
      voucher_point_expese_category_id: 1,
    },
  },
  {
    id: 7,
    date: '2022-02-22', //created_at atau penggunaan voucher
    point_type: 'tukar-voucher-merchant',
    point_name: 'Penukaran Voucher Merchant',
    point_id: 4,
    point_ammounts: 120000,
    status: 'gagal',
    is_redeemed: true,
    tukar_info: "It's Not Monday",
    order_id: 111124,
    detail_info: {
      voucher_point_expense_name: "It's Not Monday",
      voucher_point_expense_info: 'Potongan Rp999.000',
      voucher_point_expense_id: 3,
      voucher_point_expese_category: 'merchant',
      voucher_point_expese_category_id: 2,
    },
  },
  {
    id: 8,
    date: '2022-02-22', //created_at atau penggunaan voucher
    point_type: 'tukar-voucher-listrik',
    point_name: 'Penukaran Voucher Listrik',
    point_id: 5,
    point_ammounts: 120000,
    status: 'gagal',
    is_redeemed: true,
    tukar_info: 'No. Meter 992832439xxxxxxxx',
    order_id: 111125,
    detail_info: {
      voucher_point_expense_name: 'Voucher Token Listrik',
      voucher_point_expense_info: 'Rp888.000',
      voucher_point_expense_id: 2,
      voucher_point_expese_category: 'prestisa reward',
      voucher_point_expese_category_id: 1,
    },
  },
  {
    id: 9,
    date: '2022-02-22', //created_at atau penggunaan voucher
    point_type: 'tukar-voucher-listrik',
    point_name: 'Penukaran Voucher Listrik',
    point_id: 5,
    point_ammounts: 120000,
    status: 'berhasil',
    is_redeemed: true,
    tukar_info: 'No. Meter 99999439xxxxxxxx',
    order_id: 111129,
    detail_info: {
      voucher_point_expense_name: 'Voucher Token Listrik',
      voucher_point_expense_info: 'Rp999.000',
      voucher_point_expense_id: 1,
      voucher_point_expese_category: 'prestisa reward',
      voucher_point_expese_category_id: 1,
    },
  },
]

export const data_filter_type_point = [
  { id: 1, name: 'Cashback Pembelian', slug: 'cashback-pembelian' },
  { id: 2, name: 'Cashback Member', slug: 'cashback-member' },
  { id: 3, name: 'Penukaran Voucher', slug: 'penukaran-voucher' },
]

const today = new Date()
const last7 = eachDayOfInterval({
  start: add(today, { days: 0 }),
  end: add(today, { days: 7 }),
})

const last30 = eachDayOfInterval({
  start: add(today, { days: 0 }),
  end: add(today, { days: 30 }),
})

export const data_filter_periode = [
  { id: 1, name: '7 hari terakhir', data: last7.map((e, i) => `${e}`) },
  { id: 2, name: '30 hari terakhir', data: last30.map((e, i) => `${e}`) },
  { id: 3, name: 'Pilih tanggal', data: [] },
]

export const data_filter_periode_raw = [
  { id: 1, name: '7 hari terakhir' },
  { id: 2, name: '30 hari terakhir' },
  { id: 3, name: 'Pilih tanggal' },
]
