import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import CardVoucherRedeem from '@/Components/RewardsStation/CardVoucherRedeem'
import { SIZES } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { isEmptyNullOrUndefined } from '@/Helper'
import { Assets } from '@/Theme/Assets'
import Spacer from '@/Components/Base/Spacer'
import NavBarV1 from '@/Components/Base/NavBarV1'

const PrestisaRewardSubCatDetailContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: '',
      borderBottomColor: 'transparent',
    })
  }, [navigation])

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: 'white',
        },
      ]}
    >
      <FastImage
        source={{
          uri: isEmptyNullOrUndefined(params.img)
            ? Assets.noImageUrl
            : params.img,
        }}
        style={{ height: 84, width: SIZES.width_window }}
      />
      <Spacer height={36} />
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginHorizontal: SIZES.margin_h,
          justifyContent: 'center',
        }}
      >
        {params.child.map((e, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate('PrestisaRewardDetail', e)}
            activeOpacity={0.98}
          >
            <CardVoucherRedeem
              {...e}
              style={{
                marginLeft: i % 2 == 0 ? 0 : 10,
                marginRight: Math.abs(i % 2) == 1 ? 0 : 10,
                marginBottom: 20,
                elevation: 6,
              }}
              width={SIZES.width_window / 2 - 10 - SIZES.margin_h}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Spacer height={100} />
    </ScrollView>
  )
}

export default PrestisaRewardSubCatDetailContainer

const styles = StyleSheet.create({})
