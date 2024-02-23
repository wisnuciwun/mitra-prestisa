import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import datafaq from '@/Components/ExecutiveMember/DataFAQ'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderBantuan from '@/Components/PusatBantuan/HeaderBantuan'
import FooterBantuan from '@/Components/PusatBantuan/FooterBantuan'
import _, { result } from 'lodash'

const PusatBantuanHome = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [search, setSearch] = useState([])
  const [] = useState()

  const data = datafaq
  //   console.log(data)
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('PusatBantuanQuestion', {
            question: item.question,
            title: item.name,
          })
        }}
        style={{ alignItems: 'center' }}
      >
        <View
          style={[
            st.iconCategory,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <FastImage
            resizeMode="center"
            style={{ width: 40, height: 40 }}
            source={item.icon}
          />
        </View>
        <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold' }}>
          {item.name}
        </Text>
      </Pressable>
    )
  }

  const handlesearch = text => {
    const faq = datafaq
    console.log(search)

    const hasil = _.filter(search, function (item) {
      // console.log(item.ask)
      return item.ask.toLowerCase().includes(text.toLowerCase())
      // return item.ask === text
    })

    hasil.map((item, i) => {
      console.log(i, item.ask)
    })
  }
  useEffect(() => {
    let results = []
    console.log('set search')
    datafaq.category.map(({ name, question }) => {
      question.map((q, index) => {
        results.push({ name, ...q })
        // console.log(index)
        // results = { ...results, q }
      })
      // console.log(result)
    })
    setSearch(results)
  }, [])

  return (
    <View style={[st.screen]}>
      <FlatList
        ListHeaderComponent={<HeaderBantuan onChangeText={handlesearch} />}
        // style={{ padding: 20 }}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          marginBottom: 20,
        }}
        data={data.category}
        renderItem={renderItem}
        numColumns={4}
        ListFooterComponent={<FooterBantuan data={data.category} faq />}
      />
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F6F8',
    flex: 1,
  },
  iconCategory: {
    width: 60,
    height: 60,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
})
export default PusatBantuanHome
