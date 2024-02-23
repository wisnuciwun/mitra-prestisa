import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputTextTwoIconRight from './InputTextTwoIconRight'
import { Colors } from '@/Theme/Variables'
import Spacer from './Spacer'
import { useTheme } from '@/Hooks'

const FormV1 = ({
  label = 'Label',
  footlabel = 'footlabel',
  error = false,
  errorMessage = 'error message',
  footlabelActive = true,
  spacerTop = 6,
  ...props
}) => {
  const { Fonts } = useTheme()
  return (
    <View>
      <Text
        style={{
          color: Colors.neutralBlack02,
          fontSize: 14,
          fontFamily: 'Roboto-Regular',
        }}
      >
        {label}
      </Text>
      <Spacer height={spacerTop} />
      <InputTextTwoIconRight {...props} />
      <Spacer height={4} />
      {footlabelActive && (
        <Text
          style={{
            color: error ? Colors.otherRed : Colors.neutralBlack02,
            fontSize: 12,
            fontFamily: 'Roboto-Regular',
          }}
        >
          {error ? errorMessage : footlabel}
        </Text>
      )}
    </View>
  )
}

export default FormV1

const styles = StyleSheet.create({})
