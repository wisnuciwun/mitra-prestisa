import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'

const InputBase = ({
  value,
  maxLength,
  iconRight,
  iconLeft,
  onPress,
  keyboardType,
  secure,
  editable,
  mode,
  placeholder,
  onChangeText,
  iconSize = 24,
  iconColor = '#aaa',
  iconSet = 'MaterialCommunityIcons',
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const [xfocus, setFocus] = useState(false)
  const [color, setColor] = useState('')

  useEffect(() => {}, [])
  const focusStyle =
    xfocus != true
      ? { borderColor: '#999' }
      : { borderColor: '#0654B9', borderWidth: 1 }

  if (mode == 'error') {
    setColor('#CB3A31')
  }

  const IconSetComp = ({ iconName }) => {
    console.log(iconSet)
    if (iconSet == 'FeatherIcon') {
      return (
        <FeatherIcon
          size={iconSize}
          onPress={() => {
            handleFinishIntro()
          }}
          color={iconColor}
          name={iconName}
        />
      )
    } else {
      return (
        <Icon
          size={iconSize}
          onPress={() => {
            handleFinishIntro()
          }}
          color={iconColor}
          name={iconName}
        />
      )
    }
  }

  const handlerChangeText = text => {
    // onChangeText(text)
  }

  return (
    <View
      style={[
        styles.inputTextContainer,
        Layout.row,
        Layout.justifyContentBetween,
        focusStyle,
        { alignItems: 'center' },
      ]}
    >
      {iconLeft !== '' && <IconSetComp iconName={iconLeft} />}
      <TextInput
        maxLength={maxLength}
        value={value}
        editable={editable}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.inputText}
        placeholder={placeholder}
        secureTextEntry={secure ? true : false}
        inputAccessoryViewID=""
      ></TextInput>
      {iconRight !== '' && <IconSetComp iconName={iconRight} />}
    </View>
  )
}

InputBase.propTypes = {
  iconRight: PropTypes.string,
  iconLeft: PropTypes.string,
  onPress: PropTypes.func,
  keyboardType: PropTypes.string,
  mode: PropTypes.string,
  placeholder: PropTypes.string,
}

InputBase.defaultProps = {
  iconRight: '',
  iconLeft: '',
  keyboardType: 'default',
  mode: '',
  placeholder: '',
}

const styles = StyleSheet.create({
  screen: {},
  inputTextContainer: {
    // width: '100%',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 10,
    borderRadius: 5,
    color: '#666',
  },
  inputText: { width: '70%', color: '#666' },
  focus: {
    borderColor: '#0654B9',
  },
  error: {
    borderColor: '#CB3A31',
  },
})
export default InputBase
