import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar } from '@rneui/themed'
import { Assets } from '@/Theme/Assets'
import moment from 'moment'
import Input from '@/Components/Base/InputTextBottomLine'
import ModalCenterTambahkanFoto from '@/Components/TulisUlasan/ModalCenterTambahkanFoto'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { userInfoStyles } from '@/Components/Home/Styles'
import FastImage from 'react-native-fast-image'
import { format } from 'date-fns'
import { Config } from '@/Config'
import axios from 'axios'
import { noAva } from '@/Components/Account/Helper'

const ProfileContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [] = useState()
  const [modal, setModal] = useState(false)
  const [avatar, setAvatar] = useState('')

  useEffect(() => {}, [])

  const handleIndentifier = identifier => {
    setIdentifier(identifier)
    setErrorIdentifier(false)
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given')
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const _handleUseCamera = async () => {
    await requestCameraPermission()
    setModal(false)
    launchCamera({ includeBase64: true, quality: 0.5 }, result => {
      //   handleAddImage()
      if (!result.didCancel) {
        return setAvatar(result.assets[0])
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
    })
  }

  const _handleUseGallery = () => {
    setModal(false)
    launchImageLibrary({ includeBase64: true, quality: 0.5 }, result => {
      //   handleAddImage()

      if (!result.didCancel) {
        return setAvatar(result.assets[0])
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
    })
  }

  const HeaderSection = ({ isGuest = true }) => {
    const mediumText = {
      fontFamily: Fonts.medium,
      fontSize: 20,
      color: Colors.white,
      lineHeight: 24,
      textTransform: 'capitalize',
    }
    const styles = StyleSheet.create({
      _mediumText: mediumText,
    })
    const state = useSelector(state => state)

    return (
      <View style={{ marginBottom: 24 }}>
        {isGuest ? (
          <>
            <Avatar
              containerStyle={{
                backgroundColor: Colors.otherOrange,
                padding: 18,
              }}
              source={Assets.icon_tabler_seeding_white_big_3x}
              size={90}
              rounded
            />
            <Text style={[{ ...styles._mediumText }, { marginTop: 16 }]}>
              Tamu
            </Text>
          </>
        ) : (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  overflow: 'hidden',
                }}
              >
                <Avatar
                  source={{
                    uri: noAva(state.login.data.user.avatar_image),
                  }}
                  size={90}
                  rounded
                />
                <View
                  style={{
                    backgroundColor: Colors.neutralBlack01,
                    opacity: 0.6,
                    width: 90,
                    height: 25,
                    position: 'absolute',
                    alignItems: 'center',
                    bottom: 0,
                  }}
                >
                  <Text
                    style={{
                      paddingTop: 3,
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: '500',
                    }}
                    onPress={() => setModal(true)}
                  >
                    Ubah
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text
                  style={[
                    { ...styles._mediumText },
                    { marginTop: 16 },
                    { color: Colors.neutralBlack02 },
                  ]}
                >
                  {state.login.data.user.full_name}
                </Text>
                <Text
                  style={{
                    ...styles._mediumText,
                    fontSize: 12,
                    color: Colors.neutralGray02,
                  }}
                >
                  Joined{' '}
                  {format(
                    moment(
                      state.login.data.user.join_date,
                      'DD-MM-YYYY HH:mm:ss',
                    ).toDate(),
                    'dd MMMM yyyy',
                  )}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    )
  }

  const handleVerification = args => {
    const url = `${Config.CUSTOMER_APP}/auth/request-verify-email`
    const payload = {
      fbasekey: state.tokenList.fcm_token,
    }
    console.log('send link')
    axios
      .post(url, payload)
      .then(response => {
        console.log('response')
        console.log(response)
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

  const Profile = () => {
    return (
      <View style={{ marginTop: 12 }}>
        <View style={{ paddingBottom: 12 }}>
          <Input
            label="Nama"
            value={state.login.data.user.full_name}
            disabled={true}
            placeholder="Masukkan Nama"
            rightIcon={
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileName')}
              >
                <Icon
                  size={20}
                  style={{ position: 'absolute', right: 0, top: 0 }}
                  name="edit-3"
                />
              </TouchableOpacity>
            }
            inputContainerStyle={{ borderBottomColor: '#fff' }}
            errorStyle={{ marginBottom: 0 }}
          />
        </View>
        <View style={st.item}>
          <Input
            label="Alamat Email"
            value={state.login.data.user.email}
            placeholder="Masukkan Alamat Email"
            disabled={true}
            rightIcon={
              state.login.data.user.verified ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileEmail')}
                >
                  <Icon
                    size={20}
                    style={{ position: 'absolute', right: 0, top: 0 }}
                    name="edit-3"
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )
            }
            inputContainerStyle={{ borderBottomColor: '#fff' }}
            errorStyle={{ marginBottom: 0 }}
          />
          {state.login.data.user.verified ? (
            <View
              style={{
                position: 'relative',
                top: -50,
                left: -50,
              }}
            >
              <FastImage
                source={Assets.icon_verified_3x}
                resizeMode={'contain'}
                style={([userInfoStyles.iconVerified], { height: 20 })}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleVerification()}>
              <Text style={{ color: '#0B4DBF', fontWeight: '500' }}>
                Kirim Link Verifikasi
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={st.item}>
          <Input
            label="No. Handphone"
            value={state.login.data.user.phone}
            disabled={true}
            placeholder="Masukkan No.Handphone"
            rightIcon={
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfilePhone')}
              >
                <Icon
                  size={20}
                  style={{ position: 'absolute', right: 0, top: 0 }}
                  name="edit-3"
                />
              </TouchableOpacity>
            }
            inputContainerStyle={{ borderBottomColor: '#fff' }}
            errorStyle={{ marginBottom: 0 }}
          />
        </View>
        <View style={st.item}>
          <Input
            label="Password"
            value="**********"
            disabled={true}
            placeholder="Masukkan Password"
            rightIcon={
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfilePassword')}
                >
                  <Icon
                    size={20}
                    style={{ position: 'absolute', right: 0, top: 0 }}
                    name="edit-3"
                  />
                </TouchableOpacity>
                <Icon
                  size={20}
                  style={{ position: 'absolute', right: 40, top: 0 }}
                  name="eye-off"
                />
              </>
            }
            inputContainerStyle={{ borderBottomColor: '#fff' }}
            errorStyle={{ marginBottom: 0 }}
          />
        </View>
      </View>
    )
  }

  return (
    <>
      <View style={[st.screen, Layout.fill]}>
        <ScrollView style={{ paddingHorizontal: 24 }}>
          <HeaderSection isGuest={state.guest.data.isGuest} />
          <View style={st.card}>
            <Text style={{ color: Colors.neutralBlack02, fontWeight: '600' }}>
              Profile
            </Text>
            <Profile />
          </View>
          <View style={st.card}>
            <Text style={{ color: Colors.neutralBlack02, fontWeight: '600' }}>
              Laporan
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <Icon size={20} name="file-minus" />
                <Text style={{ marginLeft: 15 }}>Faktur Pajak</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileFaktur')}
              >
                <Icon size={20} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <ModalCenterTambahkanFoto
        title="Ubah Foto Profile"
        isVisible={modal}
        onClose={() => setModal(false)}
        onUseCam={_handleUseCamera}
        onUseGallery={_handleUseGallery}
      />
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F6F8',
  },
  item: {
    borderTopColor: Colors.neutralGray05,
    paddingBottom: 12,
    borderTopWidth: 1,
  },
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
})
export default ProfileContainer
