import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { STYLES } from '@/Theme/Styles'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import { data_saved_address } from '@/Components/SavedAddress/DataDummy'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import _ from 'lodash'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {
  clearDefaultAddress,
  setDefaultAddress,
} from '@/Store/savedAddressSlice'
import {
  addEnableObjectKey,
  addSelectedObjectKey,
  sortedByTrue,
} from '@/Components/SavedAddress/Helper'

const SavedAddressContainer = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const allAddress = sortedByTrue(
    addEnableObjectKey(
      data_saved_address,
      state.location.shipping_address.data.id,
    ),
  )

  const [activeSaveAddress, setActiveSaveAddress] = useState(
    addSelectedObjectKey(allAddress),
  )

  const handleOnSelected = child => {
    const _address = [...activeSaveAddress]
    _address.map((e, i) =>
      e.enable === true
        ? e.data.map((_e, i) => {
            return i === child
              ? (e.data[i]['selected'] = !e.data[i]['selected'])
              : (e.data[i]['selected'] = false)
          })
        : e,
    )
    setActiveSaveAddress(_address)
  }

  const handleSaveAddressDefault = () => {
    navigation.goBack()
    const x = Object.assign(
      {},
      ..._.filter(_.filter(activeSaveAddress, { enable: true })),
    )

    const _arr = _.filter(x.data, { selected: true })

    if (_arr.length > 0 && _arr.length == 1) {
      return dispatch(
        setDefaultAddress(
          Object.assign({}, ..._.filter(x.data, { selected: true })),
        ),
      )
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity
            onPress={handleSaveAddressDefault}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FeatherIcon
              color={Colors.neutralBlack01}
              size={22}
              name="arrow-left"
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitleStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.neutralBlack01,
        elevation: 0,
        fontWeight: '400',
      },
      headerStyle: {
        borderBottomColor: Colors.neutralGray08,
        borderBottomWidth: 1,
        elevation: 0,
      },
      headerShadowVisible: true,
      animationEnabled: true,
      title: `Alamat Tersimpan`,
    })
  }, [navigation])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Spacer height={30} />
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        {activeSaveAddress.map((item, index) => {
          const _disable = !item.enable

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
                  !item.enable && { color: Colors.neutralGray01 },
                ]}
              >
                {item.city}
              </Text>
              <Spacer height={20} />
              {item.data.map((address, index) => (
                <View
                  style={[
                    { marginBottom: !(index === address.length - 1) ? 20 : 0 },
                  ]}
                  key={Math.random().toExponential()}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      handleOnSelected(index)
                    }}
                    disabled={_disable}
                  >
                    <CardAddress
                      full_name={address.full_name}
                      address={address.address}
                      phone={address.phone}
                      selected={address.selected}
                      disable={_disable}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )
        })}
      </View>
      <Spacer height={200} />
    </ScrollView>
  )
}

export default SavedAddressContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Componnet: Card Address
 */
const CardAddress = ({
  full_name = 'Full Name',
  address = 'Address Street',
  phone = '0123456789',
  selected = false,
  disable = false,
}) => {
  return (
    <View
      style={[
        STYLES.shadow_bottom,
        {
          borderRadius: 6,
          elevation: 6,
          height: 158,
          backgroundColor: Colors.white,
          padding: 16,
          justifyContent: 'space-between',
          flexDirection: 'column',
          borderWidth: 2,
          borderColor: Colors.white,
        },
        selected && { borderWidth: 2, borderColor: Colors.primary },
      ]}
    >
      <View>
        <Text
          style={[
            {
              fontFamily: Fonts.medium,
              fontSize: 16,
              lineHeight: 22.4,
              color: Colors.neutralBlack01,
            },
            disable && { color: Colors.neutralGray01 },
          ]}
        >
          {full_name}
        </Text>
        <Spacer height={8} />
        <Text
          style={[
            {
              fontFamily: Fonts.regular,
              fontSize: 13,
              lineHeight: 18,
              color: Colors.neutralBlack01,
            },
            disable && { color: Colors.neutralGray01 },
          ]}
        >
          {address}
        </Text>
        <Spacer height={8} />
        <Text
          style={[
            {
              fontFamily: Fonts.regular,
              fontSize: 13,
              lineHeight: 18,
              color: Colors.neutralBlack01,
            },
            disable && { color: Colors.neutralGray01 },
          ]}
        >
          {phone}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: SIZES.width_window / 2 - SIZES.margin_h,
          justifyContent: 'space-between',
        }}
      >
        <TextTouchable
          text="Ubah alamat"
          textStyles={{ color: Colors.neutralGray01, fontSize: 14 }}
        />
        <TextTouchable
          text="Hapus"
          textStyles={{ color: Colors.neutralGray01, fontSize: 14 }}
        />
      </View>
    </View>
  )
}
