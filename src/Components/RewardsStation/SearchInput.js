import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from '@/Theme/Variables'

const SearchInput = ({
  onFocus,
  inputLength,
  leftIcon,
  onClearInput,
  onChangeText,
  defaultValue,
  placeholder,
  borderInput,
  paddingLeft = 20,
  inputContainerStyle = {},
  inputStyle = {},
  borderColorOnFocus = Colors.otherBlue,
  borderColorOnBlur = Colors.neutralGray03,
  ...props
}) => {
  return (
    <Input
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      placeholder={placeholder}
      placeholderTextColor={Colors.neutralGray01}
      onFocus={onFocus}
      keyboardType={'default'}
      leftIcon={leftIcon}
      inputStyle={[
        {
          paddingLeft: 5,
          fontSize: 16,
          color: Colors.neutralBlack02,
        },
        inputStyle,
      ]}
      inputContainerStyle={[
        {
          paddingLeft: paddingLeft,
          paddingRight: inputLength != 0 ? 10 : 0,
          borderColor: borderInput ? borderColorOnFocus : borderColorOnBlur,
        },
        inputContainerStyle,
      ]}
      rightIcon={
        inputLength != 0 ? (
          <TouchableOpacity
            style={{
              flex: 1,
              width: 34,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onClearInput}
          >
            <FeatherIcon size={20} color={Colors.neutralGray01} name={`x`} />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
              width: 34,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FeatherIcon
              size={20}
              color={Colors.neutralGray03}
              name={`search`}
            />
          </View>
        )
      }
      renderErrorMessage={false}
      containerStyle={{ marginTop: 0 }}
      {...props}
    />
  )
}

export default SearchInput

const styles = StyleSheet.create({})
