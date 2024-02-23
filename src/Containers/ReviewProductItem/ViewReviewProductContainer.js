import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { data_lihat_ulasan } from '@/Components/TulisUlasan/DummyData'
import FastImage from 'react-native-fast-image'
import { isEmptyNullOrUndefined, logProps } from '@/Helper'

const ViewReviewProductContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { data } = props.route.params || {}

  React.useLayoutEffect(() => {
    NavBarV1({
      titleName: 'Rating dan Ulasan',
      navigation: navigation,
    })
  }, [navigation])

  // logProps(props)
  return (
    <>
      <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
        <Spacer height={18} />
        <View style={[{ marginHorizontal: SIZES.margin_h }]}>
          <Text
            style={[
              {
                fontFamily: Fonts.medium,
                fontSize: 14,
                color: Colors.neutralBlack02,
              },
            ]}
          >
            Rating
          </Text>
          <Spacer height={12} />
          <View style={[{ flexDirection: 'row' }]}>
            {[...Array(parseInt(data.rating.toFixed(0)))].map((e, i) => (
              <View style={{ marginRight: 18 }} key={i}>
                <FontAwesome5
                  name={'star'}
                  size={31}
                  color={'#EACA25'}
                  solid={true}
                />
              </View>
            ))}
          </View>
          <Spacer height={30} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
            }}
          >
            Ulasan
          </Text>
          <Spacer height={12} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.medium,
              color: Colors.neutralGray01,
              lineHeight: 22.4,
            }}
          >
            {data.review_message}
          </Text>
          <Spacer height={25} />
          {!isEmptyNullOrUndefined(data.review_image) && (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Fonts.medium,
                  color: Colors.neutralBlack02,
                }}
              >
                Foto
              </Text>
              <Spacer height={9} />
              <View style={{ flexDirection: 'row' }}>
                {data.review_image.map((e, i) => (
                  <FastImage
                    source={{ uri: e.url }}
                    key={Math.random()}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 6,
                      marginRight: 10,
                    }}
                  />
                ))}
              </View>
            </>
          )}
        </View>
        <Spacer height={120} />
      </ScrollView>
    </>
  )
}

export default ViewReviewProductContainer

const styles = StyleSheet.create({})
