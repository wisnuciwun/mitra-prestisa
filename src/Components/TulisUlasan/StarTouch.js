import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const StarTouch = props => {
  return (
    <View>
      <FontAwesome5 name={'star'} size={40} color={'#EACA25'} />
    </View>
  )
}

export default StarTouch

const styles = StyleSheet.create({})
