import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import NavBarModal from '../../Base/NavBarModal'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import RefundPilihRekening from './RefundPilihRekening'
import RefundPilihBank from './RefundPilihBank'
import RefundFormRekening from './RefundFormRekening'
import { Config } from '@/Config'
import axios from 'axios'

const ModalRekening = ({ visible, saveRekening, listrekening }) => {
  const ApiUrl = Config.API_URL

  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRekening, setSelectedRekening] = useState(null)

  const [viewPilihRekening, setviewPilihRekening] = useState(true)
  const [viewPilihBank, setviewPilihBank] = useState(false)
  const [viewIsiRekening, setviewIsiRekening] = useState(false)

  // const [listBank, setListBank] = useState(null)
  // const [listrekening, setlistrekening] = useState(null)
  const [loading, setloading] = useState(true)
  const [selectedBank, setSelectedBank] = useState(null)

  const listBank = [
    { id: 1, nama_bank: 'BCA', bank_code: 'BCA', image: Assets.BCA },
    { id: 2, nama_bank: 'BRI', bank_code: 'BRI', image: Assets.BRI },
    { id: 3, nama_bank: 'BNI', bank_code: 'BNI', image: Assets.BNI },
    {
      id: 4,
      nama_bank: 'MANDIRI',
      bank_code: 'MANDIRI',
      image: Assets.MANDIRI,
    },
    {
      id: 5,
      nama_bank: 'PERMATA',
      bank_code: 'PERMATA',
      image: Assets.PERMATA,
    },
  ]
  // console.log('ModalRekening: ', listrekening)
  const handleSelectBank = bank => {
    setSelectedBank(bank)
    // const [viewPilihRekening, setviewPilihRekening] = useState(true)
    // setviewPilihRekening(false)
    setviewPilihBank(false)
    setviewIsiRekening(true)
  }

  const handleButtonTambah = () => {
    // log('tambah rekening')
    setviewPilihRekening(false)
    setviewPilihBank(true)
    setviewIsiRekening(false)
  }
  // const fetchData = async () => {
  //   setloading(true)
  //   const url = ApiUrl + `/customer-app/bank-refund`
  //   console.log('fetch', url)

  //   await axios
  //     .get(url)
  //     .then(response => {
  //       // console.log(response)
  //       setListBank(response.data.data)
  //       setloading(false)
  //     })
  //     .catch(({ response }) => {
  //       // console.log('error', response)
  //       setloading(false)
  //     })
  // }

  useEffect(() => {}, [])
  return (
    <Modal visible={visible}>
      <View>
        <NavBarModal title={'Pilih Rekening'} />
        {viewPilihRekening == true && (
          <RefundPilihRekening
            handleButtonTambah={handleButtonTambah}
            handlePilihRekening={saveRekening}
            listrekening={listrekening}
          />
        )}
        {viewPilihBank && (
          <RefundPilihBank
            listBank={listBank}
            setSelectedBank={handleSelectBank}
          />
        )}
        {viewIsiRekening && (
          <RefundFormRekening
            saveRekening={data => {
              setviewPilihRekening(false)
              setviewPilihBank(false)
              setviewIsiRekening(false)
              console.log('save rekening Modal rekening')
              saveRekening(data)
            }}
            bank={selectedBank}
          />
        )}
      </View>
    </Modal>
  )
}

const st = StyleSheet.create({
  screen: {},
})

export default ModalRekening
