import React from 'react'
import { Colors } from '@/Theme/Variables'
import { Skeleton } from '@rneui/base'
import { View } from 'react-native'

export const SkeletonList = ({ index }) => {
  const _random = num => Math.floor(Math.random() * num)
  const _margin = _random(40) + _random(1) + _random(100)

  return (
    <View
      style={{
        paddingBottom: 20,
        paddingTop: index == 0 ? 10 : 0,
        marginRight: _margin,
      }}
    >
      <Skeleton
        height={16}
        skeletonStyle={{ backgroundColor: Colors.neutralGray07 }}
        style={{ backgroundColor: Colors.neutralGray08 }}
        animation={'pulse'}
      ></Skeleton>
    </View>
  )
}
