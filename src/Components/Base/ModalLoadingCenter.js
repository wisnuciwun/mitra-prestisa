import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ModalLoadingCenter = ({ show = false }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])
  return (
    <Modal transparent visible={show}>
      <View style={[st.screenModal]}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <ActivityIndicator size={30} />
        </View>
      </View>
    </Modal>
  )
}

const st = StyleSheet.create({
  screen: {},
  screenModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'flex-end',
  },
})
export default ModalLoadingCenter
