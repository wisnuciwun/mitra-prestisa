import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Modal,
  ActivityIndicator,
  // ToastAndroid,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CardTransaksi from '@/Components/Transaction/CardTransaksi'
import CardKomplain from '@/Components/Transaction/CardKomplain'
import { ScrollView } from 'react-native-gesture-handler'
import { info_data_product_multi_v1 } from '@/Components/RingkasanPesanan/Helper'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import ModalRekening from '@/Components/Transaction/Refund/ModalRekening'
import axios from 'axios'
import { Config } from '@/Config'
import { useToast } from 'react-native-toast-notifications'

const ComplainOrderStep3Container = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [selectedAlasan, setselectedAlasan] = useState()
  const [disableButton, setdisablebutton] = useState(true)
  const [visibleModal, setvisibleModal] = useState(false)
  const [loading, setloading] = useState(false)
  const [loadingrekening, setloadingrekening] = useState(true)
  const [listrekening, setlistrekening] = useState(null)
  const toast = useToast()

  const [detailRekening, setDetailRekening] = useState({
    id: 1,
    customer_id: '',
    bank: '',
    nama_rekening: '',
    no_rekening: '',
  })
  const [selected, setSelected] = useState(0)
  const [] = useState()

  const data = props.route.params.dataOrder
  const alasan = props.route.params.alasan
  const status = props.route.params.status
  const order = props.route.params.dataOrder

  // console.log('dataOrder', props.route.params)

  const saveRekening = data => {
    setvisibleModal(false)
    setDetailRekening(data)
  }

  const potongTulisan = (text, panjang, tanda = '') => {
    tanda = tanda == '' ? '...' : tanda
    // console.log(tanda)
    return text.length > panjang ? text.substring(0, panjang) + tanda : text
  }

  const submitComplain = async data => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/complain`

    await axios
      .post(url, data)
      .then(response => {
        // navigation.replace('DetailKomplain', { successForm: true })
        navigation.reset({
          index: 0,
          routes: [{ name: 'DetailKomplain', params: { successForm: true } }],
        })
        // console.log('RESPONSE: ', response.data)
        // setloading(false)
      })
      .catch(({ response }) => {
        toast.show(response.data.data.message, {
          type: 'danger',
          icon: (
            <FeatherIcon
              name="alert-circle"
              color={'white'}
              size={25}
            ></FeatherIcon>
          ),
          placement: 'top',
          duration: 5000,
          style: { marginTop: 50, elevation: 5 },
          textStyle: {},
          animationType: 'slide-in',
        })
        console.log('error', response.data)
        setloading(false)
      })
  }

  const fetchDataRekening = async () => {
    setloadingrekening(true)
    const url = Config.API_URL + `/customer-app/get-saved-rekening`

    const data = {
      fbasekey: 'testvoucher',
    }

    await axios
      .post(url, data)
      .then(response => {
        console.log('fetchrekening : ', response.data.data.daftar_rekening)
        setlistrekening(response.data.data.daftar_rekening)
        setloadingrekening(false)
      })
      .catch(({ response }) => {
        setloadingrekening(false)
      })
  }

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      fetchDataRekening()
      first.current = false
    } else {
      return
    }
  })

  useEffect(() => {
    if (selected > 0) {
      setdisablebutton(false)
    }
  }, [selected])
  return (
    <>
      <ScrollView style={[st.screen, Layout.fill, { marginBottom: 50 }]}>
        <View
          style={[
            st.content,
            {
              paddingBottom: 20,
              borderBottomColor: '#eee',
              borderBottomWidth: 4,
            },
          ]}
        >
          <Text style={[st.headerText, { marginBottom: 10 }]}>
            Info Pesanan
          </Text>
          <View>
            <CardKomplain order={order} data={data} status={status} />
          </View>
        </View>
        <View style={[st.content, Layout.row, { alignItems: 'center' }]}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: Colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>3/3</Text>
          </View>
          <Text style={[st.headerText2]}>Pilih Solusi</Text>
        </View>
        <View style={[st.content]}>
          <Text style={[st.headerText, { marginBottom: 10 }]}>
            Pilih Solusi<Text style={{ color: Colors.primary }}>*</Text>
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Pressable onPress={() => setSelected(1)}>
            {detailRekening.no_rekening != '' ? (
              <View
                style={[
                  st.tombol,
                  {
                    borderColor: selected == 1 ? Colors.primary : '#D0CFCF',
                    alignItems: 'center',
                  },
                ]}
              >
                <View
                  style={[
                    Layout.row,
                    {
                      width: '100%',
                      paddingBottom: 10,
                      alignItems: 'center',
                      borderBottomColor: '#ccc',
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <FastImage source={Assets.money} style={[st.icon]} />
                  <Text style={{ color: Colors.neutralBlack01 }}>
                    Transfer ke rekening
                  </Text>
                </View>
                <View
                  style={[
                    Layout.row,
                    {
                      width: '100%',
                      marginTop: 10,
                      justifyContent: 'space-between',
                      // backgroundColor: 'red',
                    },
                  ]}
                >
                  <View style={st.rekening}>
                    <Text style={{ marginRight: 10 }}>
                      {detailRekening.bank}
                    </Text>
                    <Text style={{}}>
                      {potongTulisan(detailRekening.no_rekening, 5, '***')}
                    </Text>
                    <Text style={{}}>a.n {detailRekening.nama_rekening}</Text>
                  </View>
                  <Text
                    onPress={() => setvisibleModal(true)}
                    style={{ color: Colors.otherGreen01, fontWeight: '600' }}
                  >
                    Ubah
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  Layout.row,
                  st.tombol,
                  { borderColor: selected == 1 ? Colors.primary : '#D0CFCF' },
                ]}
              >
                <FastImage source={Assets.money} style={[st.icon]} />
                <Text style={{ color: Colors.neutralBlack01 }}>
                  Transfer ke rekening
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              // console.log('haloo')
              setSelected(2)
            }}
            style={[
              Layout.row,
              st.tombol,
              {
                borderColor: selected == 2 ? Colors.primary : '#D0CFCF',
                alignItems: 'center',
              },
            ]}
          >
            <FastImage source={Assets.coin} style={[st.icon]} />
            <Text style={{ color: Colors.neutralBlack01 }}>
              Transfer dalam bentuk poin
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <View>
        {selected == 1 && detailRekening.no_rekening != '' ? (
          <ButtonBottomFloating
            onPress={() => {
              const dataSubmit = {
                fbasekey: 'testvoucher',
                po_id: data.order_id,
                alasan: 1,
                keterangan: alasan.text,
                solusi:
                  selected == 1
                    ? 'Transfer ke rekening'
                    : 'Transfer dalam bentuk poin',
                no_rek: detailRekening.no_rekening,
                bank: detailRekening.bank,
                foto: alasan.image.base64,
              }
              // console.log('dataSubmit : ', dataSubmit)
              submitComplain(dataSubmit)
            }}
            label="Ajukan"
          />
        ) : (
          <ButtonBottomFloating
            onPress={() => {
              if (selected == 1) {
                setvisibleModal(true)
              } else {
                const dataSubmit = {
                  fbasekey: 'testvoucher',
                  po_id: data.order_id,
                  alasan: 1,
                  keterangan: alasan.text,
                  solusi:
                    selected == 1
                      ? 'Transfer ke rekening'
                      : 'Transfer dalam bentuk poin',
                  no_rek: '',
                  bank: '',
                  foto: alasan.image.base64,
                }
                console.log(dataSubmit)
                submitComplain(dataSubmit)
              }
            }}
            disable={disableButton}
            label="Selanjutnya"
          />
        )}
      </View>

      {loadingrekening == false && (
        <ModalRekening
          visible={visibleModal}
          // visible={true}
          saveRekening={saveRekening}
          listrekening={listrekening}
        />
      )}

      <Modal transparent visible={loading}>
        <View style={[st.screenModal]}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <ActivityIndicator size={30} />
          </View>
        </View>
      </Modal>
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  icon: { height: 24, width: 24, marginRight: 10 },
  tombol: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderColor: '#D0CFCF',
    borderWidth: 1,
    borderRadius: 10,
  },
  tombol2: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderColor: '#D0CFCF',
    borderWidth: 1,
    borderRadius: 10,
  },
  content: { padding: 20 },
  headerText: { fontSize: 16, fontWeight: 'bold' },
  headerText2: { fontSize: 18, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },

  rekening: { flexDirection: 'row', alignItems: 'center' },
  rekeningText: { fontSize: 16, color: '#1D1619' },
  screenModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'flex-end',
  },
})
export default ComplainOrderStep3Container
