import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import InputTextBottomLine from '@/Components/Base/InputTextBottomLine'
import InputTextWithCounter from '@/Components/MakeOrder/InputTextWithCounter'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import ModalCenterConfirmLayout from '@/Components/ModalCenterConfirmLayout'
import ModalFullScreenPointLokasi from '@/Components/Account/ModalFullScreenPointLokasi'
import { isEmptyNullOrUndefined, validateOnlyNumbers } from '@/Helper'
import ModalFullScreenSearchCity from '@/Components/Account/ModalFullScreenSearchCity'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { checkStringNConvert } from '@/Components/Account/Helper'
import axios from 'axios'
import { Config } from '@/Config'

const AccountChangeSavedAddressContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route

  const [showModalConfirmDataNotSaved, setShowModalConfirmDataNotSaved] =
    useState(false)
  const [showModalPointLokasi, setShowModalPointLokasi] = useState(false)
  const [showModalSearchCity, setShowModalSearchCity] = useState(false)

  const _nama = 'Nama lengkap penerima'
  const [placeholderNamaPenerima, setPlaceholderNamaPenerima] = useState(_nama)
  const [namaPenerima, setNamaPenerima] = useState('')
  const [counterNamaPenerima, setCounterNamaPenerima] = useState(0)
  const [errorNamaPenerima, setErrorNamaPenerima] = useState(false)
  const [validateNamaPenerima, setValidateNamaPenerima] = useState(false)

  const _hp = 'Isi dengan nomor yang aktif'
  const [placeholderPhone, setPlaceholderPhone] = useState(_hp)
  const [phone, setPhone] = useState('')
  const [counterPhone, setCounterPhone] = useState(0)
  const [errorPhone, setErrorPhone] = useState(false)
  const [validatePhone, setValidatePhone] = useState(false)

  const _city = 'Ketik nama kota/kabupaten'
  const [placeholderCity, setPlaceholderCity] = useState(_city)
  const [city, setCity] = useState('')
  const [cityId, setCityId] = useState(0)
  const [rawCity, setRawCity] = useState(null)
  const [counterCity, setCounterCity] = useState(0)
  const [errorCity, setErrorCity] = useState(false)
  const [validateCity, setValidateCity] = useState(false)

  const _pin = 'Pilih titik Point'
  const [placeholderPin, setPlaceholderPin] = useState(_pin)
  const [pin, setPin] = useState('')
  const [rawPin, setRawPin] = useState(null)
  const [counterPin, setCounterPin] = useState(0)
  const [errorPin, setErrorPin] = useState(false)
  const [validatePin, setValidatePin] = useState(false)

  const _address = 'Isi detail alamat jalan ataupun patokan'
  const [placeholderAddress, setPlaceholderAddress] = useState(_address)
  const [address, setAddress] = useState('')
  const [counterAddress, setCounterAddress] = useState(0)
  const [errorAddress, setErrorAddress] = useState(false)
  const [validateAddress, setValidateAddress] = useState(false)

  const [readyToSubmit, setReadyToSubmit] = useState(false)

  const [addressId, setAddressId] = useState(null)
  const [isMainAddress, setIsMainAddress] = useState(0)

  const [isAcceptLoading, setIsAcceptLoading] = useState(false)
  const [disableOnClose, setDisableOnClose] = useState(false)
  const [loadingOnSaved, setLoadingOnSaved] = useState(false)
  const [navState, setNavState] = useState(undefined)

  const handleShowModalConfirmDataNotSaved = () => {
    setShowModalConfirmDataNotSaved(!showModalConfirmDataNotSaved)
  }

  const handleShowModalSearchCity = () => {
    setShowModalSearchCity(!showModalSearchCity)
  }

  const handelShowModalPointLokasi = () => {
    setShowModalPointLokasi(!showModalPointLokasi)
  }

  /**
   * Form
   */
  const handleOnChangeNamaPenerima = text => {
    setPlaceholderNamaPenerima('')
    if (text.length == 0) {
      setNamaPenerima('')
      setErrorNamaPenerima(false)
      setCounterNamaPenerima(text.length)
      setValidateNamaPenerima(false)
    } else if (text.length <= 50 && text.length > 0) {
      setErrorNamaPenerima(false)
      setNamaPenerima(text)
      setCounterNamaPenerima(text.length)
      setValidateNamaPenerima(true)
    } else if (text.length > 50) {
      setErrorNamaPenerima(true)
      setNamaPenerima(text.slice(0, 50))
      setCounterNamaPenerima(text.slice(0, 50).length)
      setValidateNamaPenerima(false)
    }
  }
  const handleOnFocusNamaPenerima = () => {
    setPlaceholderNamaPenerima('')
  }
  const handleOnBlurNamaPenerima = () => {
    counterNamaPenerima == 0 && setPlaceholderNamaPenerima(_nama)
  }

  const handleOnChangePhone = text => {
    setPlaceholderPhone('')
    if (text.length == 0) {
      setPhone(text)
      setErrorPhone(false)
      setCounterPhone(text.length)
      setValidatePhone(false)
    } else if (validateOnlyNumbers(text)) {
      if (text.length >= 10 && text.length <= 15) {
        setErrorPhone(false)
        setPhone(text)
        setCounterPhone(text.length)
        setValidatePhone(true)
      } else if (text.length < 10 && text.length > 0) {
        setErrorPhone(true)
        setPhone(text)
        setCounterPhone(text)
        setValidatePhone(false)
      }
    }
  }
  const handleOnFocusPhone = () => {
    setPlaceholderPhone('')
  }
  const handleOnBlurPhone = () => {
    counterPhone == 0 && setPlaceholderPhone(_hp)
  }

  const handleOnPressCity = () => {
    handleShowModalSearchCity()
  }
  const handleSelectedListCity = city => {
    handleShowModalSearchCity()
    setValidateCity(true)
    setCity(city.city)
    setCityId(city.id)
    setRawCity(city)
    setCounterCity(city.city.length)
  }

  const handleOnPressPointLokasi = () => {
    handelShowModalPointLokasi()
  }
  const handleSelectPointLocation = pin => {
    if (!isEmptyNullOrUndefined(pin.data.subAdminArea)) {
      handelShowModalPointLokasi()
      setPin(pin.data.subAdminArea + ', ' + pin.data.locality)
      setRawPin(pin)
      // setValidatePin(true)
      setAddress(address + pin.data.formattedAddress)
      setValidateAddress(true)
    }
  }

  const handleOnChangeAddress = text => {
    setPlaceholderAddress('')
    if (text.length < 15 && text.length > 0) {
      setAddress(text)
      setErrorAddress(true)
      setValidateAddress(false)
      setCounterAddress(text.length)
    } else if (text.length >= 15) {
      setAddress(text)
      setErrorAddress(false)
      setValidateAddress(true)
      setCounterAddress(text.length)
    } else if (text.length == 0) {
      setAddress(text)
      setErrorAddress(false)
      setValidateAddress(false)
      setCounterAddress(text.length)
    }
  }
  const handleOnFocusAddress = () => {
    counterAddress > 0 && setPlaceholderAddress('')
  }
  const handleOnBlurAddress = () => {
    counterAddress == 0 && setPlaceholderAddress(_address)
  }

  const handleOnPressSubmit = () => {
    xhrSavedAddress()
  }

  const handleOnCloseModal = () => {
    setShowModalConfirmDataNotSaved(false)
    navigation.dispatch(navState)
  }

  const xhrSavedAddress = () => {
    setLoadingOnSaved(true)
    axios
      .post(
        Config.CUSTOMER_APP +
          (params.isEdit ? '/update-saved-address' : '/add-saved-address'),
        params.isEdit
          ? {
              fbasekey: state.tokenList.fcm_token,
              address_id: addressId,
              address_name: namaPenerima,
              phone: phone,
              city_id: cityId,
              address: address,
              main: isMainAddress,
            }
          : {
              fbasekey: state.tokenList.fcm_token,
              address_name: namaPenerima,
              phone: phone,
              city_id: cityId,
              address: address,
            },
      )
      .then(res => {
        if (res.data.statusCode === '200') {
          setLoadingOnSaved(false)
          navigation.navigate('AccountSavedAddress')
        }
      })
      .catch(({ response }) => {
        setLoadingOnSaved(false)
        console.log('ERR_SAVED_ADDRESS', response)
      })
  }

  React.useLayoutEffect(() => {
    NavBarV1({ navigation: navigation, titleName: '' })
    navigation.addListener('beforeRemove', e => {
      if (e.data.action.type == 'GO_BACK' && readyToSubmit) {
        e.preventDefault()
        setNavState(e.data.action)
        setShowModalConfirmDataNotSaved(true)
      }
    })
  }, [navigation, readyToSubmit])

  useEffect(() => {
    if (counterNamaPenerima > 50) {
      setErrorNamaPenerima(true)
      setNamaPenerima(namaPenerima.slice(0, 50))
      setValidateNamaPenerima(false)
    } else if (counterNamaPenerima <= 50 && counterNamaPenerima > 0) {
      setErrorNamaPenerima(false)
      setNamaPenerima(namaPenerima)
      setValidateNamaPenerima(true)
    } else if (counterNamaPenerima == 0) {
      setErrorNamaPenerima(false)
      setNamaPenerima('')
      setValidateNamaPenerima(false)
    }
  }, [counterNamaPenerima])

  useEffect(() => {
    if (counterPhone == 0) {
      setPhone('')
      setErrorPhone(false)
      setCounterPhone(0)
      setValidatePhone(false)
    } else if (validateOnlyNumbers(phone)) {
      if (counterPhone >= 10 && counterPhone <= 15) {
        setErrorPhone(false)
        setValidatePhone(true)
      } else if (counterPhone < 10 && counterPhone > 0) {
        setErrorPhone(true)
        setValidatePhone(false)
      }
    }
  }, [counterPhone])

  useEffect(() => {
    counterCity > 0 && setValidateCity(true)
  }, [cityId, counterCity])

  useEffect(() => {
    counterPin > 0 && setValidateCity(true)
  }, [counterPin])

  useEffect(() => {
    if (counterAddress < 15 && counterAddress > 0) {
      setErrorAddress(true)
      setAddress(address)
      setValidateAddress(false)
    } else if (counterAddress >= 15) {
      setErrorAddress(false)
      setAddress(address)
      setValidateAddress(true)
    } else if (counterAddress == 0) {
      setErrorAddress(false)
      setAddress('')
      setValidateAddress(false)
    }
  }, [counterAddress])

  useEffect(() => {
    if (props.route.params.isEdit) {
      const _data = props.route.params.data
      setNamaPenerima(_data.address_name)
      setPhone(checkStringNConvert(_data.phone))
      setCity(_data.city)
      setAddress(_data.address)
      setCounterNamaPenerima(_data.address_name.length)
      setCounterPhone(checkStringNConvert(_data.phone).length)
      setCounterCity(_data.city.length)
      setCounterAddress(_data.address.length)
      setAddressId(_data.id)
      setCityId(_data.city_id)
      setIsMainAddress(_data.main)
    }
  }, [])

  useEffect(() => {
    setReadyToSubmit(
      validateNamaPenerima &&
        validatePhone &&
        validateCity &&
        // validatePin &&
        validateAddress,
    )
  }, [
    validateNamaPenerima,
    validatePhone,
    validateCity,
    // validatePin,
    validateAddress,
  ])

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <View style={[{ marginHorizontal: SIZES.margin_h }]}>
          <Spacer height={21} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
            }}
          >
            {props.route.params.isEdit ? 'Ubah' : 'Tambah'} Alamat
          </Text>
          <Spacer height={20} />
          <InputText
            label="Nama Penerima"
            errorTextLeft="Maksimal 50 karakter"
            errorTextRight={counterNamaPenerima + '/50'}
            isError={errorNamaPenerima}
            value={namaPenerima}
            placeHolder={placeholderNamaPenerima}
            onChangeText={text => handleOnChangeNamaPenerima(text)}
            onFocus={handleOnFocusNamaPenerima}
            onBlur={handleOnBlurNamaPenerima}
          />
          <Spacer height={16} />
          <InputText
            label="No. Handphone"
            errorTextLeft="Nomor minimal terdiri dari 10 karakter"
            keyboardType="number-pad"
            isError={errorPhone}
            value={phone}
            placeHolder={placeholderPhone}
            onChangeText={text => handleOnChangePhone(text)}
            onFocus={handleOnFocusPhone}
            onBlur={handleOnBlurPhone}
          />
          <Spacer height={16} />
          <TouchableOpacity onPress={handleOnPressCity}>
            <InputText
              label="Kota/Kabupaten"
              isError={false}
              disabled={true}
              placeHolder={placeholderCity}
              value={city}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnPressPointLokasi}>
            <InputText
              label="Point Lokasi"
              disabled={true}
              isRequired={false}
              placeHolder={placeholderPin}
              value={pin.length > 0 && pin}
              multiline={true}
              selection={{ start: 0, end: 0 }}
              leftIcon={() => (
                <FeatherIcon
                  name={'map-pin'}
                  size={16}
                  color={Colors.primary}
                />
              )}
              inputContainerStyle={[
                pin.length > 38 && { paddingBottom: 28, paddingTop: 20 },
              ]}
            />
          </TouchableOpacity>
          <InputTextWithCounter
            label="Alamat Detail "
            placeHolder={placeholderAddress}
            value={address}
            labelStyle={{
              fontFamily: Fonts.medium,
              fontSize: 14,
              color: Colors.neutralGray01,
              lineHeight: 24,
            }}
            inputStyle={[{ left: -10, textAlignVertical: 'top' }]}
            errorStyle={{ textAlign: 'left' }}
            errorMessage="Minimal 15 karakter"
            multiline={true}
            numberOfLines={4}
            heightInputContainer={88}
            isError={errorAddress}
            onChangeText={text => handleOnChangeAddress(text)}
            onFocus={handleOnFocusAddress}
            onBlur={handleOnBlurAddress}
          />
          <Spacer height={16} />
        </View>
        <Spacer height={100} />
      </ScrollView>
      <ButtonBottomFloating
        label="Simpan"
        onPress={handleOnPressSubmit}
        loading={loadingOnSaved}
        disable={!readyToSubmit}
      />
      <ModalCenterConfirmDataNotSaved
        isVisible={showModalConfirmDataNotSaved}
        onPressClose={handleOnCloseModal}
        onPressAccept={handleShowModalConfirmDataNotSaved}
        loadingOnAccept={isAcceptLoading}
        disableOnClose={disableOnClose}
      />
      <ModalFullScreenPointLokasi
        modalVisible={showModalPointLokasi}
        onClose={handelShowModalPointLokasi}
        selectPointLocation={pin => handleSelectPointLocation(pin)}
      />
      <ModalFullScreenSearchCity
        modalVisible={showModalSearchCity}
        onClose={handleShowModalSearchCity}
        selectedCity={city => handleSelectedListCity(city)}
      />
    </>
  )
}

export default AccountChangeSavedAddressContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Component
 */

const ModalCenterConfirmDataNotSaved = ({ ...props }) => (
  <ModalCenterConfirmLayout
    bodyTitle="Data kamu belum tersimpan"
    bodySubtitle="Kembali ke halaman sebelumnya berarti kamu akan mengulang menulis data lagi"
    labelAccept="Ya, lanjutkan"
    labelClose="Tidak jadi"
    acceptHeightButton={40}
    acceptContainerText={{
      width: 120,
      paddingVertical: 0,
      paddingHorizontal: 0,
    }}
    closeHeightButton={40}
    closeContainerText={{
      width: 120,
      paddingVertical: 0,
      paddingHorizontal: 0,
    }}
    {...props}
  />
)

const InputText = ({
  errorTextLeft,
  errorTextRight,
  errorColor = Colors.error,
  isError = false,
  label = 'Label',
  isRequired = true,
  ...props
}) => {
  return (
    <InputTextBottomLine
      isErrorCustom={true}
      isError={isError}
      errorStyle={{ marginBottom: 0 }}
      errorMessage=""
      borderBottomColor={Colors.neutralGray05}
      placeholderTextColor={Colors.neutralGray02}
      label={() => {
        return (
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 14,
              color: Colors.neutralGray01,
              lineHeight: 24,
            }}
          >
            {label}
            {isRequired && <Text style={{ color: Colors.error }}> *</Text>}
          </Text>
        )
      }}
      errorCustomComp={() => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 3,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.regular,
              color: isError ? errorColor : Colors.neutralGray01,
            }}
          >
            {errorTextLeft}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.regular,
              color: isError ? errorColor : Colors.neutralGray01,
            }}
          >
            {errorTextRight}
          </Text>
        </View>
      )}
      {...props}
    />
  )
}
