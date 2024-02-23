import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { SIZES, Colors, Fonts } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from '@/Components/Base/Spacer'
import LinearGradient from 'react-native-linear-gradient'
import { Input } from '@rneui/themed'
import TouchableIconTextRow from '@/Components/Base/TouchableIconTextRow'
import { data_saved_address } from '@/Components/Account/DataDummy'
import CardAddress from '@/Components/Account/CardAddress'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import ModalCenterConfirmLayout from '@/Components/ModalCenterConfirmLayout'
import NoSavedAddress from '@/Components/SavedAddress/NoSavedAddress'
import axios from 'axios'
import { Config } from '@/Config'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import { account } from '@/Helper/apiKit'

const AccountSavedAddressContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [placeHolderSearch, setPlaceHolderSearch] = useState(
    'Cari nama penerima atau nama jalan...',
  )

  const [dataSavedAddress, setdataSavedAddress] = useState([])

  const [
    showModalCenterConfirmChangeMainAddress,
    setShowModalCenterConfirmChangeMainAddress,
  ] = useState(false)
  const [
    showModalCenterConfirmRemoveSavedAddress,
    setShowModalCenterConfirmRemoveSavedAddress,
  ] = useState(false)
  const [loadingXhr, setLoadingXhr] = useState(false)
  const [loadingRemoveAddress, setLoadingRemoveAddress] = useState(false)
  const [addressId, setAddressId] = useState(null)

  const handleShowModalCenterChangeMainAddress = () => {
    setShowModalCenterConfirmChangeMainAddress(
      !showModalCenterConfirmChangeMainAddress,
    )
  }

  const handleShowModalCenterRemoveSavedAddress = id => {
    setShowModalCenterConfirmRemoveSavedAddress(true)
    setAddressId(id)
  }

  const handleHideModalCenterRemoveSavedAddress = () => {
    setShowModalCenterConfirmRemoveSavedAddress(false)
  }

  const handleAddNewAddress = () => {
    navigation.navigate('AccountChangeSavedAddress', { isEdit: false })
  }

  const handleEditAddress = (item, city) => {
    navigation.navigate('AccountChangeSavedAddress', {
      isEdit: true,
      data: { ...item, city: city },
    })
  }

  const handleRemoveAddress = () => {
    setLoadingRemoveAddress(true)
    setShowModalCenterConfirmRemoveSavedAddress(false)
    // axios
    //   .post(Config.CUSTOMER_APP + '/delete-saved-address', {
    //     fbasekey: state.tokenList.fcm_token,
    //     address_id: addressId,
    //   })
    account
      .deleteSavedAddress({ address_id: addressId })
      .then(({ data }) => {
        setLoadingRemoveAddress(false)
      })
      .catch(err => {
        console.log('ERR_REMOVE_ADDRESS', err)
        setLoadingRemoveAddress(false)
      })
  }

  const xhrGetSavedAddress = () => {
    setLoadingXhr(true)
    // axios
    //   .post(Config.CUSTOMER_APP + '/get-saved-address', {
    //     fbasekey: state.tokenList.fcm_token,
    //   })
    account
      .getSavedAddress()
      .then(({ data }) => {
        setLoadingXhr(false)
        setdataSavedAddress(data.data.saved_addresses)
      })
      .catch(err => {
        setLoadingXhr(false)
        console.log('ERR_XHR_SAVED_ADDRESS', err)
      })
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    xhrGetSavedAddress()
  }, [loadingRemoveAddress])

  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }]}>
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 0.75, y: 0.5 }}
        locations={[0.0, 1.0]}
        colors={['#991F5D', '#B93F56']}
        useAngle={true}
        angle={180}
      >
        <View
          style={{
            marginBottom: 19,
            marginTop: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FeatherIcon
                  color={Colors.neutralGray07}
                  size={22}
                  name="arrow-left"
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 16,
                color: Colors.neutralGray07,
              }}
            >
              Alamat Tersimpan
            </Text>
            <View style={{ marginRight: 10 }}>
              <Spacer width={40} />
            </View>
          </View>
          <Spacer height={20} />
          <View style={{ marginHorizontal: SIZES.margin_h }}>
            <Input
              // onChangeText={}
              // defaultValue={city}
              placeholder={placeHolderSearch}
              placeholderTextColor={Colors.neutralGray01}
              inputContainerStyle={{
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: Colors.white,
                borderColor: '#eaeaea',
                borderRadius: 7,
              }}
              // onFocus={}
              keyboardType={'default'}
              inputStyle={{
                paddingLeft: 5,
                fontSize: 16,
                color: Colors.neutralBlack02,
                fontFamily: Fonts.regular,
              }}
              rightIcon={
                <FeatherIcon
                  size={20}
                  color={Colors.neutralGray02}
                  name={`search`}
                />
              }
            />
          </View>
        </View>
      </LinearGradient>
      {loadingXhr ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <LoadingIndicator />
        </View>
      ) : dataSavedAddress.length == 0 ? (
        <NoSavedAddress onPressAddAddress={handleAddNewAddress} />
      ) : (
        <ScrollView style={{}}>
          <View style={{ marginHorizontal: SIZES.margin_h }}>
            <Spacer height={24} />
            <TouchableIconTextRow
              text="Tambah Alamat Baru"
              textColor={Colors.primary}
              iconColor={Colors.primary}
              icon={'plus-circle'}
              onPress={handleAddNewAddress}
            />
            <Spacer height={24} />
            <View>
              {dataSavedAddress.map((item, index) => {
                return (
                  <View style={[{ marginBottom: 20 }]} key={item.city}>
                    <Text
                      style={[
                        {
                          fontFamily: Fonts.medium,
                          fontSize: 16,
                          lineHeight: 22.4,
                          color: Colors.neutralBlack01,
                        },
                      ]}
                    >
                      {item.city}
                    </Text>
                    <Spacer height={20} />
                    {item.saved_address.map((address, index) => (
                      <View
                        style={[
                          {
                            marginBottom: !(index === address.length - 1)
                              ? 20
                              : 0,
                          },
                        ]}
                        key={Math.random().toExponential()}
                      >
                        <CardAddress
                          full_name={address.address_name}
                          address={address.address}
                          phone={address.phone}
                          selected={address.selected}
                          isTouchTextTopRight={true}
                          onPressRemoveAddress={() =>
                            handleShowModalCenterRemoveSavedAddress(address.id)
                          }
                          onPressChangeAddress={() =>
                            handleEditAddress(address, item.city)
                          }
                          touchTextTopRightComp={() => (
                            <TextTouchable
                              text={
                                address.is_main_address
                                  ? 'Alamat Utama'
                                  : 'Jadikan alamat utama'
                              }
                              textStyles={[
                                {
                                  color: Colors.primary,
                                  borderRadius: 4,
                                  overflow: 'hidden',
                                  fontSize: 13,
                                },
                                address.is_main_address && {
                                  backgroundColor: '#F4E9E9',
                                  paddingVertical: 4,
                                  paddingHorizontal: 6,
                                },
                              ]}
                              onPress={handleShowModalCenterChangeMainAddress}
                            />
                          )}
                        />
                      </View>
                    ))}
                  </View>
                )
              })}
            </View>
          </View>
        </ScrollView>
      )}
      <ModalCenterConfirmChangeMainAddress
        isVisible={showModalCenterConfirmChangeMainAddress}
        onPressClose={handleShowModalCenterChangeMainAddress}
      />
      <ModalCenterConfirmRemoveSavedAddress
        isVisible={showModalCenterConfirmRemoveSavedAddress}
        onPressClose={handleHideModalCenterRemoveSavedAddress}
        onPressAccept={handleRemoveAddress}
      />
    </View>
  )
}

export default AccountSavedAddressContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Component
 */

const ModalCenterConfirmChangeMainAddress = ({ ...props }) => (
  <ModalCenterConfirmLayout
    bodyTitle="Ganti Alamat Utama ?"
    bodySubtitle="Apakah kamu yakin menggunakan alamat ini sebagai alamat utama?"
    labelClose="Tidak jadi"
    labelAccept="Ya, simpan"
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
      backgroundColor: 'transparent',
    }}
    {...props}
  />
)

const ModalCenterConfirmRemoveSavedAddress = ({ ...props }) => (
  <ModalCenterConfirmLayout
    isBodyTitleComp={true}
    bodyTitleComp={() => (
      <FeatherIcon name="trash-2" size={40} color={Colors.neutralGray03} />
    )}
    bodySubtitle="Apakah kamu yakin mau menghapus alamat ini ?"
    labelClose="Tidak jadi"
    labelAccept="Ya, hapus"
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
