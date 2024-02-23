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
import FeatherIcon from 'react-native-vector-icons/Feather'

const NavBarV1 = ({
  navigation,
  backToRouteName,
  titleName,
  sourceImageLeft,
  paramsRoute,
  goBackDefault = true,
  isNavDefault = true,
  onNav,
  isReplace,
  isHeaderLeft = true,
  isHeaderRight = false,
  disabledBack = false,
  headerRightComp,
  backgroundColor = Colors.white,
  colorArrowLeft = Colors.neutralBlack01,
  borderBottomColor = Colors.neutralGray08,
  headerLeftIconSize = 22,
  headerLeftIconName = 'arrow-left',
  styleArrrowLeft,
  ...props
}) => {
  navigation.setOptions({
    headerLeft: () =>
      isHeaderLeft && (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity
            disabled={disabledBack}
            onPress={() => {
              if (isNavDefault) {
                goBackDefault
                  ? navigation.goBack()
                  : isReplace
                  ? // navigation.reset({
                    //     index: 0,
                    //     routes: [{ name: 'Main' }],
                    //   })
                    navigation.replace('Main')
                  : navigation.navigate(`${backToRouteName}`, { paramsRoute })
              } else {
                onNav()
              }
            }}
            style={[
              {
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
              styleArrrowLeft,
            ]}
          >
            {sourceImageLeft != undefined ? (
              <FastImage
                source={sourceImageLeft}
                style={{
                  height: 22,
                  width: 22,
                }}
                resizeMode={`contain`}
              />
            ) : (
              <FeatherIcon
                color={colorArrowLeft}
                size={headerLeftIconSize}
                name={headerLeftIconName}
              />
            )}
          </TouchableOpacity>
        </View>
      ),
    headerRight: () => isHeaderRight && React.createElement(headerRightComp),
    headerTitleStyle: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      color: Colors.neutralBlack01,
      elevation: 0,
      fontWeight: '400',
    },
    headerStyle: {
      borderBottomColor: borderBottomColor,
      borderBottomWidth: 1,
      elevation: 0,
      backgroundColor: backgroundColor,
    },
    headerShadowVisible: true,
    animationEnabled: true,
    title: `${titleName}`,
    ...props,
  })
}

export default NavBarV1

const styles = StyleSheet.create({})
