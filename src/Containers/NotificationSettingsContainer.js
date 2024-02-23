import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { SIZES, Fonts, Colors } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from '@/Components/Base/Spacer'
import Toggle from '@/Components/Base/Toggle'
import { data_setting_notification } from '@/Components/Notification/DataDummy'
import { Divider } from '@rneui/base'
import { TouchableOpacity } from 'react-native'
import { auth } from '@/Helper/apiKit'
import axios from 'axios'
import { Config } from '@/Config'
import { remapDataSetNotif } from '@/Components/Notification/Helper'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import { isEmptyNullOrUndefined } from '@/Helper'
import _, { isNull, uniqueId } from 'lodash'

const NotificationSettingsContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const _dataSetNotif = data_setting_notification

  const [dataNotif, setDataNotif] = useState({
    list_id: '',
    list_name: '',
    list_status: 0,
    child: [],
  })
  const [loadingXhrGet, setLoadingXhrGet] = useState(false)
  const [selectedToggle, setSelectedToggle] = useState({
    parent_index: null,
    child_index: null,
    uniqueId: null,
  })

  const [payloadUpdate, setPayloadUpdate] = useState({
    notif_status_pemesanan_produk: 0,
    notif_status_pembayaran: 0,
    notif_penggunaan_point: 0,
    notif_downline_baru: 0,
    notif_point_downline: 0,
  })

  const xhrGetSettingNotif = () => {
    setLoadingXhrGet(true)
    axios
      .post(Config.CUSTOMER_APP + '/auth/get-setting-notif', {
        fbasekey: state.tokenList.fcm_token,
      })
      .then(({ data }) => {
        if (data.statusCode === '200') {
          const { settings } = data.data
          setDataNotif(remapDataSetNotif(data.data.settings))
          setPayloadUpdate({
            notif_status_pemesanan_produk:
              settings.notif_status_pemesanan_produk,
            notif_downline_baru: settings.notif_downline_baru,
            notif_penggunaan_point: settings.notif_penggunaan_point,
            notif_point_downline: settings.notif_point_downline,
            notif_status_pembayaran: settings.notif_status_pembayaran,
          })
          setLoadingXhrGet(false)
        }
      })
      .catch(err => {
        console.log('ERR_GET_NOTIF', err)
        setLoadingXhrGet(false)
      })
  }

  const xhrUpdateSettingNotif = payload => {
    axios
      .post(Config.CUSTOMER_APP + '/auth/update-setting-notif', {
        fbasekey: state.tokenList.fcm_token,
        ...payload,
      })
      .then(res => {
        const { data, request } = res
        if (data.statusCode === '200') {
          setDataNotif(remapDataSetNotif(data.data.settings))
        }
      })
      .catch(err => {
        console.log('ERR_UPDATE_NOTIF', err)
      })
  }

  const handleSelectedToggle = (parent, child) => {
    const _arr = [...dataNotif.child]

    _arr[parent].child[child]['list_status'] =
      !_arr[parent].child[child]['list_status']

    const updateObject = () => {
      return {
        ...payloadUpdate,
        ...(payloadUpdate[_arr[parent].child[child]['list_type']] = _arr[parent]
          .child[child]['list_status']
          ? 1
          : 0),
      }
    }

    setPayloadUpdate(updateObject())

    setDataNotif({ ...dataNotif, child: _arr })
    xhrUpdateSettingNotif(updateObject())
  }

  const handleOnPressNoNotif = () => {
    // xhrUpdateSettingNotif({...payloadUpdate, notif_downline_baru:!payloadUpdate.notif_downline_baru})
  }

  React.useLayoutEffect(() => {
    NavBarV1({ navigation: navigation, titleName: '' })
  }, [navigation])

  useEffect(() => {
    xhrGetSettingNotif()
  }, [])

  useEffect(() => {
    !isNull(selectedToggle.uniqueId) &&
      handleSelectedToggle(
        selectedToggle.parent_index,
        selectedToggle.child_index,
      )
  }, [selectedToggle.uniqueId])

  return (
    <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
      {loadingXhrGet ? (
        <LoadingIndicator />
      ) : (
        <View
          style={{
            marginHorizontal: SIZES.margin_h,
            marginVertical: SIZES.margin_h,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <FeatherIcon name={'bell'} size={24} color={Colors.neutralGray01} />
            <Spacer width={12} />
            <Text
              style={{
                fontSize: 24,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
              }}
            >
              Pengaturan Notifikasi
            </Text>
          </View>
          <Spacer height={20} />
          <SectionToggle
            data={dataNotif}
            onChangeSelected={value => {
              console.log('VLLL', value)
              setSelectedToggle(value)
            }}
            onPressNoNotif={handleOnPressNoNotif}
          />
          <Spacer height={100} />
        </View>
      )}
    </ScrollView>
  )
}

export default NotificationSettingsContainer

const styles = StyleSheet.create({})

const SectionToggle = ({
  data,
  onChangeSelected = () => {},
  // onPressNoNotif,
}) => {
  const [indexes, setIndexes] = useState({
    parent_index: 0,
    child_index: 0,
    uniqueId: null,
  })

  useEffect(() => {
    onChangeSelected(indexes)
  }, [indexes.parent_index, indexes.child_index, indexes.uniqueId])

  return (
    <View>
      <Spacer height={20} />
      {/* <TextWithToggleButton
        labelStyle={{ fontSize: 18, fontFamily: Fonts.medium }}
        {...data}
        onPressToggle={onPressNoNotif}
      /> */}
      {/* <Spacer height={20} />
      <Divider color={Colors.neutralGray04} /> */}
      {data.child.map((element, index) => (
        <View key={index}>
          <Spacer height={20} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
            }}
          >
            {element.section_name}
          </Text>
          <Spacer height={8} />
          {element.child.map((e, i) => (
            <TextWithToggleButton
              {...e}
              key={i}
              onPressToggle={() => {
                setIndexes({
                  parent_index: index,
                  child_index: i,
                  uniqueId: parseInt(uniqueId()),
                })
              }}
            />
          ))}
          <Spacer height={20} />
          <Divider color={Colors.neutralGray04} />
        </View>
      ))}
    </View>
  )
}

const TextWithToggleButton = ({
  labelStyle,
  onPressToggle,
  disabled,
  ...props
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
      }}
    >
      <Text
        style={[
          {
            fontSize: 16,
            fontFamily: Fonts.regular,
            color: Colors.neutralBlack02,
          },
          labelStyle,
        ]}
      >
        {props.list_name}
      </Text>
      <TouchableOpacity onPress={onPressToggle} disabled={disabled}>
        <Toggle on={props.list_status} />
      </TouchableOpacity>
    </View>
  )
}
