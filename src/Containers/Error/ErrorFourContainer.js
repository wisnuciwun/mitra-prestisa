import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Spacer from '@/Components/Base/Spacer'
import ErrorFourOrFive from '@/Components/Error/ErrorFourOrFive'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'

const ErrorFourContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
    navigation.addListener('beforeRemove', e => {
      if (e.data.action.type == 'GO_BACK') {
        e.preventDefault()
      }
    })
  }, [navigation])

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <ErrorFourOrFive isFlex={false} />
      <Spacer height={20} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main')
        }}
      >
        <View
          style={{
            borderColor: Colors.neutralBlack01,
            borderWidth: 1,
            height: 40,
            paddingHorizontal: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              lineHeight: 24,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
              fontSize: 16,
            }}
          >
            Kembali Ke Beranda
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ErrorFourContainer

const styles = StyleSheet.create({})
