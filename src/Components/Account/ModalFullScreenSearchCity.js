import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { Modal, TouchableOpacity } from 'react-native'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Input } from '@rneui/themed'
import Spacer from '@/Components/Base/Spacer'
import { Config } from '@/Config'
import axios from 'axios'
import SuggestionMostPopularCitiesGroup from '../SearchLocationCity/SuggestionMostPopularCitiesGroup'
import SearchLocationResults from '../SearchLocationCity/SearchLocationResults'

const ModalFullScreenSearchCity = ({ modalVisible, onClose, selectedCity }) => {
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

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={modalVisible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Spacer height={18} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <View
                style={{
                  width: 38,
                  height: 38,
                  marginLeft: SIZES.margin_h - 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FeatherIcon
                  name="arrow-left"
                  size={20}
                  color={Colors.neutralBlack01}
                />
              </View>
            </TouchableOpacity>
            <Text>Pilih Kota/Kabupaten</Text>
            <Spacer width={38} />
          </View>
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
          <SuggestionMostPopularCitiesGroup
            data={recomendedCity}
            isLoading={loadingRecomendedCity}
            defocused={() => setBorderInput(false)}
            hideSuggestion={hideSuggestion}
            resultSearch={result}
            resultUncoveredCity={resultUncoveredCity}
            loadingSearch={loadingSearch}
            isUncoveredCity={isUncoveredCity}
            isModal={true}
            selectedPopularCity={selectedCity}
            selectedResultCity={selectedCity}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ModalFullScreenSearchCity

const styles = StyleSheet.create({})
