import React, { useEffect } from 'react'
import Spacer from '@/Components/Base/Spacer'
import Pengiriman from '@/Components/MakeOrder/Pengiriman'
import { Colors } from '@/Theme/Variables'
import { Divider } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import HeaderStepper from '@/Components/MakeOrder/HeaderStepper'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import {
  cart_items,
  isEmptyObject,
  matchStepScreen,
} from '@/Components/MakeOrder/Helper'
import _, { isUndefined } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'

const MakeOrderPengirimanContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const navState = useNavigationState(state => state)
  const state = useSelector(state => state)
  const ringkasanPesanan = state.ringkasanPesanan
  const _orderData = ringkasanPesanan.data
  const _navRoutes = ringkasanPesanan.navRoutes

  const jumlahPage = props.route.params.jumlahPage
  const currentPage = props.route.params.prevPage + 1
  const _currentPage = props.route.params.currentPage + 1
  const _data = cart_items
  const _data_copy = _data.concat(_data[1], _data[2])
  const idPage = props.route.params.currentPage
  const index = currentPage - 1

  const sorted = arr => {
    _.orderBy(_data_copy, ['counter'], ['desc'])
  }

  const _rep = () => {
    return _.filter(_navRoutes, (o, i) => {
      return (
        o.name != 'MakeOrderPenerima' &&
        o.name != 'MakeOrderPengiriman' &&
        o.name != 'MakeOrderUcapan'
      )
    })
  }

  const handleOnPressStepper = screenName => {
    const _param = _.filter(
      _navRoutes,
      o => !isUndefined(o.name) && o.name === screenName,
    )[0]

    _navRoutes.length != 0 &&
      !isUndefined(_param) &&
      navigation.navigate(_param.name, _param.params)
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Buat Pesanan',
      isNavDefault: currentPage == 1 && _rep().length != 0 ? false : true,
      onNav: () =>
        navigation.reset({
          routes: _rep(),
          index:
            _orderData.length > 0 && _orderData.length <= 1
              ? _rep().length
              : _rep().length - 1,
        }),
    })
  }, [navigation, currentPage, _orderData.length])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Spacer height={24} />
      <HeaderStepper
        step={1}
        isCheckedOne={!isEmptyObject(_orderData[index]['pengiriman'])}
        isCheckedTwo={!isEmptyObject(_orderData[index]['penerima'])}
        isCheckedThree={!isEmptyObject(_orderData[index]['ucapan'])}
        activeOne={matchStepScreen(navState.routes[navState.index].name)}
        onPressOne={() => handleOnPressStepper('MakeOrderPengiriman')}
        onPressTwo={() => handleOnPressStepper('MakeOrderPenerima')}
        onPressThree={() => handleOnPressStepper('MakeOrderUcapan')}
      />
      <Spacer height={24} />
      <Divider width={2} color={Colors.neutralGray05} />
      <Pengiriman
        idPage={idPage}
        isMultiProduct={_orderData.length > 1 && true}
        jumlahPage={jumlahPage}
        currentPage={currentPage}
        navigation={navigation}
        _currentPage={_currentPage}
      />
    </View>
  )
}

export default MakeOrderPengirimanContainer

const styles = StyleSheet.create({})
