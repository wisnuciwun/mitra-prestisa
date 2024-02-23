import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spacer from '../Base/Spacer'
import SectionEditRow from '../RingkasanPesanan/SectionEditRow'
import { Colors } from '@/Theme/Variables'
import { kataUcapan } from '../RingkasanPesanan/Styles'

const Ucapan = ({
  text = '',
  pengirim = '',
  onPressUbah = () => {},
  isEdit = true,
}) => {
  return (
    <>
      <SectionEditRow
        fontSize={16}
        title="Ucapan"
        onPressUbah={onPressUbah}
        isEdit={isEdit}
      />
      <Spacer height={8} />
      <View>
        <Text style={[kataUcapan.textUcapan]}>{text}</Text>
      </View>
      <Spacer height={12} />
      <Text style={[kataUcapan.textPengirim]}>
        Pengirim:{` `}
        <Text style={{ color: Colors.neutralBlack01 }}>{pengirim}</Text>
      </Text>
    </>
  )
}

export default Ucapan

const styles = StyleSheet.create({})
