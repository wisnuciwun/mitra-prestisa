import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import Spacer from './Spacer'
import { Colors } from '@/Theme/Variables'
import { useNavigation } from '@react-navigation/native'
import { navigate } from '@/Navigators/utils'
import FastImage from 'react-native-fast-image'

const NavBarV2 = ({
  navigation,
  backToRouteName,
  sourceImageLeft,
  sourceImageRight,
  headerRightTitle,
  paramsRoute,
}) => {
  navigation.setOptions({
    headerLeft: () => (
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(`${backToRouteName}`, { paramsRoute })
          }
          style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FastImage
            source={sourceImageLeft}
            style={{
              height: 22,
              width: 22,
            }}
            resizeMode={`contain`}
          />
        </TouchableOpacity>
      </View>
    ),
    headerRight: () => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <FastImage
            source={sourceImageRight}
            style={{ height: 22, width: 22 }}
          />
          <Spacer width={10} />
          <Text style={{ color: Colors.primary, fontSize: 14 }}>
            {headerRightTitle}
          </Text>
        </View>
      )
    },
    headerTitleStyle: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      color: Colors.neutralBlack01,
      elevation: 0,
      fontWeight: '400',
    },
    headerStyle: {
      borderBottomColor: Colors.neutralGray08,
      borderBottomWidth: 1,
      elevation: 0,
    },
    headerShadowVisible: true,
    animationEnabled: true,
    title: '',
  })
}

export default NavBarV2

const styles = StyleSheet.create({})
