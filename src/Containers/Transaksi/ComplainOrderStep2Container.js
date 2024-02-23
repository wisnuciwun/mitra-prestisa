import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ImgToBase64 from 'react-native-image-base64'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import LabelText from '@/Components/Base/LabelText'
import InputWithCounter2 from '@/Components/Base/InputWithCounter2'
import ModalCenter from '@/Components/Base/ModalCenter'
import ModalCenterTambahkanFoto from '@/Components/TulisUlasan/ModalCenterTambahkanFoto'
import FastImage from 'react-native-fast-image'
import { url } from '@/Config'

const ComplainOrderContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [disableButton, setdisablebutton] = useState(true)
  const [boxAddImageIndex, setBoxAddImageIndex] = useState(null)

  const [imagesKomplain, setimagesKomplain] = useState(null)
  const [visibleModalAddImg, setvisibleModalAddImg] = useState(false)
  const [alasan, setalasan] = useState('')
  const [] = useState()
  const selectedAlasan = props.route.params.selectedAlasan
  const status = props.route.params.status
  const order = props.route.params.dataOrder

  // console.log('selectedAlasan', props.route.params)
  // const data = {
  //   order_id: '123',
  //   product_name: 'Yellow Bouquet - 01',
  //   city: 'Jakarta Barat',
  //   id: 1,
  //   name: 'Menunggu Pembayaran',
  //   price: 234000,
  //   category: 'no category',
  //   image: ['https://lavender.prestisa.id/assets/images/products/BPDC-1.png'],
  //   date: '06 Jul 2022',
  // }

  const data = props.route.params.dataOrder

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
        // console.log('Camera permission given')
      } else {
        // console.log('Camera permission denied')
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
        return setimagesKomplain(result.assets[0])
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
        console.log(result.assets[0])
        return setimagesKomplain(result.assets[0])
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
    })
  }

  useEffect(() => {
    if (alasan != '' && imagesKomplain.base64 != '') {
      setdisablebutton(false)
    } else {
      setdisablebutton(true)
    }
  }, [alasan, imagesKomplain])
  return (
    <>
      <ScrollView style={[st.screen, Layout.fill, { marginBottom: 80 }]}>
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
            <Text style={{ fontSize: 18, color: 'white' }}>2/3</Text>
          </View>
          <Text style={[st.headerText2]}>Tambah Foto Pendukung</Text>
        </View>
        <View style={[st.content]}>
          <View>
            <LabelText
              TextStyle={[st.headerText, { marginBottom: 10 }]}
              title={'Foto'}
              required={true}
            />

            {imagesKomplain !== null ? (
              <View style={{ position: 'relative' }}>
                <FeatherIcon
                  onPress={() => {
                    setimagesKomplain(null)
                  }}
                  name="x"
                  size={20}
                  color="white"
                  style={{
                    padding: 2,
                    backgroundColor: Colors.neutralGray02,
                    position: 'absolute',
                    left: 95,
                    zIndex: 110,
                    top: -10,
                    borderRadius: 20,
                    borderColor: 'white',
                    // borderWidth: 2,
                  }}
                ></FeatherIcon>
                <FastImage
                  style={{
                    width: 108,
                    height: 108,
                    overflow: 'hidden',
                    borderRadius: 10,
                    borderColor: 'white',
                    borderWidth: 0,
                  }}
                  source={{ uri: imagesKomplain.uri }}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setvisibleModalAddImg(true)
                }}
                style={[st.fotoContainer]}
              >
                <View style={{ alignItems: 'center' }}>
                  <Icon color={'#B2B0B1'} size={40} name="plus"></Icon>
                  <Text
                    style={{ color: '#B2B0B1', fontSize: 13, marginTop: 0 }}
                  >
                    Unggah Foto
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <LabelText
              TextStyle={[st.headerText, { marginTop: 30, marginBottom: 10 }]}
              title={'Keterangan'}
              required={true}
            />
            <InputWithCounter2
              onChangeText={text => {
                setalasan(text)
              }}
              containerStyle={{ marginTop: 10 }}
              isRequired={true}
              multiline={true}
              maxLength={150}
              numberOfLines={6}
            />
          </View>
        </View>
      </ScrollView>
      <ModalCenterTambahkanFoto
        isVisible={visibleModalAddImg}
        onClose={() => setvisibleModalAddImg(false)}
        onUseCam={_handleUseCamera}
        onUseGallery={_handleUseGallery}
      />

      <View>
        <ButtonBottomFloating
          onPress={() => {
            navigation.navigate('Komplain3', {
              selectedAlasan: selectedAlasan,
              alasan: { text: alasan, image: imagesKomplain },
              dataOrder: order,
              status: status,
            })
          }}
          disable={disableButton}
          label="Selanjutnya"
        />
      </View>
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  fotoContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 108,
    height: 108,
    borderColor: '#C2C2C2',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  content: { padding: 20 },
  headerText: { fontSize: 16, fontWeight: 'bold' },
  headerText2: { fontSize: 18, fontWeight: '600' },
})
export default ComplainOrderContainer
