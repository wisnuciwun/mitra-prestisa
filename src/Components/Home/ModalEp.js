import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalCenter from '../Base/ModalCenter'
import { Fonts, SIZES, Colors } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import Spacer from '../Base/Spacer'
import ButtonBase from '../Base/ButtonBase'
import LinearGradient from 'react-native-linear-gradient'

const ModalEp = ({ isVisible, onPressJoin, onPressLater }) => {
  return (
    <ModalCenter
      isVisible={isVisible}
      style={{ margin: 20 }}
      isDefaultStlye={false}
      styleModalBody={{
        padding: 24,
        width: 270 + 48,
        backgroundColor: Colors.white,
        borderRadius: 10,
      }}
    >
      <View style={{ position: 'relative' }}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.regular,
              color: '#601B3A',
            }}
          >
            Mau gabung menjadi
          </Text>
          <View
            style={{
              backgroundColor: '#D4CCCC',
              height: 8,
              width: 160,
              zIndex: -1,
              position: 'absolute',
              top: 13,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.medium,
              color: '#601B3A',
            }}
          >
            Executive Partner ?
          </Text>
          <View
            style={{
              backgroundColor: '#D4CCCC',
              height: 8,
              width: 240,
              zIndex: -1,
              position: 'absolute',
              top: 13,
            }}
          />
        </View>
      </View>
      <Spacer height={20} />
      <View style={{ position: 'relative' }}>
        <FastImage
          source={Assets.epReward}
          style={{
            height: 146,
            width: 270,
            borderRadius: 10,
            overflow: 'hidden',
            zIndex: 0,
            position: 'relative',
          }}
        />
        <LinearGradient
          start={{ x: 0.25, y: 0.5 }}
          end={{ x: 0.75, y: 0.5 }}
          locations={[0.0, 0.91]}
          colors={['#FFFFFF00', '#2E292990']}
          style={{
            height: 146,
            zIndex: 3,
            position: 'absolute',
            width: 270,
            borderRadius: 10,
            overflow: 'hidden',
          }}
          useAngle={true}
          angle={180}
        />
      </View>
      <Spacer height={20} />
      <View>
        <Text
          style={{
            fontSize: 13,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          Apa poin plus jika gabung jadi E.P?
        </Text>
        <Spacer height={4} />
        <View style={{ flexDirection: 'row' }}>
          <Text>• </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
            }}
          >
            Kesempatan untuk dapat{' '}
            <Text style={{ fontFamily: Fonts.italic }}>passive income</Text>
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
            }}
          >
            •{' '}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
            }}
          >
            Point Extra
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
            }}
          >
            •{' '}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
            }}
          >
            Beragam voucher pada partner mechant prestisa
          </Text>
        </View>
      </View>
      <Spacer height={32} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ButtonBase
          title={'Nanti saja'}
          style={{ paddingHorizontal: 20, borderColor: 'transparent' }}
          mode={'outline'}
          istextStyle={true}
          textStyle={{
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
          onPress={onPressLater}
        />
        <Spacer width={20} />
        <ButtonBase
          title={'Mau Gabung'}
          style={{
            paddingHorizontal: 20,
            backgroundColor: '#292727',
          }}
          istextStyle={true}
          textStyle={{
            fontFamily: Fonts.medium,
            color: Colors.white,
          }}
          onPress={onPressJoin}
        />
      </View>
    </ModalCenter>
  )
}

export default ModalEp

const styles = StyleSheet.create({})
