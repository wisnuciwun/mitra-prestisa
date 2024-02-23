import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'
import { Colors, Fonts } from '@/Theme/Variables'
import IconContact from '../Base/IconContact'

const InputTextTitleOnBorder = ({
  label = 'Labelll On Border',
  errorMessage = 'Error message message message message',
  heightInputContainer = null,
  multiline = false,
  inputContainerStyle = {},
  errorStyle = {},
  inputStyle = {},
  inputFontSize = 16,
  placeHolder,
  isError = false,
  value,
  keyboardType = 'default',
  defaultValue,
  disabled,
  onFocus,
  onBlur,
  rightIcon,
  labelComp,
  showLabel = true,
  onChangeText = () => {},
}) => {
  return (
    <Input
      onBlur={onBlur}
      onFocus={onFocus}
      disabledInputStyle={{
        fontSize: inputFontSize,
        color: Colors.neutralBlack02,
        opacity: 1.0,
      }}
      disabled={disabled}
      defaultValue={defaultValue}
      keyboardType={keyboardType}
      placeholder={placeHolder}
      value={value}
      onChangeText={onChangeText}
      label={
        showLabel
          ? () => {
              return (
                <View
                  style={{
                    top: -10,
                    left: 20,
                    paddingLeft: 8,
                    paddingRight: 10,
                    backgroundColor: Colors.white,
                    zIndex: 1,
                    position: 'absolute',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      fontSize: 13,
                      color: Colors.neutralBlack01,
                      lineHeight: 24,
                    }}
                  >
                    {label}
                    <Text style={{ color: Colors.error }}>*</Text>
                  </Text>
                </View>
              )
            }
          : labelComp
      }
      placeholderTextColor={Colors.neutralGray01}
      containerStyle={{ paddingBottom: 0 }}
      inputContainerStyle={[
        {
          paddingLeft: 20,
          borderRadius: 6,
          height: heightInputContainer,
          borderColor: Colors.neutralGray03,
        },
        inputContainerStyle,
      ]}
      rightIcon={rightIcon}
      multiline={multiline}
      inputStyle={[
        {
          paddingLeft: 0,
          fontSize: inputFontSize,
          color: Colors.neutralBlack02,
        },
        inputStyle,
      ]}
      errorStyle={[
        {
          marginBottom: 20,
          color: isError ? Colors.error : Colors.neutralBlack02,
          fontFamily: Fonts.medium,
        },
        errorStyle,
      ]}
      errorMessage={errorMessage == '' ? null : errorMessage}
    />
  )
}

export default InputTextTitleOnBorder

const styles = StyleSheet.create({})
