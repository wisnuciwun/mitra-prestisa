import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputSearch = (
  props,
  {
    iconRight,
    iconLeft,
    onPress,
    keyboardType,
    secure,
    editable,
    mode,
    placeholder,
    onChangeText,
  },
) => {
  //   const {} = props
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const [xfocus, setFocus] = useState(false)
  const [color, setColor] = useState('')

  useEffect(() => {}, [])
  const focusStyle = {}

  if (mode == 'error') {
    setColor('#CB3A31')
  }

  const handlerChangeText = text => {
    onChangeText(text)
  }

  return (
    <View
      style={[
        styles.inputTextContainer,
        Layout.row,
        Layout.justifyContentBetween,
        focusStyle,
        { alignItems: 'center', borderColor: Colors.neutralGrayBlue },
      ]}
    >
      {iconLeft}
      <TextInput
        editable={editable}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.inputText}
        placeholder={placeholder}
        secureTextEntry={secure ? true : false}
        inputAccessoryViewID=""
        {...props}
      ></TextInput>
      {iconRight}
      <FeatherIcon
        style={{ marginRight: 10 }}
        color={Colors.neutralGray03}
        size={18}
        name="search"
      ></FeatherIcon>
      {/* <Icon
        allowFontScaling={false}
        color="black"
        name="search"
        size={18}
        style={{ marginRight: 10 }}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
  inputTextContainer: {
    // flex: 1,
    width: '100%',
    // paddingVertical: 0,
    borderWidth: 0,
    borderColor: Colors.neutralGrayBlue,
    // border
    // paddingHorizontal: 10,

    fontSize: 16,
    backgroundColor: Colors.neutralGrayBlue,
    // marginTop: 10,
    borderRadius: 5,
    color: '#666',
  },
  inputText: {
    width: '70%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.neutralBlack01,
  },
  focus: {
    // borderColor: '#0654B9',
  },
  error: {
    borderColor: '#CB3A31',
  },
})
export default InputSearch
