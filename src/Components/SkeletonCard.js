import { shadowBg } from '@/Config'
import { Colors } from '@/Theme/Variables'
import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { View, Dimensions } from 'react-native'
import Spacer from './Base/Spacer'

export const SkeletonCard = props => {
  const height = 280
  const width = Dimensions.get('window').width / 2.15

  const Container = props => (
    <View
      style={{
        marginHorizontal: 20,
        // backgroundColor: 'cyan',
        height: props.height,
        width: props.width,
        overflow: 'hidden',
        borderRadius: 6,
      }}
    >
      {props.children}
    </View>
  )
  return (
    <View
      style={[
        {
          backgroundColor: Colors.white,
          height: height,
          marginLeft: props.index == 0 ? props.marginH : 0,
          marginRight: 24,
          borderRadius: 12,
          overflow: 'hidden',
          elevation: 5, //android
          marginBottom: 20,
        },
      ]}
      key={props.index}
    >
      <SkeletonItemV1 heightBox={132} width={width} heightItem={132} top={0} />
      <Spacer height={17} />

      <Container height={30} width={width / 1.3 - 20}>
        <SkeletonItemV1 heightBox={40} width={width} heightItem={40} top={0} />
      </Container>
      <Spacer height={20} />
      <Container height={30} width={width / 2 - 20}>
        <SkeletonItemV1 heightBox={40} width={width} heightItem={40} top={0} />
      </Container>

      <Spacer height={16} />
      <Container height={16} width={width / 1.3 - 20}>
        <SkeletonItemV1 heightBox={40} width={width} heightItem={40} top={0} />
      </Container>
    </View>
  )
}

export const SkeletonItemV1 = props => {
  return (
    <View style={{ top: props.top }}>
      <ContentLoader
        style={{ position: 'relative' }}
        speed={0.5}
        width={props.width}
        height={props.heightBox}
        viewBox={`${0} ${0} ${props.width} ${props.heightBox}`}
        backgroundColor={Colors.neutralGray06}
        foregroundColor={Colors.neutralGray07}
        {...props}
      >
        <Rect
          x="0"
          y={0}
          rx="0"
          ry="0"
          width={props.width}
          height={props.heightItem}
        />
      </ContentLoader>
    </View>
  )
}
