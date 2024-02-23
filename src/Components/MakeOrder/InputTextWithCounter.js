import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'
import { Colors, Fonts } from '@/Theme/Variables'
import IconContact from '../Base/IconContact'

const InputTextWithCounter = ({
  label = 'Labelll On Border',
  errorMessage = '0/999',
  heightInputContainer = 40,
  multiline = false,
  inputContainerStyle = {},
  labelStyle,
  inputStyle,
  inputFontSize = 16,
  paddingBottomLabel = 8,
  placeHolder,
  isContact = false,
  isRequired = true,
  errorStyle,
  isError = false,
  ...props
}) => {
  return (
    <Input
      placeholder={placeHolder}
      label={() => {
        return (
          <View
            style={{
              paddingLeft: 0,
              paddingRight: 10,
              paddingBottom: paddingBottomLabel,
              backgroundColor: Colors.white,
            }}
          >
            <Text
              style={[
                {
                  fontFamily: Fonts.regular,
                  fontSize: 13,
                  color: Colors.neutralBlack01,
                  lineHeight: 24,
                },
                labelStyle,
              ]}
            >
              {label}
              {isRequired && <Text style={{ color: Colors.error }}>*</Text>}
            </Text>
          </View>
        )
      }}
      placeholderTextColor={Colors.neutralGray01}
      inputContainerStyle={[
        {
          paddingLeft: 20,
          // paddingTop: 10,
          borderRadius: 8,
          height: heightInputContainer,
          borderColor: isError ? Colors.error : Colors.neutralGray03,
        },
        inputContainerStyle,
      ]}
      rightIcon={() => {
        if (isContact) {
          return (
            <TouchableOpacity
              style={{
                marginRight: -62,
              }}
            >
              {/* <IconContact /> */}
              <IconContact />
            </TouchableOpacity>
          )
        }
      }}
      multiline={multiline}
      inputStyle={[
        {
          // top: 4,
          paddingLeft: 0,
          fontSize: inputFontSize,
          color: Colors.neutralBlack02,
          lineHeight: 23,
        },
        inputStyle,
      ]}
      errorMessage={errorMessage}
      errorStyle={[
        {
          textAlign: 'right',
          color: isError ? Colors.error : Colors.neutralGray01,
        },
        errorStyle,
      ]}
      {...props}
    />
  )
}

export default InputTextWithCounter

const styles = StyleSheet.create({})
