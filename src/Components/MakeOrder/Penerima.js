import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputTextTitleOnBorder from './InputTextTitleOnBorder'
import { SIZES, Fonts, Colors } from '@/Theme/Variables'
import Spacer from '../Base/Spacer'
import Toggle from '../Base/Toggle'
import { Divider } from '@rneui/base'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useNavigationState } from '@react-navigation/native'
import MultiProductListItem from './MultiProductListItem'
import ButtonBottomFloating from '../ButtonBottomFloating'
import { addDataPenerima, getDataProductItemCart } from './Helper'
import { isEmptyObject } from './Helper'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNavRoutes,
  setProperty,
  updateRingkasanPesanan,
} from '@/Store/ringkasanPesananSlice'
import CheckBox from '../Base/CheckBox'
import TouchableIconTextRow from '../Base/TouchableIconTextRow'
import CardAddress from './CardAddress'
import { isEmptyNullOrUndefined, validateOnlyNumbers } from '@/Helper'
import { parseInt, uniqueId } from 'lodash'
import {
  clearDefaultAddress,
  setSavedAddress,
  updateSavedAddress,
} from '@/Store/savedAddressSlice'
import IconContact from '../Base/IconContact'
import Contacts from 'react-native-contact-form'
import { Assets } from '@/Theme/Assets'
import ModalCenterAutofillForm from './ModalCenterAutofillForm'
import ModalFullScreenPointLokasi from '../Account/ModalFullScreenPointLokasi'

const Penerima = ({
  isSavedAddress,
  isMultiProduct,
  currentPage,
  _currentPage,
  jumlahPage,
  idPage,
  isEdit = false,
}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const navState = useNavigationState(state => state)
  const state = useSelector(state => state)
  const dataPesanan = state.ringkasanPesanan.data
  const [dataProductByIdPage, setDataProductByIdPage] = useState(undefined)

  /**
   * boolean
   */
  const [toggleProfileInfo, setToggleProfileInfo] = useState(false)
  const [checkedSaveAddress, setCheckedSaveAddress] = useState(false)
  const [isErrorMessageAlamatRinci, setIsErrorMessageAlamatRinci] =
    useState(false)
  const [isErrorMessageTelepon, setIsErrorMessageTelepon] = useState(false)
  const [onFocusNamaPenerima, setOnFocusNamaPenerima] = useState(false)
  const [onFocusTelepon, setOnFocusTelepon] = useState(false)
  const [onFocusAlamatRinci, setOnFocusAlamatRinci] = useState(false)
  const [validNamaPenerima, setValidNamaPenerima] = useState(false)
  const [validTelepon, setValidTelepon] = useState(false)
  const [validAlamatRinci, setValidAlamatRinci] = useState(false)
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const [isAddNewAddress, setIsAddNewAddress] = useState(false)
  const [isShowSubmitButton, setIsShowSubmitButton] = useState(true)
  const [showModalAutoFillForm, setShowModalAutoFillForm] = useState(true)
  const [isUseSavedAddress, setIsUseSavedAddress] = useState(false)
  const [isShowForm, setIsShowForm] = useState(false)
  const [showModalPointLokasi, setShowModalPointLokasi] = useState(false)

  const [placeHolderAddress, setPlaceHolderAddress] = useState(
    'Jalan, nomor rumah, kode pos, keluarahan, kecamatan.',
  )
  const [placeHolderNamaPenerima, setPlaceHolderNamaPenerima] =
    useState('Nama penerima')
  const [placeHolderTelepon, setPlaceHolderTelepon] = useState(
    'No. Telepon/Handphone',
  )
  const [placeHolderCity, setPlaceHolderCity] = useState('Kota/ Kabupaten')
  const [placeHolderPin, setPlaceHolderPin] = useState('Titik Lokasi')

  const [namaPenerima, setNamaPenerima] = useState('')
  const [telepon, setTelepon] = useState('')
  const [kota, setKota] = useState('')
  const [alamatRinci, setAlamatRinci] = useState('')
  const [pin, setPin] = useState('')
  const [pinRaw, setPinRaw] = useState(undefined)
  const [errorMessageAlamatRinci, setErrorMessageAlamatRinci] = useState(
    'Minimal 15 Karakters',
  )
  const [errorMessageTelepon, setErrorMessageTelepon] = useState('')

  const onPressToggleProfileInfo = () => {
    setToggleProfileInfo(!toggleProfileInfo)
  }

  const onPressCheckSaveAddress = () => {
    setCheckedSaveAddress(true)
  }

  const onPressUnCheckSaveAddress = () => {
    setCheckedSaveAddress(false)
  }

  const handleShowModalAutoFillForm = () => {
    setShowModalAutoFillForm(!showModalAutoFillForm)
  }

  const handelShowModalPointLokasi = () => {
    setShowModalPointLokasi(!showModalPointLokasi)
  }

  const handleSelectPointLocation = pin => {
    if (!isEmptyNullOrUndefined(pin.data.subAdminArea)) {
      handelShowModalPointLokasi()
      setPin(pin.data.subAdminArea + ', ' + pin.data.locality)
      setPinRaw(pin)
      setAlamatRinci(alamatRinci + pin.data.formattedAddress)
      setValidAlamatRinci(true)
    }
  }

  const handleCreateDataPenerima = () => {
    if (isUseSavedAddress) {
      if (isEmptyObject(dataPesanan[currentPage - 1]['penerima'])) {
        dispatch(setNavRoutes(navState.routes))
      }
      dispatch(
        updateRingkasanPesanan(
          addDataPenerima(state.savedAddress.default, {
            data: state.ringkasanPesanan.data,
            id: idPage,
          }),
        ),
      )
    } else {
      if (isEmptyObject(dataPesanan[currentPage - 1]['penerima'])) {
        dispatch(setNavRoutes(navState.routes))
      }
      dispatch(
        updateRingkasanPesanan(
          addDataPenerima(
            {
              address_id: parseInt(uniqueId()),
              location_id: state.location.shipping_address.data.id,
              full_name: namaPenerima,
              phone: telepon,
              address: alamatRinci,
            },
            {
              data: state.ringkasanPesanan.data,
              id: idPage,
            },
          ),
        ),
      )
    }
  }

  const getIdPageProduct = () => {
    getDataProductItemCart(dataPesanan, idPage)
      .then(res => {
        setDataProductByIdPage(res.data[0])
      })
      .catch(err => {
        console.error('err', err)
      })
  }

  const handleSaveAddress = () => {
    const payload = {
      ...state.location.shipping_address.data,
      data: [
        {
          address_id: parseInt(uniqueId()),
          location_id: state.location.shipping_address.data.id,
          full_name: namaPenerima,
          phone: telepon,
          address: alamatRinci,
        },
      ],
    }

    if (checkedSaveAddress) {
      if (state.savedAddress.data.length == 0) {
        dispatch(setSavedAddress([payload]))
      } else {
        dispatch(
          updateSavedAddress({
            parent_data: state.location.shipping_address.data,
            child_data: {
              address_id: parseInt(uniqueId()),
              location_id: state.location.shipping_address.data.id,
              full_name: namaPenerima,
              phone: telepon,
              address: alamatRinci,
            },
          }),
        )
      }
    }
  }

  const handleShowForm = () => {
    setIsShowForm(!isShowForm)
  }

  const handleAddNewAddress = () => {
    handleShowForm()
    setIsUseSavedAddress(isShowForm)
  }

  const handleReadContactFromDevice = async () => {
    try {
      const contacts = await Contacts.openContacts()
      setNamaPenerima(contacts.name)
      setTelepon(contacts.phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, ''))
    } catch (err) {
      console.log('ERR_CONTACTS', err)
    }
  }

  /**
   *
   * handle InputForm Name: OnFocus, OnBlur, OnChange
   */

  const handleOnFocusNamaPenerima = () => {
    setOnFocusNamaPenerima(true)
    setIsShowSubmitButton(false)
  }

  const handleOnBlurNamaPenerima = () => {
    setOnFocusNamaPenerima(false)
    setIsShowSubmitButton(true)
  }

  const handleOnChangeNamaPenerima = text => {
    setNamaPenerima(text)
    text.length > 0 && setValidNamaPenerima(true)
  }

  /**
   *
   * handle InputForm Telepon: OnFocus, OnBlur, OnChange
   */
  const handleOnFocusTelepon = () => {
    setIsShowSubmitButton(false)
    setOnFocusTelepon(true)
    setIsErrorMessageTelepon(false)
    setErrorMessageTelepon('')
    setValidTelepon(false)
  }

  const handleOnBlurTelepon = () => {
    setIsShowSubmitButton(true)
    setOnFocusTelepon(false)
    if (validateOnlyNumbers(telepon)) {
      if (telepon.length < 10 && telepon.length > 0) {
        setIsErrorMessageTelepon(true)
        setErrorMessageTelepon('Nomor yang anda masukkan belum lengkap')
        setValidTelepon(false)
      } else {
        setIsErrorMessageTelepon(false)
        setErrorMessageTelepon('')
        setValidTelepon(true)
      }
    } else {
      setIsErrorMessageTelepon(true)
      setValidTelepon(false)
      setErrorMessageTelepon('Nomor yang anda masukkan belum lengkap')
    }
  }

  const handleOnChangeTelepon = text => {
    if (text.length < 10 && text.length > 0 && validateOnlyNumbers(text)) {
      setTelepon(text)
      setIsErrorMessageTelepon(true)
      setValidTelepon(false)
      setErrorMessageTelepon('Nomor yang anda masukkan belum lengkap')
    } else if (
      text.length >= 10 &&
      text.length <= 15 &&
      validateOnlyNumbers(text)
    ) {
      setTelepon(text)
      setIsErrorMessageTelepon(false)
      setValidTelepon(true)
      setErrorMessageTelepon('')
    } else if (text.length > 15 && validateOnlyNumbers(text)) {
      setTelepon(text)
      setIsErrorMessageTelepon(true)
      setValidTelepon(false)
      setErrorMessageTelepon('Nomor yang anda masukkan belum lengkap')
    } else {
      setTelepon('')
      setErrorMessageTelepon('')
      setIsErrorMessageTelepon(false)
      setValidTelepon(false)
    }
  }

  /**
   *
   * handle InputForm Alamat Rinci: OnFocus, OnBlur, OnChange
   */

  const handleOnFocusAlamatRinci = () => {
    setIsShowSubmitButton(false)
    setOnFocusAlamatRinci(true)
    setIsErrorMessageAlamatRinci(false)
    setValidAlamatRinci(false)
    setErrorMessageAlamatRinci('Minimal 15 Karakter')
  }

  const handleOnBlurAlamatRinci = () => {
    setIsShowSubmitButton(true)
    setOnFocusAlamatRinci(false)
    if (alamatRinci.length > 15) {
      setValidAlamatRinci(true)
      setIsErrorMessageAlamatRinci(false)
      setErrorMessageAlamatRinci('')
    } else if (alamatRinci.length > 0 && alamatRinci.length < 15) {
      setErrorMessageAlamatRinci(
        'Alamat yang anda masukkan kurang dari 15 karakter',
      )
      setIsErrorMessageAlamatRinci(true)
      setValidAlamatRinci(false)
    } else {
      setErrorMessageAlamatRinci('Minimal 15 Karakter')
      setIsErrorMessageAlamatRinci(false)
      setValidAlamatRinci(false)
    }
  }

  const handleOnChangeAlamatRinci = text => {
    if (text.length > 15) {
      setAlamatRinci(text)
      setValidAlamatRinci(true)
      setIsErrorMessageAlamatRinci(false)
      setErrorMessageAlamatRinci('')
    } else if (text.length > 0 && text.length < 15) {
      setAlamatRinci(text)
      setValidAlamatRinci(false)
      setIsErrorMessageAlamatRinci(true)
      setErrorMessageAlamatRinci(
        'Alamat yang anda masukkan kurang dari 15 karakter',
      )
    } else {
      setAlamatRinci(text)
      setIsErrorMessageAlamatRinci(false)
      setErrorMessageAlamatRinci('Minimal 15 Karakter')
      setValidAlamatRinci(false)
    }
  }

  const autoFillForm = data => {
    setNamaPenerima(data.full_name)
    setTelepon(data.phone)
    setAlamatRinci(data.address)
  }

  const handleOnYesAutoFillForm = () => {
    const _receiver = state.ringkasanPesanan.data[currentPage - 2].penerima
    setShowModalAutoFillForm(!showModalAutoFillForm)
    handleAddNewAddress()
    autoFillForm(_receiver)
  }

  const handleUseSavedAddress = () => {
    setIsUseSavedAddress(true)
    setIsShowForm(false)
    navigation.navigate('SavedAddress')
  }

  const handleChangeSavedAddress = () => {
    navigation.navigate('SavedAddress')
  }

  const handleOnPressButtonLastStepLastProd = () => {
    navigation.push('RingkasanPesanan')
    handleSaveAddress()
    dispatch(
      setProperty({
        id_page: idPage,
        property: {
          penerima: isUseSavedAddress
            ? state.savedAddress.default
            : {
                address_id: parseInt(uniqueId()),
                location_id: state.ringkasanPesanan.city_seller.location_id,
                full_name: namaPenerima,
                phone: telepon,
                address: alamatRinci,
              },
        },
      }),
    )
  }

  const handleOnPressButtonNextProduct = () => {
    if (currentPage < jumlahPage) {
      const pushAction = StackActions.push('MakeOrderPenerima', {
        jumlahPage,
        prevPage: currentPage,
        currentPage: _currentPage,
      })
      navigation.dispatch(pushAction)
      handleCreateDataPenerima()
      handleSaveAddress()
    } else {
      navigation.navigate('MakeOrderUcapan', {
        jumlahPage: dataPesanan.length,
        prevPage: 0,
        currentPage: dataPesanan.length + 1 - dataPesanan.length,
      })
      handleCreateDataPenerima()
      handleSaveAddress()
    }
  }

  const handleUseMyProfile = () => {
    const _user = state.login.data.user
    setNamaPenerima(_user.full_name)
    setTelepon(_user.phone.replace(' ', ''))
  }

  const handleRemoveUseMyProfile = () => {
    setNamaPenerima('')
  }

  useEffect(() => {
    getIdPageProduct()
  }, [idPage])

  useEffect(() => {
    setKota(state.ringkasanPesanan.city_seller.name)
  }, [])

  useEffect(() => {
    isSavedAddress
      ? setReadyToSubmit(
          validNamaPenerima && validTelepon && validAlamatRinci && isShowForm,
        )
      : setReadyToSubmit(validNamaPenerima && validTelepon && validAlamatRinci)
  }, [validNamaPenerima, validTelepon, validAlamatRinci, isShowForm])

  useEffect(() => {
    namaPenerima.length > 0 && setValidNamaPenerima(true)
  }, [namaPenerima.length])

  useEffect(() => {
    handleOnChangeTelepon(telepon)
    telepon.length < 10 && telepon.length > 0 && setValidTelepon(true)
  }, [telepon.length])

  useEffect(() => {
    handleOnChangeAlamatRinci(alamatRinci)
    alamatRinci.length < 15 &&
      alamatRinci.length > 0 &&
      setValidAlamatRinci(true)
  }, [alamatRinci.length])

  useEffect(() => {
    setIsShowSubmitButton(true)
  }, [])

  useEffect(() => {
    isUseSavedAddress && setReadyToSubmit(true)
  }, [isShowForm])

  useEffect(() => {
    dispatch(clearDefaultAddress())
  }, [])

  useEffect(() => {
    setReadyToSubmit(!isEmptyNullOrUndefined(state.savedAddress.default))
  }, [isEmptyNullOrUndefined(state.savedAddress.default)])

  useEffect(() => {
    toggleProfileInfo ? handleUseMyProfile() : handleRemoveUseMyProfile()
  }, [toggleProfileInfo])

  useEffect(() => {
    namaPenerima.length == 0 && setToggleProfileInfo(false)
  }, [namaPenerima.length])

  useEffect(() => {
    telepon.length == 0 && setToggleProfileInfo(false)
  }, [telepon.length])

  return (
    <>
      <ScrollView>
        <Spacer height={30} />
        <View style={{ flex: 1 }}>
          <View style={{ position: 'relative' }}>
            {!isMultiProduct && !isSavedAddress && (
              /**
               * MultiProduct: false, SavedAddress: false
               */
              <>
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text style={[section.textTitle]}>Identitas Penerima</Text>
                  {!state.guest.data.isGuest && (
                    <>
                      <Spacer height={20} />
                      <GunakanInfoProfileSaya
                        onPress={onPressToggleProfileInfo}
                        on={toggleProfileInfo}
                        disabled={toggleProfileInfo}
                      />
                      <Spacer height={20} />
                    </>
                  )}
                </View>
                <Spacer height={24} />
                <Divider width={6} color={Colors.neutralGray06} />
                <Spacer height={24} />
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text
                    style={{
                      ...section.textTitle,
                      color: Colors.neutralBlack02,
                    }}
                  >
                    Nama dan Kontak
                  </Text>
                  <Spacer height={20} />
                  <InputTextTitleOnBorder
                    label="Nama Penerima"
                    defaultValue={namaPenerima}
                    placeHolder={placeHolderNamaPenerima}
                    inputContainerStyle={[
                      { marginRight: 40 },
                      {
                        borderColor: isErrorMessageTelepon
                          ? Colors.error
                          : Colors.neutralGray03,
                      },
                      onFocusNamaPenerima && {
                        borderColor: Colors.otherBlue,
                      },
                    ]}
                    onFocus={handleOnFocusNamaPenerima}
                    onBlur={handleOnBlurNamaPenerima}
                    errorMessage={''}
                    onChangeText={text => handleOnChangeNamaPenerima(text)}
                    rightIcon={() => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginRight: -62,
                          }}
                          onPress={handleReadContactFromDevice}
                        >
                          <IconContact />
                        </TouchableOpacity>
                      )
                    }}
                  />
                  <Spacer height={20} />
                  <InputTextTitleOnBorder
                    label="No. Telepon"
                    placeHolder={placeHolderTelepon}
                    defaultValue={telepon}
                    keyboardType="number-pad"
                    inputContainerStyle={[
                      {
                        borderColor: isErrorMessageTelepon
                          ? Colors.error
                          : Colors.neutralGray03,
                      },
                      onFocusTelepon && {
                        borderColor: Colors.otherBlue,
                      },
                    ]}
                    isError={isErrorMessageTelepon}
                    errorMessage={errorMessageTelepon}
                    onFocus={handleOnFocusTelepon}
                    onBlur={handleOnBlurTelepon}
                    onChangeText={text => handleOnChangeTelepon(text)}
                  />
                </View>
                <Spacer height={20} />
                <Divider width={6} color={Colors.neutralGray06} />
                <Spacer height={20} />
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text style={[section.textTitle]}>Alamat Penerima</Text>
                  <Spacer height={20} />
                  <InputTextTitleOnBorder
                    label="Kota/ Kabupaten"
                    placeHolder={placeHolderCity}
                    errorMessage={''}
                    value={kota}
                    disabled={true}
                  />
                  <Spacer height={20} />
                  <InputTextTitleOnBorder
                    label="Alamat Rinci"
                    heightInputContainer={100}
                    multiline={true}
                    inputContainerStyle={[
                      {
                        alignItems: 'flex-start',
                      },
                      {
                        borderColor: isErrorMessageAlamatRinci
                          ? Colors.error
                          : Colors.neutralGray03,
                      },
                      onFocusAlamatRinci && {
                        borderColor: Colors.otherBlue,
                      },
                    ]}
                    placeHolder={placeHolderAddress}
                    defaultValue={alamatRinci}
                    isError={isErrorMessageAlamatRinci}
                    errorMessage={errorMessageAlamatRinci}
                    onFocus={handleOnFocusAlamatRinci}
                    onBlur={handleOnBlurAlamatRinci}
                    onChangeText={text => handleOnChangeAlamatRinci(text)}
                  />
                  <Spacer height={20} />
                  <TitikLokasiButton
                    label={pin.length == 0 ? placeHolderPin : pin}
                    isIconRight={pin.length == 0 ? true : false}
                    onPress={handelShowModalPointLokasi}
                  />
                  <Spacer height={20} />
                  <CheckBox
                    disabled={!readyToSubmit}
                    checked={checkedSaveAddress}
                    onPressCheck={onPressCheckSaveAddress}
                    onPressUnCheck={onPressUnCheckSaveAddress}
                    label="Simpan Alamat"
                  />
                  <Spacer height={36} />
                </View>
              </>
            )}
            {isMultiProduct && !isSavedAddress && (
              /**
               * MultiProduct: true, SavedAddress: false
               */
              <>
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text style={[section.textTitle]}>Identitas Penerima</Text>
                  <Spacer height={20} />
                  {dataProductByIdPage != undefined && (
                    <MultiProductListItem
                      index={idPage}
                      total={dataPesanan.length}
                      name={dataProductByIdPage.product_info.name}
                      price={dataProductByIdPage.product_info.price}
                      imgSource={
                        dataProductByIdPage.product_info.image.length == 0
                          ? Assets.noImageUrl
                          : dataProductByIdPage.product_info.image[0].path
                      }
                    />
                  )}
                </View>
                <Spacer height={24} />
                <Divider width={6} color={Colors.neutralGray06} />
                <Spacer height={24} />
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text
                    style={{
                      ...section.textTitle,
                      color: Colors.neutralBlack02,
                    }}
                  >
                    Nama dan Kontak
                  </Text>
                  <Spacer height={20} />
                  {isMultiProduct && !state.guest.data.isGuest && (
                    <>
                      <GunakanInfoProfileSaya
                        onPress={onPressToggleProfileInfo}
                        on={toggleProfileInfo}
                        disabled={toggleProfileInfo}
                      />
                      <Spacer height={20} />
                    </>
                  )}
                  <InputTextTitleOnBorder
                    label="Nama Penerima"
                    defaultValue={namaPenerima}
                    placeHolder={placeHolderNamaPenerima}
                    inputContainerStyle={[
                      { marginRight: 40 },
                      {
                        borderColor: isErrorMessageTelepon
                          ? Colors.error
                          : Colors.neutralGray03,
                      },
                      onFocusNamaPenerima && {
                        borderColor: Colors.otherBlue,
                      },
                    ]}
                    onFocus={handleOnFocusNamaPenerima}
                    onBlur={handleOnBlurNamaPenerima}
                    errorMessage={''}
                    onChangeText={text => handleOnChangeNamaPenerima(text)}
                    rightIcon={() => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginRight: -62,
                          }}
                          onPress={handleReadContactFromDevice}
                        >
                          <IconContact />
                        </TouchableOpacity>
                      )
                    }}
                  />
                  <Spacer height={20} />
                  <InputTextTitleOnBorder
                    label="No. Telepon"
                    placeHolder={placeHolderTelepon}
                    defaultValue={telepon}
                    keyboardType="number-pad"
                    inputContainerStyle={[
                      {
                        borderColor: isErrorMessageTelepon
                          ? Colors.error
                          : Colors.neutralGray03,
                      },
                      onFocusTelepon && {
                        borderColor: Colors.otherBlue,
                      },
                    ]}
                    isError={isErrorMessageTelepon}
                    errorMessage={errorMessageTelepon}
                    onFocus={handleOnFocusTelepon}
                    onBlur={handleOnBlurTelepon}
                    onChangeText={text => handleOnChangeTelepon(text)}
                  />
                </View>
                <Spacer height={20} />
                <Divider width={6} color={Colors.neutralGray06} />
                <Spacer height={20} />
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text style={[section.textTitle]}>Alamat Penerima</Text>
                  <Spacer height={20} />
                  <InputTextTitleOnBorder
                    label="Kota/ Kabupaten"
                    placeHolder={placeHolderCity}
                    errorMessage={''}
                    value={kota}
                    disabled={true}
                  />
                  <Spacer height={20} />
                  <InputTextTitleOnBorder
                    label="Alamat Rinci"
                    heightInputContainer={100}
                    multiline={true}
                    inputContainerStyle={[
                      {
                        alignItems: 'flex-start',
                      },
                      {
                        borderColor: isErrorMessageAlamatRinci
                          ? Colors.error
                          : Colors.neutralGray03,
                      },
                      onFocusAlamatRinci && {
                        borderColor: Colors.otherBlue,
                      },
                    ]}
                    placeHolder={placeHolderAddress}
                    defaultValue={alamatRinci}
                    isError={isErrorMessageAlamatRinci}
                    errorMessage={errorMessageAlamatRinci}
                    onFocus={handleOnFocusAlamatRinci}
                    onBlur={handleOnBlurAlamatRinci}
                    onChangeText={text => handleOnChangeAlamatRinci(text)}
                  />
                  <Spacer height={20} />
                  <TitikLokasiButton
                    label={pin.length == 0 ? placeHolderPin : pin}
                    isIconRight={pin.length == 0 ? true : false}
                    onPress={handelShowModalPointLokasi}
                  />
                  <Spacer height={20} />
                  <CheckBox
                    disabled={!readyToSubmit}
                    checked={checkedSaveAddress}
                    onPressCheck={onPressCheckSaveAddress}
                    onPressUnCheck={onPressUnCheckSaveAddress}
                    label="Simpan Alamat"
                  />
                  <Spacer height={36} />
                </View>
              </>
            )}
            {!isMultiProduct && isSavedAddress && (
              /**
               * MultiProduct: false, SavedAddress: true
               */
              <>
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text style={[section.textTitle]}>Identitas Penerima</Text>
                  <Spacer height={20} />
                  <SavedAddressCard
                    isShowForm={isShowForm}
                    defaultSavedAddress={state.savedAddress.default}
                    onPressChangeSavedAddress={handleChangeSavedAddress}
                    onPressUseSavedAddress={handleUseSavedAddress}
                  />
                  <View style={{ flexWrap: 'wrap' }}>
                    <TouchableIconTextRow
                      text="Alamat Baru"
                      textColor={
                        isShowForm ? Colors.primary : Colors.neutralBlack02
                      }
                      iconColor={
                        isShowForm ? Colors.primary : Colors.neutralBlack02
                      }
                      icon={isShowForm ? 'minus-circle' : 'plus-circle'}
                      onPress={handleAddNewAddress}
                    />
                  </View>
                  {isShowForm && (
                    <>
                      <Spacer height={25} />
                      <InputTextTitleOnBorder
                        label="Nama Penerima"
                        defaultValue={namaPenerima}
                        placeHolder={placeHolderNamaPenerima}
                        inputContainerStyle={[
                          { marginRight: 40 },
                          {
                            borderColor: isErrorMessageTelepon
                              ? Colors.error
                              : Colors.neutralGray03,
                          },
                          onFocusNamaPenerima && {
                            borderColor: Colors.otherBlue,
                          },
                        ]}
                        onFocus={handleOnFocusNamaPenerima}
                        onBlur={handleOnBlurNamaPenerima}
                        errorMessage={''}
                        onChangeText={text => handleOnChangeNamaPenerima(text)}
                        rightIcon={() => {
                          return (
                            <TouchableOpacity
                              style={{
                                marginRight: -62,
                              }}
                              onPress={handleReadContactFromDevice}
                            >
                              <IconContact />
                            </TouchableOpacity>
                          )
                        }}
                      />
                      <Spacer height={5} />
                      <InputTextTitleOnBorder
                        label="No. Telepon"
                        placeHolder={placeHolderTelepon}
                        defaultValue={telepon}
                        keyboardType="number-pad"
                        inputContainerStyle={[
                          {
                            borderColor: isErrorMessageTelepon
                              ? Colors.error
                              : Colors.neutralGray03,
                          },
                          onFocusTelepon && {
                            borderColor: Colors.otherBlue,
                          },
                        ]}
                        isError={isErrorMessageTelepon}
                        errorMessage={errorMessageTelepon}
                        onFocus={handleOnFocusTelepon}
                        onBlur={handleOnBlurTelepon}
                        onChangeText={text => handleOnChangeTelepon(text)}
                      />
                      <Spacer height={15} />
                      <Text style={[section.textTitle]}>Alamat Penerima</Text>
                      <Spacer height={15} />
                      <InputTextTitleOnBorder
                        label="Kota/ Kabupaten"
                        placeHolder={placeHolderCity}
                        errorMessage={''}
                        value={kota}
                        disabled={true}
                      />
                      <InputTextTitleOnBorder
                        label="Alamat Rinci"
                        heightInputContainer={100}
                        multiline={true}
                        inputContainerStyle={[
                          {
                            alignItems: 'flex-start',
                          },
                          {
                            borderColor: isErrorMessageAlamatRinci
                              ? Colors.error
                              : Colors.neutralGray03,
                          },
                          onFocusAlamatRinci && {
                            borderColor: Colors.otherBlue,
                          },
                        ]}
                        placeHolder={placeHolderAddress}
                        defaultValue={alamatRinci}
                        isError={isErrorMessageAlamatRinci}
                        errorMessage={errorMessageAlamatRinci}
                        onFocus={handleOnFocusAlamatRinci}
                        onBlur={handleOnBlurAlamatRinci}
                        onChangeText={text => handleOnChangeAlamatRinci(text)}
                      />
                      <TitikLokasiButton
                        label={pin.length == 0 ? placeHolderPin : pin}
                        isIconRight={pin.length == 0 ? true : false}
                        onPress={handelShowModalPointLokasi}
                      />
                      <Spacer height={20} />
                      <CheckBox
                        disabled={!readyToSubmit}
                        checked={checkedSaveAddress}
                        onPressCheck={onPressCheckSaveAddress}
                        onPressUnCheck={onPressUnCheckSaveAddress}
                        label="Simpan Alamat"
                      />
                      <Spacer height={36} />
                    </>
                  )}
                </View>
              </>
            )}
            {isMultiProduct && isSavedAddress && (
              /**
               * MultiProduct: true, SavedAddress: true
               */
              <>
                <View style={{ marginHorizontal: SIZES.margin_h }}>
                  <Text style={[section.textTitle]}>Identitas Penerima</Text>
                  <Spacer height={20} />
                  {dataProductByIdPage != undefined && (
                    <MultiProductListItem
                      index={idPage}
                      total={dataPesanan.length}
                      name={dataProductByIdPage.product_info.name}
                      price={dataProductByIdPage.product_info.price}
                      imgSource={
                        dataProductByIdPage.product_info.image.length == 0
                          ? Assets.noImageUrl
                          : dataProductByIdPage.product_info.image[0].path
                      }
                    />
                  )}
                </View>
                <Spacer height={30} />
                <Divider width={6} color={Colors.neutralGray06} />
                <Spacer height={24} />
                <View style={[{ marginHorizontal: SIZES.margin_h }]}>
                  <Text
                    style={[section.textTitle, { color: Colors.neutralGray01 }]}
                  >
                    Nama dan Alamat
                  </Text>
                  <Spacer height={24} />
                  <SavedAddressCard
                    isShowForm={isShowForm}
                    defaultSavedAddress={state.savedAddress.default}
                    onPressChangeSavedAddress={handleChangeSavedAddress}
                    onPressUseSavedAddress={handleUseSavedAddress}
                  />
                  <View style={{ flexWrap: 'wrap' }}>
                    <TouchableIconTextRow
                      text="Alamat Baru"
                      textColor={
                        isShowForm ? Colors.primary : Colors.neutralBlack02
                      }
                      iconColor={
                        isShowForm ? Colors.primary : Colors.neutralBlack02
                      }
                      icon={isShowForm ? 'minus-circle' : 'plus-circle'}
                      onPress={handleAddNewAddress}
                    />
                  </View>
                  {isShowForm && (
                    <>
                      <Spacer height={25} />
                      <InputTextTitleOnBorder
                        label="Nama Penerima"
                        defaultValue={namaPenerima}
                        placeHolder={placeHolderNamaPenerima}
                        inputContainerStyle={[
                          { marginRight: 40 },
                          {
                            borderColor: isErrorMessageTelepon
                              ? Colors.error
                              : Colors.neutralGray03,
                          },
                          onFocusNamaPenerima && {
                            borderColor: Colors.otherBlue,
                          },
                        ]}
                        onFocus={handleOnFocusNamaPenerima}
                        onBlur={handleOnBlurNamaPenerima}
                        errorMessage={''}
                        onChangeText={text => handleOnChangeNamaPenerima(text)}
                        rightIcon={() => {
                          return (
                            <TouchableOpacity
                              style={{
                                marginRight: -62,
                              }}
                              onPress={handleReadContactFromDevice}
                            >
                              <IconContact />
                            </TouchableOpacity>
                          )
                        }}
                      />
                      <Spacer height={5} />
                      <InputTextTitleOnBorder
                        label="No. Telepon"
                        placeHolder={placeHolderTelepon}
                        defaultValue={telepon}
                        keyboardType="number-pad"
                        inputContainerStyle={[
                          {
                            borderColor: isErrorMessageTelepon
                              ? Colors.error
                              : Colors.neutralGray03,
                          },
                          onFocusTelepon && {
                            borderColor: Colors.otherBlue,
                          },
                        ]}
                        isError={isErrorMessageTelepon}
                        errorMessage={errorMessageTelepon}
                        onFocus={handleOnFocusTelepon}
                        onBlur={handleOnBlurTelepon}
                        onChangeText={text => handleOnChangeTelepon(text)}
                      />
                      <Spacer height={15} />
                      <Text style={[section.textTitle]}>Alamat Penerima</Text>
                      <Spacer height={15} />
                      <InputTextTitleOnBorder
                        label="Kota/ Kabupaten"
                        placeHolder={placeHolderCity}
                        errorMessage={''}
                        value={kota}
                        disabled={true}
                      />
                      <InputTextTitleOnBorder
                        label="Alamat Rinci"
                        heightInputContainer={100}
                        multiline={true}
                        inputContainerStyle={[
                          {
                            alignItems: 'flex-start',
                          },
                          {
                            borderColor: isErrorMessageAlamatRinci
                              ? Colors.error
                              : Colors.neutralGray03,
                          },
                          onFocusAlamatRinci && {
                            borderColor: Colors.otherBlue,
                          },
                        ]}
                        placeHolder={placeHolderAddress}
                        defaultValue={alamatRinci}
                        isError={isErrorMessageAlamatRinci}
                        errorMessage={errorMessageAlamatRinci}
                        onFocus={handleOnFocusAlamatRinci}
                        onBlur={handleOnBlurAlamatRinci}
                        onChangeText={text => handleOnChangeAlamatRinci(text)}
                      />
                      <TitikLokasiButton
                        label={pin.length == 0 ? placeHolderPin : pin}
                        isIconRight={pin.length == 0 ? true : false}
                        onPress={handelShowModalPointLokasi}
                      />
                      <Spacer height={20} />
                      <CheckBox
                        disabled={!readyToSubmit}
                        checked={checkedSaveAddress}
                        onPressCheck={onPressCheckSaveAddress}
                        onPressUnCheck={onPressUnCheckSaveAddress}
                        label="Simpan Alamat"
                      />
                      <Spacer height={36} />
                    </>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
        <Spacer height={100} />
      </ScrollView>
      {!isEdit
        ? isShowSubmitButton && (
            <ButtonBottomFloating
              disable={!readyToSubmit}
              label={
                currentPage < jumlahPage ? 'Product Berikutnya' : 'Selanjutnya'
              }
              onPress={handleOnPressButtonNextProduct}
            />
          )
        : isShowSubmitButton && (
            <ButtonBottomFloating
              label={'Simpan Perubahan'}
              onPress={handleOnPressButtonLastStepLastProd}
            />
          )}
      {currentPage > 1 && (
        <ModalCenterAutofillForm
          textBodyBold="Identitas Penerima"
          isVisible={showModalAutoFillForm}
          onNo={handleShowModalAutoFillForm}
          onRequestClose={handleShowModalAutoFillForm}
          onYes={handleOnYesAutoFillForm}
        />
      )}
      <ModalFullScreenPointLokasi
        modalVisible={showModalPointLokasi}
        onClose={handelShowModalPointLokasi}
        selectPointLocation={pin => handleSelectPointLocation(pin)}
      />
    </>
  )
}

export default Penerima

const section = StyleSheet.create({
  textTitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.neutralBlack01,
  },
})

/**
 *
 * Small Component: GunakanInfoProfileSaya, TitikLokasiButton, SavedAddressCard
 */
const GunakanInfoProfileSaya = ({ onPress, on, disabled }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View>
      <Text
        style={{
          fontFamily: Fonts.regular,
          color: Colors.neutralBlack02,
          lineHeight: 24,
          fontSize: 15,
        }}
      >
        Gunakan info profil saya
      </Text>
    </View>
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        disabled={disabled}
      >
        <Toggle on={on} />
      </TouchableOpacity>
    </View>
  </View>
)

const TitikLokasiButton = ({
  iconName = 'map-pin',
  label = 'Titik Lokasi',
  isIconLeft = true,
  isIconRight = true,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: Colors.neutralGray03,
            alignItems: 'center',
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: 6,
          },
          isIconRight && { height: 50 },
          !isIconRight && { paddingVertical: 10 },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {isIconLeft && (
            <FeatherIcon
              name={iconName}
              size={16}
              color={Colors.neutralBlack02}
            />
          )}
          <Spacer width={10} />
          <Text
            style={[
              {
                fontFamily: Fonts.medium,
                fontSize: 16,
                lineHeight: 24,
                color: Colors.neutralBlack02,
              },
              !isIconRight && { paddingRight: 40 },
            ]}
          >
            {label}
          </Text>
        </View>
        {isIconRight && (
          <FeatherIcon
            name="chevron-right"
            size={22}
            color={Colors.neutralBlack02}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const SavedAddressCard = ({
  defaultSavedAddress,
  isShowForm,
  onPressUseSavedAddress,
  onPressChangeSavedAddress,
}) => {
  return (
    <>
      {!isEmptyNullOrUndefined(defaultSavedAddress) ? (
        <>
          {isShowForm ? (
            <TitikLokasiButton
              isIconLeft={false}
              label={`Pakai alamat tersimpan`}
              onPress={onPressUseSavedAddress}
            />
          ) : (
            <CardAddress
              full_name={defaultSavedAddress.full_name}
              phone={defaultSavedAddress.phone}
              address={defaultSavedAddress.address}
              onPress={onPressChangeSavedAddress}
            />
          )}
          <Spacer height={22} />
        </>
      ) : (
        <>
          <TitikLokasiButton
            isIconLeft={false}
            label={`Pakai alamat tersimpan`}
            onPress={onPressUseSavedAddress}
          />
          <Spacer height={16} />
        </>
      )}
    </>
  )
}
