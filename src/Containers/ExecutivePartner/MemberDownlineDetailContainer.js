import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { numberWithCommas } from '@/Helper'
import { Config } from '@/Config'
import axios from 'axios'
import moment from 'moment'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'

const MemberDownlineDetailContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [downline, setdownline] = useState()
  const [loading, setloading] = useState(true)
  const [] = useState()

  const _renderItem = ({ item }) => {
    return (
      <View
        // key={index}
        style={[
          Layout.row,
          {
            paddingVertical: 20,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          },
        ]}
      >
        <View style={[Layout.row, { flex: 1 }]}>
          <Text style={[st.text12, { marginRight: 20 }]}>
            {moment.unix(item.transaction_date).format('DD/MM/YY')}
          </Text>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={st.text12}>{item.name}</Text>
            <Text style={[st.text12, { marginTop: 5 }]}>
              Rp{numberWithCommas(item.cost)}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
          + {numberWithCommas(item.point)} points
        </Text>
      </View>
    )
  }

  const fetchData = async () => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/ep-downline-detail`

    await axios
      .post(url, {
        fbasekey: state.tokenList.fcm_token,

        // fbasekey: 'testvoucher',
        downline_id: props.route.params.id,
      })
      .then(response => {
        console.log(response.data.data)
        setdownline(response.data.data)
        setloading(false)
      })
      .catch(({ response }) => {
        setloading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={[st.screen]}>
      {loading == true ? (
        <LoadingIndicator />
      ) : (
        <View>
          <View
            style={[Layout.row, { padding: 20, backgroundColor: '#EBEDF1' }]}
          >
            <FastImage
              style={{
                width: 44,
                height: 44,
                borderRadius: 20,
                marginRight: 10,
                borderWidth: 0,
              }}
              source={{
                uri:
                  downline.profile.avatar_image == null
                    ? 'https://lavender.prestisa.id/assets/images/customer_app/icon/akunprofile.png'
                    : downline.profile.avatar_image,
              }}
            />
            <View>
              <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 5 }}>
                {downline.profile.name}
              </Text>
              <View style={[Layout.row]}>
                <Text style={[st.pill]}>
                  {downline.profile.layer == 2 ? '2nd Layer' : '3rd Layer'}
                </Text>
                <Text style={[st.pill]}>
                  Tergabung{' '}
                  {moment
                    .unix(downline.profile.join_date_epoch)
                    .format('DD MM YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {downline.history.length > 0 ? (
              <View style={{ padding: 20 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 20 }}
                >
                  Pendapatan Point
                </Text>

                <FlatList
                  data={downline.history}
                  renderItem={_renderItem}
                  keyExtractor={(item, index) => index}
                />
              </View>
            ) : (
              <Text style={{ alignSelf: 'center', paddingVertical: 50 }}>
                Belum ada Transaksi
              </Text>
            )}
          </View>
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
  pill: {
    color: 'white',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#0654B9',
    borderRadius: 20,
    marginRight: 5,
  },
  text12: { fontSize: 12 },
})
export default MemberDownlineDetailContainer
