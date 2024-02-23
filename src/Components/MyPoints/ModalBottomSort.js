import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ModalBottom from '../Base/ModalBottom'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from '../Base/Spacer'
import { useEffect } from 'react'

const ModalBottomSort = ({ isVisible, onClose, onChangeSort = () => {} }) => {
  const data_sort = [
    {
      id: 1,
      name: 'Terbaru',
      value: '',
      selected: false,
    },
    {
      id: 2,
      name: 'Terlama',
      value: 'oldest',
      selected: false,
    },
    {
      id: 3,
      name: 'Point Terbesar',
      value: 'highest',
      selected: false,
    },
    {
      id: 4,
      name: 'Point Terkecil',
      value: 'lowest',
      selected: false,
    },
  ]
  const [dataSort, setDataSort] = useState(data_sort)

  const handleOnPressSelected = i => {
    const arr = [...dataSort]
    arr.map((e, _i) => {
      _i === i ? (e['selected'] = !e['selected']) : (e['selected'] = false)
    })
    onChangeSort(arr[i])
    setDataSort(arr)
  }

  return (
    <ModalBottom isVisible={isVisible} heightModal={null}>
      <View style={{ marginBottom: 50 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 81,
            marginHorizontal: SIZES.margin_h,
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <FeatherIcon name={'x'} size={24} color={Colors.neutralBlack02} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
              }}
            >
              Urutkan Berdasarkan
            </Text>
          </View>
          <Spacer width={24} />
        </View>
        <View style={{}}>
          {dataSort.map((e, i) => (
            <TouchableOpacity
              onPress={() => handleOnPressSelected(i)}
              style={{
                height: 44,
                backgroundColor: e.selected ? '#F4E9E9' : 'transparent',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: SIZES.margin_h,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.neutralBlack02,
                  fontSize: 18,
                }}
              >
                {e.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ModalBottom>
  )
}

export default ModalBottomSort

const styles = StyleSheet.create({})
