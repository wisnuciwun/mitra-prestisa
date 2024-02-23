import { numberWithCommas } from '@/Helper'
import { isSameDay, eachDayOfInterval } from 'date-fns'
import _, { isNull } from 'lodash'
import moment from 'moment'

const data_point_category = [
  { id: 1, name: 'masuk', id: 2, name: 'keluar', id: '3', name: 'semua' },
]

export const remapHistoryPoints = (data = Array) => {
  return data.map((e, i) => {
    switch (e.point_type_id) {
      case 1:
        return {
          ...e,
          is_redeemed: false,
          color_status: '#3C515C',
          status_color_text: /berhasil/.test(e.status) ? '#4C4DDC' : '#CB3A31',
          status_color_bg: /berhasil/.test(e.status) ? '#F5F5FF' : '#FFF4F2',
          point_info: '#' + e.order_id,
        }
      case 2:
        return {
          ...e,
          is_redeemed: false,
          color_status: '#6D4355',
          status_color_text: /berhasil/.test(e.status) ? '#4C4DDC' : '#CB3A31',
          status_color_bg: /berhasil/.test(e.status) ? '#F5F5FF' : '#FFF4F2',
          point_info: e.downline_name,
        }
      default:
        return {
          ...e,
          is_redeemed: true,
          color_status: '#3374D7',
          status_color_text: /berhasil/.test(e.status) ? '#4C4DDC' : '#CB3A31',
          status_color_bg: /berhasil/.test(e.status) ? '#F5F5FF' : '#FFF4F2',
          point_info: e.tukar_info,
          point_amount: /gagal/.test(e.status) ? 0 : e.point_amount,
        }
    }
  })
}

export const remapModalBottomDetailPoint = (data = Array) => {
  data.map((e, i) => {
    console.log('DATA', e.point_type_id)
    switch (e.point_type_id) {
      case 1:
        return {
          ...e,
          title: 'Cashback Pembelian',
          isNavTo: true,
          isExpensePoint: false,
          footer_text:
            (e.detail_info.length > 1 && 'Total') + ' CashBack Points',
          list_right: 'x' + e.detail_info.qty,
        }
      case 2:
        return {
          ...e,
          title: 'Cashback Member',
          isNavTo: false,
          isExpensePoint: false,
          footer_text: 'Cashback Point Member',
          list_right:
            'Pembelanjaan Rp' + numberWithCommas(e.detail_info.pembelanjaan),
        }
      default:
        return {
          ...e,
          title: e.point_name,
          isExpensePoint: true,
          footer_text: 'Penggunaan Points',
        }
    }
  })
}

export const reMapFilterTypePoint = data => {
  return data.map((e, i) => {
    return {
      ...e,
      selected: false,
    }
  })
}

export const reMapPointCategory = (data = data_point_category) => {
  return data.map((e, i) => {
    return {
      ...e,
      selected: false,
    }
  })
}

export const reMapFilterPeriode = data => {
  return data.map((e, i) => {
    return {
      ...e,
      selected: false,
    }
  })
}

export const isRangeDatePeriode = (
  start = Date,
  end = Date,
  datetime = Date,
) => {
  if (!isNull(start) && !isNull(end)) {
    const _daysArr = eachDayOfInterval({
      start: start,
      end: end,
    })
    // console.log('AR', _daysArr)
    const _new = _.filter(_daysArr, o => isSameDay(o, datetime) && o)
    return _new.length == 1 ? true : false
  }
}

export const addIsRedemeed = (data = Array) => {
  return data.map((e, i) => {
    switch (e.point_type_id) {
      case 1:
        return {
          ...e,
          is_redeemed: false,
        }
      case 2:
        return {
          ...e,
          is_redeemed: false,
        }
      default:
        return {
          ...e,
          is_redeemed: true,
        }
    }
  })
}
