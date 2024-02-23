import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native'

import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Button, Rating, Skeleton } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'

import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Config } from '@/Config'
import axios from 'axios'
import Spacer from '@/Components/Base/Spacer'
import Carousel from 'react-native-snap-carousel'
import ButtonBase from '@/Components/Base/ButtonBase'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import ReviewCard from '@/Components/ProductDetail/ReviewCard'

const PhotoDetailTheater = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [carousel, setCarousel] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const data = props.route.params.data
  const dataSlider = data.image

  const _renderItem = ({ item }) => {
    return (
      <View>
        <Image
          style={{ height: 360, width: windowWidth }}
          resizeMode="cover"
          source={{ uri: item }}
        ></Image>
      </View>
    )
  }

  useEffect(() => {}, [])
  return (
    <View style={[styles.screen]}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View>
            <View style={{ paddingVertical: 20, marginHorizontal: 20 }}>
              <FeatherIcon
                onPress={() => {
                  navigation.goBack()
                }}
                size={25}
                color={'white'}
                name="x"
              ></FeatherIcon>
            </View>
            <View style={{ height: 360 }}>
              <Carousel
                activeAnimationType="timing"
                layout={'default'}
                ref={ref => setCarousel(ref)}
                data={dataSlider}
                sliderWidth={windowWidth}
                itemWidth={windowWidth}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                onSnapToItem={index => setActiveSlide(index)}
                // onSnapToItem={index => this.setState({ activeIndex: index })}
              />
            </View>
            <View style={[styles.SlideControl]}>
              <View>
                {activeSlide > 0 && (
                  <Icon
                    style={[styles.slideButtonLeft]}
                    onPress={() => {
                      carousel.snapToPrev()
                    }}
                    size={30}
                    name="chevron-right-circle"
                  />
                )}
              </View>
              <View>
                {activeSlide < dataSlider.length - 1 && (
                  <Icon
                    style={styles.slideButtonRight}
                    size={30}
                    onPress={() => {
                      carousel.snapToNext()
                    }}
                    // color="red"
                    name="chevron-right-circle"
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{ marginTop: -60 }}>
            <Text style={{ color: 'white', marginLeft: 20 }}>
              Foto {activeSlide + 1}/{dataSlider.length}
            </Text>
            <ReviewCard data={data} mode="light" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: Colors.neutralBlack01,
  },
  SlideControl: {
    padding: 20,
    position: 'relative',
    top: -220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  slideButtonLeft: {
    transform: [{ rotateY: '180deg' }],
    color: 'white',
    opacity: 0.7,
  },
  slideButtonRight: {
    // transform: [{ rotateY: '180deg' }],
    color: 'white',
    opacity: 0.7,
  },
})
export default PhotoDetailTheater
