import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Input } from '@rneui/themed'

const PusatBantuanSearchContentContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()
  const data = props.route.params.data
  console.log(data)

  useEffect(() => {}, [])
  return (
    <ScrollView style={[st.screen]}>
      <Input
        onPressIn={() => {
          navigation.navigate('PusatBantuanSearch')
        }}
        inputContainerStyle={{ paddingHorizontal: 0 }}
        inputStyle={{ letterSpacing: -0.5, color: Colors.neutralGray01 }}
        onChangeText={text => {
          handlesearch(text)
        }}
        rightIcon={() => (
          <FeatherIcon
            size={20}
            color={Colors.neutralGray02}
            name="search"
          ></FeatherIcon>
        )}
        containerStyle={{
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: Colors.neutralGray03,
        }}
        // placeholder="Ketik kata kunci (misal: Promosi Berlangsung)"
      />
      <Text style={st.title}>{data.ask}</Text>
      <Text style={st.paragraph}>{data.answer}</Text>

      <View
        style={{
          backgroundColor: '#F4E9E9',
          marginTop: 40,
          alignItems: 'center',
          paddingVertical: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: Colors.neutralBlack02,
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          Tidak menemukan jawaban yang dicari?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('CustomerService')
          }}
          style={{ color: Colors.primary, fontWeight: 'bold' }}
        >
          Hubungi Kami
        </Text>
      </View>
    </ScrollView>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    flexWrap: 'wrap',
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#EBEDF1',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 20,
  },
})
export default PusatBantuanSearchContentContainer
