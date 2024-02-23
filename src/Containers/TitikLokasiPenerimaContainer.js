import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Spacer from '@/Components/Base/Spacer'
import { Assets } from '@/Theme/Assets'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoder-reborn'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import FeatherIcon from 'react-native-vector-icons/Feather'

const marginHorizontal = 24
const { width, height } = Dimensions.get('window')

const TitikLokasiPenerimaContainer = () => {
  const navigation = useNavigation()
  const [dataLocation, setDataLocation] = useState([
    {
      formattedAddress: '',
      subAdminArea: '',
      adminArea: '',
      locality: '',
    },
  ])
  const [geoMarker, setGeoMarker] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.0002,
    longitudeDelta: 0.0024,
  })

  const [position, setPosition] = useState({ lat: '', lng: '' })

  const [inputText, setInputText] = useState('')
  const [placeholder, setPlaceholder] = useState('Ketik nama jalan/daerah')
  const [keepCenterMarker, setKeepCenterMarker] = useState(false)
  const [hideButtonFloat, setHideButtonFloat] = useState(false)
  const [empytValueInput, setEmpytValueInput] = useState(false)

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setGeoMarker({
          ...geoMarker,
          latitude: location.latitude,
          longitude: location.longitude,
        })
        setPosition({
          lat: location.latitude,
          lng: location.longitude,
        })
      })
      .catch(error => {
        const { code, message } = error
        console.warn('CODE', code, 'MESSAGE:', message)
      })
  }, [])

  useEffect(() => {
    Geocoder.geocodePosition(position)
      .then(res => {
        setDataLocation([res[0]])
      })
      .catch(err => console.log(err))
  }, [position.lat])

  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View
        style={{
          backgroundColor: Colors.neutralGray08,
          flex: 1,
          position: 'relative',
        }}
      >
        <MapView
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={false}
          style={[
            styles.map,
            { transform: [{ translateY: hideButtonFloat ? -160 : 0 }] },
          ]}
          region={geoMarker}
          initialRegion={geoMarker}
          onRegionChange={(region, details) => {
            setGeoMarker(region)
          }}
          onRegionChangeComplete={(region, details) => {
            setKeepCenterMarker(false)
            setGeoMarker(region)
            setPosition({ lat: region.latitude, lng: region.longitude })
          }}
          //   provider={PROVIDER_GOOGLE}
          onPanDrag={() => {
            setKeepCenterMarker(true)
          }}
          // onMarkerDragStart={e => {}}
          // onUserLocationChange={e => {}}
        >
          {hideButtonFloat && (
            <Marker
              draggable={true}
              coordinate={geoMarker}
              image={Assets.icon_map_pin_primary_gradient_1x}
            />
          )}
        </MapView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              backgroundColor: Colors.neutralGray01,
              width: 38,
              height: 38,
              marginLeft: marginHorizontal - 10,
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 200,
              opacity: 0.8,
            }}
          >
            <FastImage
              source={Assets.icon_arrow_left_white_3x}
              style={{ height: 18, width: 18 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {!hideButtonFloat && (
          <FastImage
            style={{
              height: 35,
              width: 35,
              position: 'absolute',
              left: width / 2 - 17.5,
              top: hideButtonFloat ? height / 2 - 100 - 160 : height / 2 - 45,
            }}
            source={Assets.icon_map_pin_primary_gradient_3x}
          />
        )}
        <View
          style={[
            {
              bottom: 0,
              position: 'absolute',
              width: width,
              height: hideButtonFloat ? 300 : 260,
              backgroundColor: Colors.white,
              justifyContent: 'space-between',
            },
            hideButtonFloat && { transform: [{ translateY: -160 }] },
          ]}
        >
          <GooglePlacesAutocomplete
            placeholder={placeholder}
            minLength={2}
            enablePoweredByContainer={false}
            // listViewDisplayed="auto"
            renderDescription={row => row.description}
            fetchDetails={true}
            styles={{
              textInput: { backgroundColor: Colors.neutralGrayBlue },
              textInputContainer: {
                backgroundColor: Colors.neutralGrayBlue,
                borderRadius: 4,
                alignItems: 'center',
              },
              separator: { height: 0 },
              container: {
                paddingBottom: hideButtonFloat ? 60 : 20,
                paddingTop: 10,
                paddingLeft: 12,
                paddingRight: 12,
              },
            }}
            onPress={(data, details = null) => {
              setPosition({
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
              })
              setGeoMarker({
                ...geoMarker,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })
              setEmpytValueInput(true)
            }}
            query={{
              key: 'AIzaSyCyWl0npaQ4UMAZEJ-AubY-yyzRxzTu1_I',
              language: 'id',
            }}
            renderRow={(data, index) => {
              if (inputText.length > 0)
                return (
                  <View
                    style={{
                      // backgroundColor: 'red',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                    key={index}
                  >
                    <FastImage
                      source={Assets.icon_map_pin_grey_3x}
                      style={{ height: 20, width: 20 }}
                      resizeMode={'contain'}
                    />
                    <Spacer width={15} />
                    <View>
                      <Text
                        style={{
                          fontFamily: Fonts.medium,
                          fontSize: 16,
                          color: Colors.neutralBlack02,
                          paddingRight: 20,
                        }}
                      >
                        {data.structured_formatting.main_text}
                      </Text>
                      <Spacer height={4} />
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontFamily: Fonts.medium,
                            fontSize: 12,
                            color: Colors.neutralBlack02,
                          }}
                        >
                          {data.structured_formatting.secondary_text}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
            }}
            nearbyPlacesAPI={'GooglePlacesSearch'}
            textInputProps={{
              style: {
                color: Colors.neutralBlack02,
                backgroundColor: 'transparent',
                flex: 1,
                borderRadius: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                height: 36,
                fontFamily: Fonts.regular,
                fontSize: 16,
                lineHeight: 20.8,
              },
              onFocus: () => {
                setHideButtonFloat(true)
                setEmpytValueInput(false)
              },
              onBlur: () => {
                setHideButtonFloat(false)
              },
              defaultValue: inputText,
              onChangeText: text => {
                setInputText(text)
              },
              value: null,
            }}
            renderRightButton={() => {
              return (
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                  {inputText.length > 0 ? (
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        width: 34,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setInputText('')
                        setPlaceholder('Ketik nama jalan/daerah')
                      }}
                    >
                      <FeatherIcon
                        size={20}
                        color={Colors.neutralGray01}
                        name={`x`}
                      />
                    </TouchableOpacity>
                  ) : (
                    <FeatherIcon
                      size={18}
                      color={Colors.neutralGray03}
                      name="search"
                    />
                  )}
                </View>
              )
            }}
          />
          {!hideButtonFloat && (
            <View style={{ top: -90, marginTop: 10 }}>
              {dataLocation.map((item, index) => (
                <ItemListLocationName key={index} item={item} disabled={true} />
              ))}
            </View>
          )}
        </View>
      </View>
      {!hideButtonFloat && (
        <ButtonBottomFloating
          label="Pin Point Lokasi"
          disable={dataLocation.length == 0 ? true : false}
          onPress={() => {
            const _data_map_pin = { data: dataLocation[0], geo_code: geoMarker }
          }}
        />
      )}
    </>
  )
}

export default TitikLokasiPenerimaContainer

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
})

/**
 *
 * Item List
 *
 * @param {Object} item
 *
 * {
 *    address: Jalan Ramayana C9 No.28
 *    subAdminArea: Jakarta Selatan
 *    adminArea: Jakarta
 *    locality: Setiabudi
 * }
 */

const ItemListLocationName = ({ item, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 12,
          marginBottom: 12,
          marginHorizontal: marginHorizontal,
        }}
      >
        <FastImage
          source={Assets.icon_map_pin_grey_3x}
          style={{ height: 20, width: 20 }}
          resizeMode={'contain'}
        />
        <Spacer width={15} />
        <View>
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 16,
              color: Colors.neutralBlack02,
              paddingRight: 20,
            }}
          >
            {item.formattedAddress}
          </Text>
          <Spacer height={4} />
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 12,
                color: Colors.neutralBlack02,
              }}
            >
              {item.locality},{' '}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 12,
                color: Colors.neutralBlack02,
              }}
            >
              {item.adminArea}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
