import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import IconCheck from './IconCheck'
import Spacer from './Spacer'
import { Colors } from '@/Theme/Variables'

const ToastSuccess = ({ toast }) => {
  const heightScreen = Dimensions.get('window').height
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: Colors.otherGreenBg,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 7,
        elevation: 4,
        marginHorizontal: 40,
        bottom: heightScreen - 150,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <IconCheck />
          <Spacer width={10} />
          <Text
            style={{
              color: Colors.otherGreen01,
              fontSize: 14,
              lineHeight: 20,
              marginRight: 25,
            }}
          >
            {toast.message}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ToastSuccess

const styles = StyleSheet.create({})
