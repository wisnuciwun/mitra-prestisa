import { StyleSheet, TouchableOpacity, View, StatusBar } from 'react-native'
import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { useTheme } from '@/Hooks'
import { useNavigation } from '@react-navigation/native'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import { Input } from '@rneui/themed'
import Spacer from '@/Components/Base/Spacer'
import { Config } from '@/Config'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import UseMyLocationSection from '@/Components/SearchLocationCity/UseMyLocationSection'
import SuggestionMostPopularCitiesGroup from '@/Components/SearchLocationCity/SuggestionMostPopularCitiesGroup'
import LocationNotCovered from '@/Components/SearchLocationCity/LocationNotCovered'
import { isEmptyNullOrUndefined } from '@/Helper'

const SearchLocationContainer = props => {
  const { Images } = useTheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [city, setCity] = useState('')
  const [result, setResult] = useState([])
  const [placeHolder, setPlaceHolder] = useState(
    'Ketik nama Kota atau Kabupaten',
  )
  const [recomendedCity, setRecomendedCity] = useState([])
  const [resultUncoveredCity, setResultUncoveredCity] = useState({})
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [borderInput, setBorderInput] = useState(false)
  const [hideSuggestion, setHideSuggestion] = useState(false)
  const [isUncoveredCity, setIsUncoveredCity] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [loadingRecomendedCity, setLoadingRecomendedCity] = useState()
  const url = Config.API_URL + '/customer-app/city/search?city=' + city
  const xhrSearch = () => {
    axios
      .get(url)
      .then(response => {
        if (response.data.data.city.length > 0) {
          setResult(response.data.data.city)
          setIsUncoveredCity(false)
          setResultUncoveredCity({})
        } else {
          setResultUncoveredCity(response.data.data)
          setResult([])
          setIsUncoveredCity(true)
        }
        setLoadingSearch(false)
      })
      .catch(({ response }) => {
        console.log('ERR', response)
        setLoadingSearch(false)
      })
  }

  const xhrRecomendedCity = () => {
    setLoadingRecomendedCity(true)
    axios
      .get(Config.API_URL + '/customer-app/city/get-recommendation')
      .then(res => {
        setRecomendedCity(res.data.data.city)
        setLoadingRecomendedCity(false)
      })
      .catch(({ response }) => {
        console.log('ERR', response)
        setLoadingRecomendedCity(false)
      })
  }

  const debounce = func => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  const handleOnChangeSearch = debounce(async text => {
    setCity(text)
  }, 1000)

  useEffect(() => {
    setIsUncoveredCity(false)
    setLoadingSearch(true)
    city.length != 0 && xhrSearch()
    xhrRecomendedCity()
  }, [city])

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      sourceImageLeft: Images.icon_arrow_left_3x,
      goBackDefault: props.route.params ? false : true,
      isReplace: props.route.params ? true : false,
      backToRouteName: 'Main',
      titleName: 'Pilih Lokasi',
    })
  }, [navigation])

  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <Spacer height={10} />
        <View style={{ marginHorizontal: SIZES.margin_h }}>
          <Input
            onChangeText={debounce(async text => {
              setCity(text)
              if (text.length > 0) {
                setBorderInput(true)
                setHideSuggestion(true)
              } else if (text.length === 0) {
                setBorderInput(false)
                setHideSuggestion(false)
                setPlaceHolder('Ketik nama Kota atau Kabupaten')
              }
            }, 500)}
            defaultValue={city}
            placeholder={placeHolder}
            placeholderTextColor={Colors.neutralGray01}
            inputContainerStyle={{
              paddingLeft: 20,
              paddingRight: city.length != 0 ? 10 : 0,
              borderColor: borderInput
                ? Colors.otherBlue
                : Colors.neutralGray03,
            }}
            onFocus={() => {
              setPlaceHolder('')
              setBorderInput(true)
              setHideSuggestion(true)
              setResultUncoveredCity({})
              setResult([])
            }}
            keyboardType={'default'}
            inputStyle={{
              paddingLeft: 5,
              fontSize: 16,
              color: Colors.neutralBlack02,
            }}
            leftIcon={
              <FeatherIcon
                size={20}
                color={Colors.neutralGray03}
                name={`map-pin`}
              />
            }
            rightIcon={
              city.length != 0 && (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    width: 34,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setCity('')
                    setBorderInput(false)
                    setHideSuggestion(false)
                    setPlaceHolder('Ketik nama Kota atau Kabupaten')
                  }}
                >
                  <FeatherIcon
                    size={20}
                    color={Colors.neutralGray01}
                    name={`x`}
                  />
                </TouchableOpacity>
              )
            }
          />
        </View>

        {!isEmptyNullOrUndefined(state.location.shipping_address.data) && (
          <View
            style={{
              marginHorizontal: SIZES.margin_h,
              margin: SIZES.margin_h - 4,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('PinMyLocation', true)}
            >
              <FontAwesome5 name="location-arrow" size={16} />
              <Spacer width={10} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.regular,
                  color: Colors.neutralBlack02,
                }}
              >
                Gunakan Lokasi saat ini
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <SuggestionMostPopularCitiesGroup
          data={recomendedCity}
          isLoading={loadingRecomendedCity}
          defocused={() => setBorderInput(false)}
          hideSuggestion={hideSuggestion}
          navigation={navigation}
          dispatch={dispatch}
          resultSearch={result}
          resultUncoveredCity={resultUncoveredCity}
          loadingSearch={loadingSearch}
          isUncoveredCity={isUncoveredCity}
          marginTop={
            !isEmptyNullOrUndefined(state.location.shipping_address.data)
              ? 0
              : 20
          }
        />

        {/* <LocationNotCovered /> */}
      </View>
    </>
  )
}

export default SearchLocationContainer

const styles = StyleSheet.create({})
