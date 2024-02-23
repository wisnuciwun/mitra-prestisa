import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Spacer from './Spacer'
import { Colors } from '@/Theme/Variables'

const InputTextTwoIconRight = ({
  placeholder = 'Placeholder',
  value,
  alert = false,
  eyeActive = true,
  onPressSecureText,
  secureTextEntry,
  onChangeText,
}) => {
  const { Images } = useTheme()

  return (
    <View
      style={{
        // backgroundColor: 'green',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 5,
        borderWidth: alert ? 1 : 1,
        borderColor: alert ? Colors.otherRed : Colors.neutralGray03,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            value={value}
            style={{ fontSize: 16, fontFamily: 'Roboto-Regular' }}
            numberOfLines={1}
            onChangeText={onChangeText}
          />
        </View>
        <Spacer width={10} />
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'cyan',
            alignItems: 'center',
          }}
        >
          {alert && (
            <>
              <Image
                source={Images.icon_alert_3x}
                style={{
                  height: 26,
                  width: 26,
                  //  backgroundColor: 'green'
                }}
              />
              <Spacer width={14} />
            </>
          )}
          {eyeActive && (
            <TouchableOpacity onPress={onPressSecureText}>
              {secureTextEntry ? (
                <Image
                  source={Images.icon_eye_3x}
                  style={{
                    height: 24,
                    width: 24,
                    // backgroundColor: 'green'
                  }}
                />
              ) : (
                <Image
                  source={Images.icon_eye_off_3x}
                  style={{
                    height: 24,
                    width: 24,
                    // backgroundColor: 'green'
                  }}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default InputTextTwoIconRight

const styles = StyleSheet.create({})
