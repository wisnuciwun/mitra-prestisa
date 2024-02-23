import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SectionEditRow from '../RingkasanPesanan/SectionEditRow'
import Spacer from '../Base/Spacer'
import { pengiriman } from '../RingkasanPesanan/Styles'

const WaktuPengiriman = ({
  date,
  time,
  onPressUbah = () => {},
  isEdit = true,
}) => {
  return (
    <>
      <SectionEditRow
        title="Waktu Pengiriman"
        fontSize={16}
        onPressUbah={onPressUbah}
        isEdit={isEdit}
      />
      <Spacer height={9} />
      <View style={[pengiriman.row]}>
        <Text style={[pengiriman.rowLabel]}>Tanggal</Text>
        <Text style={[pengiriman.rowData]}>{date}</Text>
      </View>
      <Spacer height={4} />
      <View style={[pengiriman.row]}>
        <Text style={[pengiriman.rowLabel]}>Jam</Text>
        <Text style={[pengiriman.rowData]}>{time}</Text>
      </View>
    </>
  )
}

export default WaktuPengiriman

const styles = StyleSheet.create({})
