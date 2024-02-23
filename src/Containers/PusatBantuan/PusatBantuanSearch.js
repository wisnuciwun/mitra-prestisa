import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import datafaq from '@/Components/ExecutiveMember/DataFAQ'

import NavBarV1 from '@/Components/Base/NavBarV1'
import { Input } from '@rneui/themed'
import Spacer from '@/Components/Base/Spacer'
import LabelText from '@/Components/Base/LabelText'
import _ from 'lodash'

const PusatBantuanSearch = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()
  const [textsearch, settextSearch] = useState('')
  const [search, setSearch] = useState([])
  const [searchResult, setsearchResult] = useState([])

  React.useLayoutEffect(() => {
    NavBarV1({ titleName: 'Pencarian', navigation: navigation })
  }, [])

  const data = [
    { id: 1, name: 'Pengiriman Terlambat' },
    { id: 2, name: 'Pembayaran bermasalah' },
    { id: 3, name: 'Pembatalan Pembelian' },
    { id: 4, name: 'Akun bermasalah' },
  ]

  const handlesearch = text => {
    const faq = search
    settextSearch(text)
    console.log(search)

    const hasil = _.filter(faq, function (item) {
      // console.log(item.ask)
      return item.ask.toLowerCase().includes(text.toLowerCase())
      // return item.ask === text
    })
    setsearchResult(hasil)
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
        placeholder="Ketik kata kunci (misal: Promosi Berlangsung)"
      />
      <Spacer height={20} />
      {textsearch != '' && (
        <>
          <LabelText
            TextStyle={{ fontSize: 18 }}
            title={`Hasil untuk “${textsearch}”`}
          />
          <Text style={{ color: Colors.neutralGray01 }}>
            Menampilkan total {searchResult.length} pencarian
          </Text>
        </>
      )}
      <Spacer height={20} />

      {textsearch != '' && (
        <View>
          {searchResult.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('PusatBantuanSearchContent', {
                    data: item,
                  })
                }}
                style={st.searchResult}
              >
                <Text>{item.ask}</Text>
              </Pressable>
            )
          })}
        </View>
      )}

      {textsearch == '' && (
        <>
          <LabelText TextStyle={{ fontSize: 15 }} title={'Pencarian Populer'} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.map(({ id, name }) => {
              return (
                <TouchableOpacity key={id} style={st.item}>
                  <Text style={st.itemText}>{name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </>
      )}

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
  itemText: {
    borderWidth: 1,
    borderColor: '#B6B6B6',
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    marginTop: 10,
  },
  searchResult: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
})
export default PusatBantuanSearch
