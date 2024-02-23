import React, { useEffect } from 'react'
import Spacer from '@/Components/Base/Spacer'
import Pengiriman from '@/Components/MakeOrder/Pengiriman'
import { Colors } from '@/Theme/Variables'
import { Divider } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import HeaderStepper from '@/Components/MakeOrder/HeaderStepper'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { useNavigation, StackActions } from '@react-navigation/native'
import {
  cart_items,
  populateAllItemSelectedCart,
} from '@/Components/MakeOrder/Helper'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'

const EditWaktuPengiriman = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const idPage = props.route.params.id_page

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Waktu Pengiriman',
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Spacer height={30} />
      <Pengiriman
        idPage={idPage}
        isMultiProduct={false}
        navigation={navigation}
        isEdit={true}
      />
    </View>
  )
}

export default EditWaktuPengiriman

const styles = StyleSheet.create({})
