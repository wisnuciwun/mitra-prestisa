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
import RatingStar from './RatingStar'
import moment from 'moment'

const ReviewCard = ({ data, mode, ...props }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  return (
    <View
      style={{
        borderBottomColor:
          mode != 'light' ? Colors.neutralGrayBlue : Colors.neutralBlack01,
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        ...props.style,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ overflow: 'hidden', borderRadius: 20, marginRight: 10 }}>
          <Image
            resizeMode="cover"
            style={{
              width: 28,
              height: 28,
              borderRadius: 20,
              backgroundColor: Colors.neutralGray03,
            }}
            source={{ uri: data.avatar_image }}
          ></Image>
        </View>
        <Text style={mode == 'light' && styles.light}>
          {data.customer_name}
        </Text>
      </View>
      <Spacer height={10}></Spacer>
      <RatingStar rate={data.rating} />
      {/* <RatingStar rate={3} /> */}
      <Spacer height={10}></Spacer>
      <Text
        style={[
          { color: Colors.neutralBlack02, fontSize: 15 },
          mode == 'light' && styles.light,
        ]}
      >
        {data.ulasan}
      </Text>
      <Spacer height={15}></Spacer>
      {data.image.length > 0 && (
        <>
          <Text style={mode == 'light' && styles.light}>Foto</Text>
          <View style={[styles.foto, { marginTop: 10 }]}>
            {data.image.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                  source={{ uri: item }}
                ></Image>
              )
            })}
          </View>
        </>
      )}

      <Spacer height={20}></Spacer>
      <Text
        style={[
          { color: Colors.neutralGray01, fontSize: 13 },
          mode == 'light' && styles.light,
        ]}
      >
        Ditulis {moment.unix(data.date_epoch).format('DD MMM YYYY')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
  light: { color: '#fff' },
  foto: {
    flexDirection: 'row',
    marginRight: 10,
    paddingRight: 10,
  },
})
export default ReviewCard
