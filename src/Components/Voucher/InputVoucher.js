import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InputVoucher = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.margin_h,
        paddingBottom: 12,
      }}
    >
      <Input
        placeholder={placeHolder}
        placeholderTextColor={Colors.neutralGray01}
        inputContainerStyle={{
          paddingLeft: 20,
          borderColor: borderInput ? Colors.otherBlue : Colors.neutralGray03,
        }}
        keyboardType={'default'}
        onChangeText={text => {
          setVoucherCode(text.replace(/ /g, ''))
          text.length == 0 && setPlaceHolder('Masukkan kode voucher')
        }}
        defaultValue={voucherCode}
        onSubmitEditing={handleInputVoucher}
        returnKeyLabel={`Cari`}
        returnKeyType={`search`}
        inputStyle={{
          paddingLeft: 0,
          fontSize: 16,
          color: Colors.neutralBlack02,
        }}
        rightIcon={
          voucherCode.length != 0 && (
            <TouchableOpacity
              style={{
                flex: 1,
                width: 34,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleClearInput}
            >
              <FeatherIcon size={20} color={Colors.neutralGray01} name={`x`} />
            </TouchableOpacity>
          )
        }
      />
    </View>
  )
}

export default InputVoucher

const styles = StyleSheet.create({})
