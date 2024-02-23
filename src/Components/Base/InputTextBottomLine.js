import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'
import { Colors, Fonts } from '@/Theme/Variables'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputTextBottomLine = ({
  label = '',
  errorMessage = '',
  heightInputContainer = 30,
  multiline = false,
  inputContainerStyle = {},
  errorStyle = {},
  disabledInputStyle = {},
  inputStyle = {},
  inputFontSize = 16,
  placeHolder,
  maxLength,
  isError = false,
  value,
  keyboardType = 'default',
  defaultValue,
  disabled,
  onFocus,
  onBlur,
  rightIcon,
  onChangeText,
  isErrorCustom = false,
  errorCustomComp,
  borderBottomColor = Colors.neutralGray03,
  placeholderTextColor = Colors.neutralGray01,
  ...props
}) => {
  return (
    <>
      <Input
        label={label}
        onBlur={onBlur}
        onFocus={onFocus}
        disabledInputStyle={[
          {
            fontSize: inputFontSize,
            color: Colors.neutralBlack02,
            opacity: 1.0,
          },
          disabledInputStyle,
        ]}
        disabled={disabled}
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        placeholder={placeHolder}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        containerStyle={{ paddingBottom: 0 }}
        inputContainerStyle={[
          {
            paddingLeft: 0,
            borderRadius: 0,
            height: heightInputContainer,
            borderWidth: 0,
            borderBottomColor: isError ? '#CB3A31' : borderBottomColor,
          },
          inputContainerStyle,
        ]}
        rightIcon={
          isError ? (
            <Icon name="information" size={16} color="#CB3A31" />
          ) : (
            rightIcon
          )
        }
        multiline={multiline}
        inputStyle={[
          {
            paddingLeft: 0,
            paddingVertical: 0,
            fontSize: inputFontSize,
            color: Colors.neutralBlack02,
          },
          inputStyle,
        ]}
        errorStyle={[
          {
            marginLeft: 0,
            marginBottom: 20,
            color: isError ? '#CB3A31' : Colors.neutralBlack02,
            fontFamily: Fonts.medium,
          },
          errorStyle,
        ]}
        errorMessage={errorMessage == '' ? null : errorMessage}
        {...props}
      />
      {isErrorCustom && React.createElement(errorCustomComp)}
    </>
  )
}

export default InputTextBottomLine

const styles = StyleSheet.create({})
