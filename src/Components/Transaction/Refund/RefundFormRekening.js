import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import LabelText from '@/Components/Base/LabelText'
import InputBase from '@/Components/Base/InputBase'
import FormV1 from '@/Components/Base/FormV1'
import { TextInput } from 'react-native-gesture-handler'
import { Assets } from '@/Theme/Assets'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import ButtonBase from '@/Components/Base/ButtonBase'

const RefundFormRekening = ({ bank, saveRekening }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()
  const [rekeningText, setrekeningText] = useState('')
  const [rekeningNama, setrekeningNama] = useState('')
  const [rekening, setRekening] = useState({
    no_rekening: '123456789',
    atas_nama: 'Rizky Fauzi',
  })
  const [disableButton, setDisableButton] = useState()

  // const bank = {
  //   id: 1,
  //   name: 'BCA',
  //   icon:
  //     'https://lavender.prestisa.id/assets/images/customer_app/icon/bca.png',
  // }

  const getBankImage = bankCode => {
    switch (bankCode) {
      case 'BCA':
        return Assets.BCA
      case 'BRI':
        return Assets.BRI
      case 'BNI':
        return Assets.BNI
      case 'MANDIRI':
        return Assets.MANDIRI
      default:
        return Assets.BCA
    }
  }

  const handlerSubmitButton = () => {
    const rekeningSubmit = {
      no_rekening: rekeningText,
      nama_rekening: rekeningNama,
      bank: bank.bank_code,
    }
    saveRekening(rekeningSubmit)
  }

  useEffect(() => {}, [])
  return (
    <View style={{}}>
      <ScrollView style={[{ height: windowHeight }]}>
        <View style={[Layout.row, st.row]}>
          <FastImage
            style={{ width: 60, height: 30, marginRight: 20 }}
            source={getBankImage(bank.bank_code)}
          ></FastImage>
          <Text style={st.rekeningText}>{bank.name}</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16 }}>Nomor Rekening</Text>
          <View
            style={{
              borderBottomColor: '#aaa',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextInput
              onChangeText={text => {
                setrekeningText(text)
              }}
              placeholder="Masukkan nomor rekening"
              style={{ width: '100%' }}
            />

            <View
              style={{
                padding: 3,
                right: 0,
                position: 'absolute',
                borderRadius: 20,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: Colors.neutralGray01,
              }}
            >
              <FeatherIcon name="x"></FeatherIcon>
            </View>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16 }}>Atas Nama</Text>
          <View
            style={{
              borderBottomColor: '#aaa',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextInput
              onChangeText={text => {
                setrekeningNama(text)
              }}
              placeholder="Contoh: Jane Doe"
              style={{ width: '100%' }}
            />
            <View
              style={{
                padding: 3,
                right: 0,
                position: 'absolute',
                borderRadius: 20,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: Colors.neutralGray01,
              }}
            >
              <FeatherIcon name="x"></FeatherIcon>
            </View>
          </View>
          <Text style={{ marginTop: 10 }}>
            Pastikan nama sama persis dengan yang tertera di buku tabungan anda
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 65,
          width: '100%',
          backgroundColor: 'white',
        }}
      >
        <ButtonBottomFloating
          onPress={() => {
            handlerSubmitButton()
          }}
          label="Gunakan"
        ></ButtonBottomFloating>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
  row: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },

  rekening: { flexDirection: 'row' },
  rekeningText: { fontSize: 16, color: '#1D1619' },
})
export default RefundFormRekening
