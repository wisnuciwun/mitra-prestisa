import { isEmptyNullOrUndefined } from '@/Helper'
import { eachHourOfInterval, getUnixTime, isSameHour, isToday } from 'date-fns'
import _, { isUndefined } from 'lodash'
import moment, { months } from 'moment'
import { Dimensions } from 'react-native'
import { populateAllRingkasanItems } from '../RingkasanPesanan/Helper'
import { pengiriman } from '../RingkasanPesanan/Styles'

export const MARGIN_H = 24
export const WIDTH_WINDOW = Dimensions.get('window').width

export const filterCartSelected = (arr = Array, bool = Boolean) => {
  const num = _.filter(arr, { selected: bool })

  return num
}

export const filterCartCounter = (arr = Array, num = Number) => {
  const _new = _.filter(arr, function (i) {
    return i.counter > num
  })

  return _new.map((e, i) => {
    const _obj = e
    const _new_arr_from_obj = []

    for (let i = 0; i < e.counter; i++) {
      _new_arr_from_obj.push(_obj)
    }
    // return _.flattenDeep(_new_arr_from_obj)
    return _new_arr_from_obj
  })
}

export const convertToSingleArray = (arr = Array) => {
  const single_arr = []
  arr.forEach(e => {
    e.forEach(_e => {
      single_arr.push(_e)
    })
  })
  return single_arr.map((e, i) => {
    const _data = { ...e, id_page: i + 1 }
    return _.omit(_data, 'counter')
  })
}

export const getDataProductItemCart = async (arr = Array, id = Number) => {
  const _data = _.filter(arr, { id_page: id })
  try {
    if (_data.length > 1) {
      return {
        data: _data,
        message: `id_page: ${id} have multiple data`,
        total: _data.length,
        status: 'failed',
      }
    } else if (_data.length == 1) {
      return {
        data: _data,
        message: `id_page: ${id} is founded`,
        total: _data.length,
        status: 'success',
      }
    } else if (_data.length == 0) {
      return {
        data: _data,
        message: `id_page: ${id} not found`,
        total: _data.length,
        status: 'failed',
      }
    }
  } catch (e) {
    console.error(new Error(`id page: ${id}`), {
      cause: e,
    })
  }
  // if (_data.length > 1) {
  //   return console.error(new Error(`id page: ${id} have multiple data`))
  // } else if (_data.length == 1) {
  //   return _data[0]
  // } else if (_data.length == 0) {
  //   return console.error(new Error(`id page: ${id} not found`))
  // }
}

/**
 *
 * @params arr = Arrray;
 */
export const populateAllItemSelectedCart = (arr = Array) => {
  const _data = convertToSingleArray(
    filterCartCounter(filterCartSelected(arr, true), 0),
  )
  if (_data.length === 0) {
    return console.log({
      message: `cart item selected with value true not found. make sure the data has correct value selected (true)`,
    })
  } else if (_data.length > 0) {
    return populateAllRingkasanItems(_data)
  }
}

export const getTotalAllItemSelectedCart = (arr = Array) => {
  const _data = convertToSingleArray(
    filterCartCounter(filterCartSelected(arr, true), 0),
  )
  if (_data.length === 0) {
    return console.log({
      message: `cart item selected with value true not found. make sure the data has correct value selected (true)`,
    })
  } else if (_data.length > 0) {
    return populateAllRingkasanItems(_data).length
  }
}

export const findAndCollectSelectedItem = (data = Array) => {
  let _data = []
  data.map((element, index) => {
    const n = _.filter(element.cart_items, { selected: true })
    if (n.length > 0) {
      _data = n
    }
  })

  return _data
}

export const addDataWaktuPengiriman = (
  payload = null,
  { data = Array, id = Number },
) => {
  const _update_data = data.map((e, i) => {
    return e.id_page == id ? { ...e, pengiriman: payload } : e
  })
  return _update_data
}

export const addDataPenerima = (
  payload = null,
  { data = Array, id = Number },
) => {
  const _update_data = data.map((e, i) => {
    return e.id_page == id ? { ...e, penerima: payload } : e
  })
  return _update_data
}

export const addDataUcapan = (
  payload = null,
  { data = Array, id = Number },
) => {
  const _update_data = data.map((e, i) => {
    console.log('IDDD', id)
    return e.id_page == id ? { ...e, ucapan: payload } : e
  })
  return _update_data
}

export const cart_items = ['ok']

export const isValidDate = (date = String) => {
  return !isNaN(Date.parse(date))
}

export var minutes = [...Array(60)].map(function (_, i) {
  if (i < 10) {
    i = '0' + i
  }
  return i.toString()
})

export var hours = [...Array(24)].map(function (_, i) {
  return i
})

export const loopNumber = (from, to) => {
  let data = []
  for (let i = from; i <= to; i++) {
    data.push(`${i < 10 ? '0' + i : i}`)
  }
  return data
}

export const hoursDisable = (bool, minHour, maxHour, thisHour) => {
  let t_arr = []
  for (let i = minHour; i < maxHour; i++) {
    t_arr.push(i)
  }
  return t_arr
}

export const isAvailHoursDay = (range = 4) => {
  const _d = new Date()
  const _hoursArr = eachHourOfInterval({
    start: new Date(
      _d.getFullYear(),
      _d.getMonth(),
      _d.getDate(),
      moment().hour(),
    ),
    end: new Date(
      _d.getFullYear(),
      _d.getMonth(),
      _d.getDate(),
      moment().hour() + range,
    ),
  })

  const _new = _.filter(_hoursArr, o => isToday(o) && o)

  return _new.length >= range ? true : false
}

export const isNotRangeDisableHours = (range = 4, datetime = Date) => {
  const _d = new Date()
  const _hoursArr = eachHourOfInterval({
    start: new Date(
      _d.getFullYear(),
      _d.getMonth(),
      _d.getDate(),
      moment().hour(),
    ),
    end: new Date(
      _d.getFullYear(),
      _d.getMonth(),
      _d.getDate(),
      moment().hour() + range,
    ),
  })

  const _new = _.filter(_hoursArr, o => isSameHour(o, datetime) && o)
  return _new.length == 1 ? true : false
}

export const monthNumber = (month = String) => {
  return _.findIndex(months(), o => o === month)
}

export const getTimeZoneIndo = (value = Number) => {
  const _value = value / -60

  switch (_value) {
    case 7:
      return 'WIB'
    case 8:
      return 'WITA'
    case 9:
      return 'WIT'
    default:
      return 'null'
  }
}

export const convertToEpoch = (data = String) => {
  if (!isEmptyNullOrUndefined(data)) {
    const arr = data.split(' ')
    const _arr = arr.slice(0, 3)
    const time = arr[3].split(':')
    const _d = _arr.concat(time)
    return getUnixTime(new Date(_d[2], monthNumber(_d[1]), _d[0], _d[3], _d[4]))
  }
}

export const matchStepScreen = (data = String) => {
  if (data === 'MakeOrderPengiriman') {
    // 'pengiriman'
    return true
  } else if (data === 'MakeOrderPenerima') {
    // 'penerima'
    return true
  } else if (data === 'MakeOrderUcapan') {
    // 'ucapan'
    return true
  } else {
    return false
  }
}

export const isEmptyObject = (obj = Object) => {
  return Object.keys(obj).length == 0 ? true : false
}

export const boolActive = (
  data = Array,
  params = String,
  index = Int8Array,
) => {
  /**
   * multiproduct:
   *   - state.ringkasanPesanan.data.length = n > 2
   *   - state.ringkasanPesanan.data[0].pengiriman = Object
   *
   * single/buynow:
   *    - state.ringkasanPesanan.data.length = 1
   *    - state.ringkasanPesanan.data[0].pengiriman = Object
   *
   * default (no ringkasan pesanan):
   *    - state.ringkasanPesanan.data.length = 1,
   *    - state.ringkasanPesanan.data[0].pengiriman = undefined
   */

  // console.log('\n\nDATA', isEmptyObject(data[index][`${params}`]), params)

  // let b = []
  //
  const n = data.map((e, i) => {
    // console.log('\n\nLENGTH', data.length)
    // console.log(
    //   '\n\nKEY',
    //   isEmptyObject(e[`${params}`]),
    //   e[`${params}`],
    //   params,
    // )

    //   b.push(isEmptyObject(e[`${params}`]))

    if (data.length == 1 && isUndefined(e[`${params}`])) {
      return 'empty'
    } else if (data.length == 1 && !isUndefined(e[`${params}`])) {
      if (isEmptyObject(e[`${params}`])) {
        return 'unchecked'
      } else {
        return 'checked'
      }
    } else if (data.length > 1 && !isUndefined(e[`${params}`])) {
      if (isEmptyObject(e[`${params}`])) {
        return 'unchecked'
      } else {
        return 'checked'
      }
    }
  })
  const l = [...n]
  // const l = n.join()

  console.log('\n\nSTAT', n)

  switch (l[0]) {
    case 'empty':
      return false
    case 'unchecked':
      return false
    case 'checked':
      return true
    default:
      return false
  }
}

export const logRoutesNavs = () => {
  // console.log(
  // 'BOOL',
  // '\n\nNAME:',
  // _.filter(navState.routes, {
  //   name: navState.routes[navState.index].name,
  // })[0].name,
  // _.filter(_navRoutes, {
  //   name: 'df',
  // })[0],
  // '\nNAVROUTES:',
  // _navRoutes.length,
  // '\nORDERDATA:',
  // _orderData.length,
  // '\nFILTER',
  // _rep(),
  // '\nFILTER_LENGTH',
  // _rep().length,
  // )
}
