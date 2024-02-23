import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import { Divider } from '@rneui/base'
import Spacer from '@/Components/Base/Spacer'
import ProductInfo from '@/Components/DetailPesanan/ProductInfo'
import Ucapan from '@/Components/DetailPesanan/Ucapan'
import WaktuPengiriman from '@/Components/DetailPesanan/WaktuPengiriman'
import Penerima from '@/Components/DetailPesanan/Penerima'
import { manipulateDataForAccordion } from '@/Components/DetailPesanan/Helper'
import {
  data_detail_pesanan_multi_produk_all_status as multiAllStatus,
  data_detail_pesanan_single as single,
} from '@/Components/DetailPesanan/DummyData'
import Accordion from '@/Components/DetailPesanan/Accordion'
import { ScrollView } from 'react-native'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import TouchableIconTextRow from '@/Components/Base/TouchableIconTextRow'
import IconMessageSquare from '@/Components/Base/IconMessageSquare'
import moment from 'moment'
import { Config } from '@/Config'
import ModalCenterConfirmLayout from '@/Components/ModalCenterConfirmLayout'
import ModalCenterViewSinglePhoto from '@/Components/ModalCenterViewSinglePhoto'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import axios from 'axios'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import { order } from '@/Helper/apiKit'
import { isUndefined } from 'lodash'

const DetailPesananContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route || {}

  const [dataDetailOrder, setDataDetailOrder] = useState(
    // manipulateDataForAccordion(multiAllStatus.list_item),
    // manipulateDataForAccordion(single.list_item),
    [],
  )
  const [dataDetailOrderRaw, setDataDetailOrderRaw] = useState({
    order_detail: '',
    customer_info: '',
    list_item: [],
    cashback: '',
    total_cost: '',
    payment_method: '',
  })

  const [paySummary, setPaySummary] = useState({
    harga_produk: '',
    shipping_cost: '',
    discount: '',
    subtotal: '',
    tax: '',
    total: '',
  })

  const [showModalConfirmFinishOrder, setShowModalConfirmFinishOrder] =
    useState(false)
  const [showModalViewImgArrivedOrder, setShowModalViewImgArrivedOrder] =
    useState(false)
  const [loadingXhrGetOrderDetail, setLoadingXhrGetOrderDetail] =
    useState(false)

  const [dataProductItemConfirmOrder, setDataProductItemConfirmOrder] =
    useState(null)
  const [dataProductItemArrivedOrder, setDataProductItemArrivedOrder] =
    useState(null)

  const handleOpenAccordion = index => {
    const arr = [...dataDetailOrder]
    arr.map((e, i) => {
      i == index
        ? (arr[i]['isExpanded'] = !arr[i]['isExpanded'])
        : (arr[i]['isExpanded'] = false)
    })
    setDataDetailOrder(arr)
  }

  const handleButtonCS = () => {
    navigation.navigate('CustomerService')
  }

  const handleShowModalConfirmFinishOrder = _params => {
    setShowModalConfirmFinishOrder(true)
    setDataProductItemConfirmOrder(_params)
  }
  const handleHideModalConfirmFinishOrder = _params => {
    setShowModalConfirmFinishOrder(false)
    setDataProductItemConfirmOrder(null)
  }

  const handleAcceptConfirmFinishOrder = () => {
    const id_product = dataProductItemConfirmOrder.data.id
  }

  const handleShowModalSinglePhotoViewer = _params => {
    setShowModalViewImgArrivedOrder(true)
    setDataProductItemArrivedOrder({
      ..._params,
      uri: _params.data.arrived_image,
      fileName: _params.data.arrived_image_name,
    })
  }
  const handleHideModalSinglePhotoViewer = _params => {
    setShowModalViewImgArrivedOrder(false)
    setDataProductItemArrivedOrder(null)
  }

  const xhrGetOrderDetail = () => {
    setLoadingXhrGetOrderDetail(true)
    order
      .orderDetail({
        order_id: params.order_id,
      })
      .then(({ data }) => {
        setLoadingXhrGetOrderDetail(false)
        setDataDetailOrder(manipulateDataForAccordion(data.data.list_item))
        setDataDetailOrderRaw(data.data)
      })
      .catch(({ response }) => {
        setLoadingXhrGetOrderDetail(false)
        console.log('ERR_GET_ORDER', response)
      })
  }

  React.useLayoutEffect(() => {
    NavBarV1({ navigation: navigation, titleName: 'Detail Pesanan' })
  }, [navigation])

  useEffect(() => {
    xhrGetOrderDetail()
  }, [])

  /**
   *
   * Inside Body Component: InfoOrder, InformasiPesanan, CashBack, Pembayaran, MetodePembayaran
   *
   */
  const InfoOrder = props => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.margin_h,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.regular,
            color: Colors.neutralGray01,
          }}
        >
          ID Order
        </Text>
        <Spacer height={4} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.regular,
            color: Colors.neutralBlack01,
          }}
        >
          {props.id}
        </Text>
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <TextTouchable
          text="Lihat invoice"
          textStyles={{ fontSize: 14, lineHeight: 19.6 }}
          onPress={() =>
            navigation.navigate('Invoice', {
              order_id: params.order_id,
              status: params.status,
            })
          }
        />
      </View>
    </View>
  )

  const InformasiPesanan = props => {
    return (
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <Text
          style={[
            {
              fontFamily: Fonts.medium,
              fontSize: 18,
              lineHeight: 24,
              color: Colors.neutralBlack02,
            },
          ]}
        >
          Informasi Pesanan
        </Text>
        <Spacer height={20} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
            }}
          >
            Tanggal Pemesan
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
            }}
          >
            {moment(props.created_at).format('DD MMMM yyyy')}
          </Text>
        </View>
        <Spacer height={8} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
            }}
          >
            Nama Pemesan
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack01,
            }}
          >
            {props.name}
          </Text>
        </View>
      </View>
    )
  }

  const CashBack = props => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.margin_h,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: Fonts.regular,
          color: Colors.neutralBlack02,
        }}
      >
        Cashback
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: Fonts.medium,
          color: Colors.neutralBlack01,
        }}
      >
        {numberWithCommas(props.cashback)} Points
      </Text>
    </View>
  )

  const Pembayaran = props => (
    <View style={{ marginHorizontal: SIZES.margin_h }}>
      <Text
        style={[
          {
            fontFamily: Fonts.medium,
            fontSize: 18,
            lineHeight: 24,
            color: Colors.neutralBlack02,
          },
        ]}
      >
        Pembayaran
      </Text>
      <Spacer height={16} />
      {!isUndefined(props.harga_produk) && (
        <TextRowBetween
          textLeft={'Harga Produk'}
          textRight={'Rp' + numberWithCommas(props.harga_produk)}
        />
      )}
      <Spacer height={7} />
      <TextRowBetween
        textLeft={'Biaya Pengiriman'}
        textRight={'Rp' + numberWithCommas(props.shipping_cost)}
      />
      <Spacer height={9} />
      <TextRowBetween
        textLeft={'Diskon'}
        textRight={'- Rp' + numberWithCommas(props.discount)}
      />
      <Spacer height={9} />
      <TextRowBetween
        textLeft={'Subtotal'}
        textRight={'Rp' + numberWithCommas(props.subtotal)}
      />
      <Spacer height={7} />
      <TextRowBetween
        textLeft={'Pajak'}
        textRight={' Rp' + numberWithCommas(props.tax)}
      />
      <Spacer height={17} />
      <Divider width={1} color={Colors.neutralGray04} />
      <Spacer height={16} />
      <TextRowBetween
        textLeft={'Total'}
        textRight={'Rp' + numberWithCommas(props.total)}
        textLeftStyle={{ fontFamily: Fonts.medium, textTransform: 'uppercase' }}
        textRightStyle={{ fontFamily: Fonts.bold, fontSize: 16 }}
      />
    </View>
  )

  const MetodePembayaran = props => (
    <View style={{ marginHorizontal: SIZES.margin_h }}>
      <Text
        style={[
          {
            fontFamily: Fonts.medium,
            fontSize: 18,
            lineHeight: 24,
            color: Colors.neutralBlack02,
          },
        ]}
      >
        Metode Pembayaran
      </Text>
      <Spacer height={16} />
      <TextRowBetween
        textLeft={props.payment_method.name}
        textRight={'Rp' + numberWithCommas(props.payment_method.total)}
        textLeftStyle={{
          fontFamily: Fonts.regular,
          fontSize: 16,
          textTransform: 'uppercase',
        }}
        textRightStyle={{ fontFamily: Fonts.bold, fontSize: 16 }}
      />
    </View>
  )

  return (
    <>
      {loadingXhrGetOrderDetail ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <LoadingIndicator />
        </View>
      ) : (
        <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
          <Spacer height={24} />
          <InfoOrder {...dataDetailOrderRaw.order_detail} />
          <Spacer height={18} />
          <Divider width={6} color={Colors.neutralGray06} />
          <Spacer height={24} />
          <InformasiPesanan {...dataDetailOrderRaw.customer_info} />
          <Spacer height={18} />
          <Divider width={6} color={Colors.neutralGray06} />
          <Spacer height={24} />
          <ListProdukPesanan
            orderId={dataDetailOrderRaw.order_detail.id}
            data={dataDetailOrder}
            onOpenAccordion={handleOpenAccordion}
            onShowModalConfirm={handleShowModalConfirmFinishOrder}
            onShowSinglePhotoViewer={handleShowModalSinglePhotoViewer}
          />
          <Spacer height={18} />
          <Divider width={6} color={Colors.neutralGray06} />
          {!isEmptyNullOrUndefined(dataDetailOrderRaw.cashback) && (
            <>
              <Spacer height={18} />
              <CashBack {...dataDetailOrderRaw} />
              <Spacer height={18} />
              <Divider width={6} color={Colors.neutralGray06} />
            </>
          )}
          <Spacer height={24} />
          <Pembayaran {...dataDetailOrderRaw.total_cost} />
          <Spacer height={28} />
          <Divider width={6} color={Colors.neutralGray06} />
          <Spacer height={24} />
          <MetodePembayaran {...dataDetailOrderRaw} />
          <Spacer height={24} />
          <Spacer height={100} />
        </ScrollView>
      )}
      <ModalCenterConfirmLayout
        isVisible={showModalConfirmFinishOrder}
        onPressClose={handleHideModalConfirmFinishOrder}
        onPressAccept={handleAcceptConfirmFinishOrder}
        bodyTitle={'Konfirmasi dan selesaikan pesanan?'}
        bodySubtitle={
          'Pastikan produk  telah sampai\ndan sudah sesuai dengan pesanan'
        }
        labelClose={'Tidak jadi'}
        labelAccept={'Ya, Konfirmasi'}
        acceptTextStyle={{ paddingHorizontal: 0 }}
        acceptContainerText={{ paddingHorizontal: 14 }}
      />
      <ModalCenterViewSinglePhoto
        modalVisible={showModalViewImgArrivedOrder}
        onClose={handleHideModalSinglePhotoViewer}
        data={dataProductItemArrivedOrder}
      />
      <ButtonBottomFloating
        isTouchComp={true}
        touchableComp={() => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingVertical: 10,
              alignItems: 'center',
              borderColor: Colors.neutralBlack02,
              borderWidth: 1,
              borderRadius: 5,
            }}
            onPress={handleButtonCS}
          >
            <TouchableIconTextRow
              text="Hubungi Customer Service"
              isIconComp={true}
              textStyle={{ fontSize: 14 }}
              disable={true}
              iconComp={() => (
                <IconMessageSquare color={Colors.neutralBlack02} />
              )}
            />
          </TouchableOpacity>
        )}
      />
    </>
  )
}

export default DetailPesananContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Component: ListProdukPesanan, DetailOrderItem, TextRowBetween, SectionRowPressRight
 */
const ListProdukPesanan = ({
  data,
  onOpenAccordion,
  onShowModalConfirm,
  onShowSinglePhotoViewer,
  orderId,
}) => {
  const navigation = useNavigation()

  const handleNavSection = (name, url) => {
    navigation.navigate(name, url)
  }

  const handleShowModal = (status_id, index) => {
    switch (status_id) {
      case 14:
        return onShowModalConfirm(data[index])
      case 10:
        return onShowSinglePhotoViewer(data[index])
      default:
        return console.log('NO MODAL', status_id, index)
    }
  }

  return (
    <View style={{ marginHorizontal: SIZES.margin_h }}>
      <Text
        style={[
          {
            fontFamily: Fonts.medium,
            fontSize: 18,
            lineHeight: 24,
            color: Colors.neutralBlack02,
          },
        ]}
      >
        {data.length > 1 && 'List '}Produk Pesanan
      </Text>
      <Spacer height={20} />
      {data.length > 1
        ? data.map((item, index) => {
            const {
              isExpanded,
              name,
              index_list,
              status,
              status_text_color,
              status_text_bg,
              data,
            } = item
            return (
              <View
                style={[
                  { marginBottom: index == data.length - 1 ? 0 : 16 },
                  isExpanded && index == data.length - 1 && { marginBottom: 0 },
                ]}
                key={index}
              >
                <Accordion
                  onPress={() => onOpenAccordion(index)}
                  status={status}
                  showStatus={isExpanded ? false : true}
                  name={name.substring(0, 11) + '...'}
                  index={index_list}
                  rotateX={isExpanded ? '180deg' : '0deg'}
                  firstColText={index_list + '. '}
                  textBg={status_text_bg}
                  textColor={status_text_color}
                />
                {isExpanded && (
                  <View style={[isExpanded && { paddingTop: 8 }]}>
                    <View
                      style={[
                        {
                          backgroundColor: '#F7F7F8',
                          padding: 16,
                          borderRadius: 6,
                        },
                      ]}
                    >
                      <SectionRowPressRight
                        props={item}
                        onPress={() => {
                          if (item.nav.isNav) {
                            handleNavSection(
                              item.nav.name,
                              !isEmptyNullOrUndefined(item.data.payment_link)
                                ? {
                                    invoice_url: item.data.payment_link,
                                    order_id: orderId,
                                    po_id: item.data.po_id,
                                  }
                                : undefined,
                            )
                          } else {
                            handleShowModal(item.data.status_id, index)
                          }
                        }}
                      />
                      <Spacer height={20} />
                      <DetailOrderItem {...data} />
                    </View>
                  </View>
                )}
              </View>
            )
          })
        : data.map((item, index) => {
            const { data } = item
            return (
              <View key={index}>
                <View style={[{ paddingTop: 8 }]}>
                  <SectionRowPressRight
                    props={item}
                    onPress={() => {
                      if (item.nav.isNav) {
                        handleNavSection(
                          item.nav.name,
                          !isEmptyNullOrUndefined(item.data.payment_link)
                            ? {
                                invoice_url: item.data.payment_link,
                                order_id: orderId,
                                po_id: item.data.po_id,
                              }
                            : undefined,
                        )
                      } else {
                        handleShowModal(item.data.status_id, index)
                      }
                    }}
                  />
                  <Spacer height={20} />
                  <DetailOrderItem {...data} />
                </View>
              </View>
            )
          })}
    </View>
  )
}

const DetailOrderItem = props => {
  return (
    <>
      <ProductInfo
        img_thumb={props.image}
        name={props.name}
        price={props.price}
        ongkir={props.shipping_cost}
        notes={props.notes.substring(0, 40) + '...'}
      />
      <Spacer height={28} />
      <Ucapan
        text={props.greetings}
        pengirim={props.sender_name.substring(0, 31) + '...'}
        isEdit={false}
      />
      <Spacer height={16} />
      <Divider width={1} color={Colors.neutralGray05} />
      <Spacer height={12} />
      <WaktuPengiriman
        date={moment(props.date_time).format('DD MMMM YYYY')}
        time={moment(props.date_time).format('HH:MM') + ' WIB'}
        isEdit={false}
      />
      <Spacer height={15} />
      <Divider width={1} color={Colors.neutralGray05} />
      <Spacer height={16} />
      <Penerima
        full_name={props.receiver_name}
        address={props.shipping_address}
        phone={props.receiver_phone}
        isEdit={false}
      />
    </>
  )
}

const TextRowBetween = ({
  textLeft,
  textRight,
  containerStyle,
  textLeftStyle,
  textRightStyle,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        containerStyle,
      ]}
    >
      <Text
        style={[
          {
            fontSize: 14,
            fontFamily: Fonts.regular,
            color: Colors.neutralBlack02,
          },
          textLeftStyle,
        ]}
      >
        {textLeft}
      </Text>
      <Text
        style={[
          {
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          },
          textRightStyle,
        ]}
      >
        {textRight}
      </Text>
    </View>
  )
}

const SectionRowPressRight = ({ props, onPress }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text
        style={{
          fontSize: 13,
          fontFamily: Fonts.medium,
          backgroundColor: props.status_text_bg,
          color: props.status_text_color,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 5,
          textTransform: 'capitalize',

          overflow: 'hidden',
        }}
      >
        {props.status}
      </Text>
      <TextTouchable
        onPress={onPress}
        text={props.nav.title}
        textStyles={{
          fontSize: 14,
          paddingHorizontal: 0,
          color: '#0654B9',
        }}
      />
    </View>
  )
}
