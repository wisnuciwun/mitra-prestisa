import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import ButtonBase from '@/Components/Base/ButtonBase'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import Spacer from '@/Components/Base/Spacer'
import { Assets } from '@/Theme/Assets'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoder-reborn'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { Config } from '@/Config'
import { useDispatch } from 'react-redux'
import { setLocationFirst, setShippingAddress } from '@/Store/location'
import { reMapLocString } from '@/Components/Account/Helper'
import { isEmptyNullOrUndefined } from '@/Helper'

const marginHorizontal = 24
const { width, height } = Dimensions.get('window')

const PinMyLocationContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
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
    latitudeDelta: 0.0,
    longitudeDelta: 0.0,
  })
  const [position, setPosition] = useState({ lat: '', lng: '' })
  const [areaGmap, setAreaGmap] = useState(undefined)

  const [movingMap, setMovingMap] = useState(false)
  const [showModalUncovered, setShowModalUncovered] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [cityFromGmap, setCityFromGmap] = useState('')

  const handleShowModalUncovered = () => {
    setShowModalUncovered(!showModalUncovered)
  }

  const xhrGmapArea = city => {
    axios
      .get(Config.API_URL + '/customer-app/city/search?area_gmap=' + `${city}`)
      .then(response => {
        setLoadingSearch(false)
        if (response.data.data.city.length == 0) {
          handleShowModalUncovered()
        } else {
          setAreaGmap(response.data.data.city[0])
        }
      })
      .catch(err => {
        console.log('ERR_GMAP_AREA', err)
        setLoadingSearch(false)
      })
  }

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setGeoMarker({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0002,
          longitudeDelta: 0.0024,
        })
        setPosition({
          lat: location.latitude,
          lng: location.longitude,
        })
        setLoadingSearch(true)
        Geocoder.geocodePosition({
          lat: location.latitude,
          lng: location.longitude,
        })
          .then(res => {
            setDataLocation([res[0]])
          })
          .catch(err => console.log(err))
        axios
          .get(
            Config.GMAP_API +
              `&latlng=${location.latitude},${location.longitude}`,
          )
          .then(({ data }) => {
            const { plus_code, status } = data
            const _data = reMapLocString(plus_code.compound_code)
            if (status == 'OK') {
              xhrGmapArea(_data[_data.length - 3])
              setCityFromGmap(_data[_data.length - 3])
            }
          })
          .catch(err => {
            console.log('ERR_GET_WEB', err)
          })
      })
      .catch(error => {
        const { code, message } = error
        console.warn('CODE', code, 'MESSAGE:', message)
      })
  }, [])

  useEffect(() => {
    if (movingMap && !isEmptyNullOrUndefined(cityFromGmap)) {
      Geocoder.geocodePosition(position)
        .then(res => {
          setDataLocation([res[0]])
          xhrGmapArea(cityFromGmap)
        })
        .catch(err => console.log(err))
    }
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
          // zoomTapEnabled={false}
          scrollEnabled={movingMap}
          style={styles.map}
          region={geoMarker}
          initialRegion={geoMarker}
          onRegionChange={(region, details) => {
            setGeoMarker(region)
            setMovingMap(!details.isGesture)
          }}
          onRegionChangeComplete={(region, details) => {
            setGeoMarker(region)
            setPosition({ lat: region.latitude, lng: region.longitude })
            setMovingMap(!details.isGesture)
          }}
          // provider={PROVIDER_GOOGLE}
        >
          {/* <Marker
            style={{ height: 20, width: 20 }}
            coordinate={geoMarker}
            image={Assets.icon_map_pin_primary_gradient_1x}
          /> */}
        </MapView>
        <FastImage
          style={{
            height: 35,
            width: 35,
            position: 'absolute',
            left: width / 2 - 17.5,
            top: height / 2 - 100,
          }}
          source={Assets.icon_map_pin_primary_gradient_3x}
        />
        <TouchableOpacity
          onPress={() => {
            if (props.route.params) {
              navigation.replace('Main')
            } else {
              navigation.goBack()
            }
          }}
        >
          <View
            style={{
              backgroundColor: Colors.neutralGray01,
              width: 38,
              height: 38,
              marginLeft: marginHorizontal - 10,
              marginTop: 16,
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
        <View
          style={{
            bottom: 0,
            position: 'absolute',
            width: width,
            height: 260,
            backgroundColor: Colors.white,
            justifyContent: 'space-between',
          }}
        >
          <View
            style={
              {
                // backgroundColor: 'cyan',
              }
            }
          >
            <Text
              style={{
                marginHorizontal: marginHorizontal,
                marginVertical: 8,
                fontFamily: Fonts.medium,
                fontSize: 14,
                color: Colors.neutralGray02,
              }}
            >
              Gerakkan Titik Ikon jika kurang akurat
            </Text>
            <View
              style={{ height: 1, backgroundColor: Colors.neutralGray05 }}
            />
          </View>
          <ScrollView>
            {dataLocation.map((item, index) => (
              <ItemListLocationName key={index} item={item} />
            ))}
          </ScrollView>

          <View
            style={{
              height: 92,
              width: width,
              backgroundColor: Colors.white,
              paddingHorizontal: marginHorizontal,
              justifyContent: 'center',
              elevation: 20, // @platform android
            }}
          >
            <ButtonBase
              disable={areaGmap == undefined ? true : false}
              title="Pin Point Lokasi"
              colorTextDisable={Colors.neutralGray08}
              onPress={() => {
                dispatch(
                  setShippingAddress({ data: areaGmap, isLoading: true }),
                )
                dispatch(setLocationFirst(true))
                if (props.route.params) {
                  navigation.replace('Main')
                } else {
                  navigation.goBack()
                }
              }}
            />
          </View>
        </View>
      </View>
      {/* <ModalActivateDeviceLocation isModalVisible={true} /> */}
      <ModalLocationUncovered
        isModalVisible={showModalUncovered}
        onPress={handleShowModalUncovered}
      />
    </>
  )
}

export default PinMyLocationContainer

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
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

const ItemListLocationName = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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

const ModalActivateDeviceLocation = ({ isModalVisible, ...props }) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{ alignItems: 'center' }}
      {...props}
    >
      <View
        style={{
          height: 198,
          width: 260,
          backgroundColor: Colors.white,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            paddingVertical: 28,
            paddingHorizontal: 16,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
              fontSize: 20,
            }}
          >
            Aktifkan Lokasi ?
          </Text>
          <Spacer height={8} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
              fontSize: 16,
            }}
          >
            lokasi perangkat akan otomatis mendeteksi lokasimu
          </Text>
        </View>

        <View style={{ height: 1, backgroundColor: Colors.neutralGray03 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 14,
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                // height: 34,
                color: Colors.neutralGray01,
                fontFamily: Fonts.medium,
                fontSize: 16,
              }}
            >
              Tidak Jadi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                // height: 34,
                backgroundColor: Colors.primary,
                color: Colors.white,
                fontFamily: Fonts.medium,
                fontSize: 16,
                borderRadius: 4,
              }}
            >
              Izinkan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const ModalLocationUncovered = ({ isModalVisible, onPress, ...props }) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{ alignItems: 'center' }}
      {...props}
    >
      <View
        style={{
          height: 356,
          width: 312,
          backgroundColor: Colors.white,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 40,
            alignItems: 'center',
          }}
        >
          <FastImage
            source={Assets.frown_big_color_3x}
            style={{ height: 60, width: 60 }}
            resizeMode="contain"
          />
          <Spacer height={20} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack01,
              fontSize: 18,
            }}
          >
            Maaf,
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack01,
              fontSize: 18,
            }}
          >
            Layanan belum tersedia di lokasi
          </Text>
          <Spacer height={8} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
              fontSize: 16,
            }}
          >
            Saat ini kami belum bisa melayani daerah ini. Kamu bisa coba daerah
            lain untuk melanjutkan
          </Text>
        </View>
        <Spacer height={32} />
        <View
          style={{
            flexDirection: 'column',
            // marginHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            style={{
              height: 50,
              width: 180,
              backgroundColor: Colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.medium,
                color: Colors.white,
                textAlign: 'center',
              }}
            >
              Pilih lokasi lain
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
