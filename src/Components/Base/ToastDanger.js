import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import IconAlert from './IconAlert'
import Spacer from './Spacer'

const ToastDanger = ({ toast }) => {
  const heightScreen = Dimensions.get('window').height

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#FEF2F1',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 7,
        elevation: 4,
        marginHorizontal: 30,
        bottom: heightScreen - toast.data.height,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <IconAlert />
          <Spacer width={10} />
          {toast.message.length == 0 ? (
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  color: '#E1382C',
                  fontSize: 14,
                  lineHeight: 20,
                  marginRight: 30,
                }}
              >
                {toast.data.title}
              </Text>
              <Text
                style={{
                  color: '#E1382C',
                  fontSize: 14,
                  lineHeight: 20,
                  marginRight: 25,
                }}
              >
                {toast.data.subtitle}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                color: '#E1382C',
                fontSize: 14,
                lineHeight: 20,
                marginRight: 25,
              }}
            >
              {toast.message}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default ToastDanger

const styles = StyleSheet.create({})
