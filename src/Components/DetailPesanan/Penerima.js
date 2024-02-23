import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { penerima } from '../RingkasanPesanan/Styles'
import Spacer from '../Base/Spacer'
import SectionEditRow from '../RingkasanPesanan/SectionEditRow'

const Penerima = ({
  full_name,
  address,
  phone,
  onPressUbah = () => {},
  isEdit = true,
}) => {
  return (
    <>
      <SectionEditRow
        title="Penerima"
        fontSize={16}
        onPressUbah={onPressUbah}
        isEdit={isEdit}
      />
      <Spacer height={6} />
      <Text style={[penerima.textDataName]}>{full_name}</Text>
      <Spacer height={8} />
      <Text style={[[penerima.textDataAddress]]}>{address}</Text>
      <Spacer height={12} />
      <Text style={[penerima.textDataPhone]}>{phone}</Text>
    </>
  )
}

export default Penerima

const styles = StyleSheet.create({})
