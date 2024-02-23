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
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import InvoiceWebView from '@/Components/Invoice/InvoiceWebView'
import FakturPajakForm from '@/Components/Invoice/FakturPajakForm'
import RNFetchBlob from 'rn-fetch-blob'
import { TabView, SceneMap } from 'react-native-tab-view'
import { Config } from '@/Config'
import axios from 'axios'
import ModalLoadingCenter from '@/Components/Base/ModalLoadingCenter'

const InvoiceContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [selectedtab, setselectedtab] = useState('invoice')
  const [pdfUrl, setpdfurl] = useState('')
  const [loading, setloading] = useState(true)
  const [] = useState()
  const { config, fs } = RNFetchBlob
  const idInvoice = props.route.params.order_id
  // console.log(props.route.params)
  // const pdfUrl = `https://lavender.prestisa.id/pdf/${idInvoice}.pdf`
  // const status = 'selesai'
  //   const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  const fetchData = async () => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/preview-invoice`

    const data = {
      fbasekey: state.tokenList.fcm_token,
      order_id: idInvoice,
    }
    console.log(data)
    await axios
      .post(url, data)
      .then(response => {
        console.log(response.data.data)
        setpdfurl(response.data.data)
        setloading(false)
      })
      .catch(({ response }) => {
        console.log(response.data)

        setloading(false)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={[st.screen]}>
      <View
        style={[
          Layout.row,
          {
            paddingHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            setselectedtab('invoice')
          }}
          style={[st.tab, selectedtab == 'invoice' && st.selectedtab]}
        >
          <Text
            style={[
              { fontSize: 16 },
              selectedtab == 'invoice' && st.selectedText,
            ]}
          >
            Invoice
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setselectedtab('pajak')
          }}
          style={[st.tab, selectedtab == 'pajak' && st.selectedtab]}
        >
          <Text
            style={[
              { fontSize: 16 },
              selectedtab == 'pajak' && st.selectedText,
            ]}
          >
            Faktur Pajak
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <ModalLoadingCenter show={true} />
      ) : (
        <View>
          {selectedtab == 'invoice' && (
            <InvoiceWebView pdfurl={pdfUrl} idInvoice={idInvoice} />
          )}
          {selectedtab == 'pajak' && (
            <FakturPajakForm statusTransaksi={props.route.params.status} />
          )}
        </View>
      )}
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  tab: {
    marginRight: 20,

    paddingBottom: 10,
  },
  selectedtab: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 3,
  },
  selectedText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
})
export default InvoiceContainer
