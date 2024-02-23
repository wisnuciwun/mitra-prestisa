import React, { useEffect } from 'react'
import Spacer from '@/Components/Base/Spacer'
import Pengiriman from '@/Components/MakeOrder/Pengiriman'
import { Colors } from '@/Theme/Variables'
import { Divider } from '@rneui/base'
import { ScrollView, StyleSheet, View } from 'react-native'
import HeaderStepper from '@/Components/MakeOrder/HeaderStepper'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import Penerima from '@/Components/MakeOrder/Penerima'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import _, { isUndefined } from 'lodash'
import { isEmptyObject, matchStepScreen } from '@/Components/MakeOrder/Helper'

/**
 *
 *
 * Step 2: Buat Order - Penerima
 *   conditions:
 *      1. Single Product, condition:
 *            1.1. Belum Ada Alamat Penerima
 *            1.2. Alamat Penerima Sudah Tersimpan
 *      2. Multiple Product, condition:
 *            2.1. Belum Ada Alamat Penerima
 *            2.2. Alamat Penerima Sudah Tersimpan
 */
const MakeOrderPenerimaContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const navState = useNavigationState(state => state)
  const idPage = props.route.params.currentPage
  const ringkasanPesanan = state.ringkasanPesanan
  const _orderData = ringkasanPesanan.data
  const _navRoutes = ringkasanPesanan.navRoutes
  const isMultiProd = ringkasanPesanan.length
  const isSavedAddress = state.savedAddress.data.length
  const jumlahPage = props.route.params.jumlahPage
  const currentPage = props.route.params.prevPage + 1
  const _currentPage = props.route.params.currentPage + 1
  const index = currentPage - 1

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
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Spacer height={24} />
      <HeaderStepper
        step={2}
        isCheckedOne={!isEmptyObject(_orderData[index]['pengiriman'])}
        isCheckedTwo={!isEmptyObject(_orderData[index]['penerima'])}
        isCheckedThree={!isEmptyObject(_orderData[index]['ucapan'])}
        activeOne={matchStepScreen(navState.routes[navState.index].name)}
        activeTwo={matchStepScreen(navState.routes[navState.index].name)}
        onPressOne={() => handleOnPressStepper('MakeOrderPengiriman')}
        onPressTwo={() => handleOnPressStepper('MakeOrderPenerima')}
        onPressThree={() => handleOnPressStepper('MakeOrderUcapan')}
      />
      <Spacer height={24} />
      <Divider width={2} color={Colors.neutralGray05} />
      <Penerima
        isMultiProduct={isMultiProd > 0 && isMultiProd <= 1 ? false : true}
        isSavedAddress={isSavedAddress > 0 ? true : false}
        currentPage={currentPage}
        _currentPage={_currentPage}
        jumlahPage={jumlahPage}
        navigation={navigation}
        idPage={idPage}
      />
    </View>
  )
}

export default MakeOrderPenerimaContainer

const styles = StyleSheet.create({})
