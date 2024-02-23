import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { Button } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Common, Images, Layout } from '@/Theme'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import ButtonBase from '@/Components/Base/ButtonBase'
import { Colors } from '@/Theme/Variables'
import SeparatorWithText from '@/Components/Base/SeparatorWithText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import LogoGoogle from '../Assets/Images/Logo/Google.svg'
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import { setGuest } from '@/Store/guestSlice'
import { isNull } from 'lodash'

// GoogleSignin.configure({
//   webClientId:
//     '461688067259-85jivf83jsisn58205i2n7372d3s9pii.apps.googleusercontent.com',
// })
// GoogleSignin.configure({
//   androidClientId: 'AIzaSyC-J_A9eLxcWajA5L5eUqEm8v-c7zmRBrA',
// })

const AuthContainer = ({ navigation }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { ratio } = useSelector(state => state.ratioScreen.ratio)
  // console.log('TOKEN', state.tokenList.fcm_token)

  const [user, setUser] = useState()

  const handleLoginGoogle = async () => {
    // const { idToken } = await GoogleSignin.signIn()
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    // const url =
    //   'https://lavender.prestisa.id/api/customer-app/auth/callback-sso'
    // console.log('ID TOKEN', idToken)
    // console.log('GOOGLE CREDENTIAL', googleCredential)
    // return auth().signInWithCredential(googleCredential)
    // const onAuthStateChanged = user => {
    //   setUser(user)
    // }
    // return auth().onAuthStateChanged(onAuthStateChanged)
    // GoogleSignin.configure({
    //   androidClientId: 'AIzaSyC-J_A9eLxcWajA5L5eUqEm8v-c7zmRBrA',
    // })
    //
    //
    //
    // GoogleSignin.hasPlayServices()
    //   .then(hasPlayService => {
    //     console.log('PLAY SERVICE', hasPlayService)
    //     if (hasPlayService) {
    //       GoogleSignin.signIn()
    //         .then(userInfo => {
    //           const res = JSON.stringify(userInfo)
    //           console.log('USER_INFO:', JSON.stringify(userInfo))
    //           GoogleSignin.getCurrentUser()
    //             .then(res => {
    //               navigation.navigate('FormDaftar', {
    //                 email: res.user.email,
    //                 name: res.user.name,
    //                 GoogleSSONotRegistered: true,
    //               })
    //             })
    //             .catch(err => {
    //               console.log('CURRENT USER ERR', err)
    //             })
    //           // axios
    //           //   .post(url, payload)
    //           //   .then(res => {
    //           //     console.log('RESPONSE_CALLBACK', res)
    //           //   })
    //           //   .catch(err => {
    //           //     console.log('ERROR_CALLBACK:', err.response.data)
    //           //   })
    //         })
    //         .catch(e => {
    //           console.log('ERROR IS: ' + JSON.stringify(e))
    //         })
    //     }
    //   })
    //   .catch(e => {
    //     console.log('ERROR IS LAST: ' + JSON.stringify(e))
    //   })
  }

  useEffect(() => {}, [])

  // console.log('USER', user)
  return (
    <View style={[styles.screen]}>
      <View style={[Layout.alignItemsCenter, ,]}>
        <Brand height={ratio.isFit ? 52 : 70} />
      </View>
      <View style={[Layout.alignItemsCenter]}>
        <Image
          source={Images.signup}
          style={[
            {
              width: ratio.isFit ? 113 : 200,
              height: ratio.isFit ? 113 : 200,
              marginTop: 30,
              // marginVertical: 30,
              alignSelf: 'center',
            },
          ]}
        ></Image>
        <Text
          style={[
            Fonts.textSmall,
            {
              marginTop: 10,
              fontFamily: 'Roboto-Regular',
              fontSize: 15,
              fontWeight: '400',
              color: Colors.neutralBlack02,
            },
          ]}
        >
          Beli bunga jadi lebih mudah
        </Text>
      </View>

      <View style={[Layout.fullwidth, { marginTop: ratio.isFit ? 38 : 50 }]}>
        <ButtonBase
          onPress={() => {
            navigation.navigate('DaftarHandphone')
          }}
          mode="gradient"
          title={'Buat Akun Baru'}
        ></ButtonBase>
      </View>
      <View style={[Layout.fullwidth, { marginTop: 20 }]}>
        <ButtonBase
          onPress={() => {
            navigation.navigate('LoginPhoneOrEmail', {
              successResetPassword: false,
            })
          }}
          mode="outline"
          title={' Saya sudah punya akun'}
        ></ButtonBase>
      </View>

      {/* <View style={[Gutters.largeTPadding]}>
        <SeparatorWithText title="atau masuk dengan"></SeparatorWithText>
      </View>
      <View style={(Layout.justifyContentBetween, Layout.column)}>
        <TouchableOpacity
          onPress={() => {
            handleLoginGoogle()
          }}
          style={[Layout.rowCenter, Gutters.largeVMargin]}
        >
          <Image
            source={Images.google}
            style={{ width: 30, height: 30, marginRight: 10 }}
            // width={20}
            // height={20}
            resizeMode="contain"
          ></Image>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Roboto-Regular',
              fontSize: 16,
              color: Colors.neutralGray01,
            }}
          >
            Akun Google
          </Text>
        </TouchableOpacity>
      </View> */}
      <View
        style={[
          { position: 'absolute', bottom: 0, flex: 1, width: windowWidth },
        ]}
      >
        <View style={[{ flex: 1 }, Gutters.largeVPadding, Layout.rowCenter]}>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              })
              dispatch(setGuest({ isGuest: true }))
            }}
          >
            <Text
              style={
                ([Fonts.textSmall],
                {
                  fontWeight: '500',
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  color: Colors.neutralBlack02,
                })
              }
            >
              Lewati dulu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
})
export default AuthContainer
