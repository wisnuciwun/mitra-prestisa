import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ModalBottom from '../Base/ModalBottom'
import FeatherIcon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import Spacer from '../Base/Spacer'
import { Colors, SIZES } from '@/Theme/Variables'
import { Fonts } from '@/Theme/Variables'
import ButtonBottomFloating from '../ButtonBottomFloating'

const ModalBottomRevisi = ({
  isVisible,
  isActiveApplied,
  onHideModal,
  onSelectRadioItem,
  onApplied,
  data,
  ...props
}) => {
  return (
    <ModalBottom isVisible={isVisible} heightModal={null} {...props}>
      <View
        style={[
          { marginHorizontal: SIZES.margin_h, marginVertical: SIZES.margin_h },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={onHideModal}>
            <FeatherIcon name="x" size={24} color={Colors.neutralGray01} />
          </TouchableOpacity>
          <Text
            style={[
              {
                fontFamily: Fonts.medium,
                fontSize: 20,
                color: Colors.neutralBlack02,
              },
            ]}
          >
            Revisi
          </Text>
          <Spacer width={24} />
        </View>
        <Spacer height={24} />
        <View style={[{}]}>
          {data.map((item, index) => {
            return (
              <View
                style={[{ marginBottom: index === data.length - 1 ? 0 : 20 }]}
                key={index}
              >
                <RadioListItem
                  text={item.title}
                  onSelect={() => {
                    onSelectRadioItem(item, index)
                  }}
                  active={item.selected}
                />
              </View>
            )
          })}
        </View>
        <Spacer height={80} />
      </View>
      <ButtonBottomFloating
        isTouchComp={true}
        touchableComp={() => {
          return (
            <TouchableOpacity onPress={onApplied} disabled={isActiveApplied}>
              <View
                style={[
                  {
                    paddingVertical: 8,
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: Colors.neutralBlack02,
                    borderWidth: 1,
                  },
                  isActiveApplied && { borderColor: Colors.neutralGray03 },
                ]}
              >
                <Text
                  style={[
                    {
                      fontFamily: Fonts.medium,
                      color: Colors.neutralBlack02,
                      fontSize: 18,
                    },
                    isActiveApplied && { color: Colors.neutralGray03 },
                  ]}
                >
                  Pilih
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </ModalBottom>
  )
}

export default ModalBottomRevisi

const styles = StyleSheet.create({})

const RadioListItem = ({
  text = 'Text text texttttttt',
  onSelect,
  ...props
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}
    >
      <Text
        style={[
          {
            fontFamily: Fonts.regular,
            fontSize: 18,
            color: Colors.neutralBlack02,
          },
        ]}
      >
        {text}
      </Text>
      <RadioButtonIcon onPress={onSelect} {...props} />
    </View>
  )
}

const RadioButtonIcon = ({ active = true, touchArea = 30, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: touchArea,
        width: touchArea,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <View
        style={[
          {
            height: 20,
            width: 20,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderRadius: 10000,
            borderColor: Colors.neutralGray01,
          },
          active && { borderColor: '#AC4D75' },
        ]}
      >
        {active && (
          <LinearGradient
            start={{ x: 0.25, y: 0.5 }}
            end={{ x: 0.75, y: 0.5 }}
            locations={[0.1, 1.0]}
            colors={['#891948', '#CF3676A1']}
            style={{
              height: 8.57,
              width: 8.57,
              borderRadius: 10000,
              margin: 10,
            }}
            useAngle={true}
            angle={163.81}
          ></LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  )
}
