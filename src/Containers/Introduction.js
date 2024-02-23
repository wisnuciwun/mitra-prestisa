import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import CarouselView from '../Components/Carousel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setLocationFirst } from '@/Store/location'

const Introduction = props => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const handleFinishIntro = async () => {
    console.log('finish')
    try {
      await AsyncStorage.setItem('@skip_intro', 'true')
      await dispatch(setLocationFirst(false))
      props.navigation.replace('Auth')
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  return (
    <View style={[Layout.fill, styles.screen]}>
      <CarouselView handleFinish={handleFinishIntro} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'white' },
})
export default Introduction
