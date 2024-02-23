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

const NavBarModal = ({ title, closeModal }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])
  return (
    <View style={[st.screen, Layout.row]}>
      <TouchableOpacity onPress={closeModal}>
        <Icon style={{ fontSize: 25 }} name="close"></Icon>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            marginLeft: -30,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
})
export default NavBarModal
