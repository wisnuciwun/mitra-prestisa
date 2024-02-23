import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { isEmptyNullOrUndefined, validateOnlyNumbers } from '@/Helper'
import { Assets } from '@/Theme/Assets'
import NavBarV1 from '@/Components/Base/NavBarV1'
import InputTextTitleOnBorder from '@/Components/MakeOrder/InputTextTitleOnBorder'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from '@/Components/Base/Spacer'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { useKeyboardShowChecker } from '@/Helper/keyboardShowCheker'
import { isError } from 'lodash'
import { data_confirm_redeem_reward_success } from '@/Components/RewardsStation/DataDummy'

const RedeemPrestisaRewardsPhoneInputContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route
  const showKeyboard = useKeyboardShowChecker()
  const [valueEWallet, setValueEWallet] = useState('')
  const [errorInput, setErrorInput] = useState('')
  const [disableButtonSubmit, setDisableButtonSubmit] = useState(true)

  const handleOnChangeValueEWallet = (value, error, validate) => {
    setValueEWallet(value)
    setErrorInput(error)
    setDisableButtonSubmit(!validate)
  }

  const handleOnSubmitForm = () => {
    const _response = data_confirm_redeem_reward_success
    const statusCode = 200
    if (statusCode == 200) {
      navigation.navigate('ConfirmationRedeemReward', _response)
    }
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: '',
      borderBottomColor: 'transparent',
    })
  }, [])

  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }]}>
      <FastImage
        source={{
          uri: isEmptyNullOrUndefined(params.img)
            ? Assets.noImageUrl
            : params.img,
        }}
        style={{ height: 120, width: SIZES.width_window }}
      />
      <Spacer height={24} />
      <View>
        {params.cat === 'tokenlistrik' ? (
          <Electricity
            onChangeValue={(value, error, validate) =>
              handleOnChangeValueEWallet(value, error, validate)
            }
            {...params}
          />
        ) : (
          <EWallet
            onChangeValue={(value, error, validate) =>
              handleOnChangeValueEWallet(value, error, validate)
            }
            {...params}
          />
        )}
      </View>
      {!showKeyboard && (
        <ButtonBottomFloating
          label="Konfirmasi"
          disable={disableButtonSubmit}
          onPress={handleOnSubmitForm}
        />
      )}
    </View>
  )
}

export default RedeemPrestisaRewardsPhoneInputContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Components:
 */
const EWallet = ({
  isInput = () => {},
  onChangeValue = () => {},
  ...props
}) => {
  const _wXIcon = 24
  const _marginLeftXIcon = 16
  const _placeholder = '08xxxxxxxxxxx'
  const [errorOnChange, setErrorOnChange] = useState(false)
  const [placeholder, setPlaceholder] = useState(_placeholder)
  const [value, setValue] = useState('')
  const [validateValue, setValidateValue] = useState(false)

  const handleOnFocus = () => {
    isInput(true)
  }

  const handleOnBlur = () => {
    isInput(false)
    setPlaceholder(_placeholder)
  }

  const handleOnChangeText = text => {
    if (validateOnlyNumbers(text)) {
      setValue(text)
      if (text.length == 0) {
        setPlaceholder(_placeholder)
        setErrorOnChange(false)
        setValidateValue(false)
      } else {
        setPlaceholder('')
        if (text.length > 0 && text.length < 10) {
          setErrorOnChange(true)
          setValidateValue(false)
        } else if (text.length >= 10 && text.length <= 15) {
          setErrorOnChange(false)
          setValidateValue(true)
        } else {
          setValue(text.substring(0, 16))
          setErrorOnChange(true)
          setValidateValue(false)
        }
      }
    } else {
      setValue('')
      setPlaceholder(_placeholder)
      setErrorOnChange(false)
      setValidateValue(false)
    }
  }

  const handleRemoveValue = () => {
    setValue('')
    setErrorOnChange(false)
    setValidateValue(false)
  }

  useEffect(() => {
    onChangeValue(value, errorOnChange, validateValue)
  }, [value.length])

  return (
    <View style={{ marginHorizontal: SIZES.margin_h }}>
      <Text>Masukkan No. Handphone {props.cat_name} tujuan</Text>
      <View>
        <InputTextTitleOnBorder
          showLabel={false}
          value={value}
          placeHolder={placeholder}
          isError={errorOnChange}
          inputStyle={{ fontSize: 18, color: Colors.neutralGray01 }}
          keyboardType="number-pad"
          errorMessage="Nomor minimal terdiri dari 10 karakter"
          errorStyle={{
            fontFamily: Fonts.regular,
            fontSize: 14,
          }}
          inputContainerStyle={[
            {
              borderColor: 'transparent',
              backgroundColor: '#EBEDF1',
              paddingLeft: 12,
              marginRight: _wXIcon + _marginLeftXIcon,
            },
          ]}
          rightIcon={() => {
            return (
              <View
                style={{
                  transform: [{ translateX: _wXIcon + 4 + _marginLeftXIcon }],
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity onPress={handleRemoveValue}>
                  <FeatherIcon
                    name={'x'}
                    size={24}
                    color={Colors.neutralGray02}
                  />
                </TouchableOpacity>
              </View>
            )
          }}
          onChangeText={text => handleOnChangeText(text)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </View>
    </View>
  )
}

const Electricity = ({
  isInput = () => {},
  onChangeValue = () => {},
  ...props
}) => {
  const _wXIcon = 24
  const _marginLeftXIcon = 16
  const _placeholder = '08xxxxxxxxxxx'
  const [errorOnChange, setErrorOnChange] = useState(false)
  const [placeholder, setPlaceholder] = useState(_placeholder)
  const [value, setValue] = useState('')
  const [validateValue, setValidateValue] = useState(false)

  const handleOnFocus = () => {
    isInput(true)
  }

  const handleOnBlur = () => {
    isInput(false)
    setPlaceholder(_placeholder)
  }

  const handleOnChangeText = text => {
    if (validateOnlyNumbers(text)) {
      setValue(text)
      if (text.length == 0) {
        setPlaceholder(_placeholder)
        setErrorOnChange(false)
        setValidateValue(false)
      } else {
        setPlaceholder('')
        if (text.length > 0 && text.length < 10) {
          setErrorOnChange(true)
          setValidateValue(false)
        } else if (text.length >= 10 && text.length <= 15) {
          setErrorOnChange(false)
          setValidateValue(true)
        } else {
          setValue(text.substring(0, 16))
          setErrorOnChange(true)
          setValidateValue(false)
        }
      }
    } else {
      setValue('')
      setPlaceholder(_placeholder)
      setErrorOnChange(false)
      setValidateValue(false)
    }
  }

  const handleRemoveValue = () => {
    setValue('')
    setErrorOnChange(false)
    setValidateValue(false)
  }

  useEffect(() => {
    onChangeValue(value, errorOnChange, validateValue)
  }, [value.length])

  return (
    <View style={{ marginHorizontal: SIZES.margin_h }}>
      <Text>Masukkan No. Meter Pelanggan {props.cat_name} tujuan</Text>
      <View>
        <InputTextTitleOnBorder
          showLabel={false}
          value={value}
          placeHolder={placeholder}
          isError={errorOnChange}
          inputStyle={{ fontSize: 18, color: Colors.neutralGray01 }}
          keyboardType="number-pad"
          errorMessage="Nomor minimal terdiri dari 10 karakter"
          errorStyle={{
            fontFamily: Fonts.regular,
            fontSize: 14,
          }}
          inputContainerStyle={[
            {
              borderColor: 'transparent',
              backgroundColor: '#EBEDF1',
              paddingLeft: 12,
              marginRight: _wXIcon + _marginLeftXIcon,
            },
          ]}
          rightIcon={() => {
            return (
              <View
                style={{
                  transform: [{ translateX: _wXIcon + 4 + _marginLeftXIcon }],
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity onPress={handleRemoveValue}>
                  <FeatherIcon
                    name={'x'}
                    size={24}
                    color={Colors.neutralGray02}
                  />
                </TouchableOpacity>
              </View>
            )
          }}
          onChangeText={text => handleOnChangeText(text)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </View>
    </View>
  )
}
