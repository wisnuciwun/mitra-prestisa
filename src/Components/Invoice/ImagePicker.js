import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'

const ImagePicker = ({
  editimage = false,
  edit = false,
  imageNpwp,
  onPress,
  onCancel,
  textHelper = 'Format foto JPEG, JPG, atau PNG',
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {
    console.log('EDIT??', edit)
  }, [])
  return (
    <View style={{}}>
      {imageNpwp !== null ? (
        <View style={{ position: 'relative' }}>
          <FeatherIcon
            onPress={
              onCancel
              //   setimageNpwp(null)
            }
            name="x"
            size={20}
            color="white"
            style={{
              padding: 2,
              backgroundColor: Colors.neutralGray02,
              position: 'absolute',
              left: 150,
              zIndex: 110,
              top: -10,
              borderRadius: 20,
              borderColor: 'white',
              // borderWidth: 2,
            }}
          ></FeatherIcon>
          {editimage == true ? (
            <FastImage
              style={{
                width: 160,
                height: 108,
                overflow: 'hidden',
                borderRadius: 10,
                borderColor: 'white',
                borderWidth: 0,
              }}
              source={{ uri: imageNpwp.uri }}
            />
          ) : (
            <FastImage
              style={{
                width: 160,
                height: 108,
                overflow: 'hidden',
                borderRadius: 10,
                borderColor: 'white',
                borderWidth: 0,
              }}
              source={{ uri: edit ? imageNpwp : imageNpwp.uri }}
            />
          )}
        </View>
      ) : (
        <Pressable onPress={onPress} style={[st.fotoContainer]}>
          <View style={{ alignItems: 'center' }}>
            <FeatherIcon
              color={Colors.neutralGray02}
              size={25}
              name="camera"
            ></FeatherIcon>
            <Text
              style={{
                color: Colors.neutralGray02,
                fontSize: 13,
                marginTop: 10,
              }}
            >
              Foto langsung/ambil dari galeri
            </Text>
          </View>
        </Pressable>
      )}
      <Text style={{ fontSize: 13, marginTop: 5 }}>{textHelper}</Text>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
  fotoContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 108,
    height: 108,
    borderRadius: 10,
    borderColor: Colors.neutralBlack02,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  content: { padding: 20 },
})
export default ImagePicker
