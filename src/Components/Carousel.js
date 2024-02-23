// import { Layout, Fonts, Gutters, Common } from '@/Theme'
import { Colors } from '@/Theme/Variables'
import { useTheme } from '@/Hooks'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const CarouselView = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()

  const [carouselItem, setCorouselItem] = useState([
    {
      title: 'Sampaikan Suka atau Duka Bersama Prestisa',
      image: Images.slider1,
      text:
        'Dapatkan bunga, cake, dan gift dari 3000 lebih Supplier di Indonesia.',
    },
    {
      title: 'Mudah Digunakan',
      image: Images.slider2,
      text: 'Kenyamanan dan kemudahan dalam menggunakan Prestisa apps.',
    },
    {
      title: 'Pengiriman ke Seluruh Indonesia',
      image: Images.slider3,
      text:
        'Melayani pengiriman ke penjuru negeri dengan bantuan Mitra Ekspedisi kami.',
    },
  ])

  const [activeSlide, setActiveSlide] = useState(0)
  const [carousel, setCarousel] = useState(null)

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      console.log('data', value)
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }
  //   storeData({ login: 'true' })
  //   getData()

  const _renderItem = ({ item, index }) => {
    return (
      <View style={[styles.slider, Gutters.smallHPadding]}>
        <Image
          style={{
            width: (windowWidth * 80) / 100,
            height: (windowWidth * 80) / 100,
            alignSelf: 'center',
          }}
          source={Images.slider1}
          resizeMode="cover"
        />
        <Text
          style={[
            Fonts.fontAmarant,
            {
              color: '#666',
              fontSize: 24,
              fontFamily: 'Amaranth-Bold',
              marginVertical: 20,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            // Fonts.fontAmarant,
            {
              lineHeight: 25,
              color: '#666',
              fontSize: 16,
            },
          ]}
        >
          {item.text}
        </Text>
      </View>
    )
  }

  const pagination = () => {
    return (
      <Pagination
        dotsLength={carouselItem.length}
        activeDotIndex={activeSlide ? activeSlide : 0}
        animatedDuration={100}
        animatedTension={50}
        animatedFriction={4}
        containerStyle={{
          marginHorizontal: 20,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          //   height: 700,
          width: 200,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#969696',
        }}
        inactiveDotStyle={{
          backgroundColor: '#B8BFCD',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    )
  }

  const handleFinishIntro = () => {
    props.handleFinish()
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <View
        style={[
          Layout.alignItemsEnd,
          { alignContent: 'flex-end', alignItems: 'flex-end' },
        ]}
      >
        <Text
          onPress={() => {
            handleFinishIntro()
          }}
          style={[
            {
              color: Colors.primary,
              fontWeight: 'bold',
            },

            Gutters.regularVMargin,
            // Gutters.regularHMargin,
          ]}
        >
          Lewati
        </Text>
      </View>
      <Carousel
        sliderWidth={windowWidth - 40}
        itemWidth={windowWidth - 40}
        data={carouselItem}
        renderItem={_renderItem}
        ref={c => {
          setCarousel(c)
        }}
        onSnapToItem={index => setActiveSlide(index)}
      />

      <View style={[Layout.row, Layout.justifyContentAround, Layout.center]}>
        <View>
          {activeSlide == 0 ? (
            <Icon
              style={{ transform: [{ rotateY: '180deg' }] }}
              onPress={() => {
                carousel.snapToPrev()
              }}
              color="white"
              size={30}
              name="chevron-right-circle"
            />
          ) : (
            <Icon
              style={{ transform: [{ rotateY: '180deg' }] }}
              onPress={() => {
                carousel.snapToPrev()
              }}
              color={Colors.primary}
              size={30}
              name="chevron-right-circle"
            />
          )}
        </View>
        {pagination()}
        <View>
          {activeSlide < 2 ? (
            <Icon
              size={30}
              onPress={() => {
                carousel.snapToNext()
              }}
              color={Colors.primary}
              name="chevron-right-circle"
            />
          ) : (
            <Icon
              size={30}
              onPress={() => {
                handleFinishIntro()
              }}
              color={Colors.success}
              name="checkbox-marked-circle"
            />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
  slider: { backgroundColor: 'white', paddingHorizontal: 30 },
})
export default CarouselView
