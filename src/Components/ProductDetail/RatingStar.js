import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spacer from '@/Components/Base/Spacer'
import { ButtonGroup } from '@rneui/themed'

const RatingStar = ({ rate, size, ...props }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  const rating = Math.floor(rate == null ? 0 : rate)

  return (
    <View style={[Layout.row]}>
      {[...Array(5)].map((item, index) => {
        return (
          <Icon
            key={index}
            name="star"
            style={{
              fontSize: size != null ? size : 16,
              color: index + 1 <= rating ? '#EACA25' : Colors.neutralGray05,
            }}
          ></Icon>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
})
export default RatingStar
