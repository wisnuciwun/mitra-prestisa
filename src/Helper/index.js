import _ from 'lodash'

export const debounce = func => {
  let timer
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, 500)
  }
}

export function validateOnlyNumbers(number) {
  const re = /^[0-9\b]+$/
  return re.test(number)
}

const isString = param => {
  return Object.prototype.toString.call(param) === '[object String]'
}

export const isEmptyNullOrUndefined = param => {
  if (param === undefined) {
    return true
  }
  if (param === null) {
    return true
  }

  if (param === '') {
    return true
  }

  if (isString(param)) {
    return param.replace(/\s+/g, '') === ''
  }
  return false
}

export const numberWithCommas = x => {
  return _.toString(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + 'rb' // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(0) + 'jt' // convert to M for number from > 1 million
  } else if (num < 900) {
    return num // if value < 1000, nothing to do
  }
}

export const isExpired = unix => {
  return unix * 1000 < Date.now()
}

export const logProps = props => {
  return console.log(
    '🏘🏘🏘',
    '\n\nROUTE:',
    props.route,
    '\n\nROUTE_PARAMS:',
    props.route.param,
    '\n\nRAW,',
    props,
  )
}

export const logSuccess = success => {
  return console.log(
    '✅✅✅',
    '\n\nDATA:',
    success.data,
    '\n\nREQUEST:',
    success.request,
    '\n\nHEADER:',
    success.header,
  )
}

export const logError = error => {
  return console.log(
    '🚨🚨🚨',
    '\n\nDATA:',
    error.data,
    '\n\nREQUEST:',
    error.request,
    '\n\nHEADER:',
    error.status,
  )
}
