import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputWithCounter2 = ({
  defaultValue = '',
  multiline = false,
  maxLength = 5,
  numberOfLines = 1,
  onChangeText,
  containerStyle,
  InputStyle,
  ...props
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  useEffect(() => {}, [])
  const handlerChangeText = text => {
    setText(text)
    onChangeText(text)
  }

  return (
    <View style={[st.screen, containerStyle]}>
      <TextInput
        {...props}
        defaultValue={defaultValue}
        // value={textCatatan}
        multiline={multiline}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        style={{
          textAlignVertical: multiline ? 'top' : 'center',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          color: Colors.neutralBlack02,
          //   marginTop: 10,
          ...InputStyle,
        }}
        onChangeText={text => {
          handlerChangeText(text)
        }}
      ></TextInput>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text></Text>
        <Text>
          {text.length}/{maxLength}
        </Text>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
})
export default InputWithCounter2
