import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'

const RefundPilihRekening = ({
  show,
  handleButtonTambah,
  listrekening,
  handlePilihRekening,
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [selectedRekening, setSelectedRekening] = useState(null)
  const [rekening, setRekening] = useState([
    {
      id: 1,
      bank_code: 'mandiri',
      nama_bank: 'Bank Mandiri',
      no_rekening: '123456789',
      atas_nama: 'Rizky Fauzi',
    },
  ])

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
  const [] = useState()

  // console.log('RefundPilihRekening ', listrekening)

  const potongTulisan = (text, panjang, tanda = '') => {
    tanda = tanda == '' ? '...' : tanda
    console.log(tanda)
    return text.length > panjang ? text.substring(0, panjang) + tanda : text
  }

  useEffect(() => {}, [])
  return (
    <View style={st.screen}>
      {listrekening.map((data, index) => {
        return (
          <Pressable
            onPress={() => {
              handlePilihRekening(data)
            }}
            key={index}
          >
            <View style={st.row}>
              <View style={st.rekening}>
                <FastImage
                  style={{ width: 40, height: 20, marginRight: 20 }}
                  source={getBankImage(data.bank)}
                />
                {/* <Text style={st.bankText}>{bank}</Text> */}
                <Text style={st.rekeningText}>
                  {potongTulisan(data.no_rekening, 5, '***')}
                </Text>
                <Text style={st.rekeningText}> a.n {data.nama_rekening}</Text>
              </View>

              {/* <View style={st.radio}>
                <Icon
                  color={Colors.neutralGray01}
                  size={20}
                  name="radiobox-marked"
                ></Icon>
              </View> */}
            </View>
          </Pressable>
        )
      })}
      <Pressable onPress={() => handleButtonTambah('ss')} style={[]}>
        <View style={st.row}>
          <View style={st.rekening}>
            <Text style={st.rekeningText}>Tambah Rekening Baru</Text>
          </View>

          <View style={st.radio}>
            <Icon
              color={Colors.neutralGray01}
              size={20}
              name="plus-circle-outline"
            ></Icon>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },

  rekening: { flexDirection: 'row' },
  rekeningText: { fontSize: 16, color: '#1D1619' },
})
export default RefundPilihRekening
