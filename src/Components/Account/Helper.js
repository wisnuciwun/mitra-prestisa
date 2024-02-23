import { isEmptyNullOrUndefined } from '@/Helper'
import { Assets } from '@/Theme/Assets'
import { isString, toString } from 'lodash'

export const noAva = data => {
  return isEmptyNullOrUndefined(data) ? Assets.noAvaImg : data
}

export const limitNameWord = (data = String) => {
  const _word = data.split(' ').length
  const _char = data.replace(/ /g, '').length + 1

  if (_word > 19 && _char > 132) {
    return data.substring(0, 132) + '...'
  } else if (_word > 19 && _char <= 132) {
    return data
  } else if (_word <= 19 && _char > 132) {
    return data.substring(0, 132) + '...'
  } else if (_word <= 19 && _char <= 132) {
    return data
  }
}

export const checkStringNConvert = data => {
  return isString(data) ? data : toString(data)
}

export const reMapLocString = (data = String) => {
  return data.replace(/\s*,\s*/g, ',').split(',')
}
