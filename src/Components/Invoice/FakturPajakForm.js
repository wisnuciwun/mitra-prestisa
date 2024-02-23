import React, { useState, useEffect, useRef } from 'react'
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
import AjukanFakturTombol from './AjukanFakturTombol'
import FormInputPajak from './FormInputPajak'
import LoadingIndicator from '../Base/LoadingIndicator'
import { Config } from '@/Config'
import axios from 'axios'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import TombolIsiFormNPWP from './TombolIsiFormNPWP'
import { ScrollView } from 'react-native-gesture-handler'

const FakturPajakForm = ({ statusTransaksi }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const login = state.login.data

  const [ajukanTombolVisible, setajukanTombolVisible] = useState(true)
  const [fakturFormInputVisible, setfakturFormInputVisible] = useState(false)
  const [loading, setloading] = useState(true)
  const [statusFaktur, setstatusFaktur] = useState({ status: '' })
  const [statusNpwp, setstatusNpwp] = useState({ status: 'no_complete' })
  // const [statusTransaksi, setstatusTransaksi] = useState('belum_selesai')
  const [] = useState()

  console.log('statusTransaksi', statusTransaksi)
  React.useLayoutEffect(() => {
    // setIsLoading(false)
    navigation.setOptions({
      headerRight: () => {
        return <></>
      },
    })
  }, [navigation])

  const fetchData = async () => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/status-faktur-pajak`

    await axios
      .post(url, {
        fbasekey: 'still dummy format response',
        po_id: 1,
        status: 'no_factur',
        // status: 'faktur_sent',
        // status: 'diproses',
      })
      .then(response => {
        console.log('ambil data status faktur pajak')
        console.log(response.data.data)
        setstatusFaktur(response.data.data.faktur_pajak)
        setloading(false)
      })
      .catch(({ response }) => {
        setloading(false)
      })
  }
  // const fetchData2 = async () => {
  //   setloading(true)
  //   const url = Config.API_URL + `/customer-app/status-faktur-pajak`

  //   await axios
  //     .post(url, {
  //       fbasekey: 'still dummy format response',
  //       po_id: 1,
  //       // status: 'no_factur',
  //       // status: 'faktur_sent',
  //       status: 'diproses',
  //     })
  //     .then(response => {
  //       console.log('ambil data status faktur pajak')
  //       console.log(response.data.data)
  //       setstatusFaktur(response.data.data.faktur_pajak)
  //       setloading(false)
  //     })
  //     .catch(({ response }) => {
  //       setloading(false)
  //     })
  // }

  const ContentPajak = ({ data }) => {
    if (statusTransaksi == 'selesai') {
      if (login.user.invoice_tax_status == 1) {
        return (
          <View>
            <AjukanFakturTombol />
          </View>
        )
      } else {
        if (data.status == 'no_faktur') {
          return (
            <>
              {ajukanTombolVisible == true && (
                <TombolIsiFormNPWP
                  viewForm={() => {
                    setajukanTombolVisible(false)
                    setfakturFormInputVisible(true)
                  }}
                />
              )}
              {fakturFormInputVisible == true && <FormInputPajak />}
            </>
          )
        } else if (data.status == 'diproses') {
          return (
            <View style={st.container}>
              <FastImage
                style={{ width: 150, height: 150 }}
                source={Assets.pajak_waiting}
              ></FastImage>
              <Text style={st.title}>{data.title}</Text>
              <Text style={st.message}>{data.message}</Text>
            </View>
          )
        } else if (data.status == 'faktur_sent') {
          return (
            <View style={st.container}>
              <FastImage
                style={{ width: 150, height: 150 }}
                source={Assets.pajak_sent}
              ></FastImage>
              <Text style={st.title}>{data.title}</Text>
              <Text style={st.message}>{data.message}</Text>
            </View>
          )
        } else {
          return (
            <>
              <Text></Text>
            </>
          )
        }
      }
    } else {
      return (
        <View style={st.container}>
          <Icon
            color="#B6B6B6"
            size={60}
            name={'timer-sand'}
            // style={{ width: 150, height: 150 }}
            // source={Assets.pajak_sent}
          ></Icon>
          <Text style={st.title}>Transaksi masih berlangsung</Text>
          <Text style={st.message}>
            Harap tunggu hingga status transaksi selesai
          </Text>
        </View>
      )
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    } else {
      console.log('effect status Faktur')
      setloading(false)
    }
  }, [statusFaktur])
  return (
    <ScrollView style={[st.screen]}>
      {loading == true ? (
        <LoadingIndicator />
      ) : (
        <ContentPajak data={statusFaktur} />
      )}
      {/* <Text
        style={{ alignSelf: 'center', marginTop: 200 }}
        onPress={() => {
          setstatusNpwp({ status: 'complete' })
        }}
      >
        Status NPWP
      </Text>
      <Text
        style={{ alignSelf: 'center', marginTop: 50 }}
        onPress={() => {
          setstatusTransaksi('selesai')
        }}
      >
        Status selesai
      </Text> */}
    </ScrollView>
  )
}

const st = StyleSheet.create({
  screen: { paddingVertical: 20 },
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, marginTop: 30 },
  message: { textAlign: 'center', fontSize: 15, lineHeight: 25 },
})
export default FakturPajakForm
