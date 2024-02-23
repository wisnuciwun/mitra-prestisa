import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import NavBarV1 from '@/Components/Base/NavBarV1'

const UnderConstructionContainer = () => {
  const { Images } = useTheme()
  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      sourceImageLeft: Assets.icon_arrow_left_3x,
      goBackDefault: true,
      titleName: '',
    })
  }, [navigation])

  return (
    <>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          justifyContent: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <FastImage
            source={Assets.under_construction_3x}
            style={{ height: 112, width: 118 }}
            resizeMode={'contain'}
          />
          <View
            style={{ marginTop: 30, alignItems: 'center', marginBottom: 24 }}
          >
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 24,
                fontFamily: Fonts.medium,
                color: Colors.neutralGray01,
                fontSize: 15,
              }}
            >
              Halaman masih proses perawatan
            </Text>
            <Text
              style={{
                marginTop: 12,
                textAlign: 'center',
                lineHeight: 24,
                fontFamily: Fonts.regular,
                color: Colors.neutralGray01,
                fontSize: 15,
                width: 300,
              }}
            >
              Maaf , halamannya yang ingin kamu lihat masih proses perawatan dan
              pemupukan.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <View
              style={{
                borderColor: Colors.neutralBlack01,
                borderWidth: 1,
                height: 40,
                width: 108,
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
                Kembali
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default UnderConstructionContainer

const styles = StyleSheet.create({})
