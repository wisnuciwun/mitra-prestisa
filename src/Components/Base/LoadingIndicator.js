import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { Colors, Fonts } from '@/Theme/Variables'

const LoadingIndicator = ({
  title,
  loadingSize,
  loadingColor,
  style,
  titleStyle,
  titleColor,
}) => {
  return (
    <View style={[styles.screen, style]}>
      <View style={{ alignItems: 'center', marginVertical: 30 }}>
        <ActivityIndicator
          style={{ marginVertical: 10 }}
          size={loadingSize}
          color={loadingColor}
        />
        <Text style={[styles.title, { color: titleColor }, titleStyle]}>
          {title}
        </Text>
      </View>
    </View>
  )
}

LoadingIndicator.defaultProps = {
  title: '',
  loadingSize: 30,
  loadingColor: Colors.primary,
  titleColor: Colors.neutralBlack01,
}

const styles = StyleSheet.create({
  screen: {},
  title: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
})
export default LoadingIndicator
