import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spacer from '@/Components/Base/Spacer'
import LabelText from '@/Components/Base/LabelText'
import FormV1 from '@/Components/Base/FormV1'
import InputBase from '@/Components/Base/InputBase'
import { EnableEPStatus } from '@/Store/loginSlice'

import { Input } from '@rneui/themed'
import { validateOnlyNumbers } from '@/Helper'
import ModalCenterTambahkanFoto from '@/Components/TulisUlasan/ModalCenterTambahkanFoto'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ButtonBottomFloatingColumn from '@/Components/Payment/ButtonBottomFloatingColumn'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { Config } from '@/Config'
import axios from 'axios'
import FastImage from 'react-native-fast-image'
import { ScrollView } from 'react-native-gesture-handler'

const MemberRegisterContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const state = useSelector(state => state)

  const dispatch = useDispatch()
  const [ktp, setktp] = useState('')
  const [fotoktp, setfotoktp] = useState('')
  const [npwp, setnpwp] = useState('')
  const [disablebutton, setdisablebutton] = useState(true)
  const [errorktp, seterrorktp] = useState(false)
  const [visibleModalAddImg, setvisibleModalAddImg] = useState(false)
  const [loading, setloading] = useState(false)
  const [visible, setvisible] = useState(false)
  const [buttonSelect, setbuttonSelect] = useState('')
  const [] = useState()

  const handlerKTP = text => {
    setktp(text)
    if (validateOnlyNumbers(text) == true && text.length == 16) {
      seterrorktp(false)
    } else {
      seterrorktp(true)
    }
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
    setvisibleModalAddImg(false)
    launchCamera({ includeBase64: true, quality: 0.5 }, result => {
      //   handleAddImage()
      //   console.log(result.assets[0])
      if (!result.didCancel) {
        return setfotoktp(result.assets[0])
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
    })
  }
  const _handleUseGallery = () => {
    setvisibleModalAddImg(false)
    launchImageLibrary({ includeBase64: true, quality: 0.5 }, result => {
      //   handleAddImage()

      if (!result.didCancel) {
        // console.log(result.assets[0])
        return setfotoktp(result.assets[0])
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
    })
  }

  const handleSubmit = async () => {
    // console.log('haloo')
    setloading(true)
    setdisablebutton(true)
    const url = Config.API_URL + `/customer-app/auth/register-ep`

    const data = {
      fbasekey: state.tokenList.fcm_token,
      ktp: ktp,
      ktp_image: fotoktp.base64,
      npwp: npwp,
    }

    // console.log(data)
    await axios
      .post(url, data)
      .then(response => {
        setloading(false)
        setdisablebutton(false)
        dispatch(EnableEPStatus())
        console.log(response.data.data)
        // navigation.reset({ index: 0, routes: [{ name: 'SuccessRegisterEP' }] })
        navigation.replace('SuccessRegisterEP')
        // setxxx(response.data.data)
      })
      .catch(({ response }) => {
        // console.log(response.data.data)
        // navigation.replace('SuccessRegisterEP')

        ToastAndroid.showWithGravity(
          response.data.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        )
        setdisablebutton(false)
      })
  }

  useEffect(() => {
    // console.log(ktp, fotoktp.uri, errorktp)
    if (ktp != '' && fotoktp.base64 != undefined && errorktp == false) {
      setdisablebutton(false)
    } else {
      setdisablebutton(true)
    }
  }, [ktp, fotoktp, seterrorktp])
  return (
    <View style={[st.screen]}>
      <Text style={[st.h1]}>Gabung jadi</Text>
      <Text style={[st.h2]}>Executive Partner</Text>
      <Spacer height={30} />
      <Text>
        Sebelum jadi Executive Partner, kita butuh ID untuk verifikasi dulu ya
      </Text>
      <Spacer height={20} />
      <LabelText title={'No. KTP'} required />
      <Input
        keyboardType="numeric"
        defaultValue=""
        value={ktp}
        placeholder="7403xxxxxxxxxxxx"
        maxLength={16}
        onChangeText={text => {
          handlerKTP(text)
        }}
        errorMessage={errorktp == true ? 'No. KTP tidak valid' : ''}
        // errorMessage={'asdasdasdasdasd'}
      />

      <Spacer height={20} />
      <LabelText title={'Upload Foto KTP'} required />
      <Pressable
        onPress={() => {
          setvisibleModalAddImg(true)
        }}
        style={[st.uploadButton]}
      >
        {fotoktp == '' ? (
          <>
            <FeatherIcon color="#aaaaaa" name="plus" size={30}></FeatherIcon>
            <Text style={{ color: '#6C6C6C', fontSize: 13 }}>Upload KTP</Text>
          </>
        ) : (
          <FastImage style={{ width: 200, height: 150 }} source={fotoktp} />
        )}
      </Pressable>
      <Spacer height={30}></Spacer>
      {/* <LabelText title={'Apakah butuh Faktur untuk pajak?'} />
      <View style={[Layout.row, { marginTop: 20 }]}>
        <Text
          onPress={() => {
            setvisible(true)
            setbuttonSelect('ya')
            // dispatch(EnableEPStatus())
          }}
          style={[
            st.buttonText,
            buttonSelect == 'tidak' && { color: Colors.neutralBlack02 },
          ]}
        >
          Ya
        </Text>
        <Text
          onPress={() => {
            setvisible(false)
            setbuttonSelect('tidak')
          }}
          style={[
            st.buttonText,
            buttonSelect == 'ya' && { color: Colors.neutralBlack02 },
          ]}
        >
          Tidak
        </Text>
      </View> */}
      {/* <Text>{buttonSelect}</Text> */}
      {visible && (
        <Input
          value={npwp}
          onChangeText={text => {
            setnpwp(text)
          }}
          placeholder="Masukkan no NPWP anda"
        />
      )}
      <ButtonBottomFloating
        onPress={() => {
          handleSubmit()
        }}
        disable={disablebutton}
        label="Gabung Executive Partner"
      />
      {/* <ButtonBottomFloatingColumn></ButtonBottomFloatingColumn> */}
      <ModalCenterTambahkanFoto
        title="Upload Foto KTP"
        isVisible={visibleModalAddImg}
        onClose={() => setvisibleModalAddImg(false)}
        onUseCam={_handleUseCamera}
        onUseGallery={_handleUseGallery}
      />
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  h1: { fontSize: 20 },
  h2: { fontSize: 28, fontWeight: 'bold' },
  t14: { fontSize: 14 },
  uploadButton: {
    marginTop: 10,
    borderColor: '#B6B6B6',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    padding: 30,
  },
  buttonText: {
    color: '#0B4DBF',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 30,
  },
})
export default MemberRegisterContainer
