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
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import HeaderGradient from '@/Components/ExecutiveMember/HeaderGradient'
import CardDetailDownline from '@/Components/ExecutiveMember/CardDetailDownline'
import ModalBottom from '@/Components/Base/ModalBottom'
import { Config } from '@/Config'
import ModalLoadingCenter from '@/Components/Base/ModalLoadingCenter'
import axios from 'axios'

const MemberDownlineContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [selectedLayer, setselectedLayer] = useState('')
  const [selectedSort, setselectedSort] = useState('newest')
  const [visibleModal, setvisibleModal] = useState(false)
  const [downline, setdownline] = useState([])
  const [loading, setloading] = useState(true)
  const state = useSelector(state => state)

  const [] = useState()

  //   console.log(props.route.params.data)
  // const downline = props.route.params.data

  const showModalSort = () => {}

  const fetchData = async () => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/ep-member-downline`
    const data = {
      // fbasekey: 'testvoucher',
      layer: selectedLayer,
      sort: selectedSort,
      fbasekey: state.tokenList.fcm_token,
    }

    // console.log('EP Downline ', data)

    await axios
      .post(url, data)
      .then(response => {
        console.log(response.data.data)
        setdownline(response.data.data.downline)
        setloading(false)
      })
      .catch(({ response }) => {
        setloading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [selectedLayer, selectedSort])
  return (
    <View style={[st.screen]}>
      <HeaderGradient loading={loading} data={{ downline }} />
      <View
        style={{
          padding: 20,
          backgroundColor: 'rgba(235, 237, 241, 0.8)',
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600' }}> Downline Saya</Text>
        <View
          style={[
            Layout.row,
            { marginTop: 20, justifyContent: 'space-between' },
          ]}
        >
          <View style={[Layout.row]}>
            <Pressable
              onPress={() => {
                setselectedLayer('')
              }}
              style={[st.pill, selectedLayer == '' && st.pillSelected]}
            >
              <Text
                style={[
                  st.pillText,
                  selectedLayer == '' && st.pillTextSelected,
                ]}
              >
                Semua
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setselectedLayer(2)
              }}
              style={[st.pill, selectedLayer == 2 && st.pillSelected]}
            >
              <Text
                style={[st.pillText, selectedLayer == 2 && st.pillTextSelected]}
              >
                2nd Layer
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setselectedLayer(3)
              }}
              style={[st.pill, selectedLayer == 3 && st.pillSelected]}
            >
              <Text
                style={[st.pillText, selectedLayer == 3 && st.pillTextSelected]}
              >
                3rd Layer
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              setvisibleModal(true)
            }}
            style={[
              Layout.row,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <Text style={{ color: Colors.neutralGray01 }}>Urutkan</Text>
            <Fontisto
              style={{
                transform: [{ rotate: '90deg' }],
                marginLeft: 10,
                // backgroundColor: 'red',
              }}
              color={Colors.neutralGray01}
              size={14}
              name="arrow-swap"
            />
          </Pressable>
        </View>
        {loading == false && (
          <View style={{ paddingVertical: 20 }}>
            {downline.members.length > 0 ? (
              <CardDetailDownline data={downline.members} />
            ) : (
              <Text style={{ alignSelf: 'center', padding: 10 }}>
                Belum ada downline
              </Text>
            )}
          </View>
        )}
      </View>
      <ModalBottom heightModal={200} isVisible={visibleModal}>
        <View
          style={[Layout.row, { justifyContent: 'space-between', padding: 20 }]}
        >
          <FeatherIcon
            onPress={() => {
              setvisibleModal(false)
            }}
            name="x"
            size={20}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Urutkan Berdasarkan
          </Text>

          <FeatherIcon name="x" size={20} color={'white'} />
        </View>
        <View>
          <Pressable
            onPress={() => {
              setselectedSort('newest')
              setvisibleModal(false)
            }}
            style={[
              {
                paddingHorizontal: 20,
                paddingVertical: 10,
              },
              selectedSort == 'newest' && { backgroundColor: '#F4E9E9' },
            ]}
          >
            <Text style={{ fontSize: 18 }}>Terbaru</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setselectedSort('oldest')
              setvisibleModal(false)
            }}
            style={[
              { paddingHorizontal: 20, paddingVertical: 10 },
              selectedSort == 'oldest' && { backgroundColor: '#F4E9E9' },
            ]}
          >
            <Text style={{ fontSize: 18 }}>Terlama</Text>
          </Pressable>
        </View>
      </ModalBottom>
      <ModalLoadingCenter show={loading} />
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
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
  pill: {
    borderColor: '#B6B6B6',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    marginRight: 5,
  },
  pillSelected: {
    borderColor: '#991F5D',
  },
  pillText: { fontSize: 12 },
  pillTextSelected: { color: '#991F5D' },
})
export default MemberDownlineContainer
