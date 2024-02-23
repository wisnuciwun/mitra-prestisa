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
import CardTransaksi from '@/Components/Transaction/CardTransaksi'
import CardKomplain from '@/Components/Transaction/CardKomplain'
import { ScrollView } from 'react-native-gesture-handler'
import { info_data_product_multi_v1 } from '@/Components/RingkasanPesanan/Helper'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { Config } from '@/Config'
import FastImage from 'react-native-fast-image'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import axios from 'axios'

const ComplainOrderContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [selectedAlasan, setselectedAlasan] = useState()
  const [disableButton, setdisablebutton] = useState(true)

  const [loading, setloading] = useState(true)
  const [dataAlasan, setdataAlasan] = useState(null)
  const [dataOrder, setdataOrder] = useState(null)

  const data = props.route.params.data
  const status = props.route.params.status

  const fetchDataAlasan = async () => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/preview-complain`

    await axios
      .post(url, {
        fbasekey: 'testvoucher',
        po_id: data.po_id,
      })
      .then(response => {
        setdataAlasan(response.data.data.reasons)
        setdataOrder(response.data.data.preview_product)
        setloading(false)
      })
      .catch(({ response }) => {
        setloading(false)
      })
  }
  useEffect(() => {
    if (selectedAlasan != null) {
      setdisablebutton(false)
    }
  }, [selectedAlasan])

  useEffect(() => {
    fetchDataAlasan()
  }, [])
  return (
    <>
      {loading == true ? (
        <LoadingIndicator />
      ) : (
        <>
          <ScrollView style={[st.screen, Layout.fill, { marginBottom: 70 }]}>
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
                <CardKomplain
                  order={dataOrder}
                  data={data}
                  status={status.status}
                />
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
                <Text style={{ fontSize: 18, color: 'white' }}>1/3</Text>
              </View>
              <Text style={[st.headerText2]}>Pesanan Bermasalah ?</Text>
            </View>
            <View style={[st.content]}>
              <Text style={[st.headerText, { marginBottom: 10 }]}>
                Pilih Alasan<Text style={{ color: Colors.primary }}>*</Text>
              </Text>
              {dataAlasan.map((data, index) => {
                let selected = false
                if (data.id == selectedAlasan) {
                  selected = true
                }

                return (
                  <View key={index}>
                    <Pressable
                      onPress={() => setselectedAlasan(data.id)}
                      style={[
                        Layout.row,
                        {
                          alignItems: 'center',
                          paddingVertical: 15,
                          paddingHorizontal: 15,
                          borderColor:
                            selected == true ? Colors.primary : '#ccc',
                          borderWidth: 1,
                          borderRadius: 5,
                          marginBottom: 15,
                        },
                      ]}
                    >
                      <FastImage
                        style={{ width: 24, height: 24, marginRight: 10 }}
                        source={{ uri: data.icon }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            selected == true
                              ? Colors.primary
                              : Colors.neutralBlack02,
                        }}
                      >
                        {data.title}
                      </Text>
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </ScrollView>
          <View>
            <ButtonBottomFloating
              onPress={() => {
                navigation.navigate('Komplain2', {
                  selectedAlasan: selectedAlasan,
                  dataOrder: dataOrder,
                  status: status,
                })
              }}
              disable={disableButton}
              label="Selanjutnya"
            />
          </View>
        </>
      )}
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  content: { padding: 20 },
  headerText: { fontSize: 16, fontWeight: 'bold' },
  headerText2: { fontSize: 18, fontWeight: '600' },
})
export default ComplainOrderContainer
