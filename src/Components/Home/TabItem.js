import { Text, View, TouchableHighlight, Dimensions } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import { Colors, Fonts } from '@/Theme/Variables'
import { shadowBg } from './Helper'
import Spacer from '../Base/Spacer'

export const TabItem = ({
  item,
  onHide,
  onShow,
  squareSize = 68,
  subCategory,
}) => {
  return (
    <View
      style={
        {
          // backgroundColor: 'cyan'
        }
      }
    >
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => {
          if (
            subCategory.data.showFirstSubCategory !=
              subCategory.data.showSecondSubCategory &&
            item.id == subCategory.data.id
          ) {
            onHide()
          } else {
            onShow()
          }
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              shadowBg.v1,
              {
                elevation: 6, // @platformandroid
                height: squareSize,
                width: squareSize,
                borderRadius: 13,
              },
            ]}
          >
            <View
              style={{
                height: squareSize,
                width: squareSize,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  subCategory.data.showFirstSubCategory !=
                    subCategory.data.showSecondSubCategory &&
                  item.id == subCategory.data.id
                    ? '#F7E7EF'
                    : Colors.white,
                borderRadius: 13,
                marginRight: 0,
                marginBottom: 12,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {subCategory.data.showFirstSubCategory !=
                subCategory.data.showSecondSubCategory &&
                item.id == subCategory.data.id && (
                  <View
                    style={{
                      height: 57,
                      width: 57,
                      borderRadius: 10000,
                      overflow: 'hidden',
                      backgroundColor: '#CACACA40',
                      position: 'absolute',
                      top: -10,
                      left: -20,
                    }}
                  />
                )}
              <FastImage
                source={{ uri: item.icon.replace('http://', 'https://') }}
                style={{
                  height: squareSize - 18,
                  width: squareSize - 18,
                  borderRadius: 10,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Spacer height={8} />
          <View style={{ height: 50 }}>
            <Text
              style={{
                marginTop: 6,
                borderRadius: 5,
                overflow: 'hidden',
                width: squareSize,
                textAlign: 'center',
                fontFamily: Fonts.bold,
                fontSize: 13,
                color:
                  subCategory.data.showFirstSubCategory !=
                    subCategory.data.showSecondSubCategory &&
                  item.id == subCategory.data.id
                    ? 'red' == Colors.primary
                      ? Colors.neutralBlack02
                      : Colors.primary
                    : Colors.neutralBlack02,
                textTransform: 'capitalize',
                lineHeight: 18,
              }}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={{
              height: 2.2,
              width: squareSize - 11,
              borderRadius: 100,
              backgroundColor:
                subCategory.data.showFirstSubCategory !=
                  subCategory.data.showSecondSubCategory &&
                item.id == subCategory.data.id
                  ? Colors.primary
                  : 'transparent',
            }}
          />
        </View>
      </TouchableHighlight>
    </View>
  )
}
