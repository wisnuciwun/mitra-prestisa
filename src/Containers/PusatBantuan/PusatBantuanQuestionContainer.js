import React, { useState, useEffect, useRef } from 'react'
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
import { Assets } from '@/Theme/Assets'
import FastImage from 'react-native-fast-image'
import FooterBantuan from '@/Components/PusatBantuan/FooterBantuan'
import ModalBottom from '@/Components/Base/ModalBottom'

const PusatBantuanQuestionContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [selectedQuestion, setselectedQuestion] = useState('')
  const [visibleModal, setvisibleModal] = useState(false)
  const [] = useState()

  const data = props.route.params.question
  const title = props.route.params.title

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          setselectedQuestion(item)
        }}
        style={[st.card]}
      >
        <Text style={st.textQuestion}>{item.ask}</Text>
        <FeatherIcon size={25} name="chevron-right"></FeatherIcon>
      </Pressable>
    )
  }

  const Header = () => {
    return (
      <View style={st.header}>
        <FastImage
          source={Assets.BackgroundBantuan}
          // resizeMode="cover"
          style={{
            width: windowWidth,
            height: 90,
            paddingTop: 40,
            //   marginBottom: 40,
          }}
        ></FastImage>

        <Text style={st.title}>{title}</Text>
      </View>
    )
  }
  //   console.log(props.route.params)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setvisibleModal(true)
  }, [selectedQuestion])
  return (
    <View style={[st.screen]}>
      <FlatList
        ListHeaderComponent={<Header />}
        // style={{ padding: 20 }}
        // columnWrapperStyle={{
        //   justifyContent: 'space-around',
        //   marginBottom: 20,
        // }}
        data={data}
        renderItem={renderItem}
        // numColumns={4}
        ListFooterComponent={<FooterBantuan faq={false} />}
      />
      <ModalBottom heightModal={windowHeight - 20} isVisible={visibleModal}>
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
        </View>
        <View>
          <Text style={st.headetTitle}>{selectedQuestion.ask}</Text>
          <Text style={st.questionText}>{selectedQuestion.answer}</Text>
        </View>
      </ModalBottom>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F6F8',
    flex: 1,
    // paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  textQuestion: {
    width: '80%',
    fontSize: 13,
    flexWrap: 'wrap',
    lineHeight: 20,
    fontWeight: '600',
    // marginTop: -40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: -60,
    marginBottom: 30,
  },
  headetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 20,
    lineHeight: 25,
  },
  questionText: {
    lineHeight: 20,
    marginHorizontal: 20,
    // textAlign: 'justify',
  },
})
export default PusatBantuanQuestionContainer
