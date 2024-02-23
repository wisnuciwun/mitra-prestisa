export const subStringDot = (string = String, start = Int) => {
  const _stringLength = string.length

  if (_stringLength > 15) {
    return (
      string.substring(0, start) +
      '...' +
      string.substring(_stringLength - (start + 2), _stringLength)
    )
  }
}

export const addObjKeySelected = (arr = Array) => {
  return arr.map((e, i) => {
    return { ...e, selected: false }
  })
}

export const countDownTime = (timeStart, timeEnd) => {
  let different = +timeStart - +timeEnd
  let timeLeft = {}

  if (different > 0) {
    timeLeft = {
      hours: Math.floor((different / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((different / 1000 / 60) % 60),
      seconds: Math.floor((different / 1000) % 60),
    }
  }

  return timeLeft
}
