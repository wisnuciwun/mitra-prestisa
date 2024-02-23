export const addEnableObjectKey = (arr = Array, params = Number) => {
  let _data = []
  _data = arr.map((e, i) => {
    return { ...e, enable: params === e.id ? true : false }
  })

  return sortedByTrue(_data)
}

export const addSelectedObjectKey = (arr = Array) => {
  let _data = []
  _data = arr.map((e, i) => {
    return e.enable === true
      ? { ...e, data: e.data.map((e, i) => ({ ...e, selected: false })) }
      : e
  })
  return _data
}

export const sortedByTrue = (arr = Array) => {
  return arr.sort((x, y) => {
    return y.enable - x.enable
  })
}
