import React, { useState, useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from '@rneui/themed'
import HistoryTracking from '@/Components/Tracking/HistoryTracking'
import ModalTheaterOrder from '@/Components/Transaction/ModalTheaterOrder'
import { Config } from '@/Config'
import axios from 'axios'

const TrackingOrderContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [] = useState()
  const [data, setData] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [imageModal, setImageModal] = useState(null)

  function badgeColor(status) {
    if (status == 'done') {
      return { color: Colors.otherGreen01, background: '#C6ECC6' }
    } else if (status == 'cancel') {
      return { color: '#CB3A31', background: '#FEF2F1' }
    } else {
      return { color: '#7B3F07', background: '#FBE19E' }
    }
  }

  function getData() {
    const url = `${Config.CUSTOMER_APP}/tracking-order`
    const payload = {
      fbasekey: state.tokenList.fcm_token,
      po_id: props.route.params.po_id,
    }
    axios
      .post(url, payload)
      .then(response => {
        setData(response.data.data)
      })
      .catch(error => {
        if (error.response) {
          console.log('error.response')
          console.log(error.response)
          // The request was made and the server responded with a status code
          // that falls out of the range of 2x
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      })
  }

  const handleModal = data => {
    setImageModal({ image: data })
    setModalActive(true)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={[st.screen, Layout.fill]}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            backgroundColor: badgeColor(data.status).background,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: badgeColor(data.status).color,
            }}
          >
            {data.status == 'done' ? 'Selesai' : 'Dalam Perjalanan'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('press on touch detail pesanan')
          }}
        >
          <Text style={{ color: Colors.otherGreen01, fontWeight: '500' }}>
            Detail Pesanan
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: Colors.neutralBlack02,
            fontWeight: '400',
            fontSize: 13,
          }}
        >
          {data.status == 'done'
            ? 'Transaksi pesanan selesai'
            : 'Transaksi dalam proses'}
        </Text>
        <Text
          style={{
            color: Colors.neutralBlack02,
            fontWeight: '400',
            fontSize: 13,
          }}
        >
          {data.created_at}
        </Text>
      </View>
      <View
        style={{
          paddingVertical: 15,
          borderBottomColor: '#eee',
          borderBottomWidth: 3,
          marginBottom: 20,
        }}
      />
      {data.hasOwnProperty('history') ? (
        <>
          {data.history.map((res, index) => (
            <HistoryTracking
              key={index}
              data={res}
              number={data.history.length}
              index={index}
              theater={data => {
                if (data != null) {
                  handleModal(data)
                }
              }}
            />
          ))}
        </>
      ) : (
        <></>
      )}
      {imageModal != null && (
        <Modal transparent visible={modalActive}>
          <ModalTheaterOrder
            data={imageModal}
            closeTheater={() => setModalActive(false)}
          />
        </Modal>
      )}
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  history: {
    borderRadius: 30,
    backgroundColor: Colors.primary,
    borderColor: '#EBD6DF',
    borderWidth: 3,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: -15,
  },
})
export default TrackingOrderContainer
