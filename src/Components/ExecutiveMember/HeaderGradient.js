import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import { numberWithCommas } from '@/Helper'

const HeaderGradient = ({ data, loading }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  console.log('header', data)
  useEffect(() => {}, [])
  return (
    <LinearGradient
      start={{ x: 0.25, y: 0.5 }}
      end={{ x: 0.75, y: 0.5 }}
      locations={[0.3, 1]}
      colors={['#897AC7', '#279EB9']}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 35,
      }}
      useAngle={true}
      angle={90}
    >
      <View style={[st.headerSection]}>
        <Text style={[st.headerTitle]}>Total Downline</Text>
        <Text style={[st.headerValue]}>
          {loading ? '-' : data.downline.amount}
        </Text>
      </View>
      <View style={[st.headerSection]}>
        <Text style={[st.headerTitle]}>Penghasilan</Text>
        <Text style={[st.headerValue]}>
          {numberWithCommas(loading ? '-' : data.downline.value)}
          <Text style={{ fontSize: 16 }}>points</Text>
        </Text>
      </View>
    </LinearGradient>
  )
}

const st = StyleSheet.create({
  screen: {},
  headerSection: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 13,
    // fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerValue: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
  },
})
export default HeaderGradient
