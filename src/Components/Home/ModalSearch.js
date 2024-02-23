import { Assets } from '@/Theme/Assets'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { Input } from '@rneui/themed'
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import Spacer from '../Base/Spacer'
import { SkeletonList } from '../SkeletonList'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { Skeleton } from '@rneui/base'
import { Config } from '@/Config'
import { debounce } from '@/Helper'

const marginHorizontal = 24

const ModalSearch = ({ onPressSearch, isTyping }) => {
  const navigation = useNavigation()
  const state = useSelector(state => state)
  const location_id = state.location.shipping_address.data.id
  const [valueName, setValueName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [placeHolder, setPlaceHolder] = useState('Cari karangan bunga')
  const [mostPopData, setMostPopData] = useState([])
  const [isLoadingMostPop, setIsLoadingMostPop] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const xhrGetMostPop = () => {
    setIsLoadingMostPop(true)
    axios
      .get(
        Config.API_URL +
          '/customer-app/products/recommendation?location_id=' +
          location_id,
      )
      .then(res => {
        const { most_sold } = res.data.data
        setMostPopData(most_sold.products)
        setIsLoadingMostPop(false)
      })
      .catch(({ response }) => {
        console.log('SEARCH__POP_ERR', response.data)
      })
  }

  const xhrQueryProduct = () => {
    setIsLoading(true)
    valueName.length != 0 &&
      axios
        .get(
          Config.API_URL +
            '/customer-app/products?location_id=' +
            location_id +
            '&name=' +
            valueName,
        )
        .then(res => {
          setIsLoading(false)
          const { products } = res.data.data
          if (products.data.length == 0) {
            setNotFound(true)
            setData(products.data.splice(5, products.data.length - 5))
          } else if (products.data.length == 1) {
            setNotFound(false)
            setData(products.data)
          } else if (products.data.length > 1 && products.data.length < 10) {
            setNotFound(false)
            setData(products.data)
          } else if (products.data.length > 1) {
            setNotFound(false)
            setData(products.data.splice(0, products.data.length - 5))
          }
        })
        .catch(({ response }) => {
          console.log('SEARCH_ERR', response.data)
        })
  }

  React.useLayoutEffect(() => {
    setIsLoading(false)
    navigation.setOptions({
      headerShown: false,
      animationEnabled: false,
    })
  }, [navigation])

  React.useEffect(() => {
    valueName.length != 0 && xhrQueryProduct()
    xhrGetMostPop()
  }, [valueName])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10.5,
          borderBottomColor: Colors.neutralGray08,
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 40,
            marginLeft: 14,
            paddingLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FastImage
            source={Assets.icon_arrow_left_3x}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
        <Spacer width={16} />

        <Input
          onChangeText={debounce(async text => {
            setValueName(text)
            if (text.length === 0) {
              setPlaceHolder(placeHolder)
              setData([])
            }
          }, 500)}
          style={{
            margin: 0,
            borderRadius: 4,
          }}
          inputContainerStyle={{
            borderColor: 'transparent',
            height: 41,
            backgroundColor: '#EBEDF1',
          }}
          inputStyle={{ fontSize: 16 }}
          containerStyle={{
            padding: 0,
            // backgroundColor: 'cyan',
            borderColor: 'transparent',
            marginTop: 0,
            marginRight: marginHorizontal,
            flex: 1,
          }}
          defaultValue={valueName}
          placeholder={placeHolder}
          placeholderTextColor={Colors.neutralGray02}
          rightIcon={
            valueName.length != 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setValueName('')
                  setPlaceHolder(placeHolder)
                  setData([])
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FastImage
                    source={Assets.icon_cross_grey_small_3x}
                    style={{ height: 16, width: 16 }}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled={true}>
                <View
                  style={{
                    flex: 1,
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FastImage
                    source={Assets.icon_search_small_3x}
                    style={{ height: 16, width: 16 }}
                  />
                </View>
              </TouchableOpacity>
            )
          }
        />
      </View>
      <ScrollView>
        {valueName.length == 0 ? (
          <MostPopular isLoading={isLoadingMostPop} data={mostPopData} />
        ) : notFound ? (
          <View
            style={{
              justifyContent: 'center',
              marginHorizontal: SIZES.margin_h,
            }}
          >
            <Spacer height={32} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FastImage
                source={Assets.frown_big_color_3x}
                style={{ height: 40, width: 40 }}
              />
              <Spacer height={16} />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: Fonts.medium,
                    fontSize: 16,
                    lineHeight: 22.4,
                    color: Colors.neutralBlack02,
                  }}
                >
                  Maaf, barang yang kamu cari nggak ada
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: Fonts.regular,
                    fontSize: 14,
                    lineHeight: 22.4,
                    color: Colors.neutralBlack02,
                    marginHorizontal: SIZES.margin_h * 2,
                  }}
                >
                  <Text>
                    Mungkin kamu salah ketik atau bisa ubah kata pencarian
                  </Text>
                </Text>
              </View>
            </View>
            <Spacer height={22} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setValueName('')
                  setPlaceHolder(placeHolder)
                  setData([])
                }}
                style={[
                  styles.buttonTextContaier,
                  {
                    backgroundColor: Colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: Colors.white,
                    },
                  ]}
                >
                  Ubah Pencarian
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <SuggestionResult
            isLoading={isLoading}
            data={data}
            navigation={navigation}
          />
        )}
        <Spacer height={45} />
      </ScrollView>
    </View>
  )
}

export default ModalSearch

const ContentSearch = () => {
  return (
    <View>
      <View style={{ marginVertical: 10 }}>
        <TitleSection text="Terakhir Dicari di Prestisa" isRightButton={true} />
        <SuggestionSearchListRightIcon isRemove={true} />
        <SuggestionSearchListRightIcon isRemove={true} />
        <SuggestionSearchListRightIcon isRemove={true} />
        <SuggestionSearchListRightIcon isRemove={true} />
        <SuggestionSearchListRightIcon isRemove={true} />
        <SuggestionSearchListRightIcon isRemove={true} />
      </View>
    </View>
  )
}

const SuggestionResult = ({ isLoading, data, navigation }) => {
  return (
    <View style={{ marginHorizontal: SIZES.margin_h, marginVertical: 10 }}>
      {isLoading ? (
        <View style={{ paddingVertical: 8 }}>
          {[1, 2, 3, 4, 5].map((e, i) => (
            <SkeletonList key={`${e}`} index={i} />
          ))}
        </View>
      ) : (
        <>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    product_id: item.id,
                    category: '',
                  })
                }}
                key={Math.random()}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 12,
                  }}
                >
                  <Text style={{ ...textStyle, color: Colors.neutralBlack02 }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </>
      )}
    </View>
  )
}

const MostPopular = ({ data, isLoading }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <TitleSection text="Paling Banyak Dicari di Prestisa" />
      <Spacer height={14} />
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((e, i) => (
              <View
                style={{ paddingBottom: i === 5 ? 0 : 20 }}
                key={Math.random()}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Skeleton
                    height={40}
                    width={40}
                    skeletonStyle={{
                      backgroundColor: Colors.neutralGray07,
                    }}
                    style={{
                      backgroundColor: Colors.neutralGray08,
                      borderRadius: 10,
                    }}
                  />
                  <Spacer width={12} />
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingTop: 2,
                    }}
                  >
                    <Skeleton
                      height={14}
                      width={100}
                      skeletonStyle={{ backgroundColor: Colors.neutralGray07 }}
                      style={{ backgroundColor: Colors.neutralGray08 }}
                    />
                    <Spacer height={10} />
                    <Skeleton
                      height={12}
                      width={80}
                      skeletonStyle={{ backgroundColor: Colors.neutralGray07 }}
                      style={{ backgroundColor: Colors.neutralGray08 }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </>
        ) : (
          <>
            {data.map((item, index) => (
              <View
                style={{ paddingBottom: index === data.length - 1 ? 0 : 20 }}
                key={Math.random()}
              >
                <SuggestionSearchListLeftIcon
                  text={item.name}
                  imgSource={item.image}
                  key={index}
                  subText=""
                  item={item}
                />
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  )
}

const TitleSection = ({ text = 'Title Section', isRightButton = false }) => {
  return (
    <View
      style={{
        // backgroundColor: 'red',
        marginTop: 10,
        marginHorizontal: marginHorizontal,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: 16,
          fontWeight: '500',
          color: Colors.neutralBlack02,
        }}
      >
        {text}
      </Text>
      {isRightButton && (
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 16,
              fontWeight: '400',
              color: Colors.otherRed,
            }}
          >
            Hapus
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const SuggestionSearchListLeftIcon = ({
  text = 'Text',
  subText = 'Subtext',
  onPress,
  imgSource,
  item,
}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {
          product_id: item.id,
          category: item.category_id,
        })
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // paddingVertical: 12,
        }}
      >
        <FastImage
          source={{ uri: imgSource }}
          resizeMode="cover"
          style={{
            height: 40,
            width: 40,
            borderRadius: 4,
          }}
        />
        <Spacer width={12} />
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 14,
              fontWeight: '500',
              color: Colors.neutralGray01,
            }}
          >
            {text}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 12,
              fontWeight: '400',
              color: Colors.neutralGray01,
            }}
          >
            {subText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const SuggestionSearchListRightIcon = ({
  onPress,
  text = 'Hallo World',
  isRemove = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isRemove}>
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: isRemove ? 'transparent' : Colors.neutralGray05,
          borderBottomWidth: 1,
          paddingHorizontal: marginHorizontal,
          paddingVertical: isRemove ? 8 : 12,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: 14,
            fontWeight: '500',
            color: Colors.neutralGray01,
          }}
        >
          {text}
        </Text>

        {isRemove ? (
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FastImage
              source={Assets.icon_cross_grey_small_3x}
              style={{ height: 16, width: 16 }}
            />
          </TouchableOpacity>
        ) : (
          <FastImage
            source={Assets.icon_search_small_3x}
            style={{ height: 16, width: 16 }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const textStyle = {
  fontFamily: Fonts.regular,
  fontSize: 14,
  fontWeight: '400',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonTextContaier: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 31,
    flex: 1,
    borderRadius: 14,
    marginRight: 10,
  },
  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 17,
  },
  buttonOutline: {
    borderColor: Colors.neutralGray03,
    borderWidth: 1,
  },
})
