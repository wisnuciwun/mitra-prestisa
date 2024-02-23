import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductListItem3LineText from '../RingkasanPesanan/ProductListItem3LineText'
import Spacer from '../Base/Spacer'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { productDetail } from '../RingkasanPesanan/Styles'
import { Colors } from '@/Theme/Variables'

const ProductInfo = ({ name, price, ongkir, img_thumb, notes }) => {
  return (
    <>
      <ProductListItem3LineText
        name={name}
        price={price}
        ongkir={ongkir}
        imgSource={img_thumb}
      />
      <Spacer height={12} />
      <Text style={[productDetail.titleNotes]}>Notes</Text>
      <Spacer height={4} />
      <View style={[productDetail.containerNotes]}>
        <FeatherIcon size={16} color={Colors.neutralBlack02} name="file-text" />
        <Spacer width={11} />
        <Text style={[productDetail.textNotes]}>{notes}</Text>
      </View>
    </>
  )
}

export default ProductInfo

const styles = StyleSheet.create({})
