import { Colors } from '@/Theme/Variables'
import { StyleSheet } from 'react-native'
import React from 'react'
import Spacer from '@/Components/Base/Spacer'

export const shadowBg = StyleSheet.create({
  v1: {
    shadowColor: Colors.neutralGray03,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.43,
    shadowRadius: 4,
  },
})

export const checkSpacing = string => (/\s/g.test(string) ? true : false)

export const reMapRow = (_data, min, max) => {
  const __data = []
  for (var i = min; i < max; i++) {
    __data.push(_data[i].id)
  }
  return __data
}

export const addSpacer = ({ windowWidth, usedSpace, boxSize, dataLength }) => {
  const n = Math.floor((windowWidth - usedSpace) / boxSize)
  const modulus = dataLength % n
  const renderSpacer = _n =>
    [...Array(_n)].map((_, i) => <Spacer key={i} width={boxSize} />)

  switch (n) {
    case 4:
      switch (modulus) {
        case 3:
          return renderSpacer(1)
        case 2:
          return renderSpacer(2)
      }
      break
    case 5:
      switch (modulus) {
        case 4:
          return renderSpacer(1)
        case 3:
          return renderSpacer(2)
        case 2:
          return renderSpacer(3)
      }
      break
  }
}

export const matchRow = (data, item) => {
  if (
    item.id ==
    data.find(e => {
      if (e == item.id) return e
    })
  ) {
    return true
  } else {
    return false
  }
}

export const filterRowData = (data, min, max) => {
  return data.filter((_, i) => i >= min && i < max)
}

export const findElement = (data, i) =>
  data.find(e => e == i) != undefined ? true : false

export const filterRowDataId = (data, min, max) => {
  return data
    .filter((_, i) => i >= min && i < max)
    .map((e, i) => {
      // console.log('E', e.id);
      return e.id
    })
}

export const getFirstWord = (data = String) => {
  const _first = data.split(' ')[0]
  const _count = _first.length

  if (_count > 12) {
    return _first.substring(0, 12) + '...'
  } else if (_count > 0 && _count <= 12) {
    return _first
  } else {
    return ''
  }
}
