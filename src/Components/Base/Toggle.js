import { StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'
import { Colors } from '@/Theme/Variables'

const Toggle = ({ on = true }) => {
  return (
    <Animated.View
      style={[
        {
          width: 36,
          height: 21.86,
          borderRadius: 100,
          justifyContent: 'center',
          paddingHorizontal: 6,
        },
        on
          ? { alignItems: 'flex-end', backgroundColor: '#0F67D9' }
          : { alignItems: 'flex-start', backgroundColor: '#C0C0C0' },
      ]}
    >
      <View
        style={{
          height: 9,
          width: 9,
          backgroundColor: Colors.white,
          borderRadius: 100,
        }}
      />
    </Animated.View>
  )
}

export default Toggle

const styles = StyleSheet.create({})
