import {
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  UIManager,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import NavBarV1 from '@/Components/Base/NavBarV1'
import {
  CommonActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native'
import Spacer from '@/Components/Base/Spacer'
import { Divider } from '@rneui/base'
import ProductListItem3LineText from '@/Components/RingkasanPesanan/ProductListItem3LineText'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import {
  diskon,
  footerPoint,
  informasiProduct,
  kataUcapan,
  loader,
  orderMain,
  pemesan,
  penerima,
  pengiriman,
  productDetail,
  ringkasanPembayaran,
} from '@/Components/RingkasanPesanan/Styles'
import SectionEditRow from '@/Components/RingkasanPesanan/SectionEditRow'
import {
  data_pemesan,
  manipulateDataForAccordion,
  payload_konfirmasi_pesanan,
  reMapDataPayloadBody,
  voucherReMap,
} from '@/Components/RingkasanPesanan/Helper'
import Accordion from '@/Components/RingkasanPesanan/Accrodion'
import { useDispatch, useSelector } from 'react-redux'
import { Assets } from '@/Theme/Assets'
import axios from 'axios'
import { Config } from '@/Config'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import { summaryData } from '@/Components/Voucher/Helper'
import { bussiness, order } from '@/Helper/apiKit'
import _, { isArray } from 'lodash'
import { clearRingkasanPesanan } from '@/Store/ringkasanPesananSlice'

const RingkasanPesananContainer = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const navState = useNavigationState(state => state)
  const state = useSelector(state => state)
  const point = 59000
  const [listOrderDataProduct, setListOrderDataProduct] = useState([])
  const [voucherApplied, setVoucherApplied] = useState([])
  const [orderSummary, setOrderSummary] = useState({
    harga_produk: '',
    ongkir: '',
    diskon_voucher: '',
    diskon_ongkir: '',
    subtotal: '',
    tax: '',
    grand_total: '',
  })
  const [orderRawData, setOrderRawData] = useState([])

  const [isLoadingOrderSummary, setIsLoadingOrderSummary] = useState(false)
  const [isLoadingReqPayment, setIsLoadingReqPayment] = useState(false)

  const updateData = index => {
    const arr = [...listOrderDataProduct]
    arr.map((e, i) =>
      i == index
        ? (arr[i]['isExpanded'] = !arr[i]['isExpanded'])
        : (arr[i]['isExpanded'] = false),
    )
    setListOrderDataProduct(arr)
  }

  const xhrPostReviewOrder = () => {
    setIsLoadingOrderSummary(true)
    // axios
    //   .post(Config.API_URL + '/customer-app/review-order', {
    //     fbasekey: state.tokenList.fcm_token,
    //     voucher_applied: state.cart.voucher.code,
    //     data: reMapDataPayloadBody(state.ringkasanPesanan.data),
    //   })
    order
      .reviewOrder({
        voucher_applied: state.cart.voucher.code,
        data: reMapDataPayloadBody(
          state.ringkasanPesanan.data,
          state.ringkasanPesanan.city_seller.name,
        ),
      })
      .then(res => {
        const { data } = res.data
        setOrderSummary(data.order_summary)
        setOrderRawData(data)
        setListOrderDataProduct(data.products)
        setVoucherApplied(
          voucherReMap(data.voucher_applied, data.order_summary.harga_produk),
        )
        setIsLoadingOrderSummary(false)
      })
      .catch(({ response }) => {
        console.log('ERR_RINGKASAN', response.status, '\nRAW', response)
        setIsLoadingOrderSummary(false)
      })
  }

  const handleRequestPayment = () => {
    setIsLoadingReqPayment(true)
    // axios
    //   .post(Config.API_URL + '/customer-app/request-payment', {
    //     fbasekey: state.tokenList.fcm_token,
    //     voucher_applied: state.cart.voucher.code,
    //     data: reMapDataPayloadBody(state.ringkasanPesanan.data),
    //   })
    bussiness
      .requestPayment({
        voucher_applied: state.cart.voucher.code,
        data: reMapDataPayloadBody(state.ringkasanPesanan.data),
      })
      .then(res => {
        const { data, statusCode } = res.data
        if (statusCode == '200') {
          setIsLoadingReqPayment(false)
          navigation.navigate('XenditWebView', {
            invoice_url: data.payment.invoice_url,
            order_id: data.order_id,
          })
        }
      })
      .catch(err => {
        console.log('ERR_RER_PAYMENT', err)
        console.log('STATUS', err.response.status)
        setIsLoadingReqPayment(false)
        const _n = err.response.status
        if (_n >= 400 && _n < 500) {
          navigation.navigate('ErrorFour')
        } else if (_n >= 500 && _n < 600) {
          navigation.navigate('ErrorFour')
        }
      })
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Ringkasan Pesanan',
    })
  }, [navigation])

  React.useEffect(() => {
    xhrPostReviewOrder()
  }, [
    isEmptyNullOrUndefined(state.cart.voucher.code)
      ? isArray(state.cart.voucher)
      : state.cart.voucher.id,
  ])

  // console.log('DATA', state.ringkasanPesanan.data)

  /**
   *
   *
   * Inside Body Component:
   * -InformasiPemesan,
   * -InformasiPesanan,
   * -Diskon
   * -RingkasanPembayaran
   */
  const InformasiPemesan = props => {
    return (
      <View
        style={{ flexDirection: 'column', marginHorizontal: SIZES.margin_h }}
      >
        <SectionEditRow fontSize={16} title="Info Pemesan" isEdit={false} />
        <Spacer height={10} />
        <View>
          <Text style={[pemesan.textName]}>{props.name}</Text>
          <Spacer height={8} />
          <View>
            <Text style={[pemesan.textPhone]}>{props.phone}</Text>
            <Text style={[pemesan.textEmail]}>{props.email}</Text>
          </View>
        </View>
      </View>
    )
  }

  const InformasiPesanan = ({ data }) => {
    return (
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <Spacer height={20} />
        <Text style={[informasiProduct.textTitle]}>Informasi Pesanan</Text>
        {data.length > 1 && (
          <>
            <Spacer height={4} />
            <Divider width={1} color={Colors.neutralGray05} />
          </>
        )}
        <View style={{ marginBottom: 20, marginTop: 18 }}>
          {data.map((item, index) => (
            <ProductOrderItem
              key={Math.random()}
              index={index}
              item={item}
              onExpand={() => {
                updateData(index)
              }}
              total={data.length}
            />
          ))}
        </View>
      </View>
    )
  }

  const Diskon = ({ onPress, ...props }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Spacer height={10} />
        <View style={[diskon.container]}>
          <MaterialCommunityIcon
            size={24}
            name={`ticket-percent-outline`}
            color={Colors.primary}
          />
          <Spacer width={14} />
          <View style={[diskon.firstCol]}>
            <View style={[diskon.firstCol1]}>
              <Text style={[diskon.title]}>{props.title}</Text>
              <Text style={[diskon.subtitle]}>{props.subtitle}</Text>
            </View>
            <FeatherIcon size={16} name="chevron-right" />
          </View>
        </View>
        <Spacer height={10} />
      </TouchableOpacity>
    )
  }

  const RingkasanPembayaran = ({
    price_product,
    subtotal,
    total_ongkir,
    discount_ammount,
    tax,
    grand_total,
    type_discount,
  }) => {
    return (
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <Text style={[ringkasanPembayaran.grandTotalLabel]}>
          Ringkasan Pembayaran
        </Text>
        <Spacer height={16} />
        <View style={[ringkasanPembayaran.titleRow]}>
          <Text style={[ringkasanPembayaran.rowText]}>Harga Produk</Text>
          <Text style={[ringkasanPembayaran.rowText]}>
            Rp{numberWithCommas(price_product)}
          </Text>
        </View>
        <Spacer height={8} />
        <View style={[ringkasanPembayaran.titleRow]}>
          <Text style={[ringkasanPembayaran.rowText]}>
            Total Biaya Pengiriman
          </Text>
          <Text style={[ringkasanPembayaran.rowText]}>
            Rp{numberWithCommas(total_ongkir)}
          </Text>
        </View>
        <Spacer height={8} />
        <View style={[ringkasanPembayaran.titleRow]}>
          <Text style={[ringkasanPembayaran.rowText]}>
            Diskon {type_discount}
          </Text>
          <Text style={[ringkasanPembayaran.rowText]}>
            - Rp{numberWithCommas(discount_ammount)}
          </Text>
        </View>
        <Spacer height={8} />
        <View style={[ringkasanPembayaran.titleRow]}>
          <Text style={[ringkasanPembayaran.rowText]}>Subtotal</Text>
          <Text style={[ringkasanPembayaran.rowText]}>
            Rp{numberWithCommas(subtotal)}
          </Text>
        </View>
        <Spacer height={8} />
        <View style={[ringkasanPembayaran.titleRow]}>
          <Text style={[ringkasanPembayaran.rowText]}>Pajak</Text>
          <Text style={[ringkasanPembayaran.rowText]}>
            Rp{numberWithCommas(tax)}
          </Text>
        </View>
        <Spacer height={8} />
        <Divider width={1} color={Colors.neutralGray06} />
        <Spacer height={12} />
        <View style={[ringkasanPembayaran.titleRow]}>
          <Text style={[ringkasanPembayaran.grandTotalLabel]}>
            Total Pembayaran
          </Text>
          <Text style={[ringkasanPembayaran.grandTotalData]}>
            Rp{numberWithCommas(grand_total)}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View
      style={[orderMain.container, isLoadingOrderSummary && loader.container]}
    >
      {isLoadingOrderSummary ? (
        <LoadingIndicator />
      ) : (
        <ScrollView>
          <Spacer height={24} />
          <InformasiPemesan {...orderRawData.customer} />
          <Spacer height={14} />
          <Divider width={6} color={Colors.neutralGray06} />
          <InformasiPesanan data={listOrderDataProduct} />
          <Divider width={6} color={Colors.neutralGray06} />
          <Diskon
            {...voucherApplied}
            onPress={() => {
              navigation.navigate('Voucher', {
                total: orderSummary.grand_total,
              })
            }}
          />
          <Divider width={6} color={Colors.neutralGray06} />
          <Spacer height={24} />
          <RingkasanPembayaran
            price_product={orderSummary.harga_produk}
            total_ongkir={orderSummary.ongkir}
            discount_ammount={
              orderSummary.diskon_ongkir == 0
                ? orderSummary.diskon_voucher
                : orderSummary.diskon_ongkir
            }
            type_discount={
              orderSummary.diskon_ongkir == 0 ? 'Voucher' : 'Ongkir'
            }
            subtotal={orderSummary.subtotal}
            tax={orderSummary.tax}
            grand_total={orderSummary.grand_total}
          />
          <Spacer height={24} />
          <Spacer height={122} />
        </ScrollView>
      )}
      <ButtonBottomFloating
        label="Pilih Pembayaran"
        onPress={handleRequestPayment}
        disable={isLoadingOrderSummary}
        height={122}
        loading={isLoadingReqPayment}
        isHeaderMini={!isEmptyNullOrUndefined(orderSummary.cashback_ep)}
        headerMini={() => {
          return (
            <View style={[footerPoint.containerFooter]}>
              <Text style={[footerPoint.textPoint]}>
                Pesanan kamu dapat{' '}
                <Text style={{ fontFamily: Fonts.bold }}>
                  {orderSummary.cashback_ep} Points!
                </Text>
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default RingkasanPesananContainer

/**
 *
 *
 * Small Component:
 * -ProductOrderItem,
 * -ProductInfo,
 * -Ucapan,
 * -WaktuPengiriman,
 * -Penerima,
 */
const ProductOrderItem = ({ item, onExpand, index, total }) => {
  const navigation = useNavigation()
  const { isExpanded, id_page, name } = item
  const { penerima, ucapan, pengiriman, product_info, ongkir } = item.data

  const handleUbahWaktuPengiriman = () => {
    navigation.navigate('EditPengiriman', {
      id_page: id_page,
    })
  }

  const handleUbahPenerima = () => {
    navigation.navigate('EditPenerima', {
      id_page: id_page,
    })
  }

  const handleUbahUcapan = () => {
    navigation.navigate('EditUcapan', {
      id_page: id_page,
    })
  }

  /**
   *
   *
   * Inside Body Component: DetailOrderItem
   */
  const DetailOrderItem = () => {
    const img = product_info.image

    return (
      <>
        <ProductInfo
          img_thumb={
            isEmptyNullOrUndefined(img.path) ? Assets.noImageUrl : img.path
          }
          name={item.name}
          price={product_info.price}
          ongkir={ongkir.base}
          notes={product_info.notes}
        />
        <Spacer height={28} />
        <Ucapan
          text={ucapan.text}
          pengirim={ucapan.pengirim}
          onPressUbah={handleUbahUcapan}
        />
        <Spacer height={16} />
        <Divider width={1} color={Colors.neutralGray05} />
        <Spacer height={12} />
        <WaktuPengiriman
          date={pengiriman.date}
          time={pengiriman.time}
          onPressUbah={handleUbahWaktuPengiriman}
        />
        <Spacer height={15} />
        <Divider width={1} color={Colors.neutralGray05} />
        <Spacer height={16} />
        {penerima != undefined ? (
          <Penerima
            full_name={penerima.name}
            address={penerima.address}
            phone={penerima.phone}
            onPressUbah={handleUbahPenerima}
          />
        ) : (
          <Text>Not Found</Text>
        )}
      </>
    )
  }

  return (
    <>
      {total == 1 ? (
        <View style={{ paddingVertical: 0 }}>
          <DetailOrderItem />
        </View>
      ) : (
        <View
          style={[
            { marginBottom: index == total - 1 ? 0 : 16 },
            isExpanded && index == total - 1 && { marginBottom: 0 },
          ]}
        >
          <Accordion
            onPress={onExpand}
            name={name}
            index={id_page}
            rotateX={isExpanded ? '180deg' : '0deg'}
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
                <DetailOrderItem />
              </View>
            </View>
          )}
        </View>
      )}
    </>
  )
}

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

const Ucapan = ({ text = '', pengirim = '', onPressUbah = () => {} }) => {
  return (
    <>
      <SectionEditRow fontSize={16} title="Ucapan" onPressUbah={onPressUbah} />
      <Spacer height={8} />
      <View>
        <Text style={[kataUcapan.textUcapan]}>{text}</Text>
      </View>
      <Spacer height={12} />
      <Text style={[kataUcapan.textPengirim]}>
        Pengirim:{` `}
        <Text style={{ color: Colors.neutralBlack01 }}>{pengirim}</Text>
      </Text>
    </>
  )
}

const WaktuPengiriman = ({ date, time, onPressUbah = () => {} }) => {
  return (
    <>
      <SectionEditRow
        title="Waktu Pengiriman"
        fontSize={16}
        onPressUbah={onPressUbah}
      />
      <Spacer height={9} />
      <View style={[pengiriman.row]}>
        <Text style={[pengiriman.rowLabel]}>Tanggal</Text>
        <Text style={[pengiriman.rowData]}>{date}</Text>
      </View>
      <Spacer height={4} />
      <View style={[pengiriman.row]}>
        <Text style={[pengiriman.rowLabel]}>Jam</Text>
        <Text style={[pengiriman.rowData]}>{time}</Text>
      </View>
    </>
  )
}

const Penerima = ({ full_name, address, phone, onPressUbah = () => {} }) => {
  return (
    <>
      <SectionEditRow
        title="Penerima"
        fontSize={16}
        onPressUbah={onPressUbah}
      />
      <Spacer height={6} />
      <Text style={[penerima.textDataName]}>{full_name}</Text>
      <Spacer height={8} />
      <Text style={[[penerima.textDataAddress]]}>{address}</Text>
      <Spacer height={12} />
      <Text style={[penerima.textDataPhone]}>{phone}</Text>
    </>
  )
}
