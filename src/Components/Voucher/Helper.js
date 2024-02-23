import { numberWithCommas } from '@/Helper'
import _ from 'lodash'

export const manipulate = async (data, _index) => {
  let newData = await data.map((item, index) => ({
    ...item,
    isActive: false,
  }))

  const _newData =
    (await selectedIndexDiscount) === _index &&
    newData.map((item, index) =>
      _index === index ? { ...item, isActive: true } : item,
    )

  return _newData
}

export const summaryData = _data => {
  let obj = _data.map((e, i) => {
    return e.vouchers.length
  })

  // return obj

  return obj.reduce((a, b) => a + b, 0)
  // return Object.values(obj).flat().length
}

export const reMapData = data => {
  return data.map((item, index) => {
    return {
      ...item,
      vouchers: item.vouchers.map((item, index) => {
        return {
          ...item,
          selected: false,
        }
      }),
    }
  })
}

export const checkPromoType = (value = String) => {
  return /pengiriman/.test(value) ? true : false
}

export const manipulateDataVoucher = (e = Object) => {
  let value = e.promo_type

  if (/ongkir/.test(value)) {
    return {
      header_title: 'Pengiriman',
      icon_img: '',
      subtitle: {
        first_row: {
          left: 'Potongan Ongkos Kirim',
          right:
            e.type == 1
              ? e.discount_amount + '%'
              : 'Rp' + numberWithCommas(e.discount_amount),
        },
        second_row: {
          left: 'Minimal Transaksi',
          right: 'Rp' + numberWithCommas(e.min_active),
        },
      },
      t_n_c: e.terms,
      ...e,
    }
  } else if (/potongan/.test(value)) {
    return {
      header_title: 'Potongan Harga',
      icon_img: '',
      subtitle: {
        first_row: {
          left: 'Jumlah Potongan',
          right:
            e.type == 1
              ? e.discount_amount + '%'
              : 'Rp' + numberWithCommas(e.discount_amount),
        },
        second_row: {
          left: 'Minimun Transaksi',
          right: 'Rp' + numberWithCommas(e.min_active),
        },
      },
      selected: false,
      t_n_c: e.terms,
      ...e,
    }
  } else if (/cashback/.test(value)) {
    return {
      header_title: 'Cashback',
      icon_img: '',
      subtitle: {
        first_row: {
          left: 'Jumlah Cashback',
          right:
            e.type == 1
              ? e.discount_amount + '%'
              : 'Rp' + numberWithCommas(e.discount_amount),
        },
        second_row: {
          left: 'Minimun Transaksi',
          right: 'Rp' + numberWithCommas(e.min_active),
        },
      },
      selected: false,
      t_n_c: e.terms,
      ...e,
    }
  } else {
    return {
      header_title: '',
      icon_img: '',
      subtitle: {
        first_row: {
          left: '',
          right: '',
        },
        second_row: {
          left: '',
          right: '',
        },
      },
      terms: '',
    }
  }
}
