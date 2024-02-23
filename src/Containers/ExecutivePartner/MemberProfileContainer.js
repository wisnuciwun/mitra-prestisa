import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { Divider } from '@rneui/themed'
import Clipboard from '@react-native-clipboard/clipboard'
import Share from 'react-native-share'
import { Config } from '@/Config'
import axios from 'axios'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import moment from 'moment'

const MemberProfileContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const login = state.login.data

  const [profile, setProfile] = useState(null)
  const [loading, setloading] = useState(true)
  const [] = useState()

  const copyToClipboard = text => {
    Clipboard.setString(text)
    ToastAndroid.showWithGravity(
      'Kode referral anda berhasil disalin',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    )
  }

  const shareHandler = async () => {
    // const url = btoa('url')
    options = {
      message: 'http://google.com',
      title: 'Bagikan Kode Referal',
      // url: Buffer.from('url').toString('base64'),
    }
    Share.open(options)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        err && console.log(err)
      })
  }

  const fetchData = async () => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/ep-member-info`

    await axios
      .post(url, {
        fbasekey: state.tokenList.fcm_token,
      })
      .then(response => {
        console.log(response.data)
        setProfile(response.data)
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
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 0.75, y: 0.5 }}
        locations={[0.3, 1]}
        colors={['#4F174CB2', '#CC3776']}
        style={{ flex: 1 }}
        useAngle={true}
        angle={300}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}
        >
          <Icon color={'white'} name="arrow-left" size={25} />
          <Text
            style={[
              st.title,
              { color: 'white', marginLeft: -20, fontSize: 18 },
            ]}
          >
            Executive Partner
          </Text>
          <Text style={[st.title, { color: 'white' }]}></Text>
        </View>
        {loading == true ? (
          <LoadingIndicator />
        ) : (
          <>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <FastImage
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 44,
                  marginVertical: 20,
                }}
                source={{
                  uri: login.user.avatar_image,
                }}
              />
              <Text style={[st.h1, st.whiteText]}>{login.user.full_name}</Text>
              <Text style={[st.h2, st.whiteText]}>
                Gabung{' '}
                {moment.unix(login.user.join_date_epoch).format('DD MMM YYYY')}
              </Text>
              {profile.data.upline_info.name != '' && (
                <Text style={[st.h2, st.whiteText]}>
                  Upline : {profile.data.upline_info.name}
                </Text>
              )}
            </View>
            <View style={st.content}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={[st.whiteText, { fontSize: 16 }]}>
                  Kode Referal :
                </Text>
                <View
                  style={[
                    Layout.row,
                    {
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text
                    style={[st.whiteText, { fontSize: 16, fontWeight: 'bold' }]}
                  >
                    {profile.data.profile.referal_code}
                  </Text>
                  <View
                    style={[
                      Layout.row,
                      { justifyContent: 'space-between', alignItems: 'center' },
                    ]}
                  >
                    <FeatherIcon
                      onPress={() => shareHandler()}
                      color={'white'}
                      size={24}
                      name="share-2"
                      style={{ marginRight: 15 }}
                    ></FeatherIcon>
                    <FeatherIcon
                      onPress={() => {
                        copyToClipboard('23E43Q12')
                      }}
                      color={'white'}
                      size={24}
                      name="copy"
                    ></FeatherIcon>
                  </View>
                </View>
              </View>
            </View>
            <View style={[st.content]}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Pressable
                  onPress={() => {
                    navigation.navigate('MemberData', {
                      data: profile.data.identity,
                    })
                  }}
                  style={[
                    Layout.row,
                    {
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 20,
                    },
                  ]}
                >
                  <Text style={[st.h3]}>Data Pribadi</Text>
                  <FeatherIcon size={20} name="chevron-right"></FeatherIcon>
                </Pressable>
                <Divider />
                <Pressable
                  onPress={() => {
                    navigation.navigate('MemberDownline', {
                      // data: profile.data.downline,
                    })
                  }}
                  style={[
                    Layout.row,
                    {
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 20,
                    },
                  ]}
                >
                  <Text style={[st.h3]}>Member</Text>
                  <FeatherIcon size={20} name="chevron-right"></FeatherIcon>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </LinearGradient>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  whiteText: { color: 'white' },
  content: { paddingHorizontal: 20, paddingVertical: 10 },
  h1: {
    fontSize: 20,
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  h2: { fontSize: 12, opacity: 0.7, marginTop: 5 },
})
export default MemberProfileContainer
