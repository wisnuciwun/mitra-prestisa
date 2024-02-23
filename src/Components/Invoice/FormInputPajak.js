import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LabelText from '../Base/LabelText'
import InputTextTwoIconRight from '../Base/InputTextTwoIconRight'

import FormV1 from '../Base/FormV1'
import InputTextBottomLine from '../Base/InputTextBottomLine'
import FastImage from 'react-native-fast-image'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import ImagePicker from './ImagePicker'
import ModalCenterTambahkanFoto from '../TulisUlasan/ModalCenterTambahkanFoto'
import Spacer from '../Base/Spacer'
import ButtonBottomFloatingColumn from '../Payment/ButtonBottomFloatingColumn'
import ButtonBottomFloating from '../ButtonBottomFloating'
import RNFetchBlob from 'rn-fetch-blob'
import ModalLoadingCenter from '../Base/ModalLoadingCenter'

const FormInputPajak = props => {
  const edit = props.edit
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [visibleModalAddImg, setvisibleModalAddImg] = useState(false)

  const [imageNpwp, setimageNpwp] = useState(null)
  const [email, setemail] = useState('')
  const [npwp, setnpwp] = useState('')
  const [namapt, setnamapt] = useState('')
  const [alamat, setalamat] = useState('')

  const [disablebutton, setdisablebutton] = useState(true)
  const [validemail, setvalidemail] = useState(true)
  const [validnpwp, setvaidnpwp] = useState(true)
  const [validalamat, setvalidalamat] = useState(true)
  const [imageEncode, setimageEncode] = useState('')
  const [editimage, setEditImage] = useState(false)
  const [loading, setloading] = useState(false)

  const buttonText = props.hasOwnProperty('button')
    ? props.button
    : 'Konfirmasi'

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
      if (!result.didCancel) {
        setEditImage(true)
        setimageEncode(result.assets[0].base64)
        return setimageNpwp(result.assets[0])
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
        setimageEncode(result.assets[0].base64)

        setEditImage(true)

        return setimageNpwp(result.assets[0])
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
    })
  }

  function cekvalidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleremailInput = email => {
    const valid = cekvalidEmail(email)

    setemail(email)
    if (valid) {
      setvalidemail(true)
    } else {
      setvalidemail(false)
    }
  }

  const handlerenpwpInput = npwp => {
    setnpwp(npwp)
    if (npwp.length === 15) {
      setvaidnpwp(true)
    } else {
      setvaidnpwp(false)
    }
  }

  const handlerAlamatInput = alamat => {
    setalamat(alamat)
    if (alamat.length >= 15) {
      setvalidalamat(true)
    } else {
      setvalidalamat(false)
    }
  }

  useEffect(() => {
    if (
      namapt.length > 0 &&
      email.length > 0 &&
      npwp.length > 0 &&
      alamat.length > 0 &&
      imageNpwp != null &&
      validemail == true &&
      validnpwp == true &&
      validalamat == true
    ) {
      setdisablebutton(false)
    } else {
      setdisablebutton(true)
    }
  }, [namapt, email, npwp, alamat, imageNpwp])

  useEffect(() => {
    if (edit == true) {
      setnamapt(props.data.company_name)
      setnpwp(props.data.company_npwp)
      setemail(props.data.company_email)
      setalamat(props.data.company_address)
      setimageNpwp(props.data.npwp_image)
    }
  }, [])

  useEffect(() => {
    if (props.data.hasOwnProperty('npwp_image')) {
      RNFetchBlob.fetch('GET', props.data.npwp_image)
        .then(res => {
          let status = res.info().status
          if (status == 200) {
            setimageEncode(res.data)
          } else {
            // handle other status codes
          }
        })
        // Something went wrong:
        .catch((errorMessage, statusCode) => {
          // error handling
        })
    }
  }, [])

  return (
    <>
      <ScrollView style={[st.screen, { height: windowHeight - 110 }]}>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <LabelText title={'Nama Perusahaan'} required={true} />
            <InputTextBottomLine
              onChangeText={text => {
                setnamapt(text)
              }}
              value={namapt}
              maxLength={30}
              errorMessage={''}
              isError={false}
            />
            <LabelText title={'No. NPWP Perusahaan'} required={true} />
            <InputTextBottomLine
              onChangeText={text => {
                handlerenpwpInput(text)
              }}
              value={npwp}
              keyboardType="number-pad"
              maxLength={15}
              errorMessage={validnpwp == false ? 'Nomor harus 15 Karakter' : ''}
              isError={!validnpwp}
            />
            <LabelText title={'Email Perusahaan'} required={true} />
            <InputTextBottomLine
              onChangeText={text => {
                handleremailInput(text)
              }}
              value={email}
              keyboardType="email-address"
              maxLength={30}
              errorMessage={
                validemail == false ? 'Penulisan Email belum lengkap' : ''
              }
              isError={!validemail}
            />
            <LabelText title={'Alamat'} required={true} />
            <InputTextBottomLine
              onChangeText={text => {
                handlerAlamatInput(text)
              }}
              //   keyboardType="number-pad"
              value={alamat}
              errorMessage={validalamat == false ? 'Minimum 15 Karakter' : ''}
              isError={!validalamat}
            />
            <LabelText title={'Foto NPWP'} required={true} />
            <Spacer height={10} />
            <ImagePicker
              editimage={editimage}
              edit={edit}
              onCancel={() => setimageNpwp(null)}
              onPress={() => {
                setvisibleModalAddImg(true)
              }}
              imageNpwp={imageNpwp}
            />
          </View>
          <Spacer height={40} />
        </View>
        <ModalCenterTambahkanFoto
          isVisible={visibleModalAddImg}
          onClose={() => setvisibleModalAddImg(false)}
          onUseCam={_handleUseCamera}
          onUseGallery={_handleUseGallery}
        />
        <ModalLoadingCenter show={loading} />
      </ScrollView>
      <View style={{}}>
        <ButtonBottomFloating
          disable={disablebutton}
          label={buttonText}
          onPress={() => {
            setloading(true)
            props.save({
              company_name: namapt,
              company_email: email,
              company_address: alamat,
              company_npwp: npwp,
              npwp_image: imageEncode,
            })
          }}
        />
      </View>
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
})
export default FormInputPajak
