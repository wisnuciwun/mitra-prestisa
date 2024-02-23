import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TouchbleTextBottomLine = () => {
  return (
    <View>
      <Input
        disabledInputStyle={{
          fontSize: inputFontSize,
          color: Colors.neutralBlack02,
          opacity: 1.0,
        }}
        placeholderTextColor={Colors.neutralGray01}
        containerStyle={{ paddingBottom: 0 }}
        inputContainerStyle={[
          {
            paddingLeft: 0,
            borderRadius: 6,
            height: 30,
            borderWidth: 0,
            borderBottomColor: isError ? '#CB3A31' : Colors.neutralGray03,
          },
          inputContainerStyle,
        ]}
        rightIcon={
          isError ? (
            <Icon name="information" size={16} color="#CB3A31" />
          ) : (
            rightIcon
          )
        }
        multiline={multiline}
      />
    </View>
  )
}

export default TouchbleTextBottomLine

const styles = StyleSheet.create({})
