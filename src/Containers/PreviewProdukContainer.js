import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { Fonts, Colors, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import { Divider } from '@rneui/base'
import ProductListItem from '@/Components/MakeOrder/ProductListItem'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import {
  data_preview_produk_3_left_revisi_dummy as preview_3_left_rev,
  data_preview_produk_0_left_revisi_dummy as preview_0_left_rev,
  data_revisi_title,
} from '@/Components/PreviewProduk/DummyData'
import { TouchableOpacity } from 'react-native'
import ButtonTextIcon from '@/Components/Base/ButtonTextIcon'
import ModalBottomRevisi from '@/Components/PreviewProduk/ModalBottomRevisi'
import InputTextWithCounter from '@/Components/MakeOrder/InputTextWithCounter'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import ModalCenterUploadLampiran from '@/Components/PreviewProduk/ModalCenterUploadLampiran'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import {
  addObjKeySelected,
  subStringDot,
} from '@/Components/PreviewProduk/Helper'
import FeatherIcon from 'react-native-vector-icons/Feather'
import ModalCenterViewSinglePhoto from '@/Components/ModalCenterViewSinglePhoto'
import ButtonFullScreen from '@/Components/Base/ButtonFullScreen'
import Carrousel from 'react-native-snap-carousel'
import { isEmptyNullOrUndefined } from '@/Helper'
import ButtonBase from '@/Components/Base/ButtonBase'
import ModalCenterConfirmNoRevisi from '@/Components/PreviewProduk/ModalConfirmNoRevisi'
import CountDown from '@/Helper/rnCountDownTimer'
import axios from 'axios'
import { Config } from '@/Config'
import moment from 'moment'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import { product } from '@/Helper/apiKit'

const PreviewProdukContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route || {}
  const [dataPreviewProduk, setDataPreviewProduk] = useState(
    // preview_3_left_rev
    [],
  )
  const [dataRevisiTitle, setDataRevisiTitle] = useState(
    // addObjKeySelected(data_revisi_title),
    [],
  )

  const [dataRevisiList, setDataRevisiList] = useState([])

  /**
   * Boolean
   */
  const [showModalRevisi, setShowModalRevisi] = useState(false)
  const [showModalUploadLampiran, setShowModalUploadLampiran] = useState(false)
  const [isSuccessUpload, setIsSuccessUpload] = useState(false)
  const [descError, setDescError] = useState(false)
  const [onFocusDesc, setOnFocusDesc] = useState(false)
  const [showModalViewAttachImg, setShowModalViewAttachImg] = useState(false)
  const [loadingAttachImg, setLoadingAttachImg] = useState(false)
  const [isCompulsoryRevisiDesc, setIsCompulsoryRevisiDesc] = useState(false)
  const [validateFormRevisiDesc, setValidateFormRevisiDesc] = useState(false)
  const [showModalConfirmNoRevisi, setShowModalConfirmNoRevisi] =
    useState(false)
  const [timeLeftRun, setTimeLeftRun] = useState(false)
  const [loadingXhrPrevProd, setLoadingXhrPrevProd] = useState(false)
  const [showModalViewPrevImg, setShowModalViewPrevImg] = useState(false)
  const [readyToSubmitAddRev, setReadyToSubmitAddRev] = useState(false)

  const [attachmentImg, setAttachmentImg] = useState(null)
  const [attachFileName, setAttachFileName] = useState('')
  const [placeholderDesc, setPlaceholderDesc] = useState(
    `Tuliskan detail perubahan (catatan tidak boleh kosong)`,
  )
  const [placeholderRevisiTitleForm, setPlaceholderRevisiTitleForm] = useState(
    'Apa yang ingin diubah',
  )
  const [desc, setDesc] = useState('')
  const [descCharCount, setDescCharCount] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [carousel, setCarousel] = useState(null)
  const [revisiTitle, setRevisiTitle] = useState('')
  const [timeLeftUnix, setTimeLeftUnix] = useState('')
  const [dataViewPrevImg, setDataViewPrevImg] = useState(null)

  const [loadingXhrNoRev, setLoadingXhrNoRev] = useState(false)
  const [loadingXhrAddRev, setLoadingXhrAddRev] = useState(false)
  const [errorXhrGetPreview, setErrorXhrGetPreview] = useState(false)

  const handleShowModalRevisi = () => {
    setShowModalRevisi(!showModalRevisi)
  }

  const handleShowModalUploadLampiran = () => {
    setShowModalUploadLampiran(!showModalUploadLampiran)
  }

  const handleShowModalConfirmNoRevisi = () => {
    setShowModalConfirmNoRevisi(!showModalConfirmNoRevisi)
  }

  const handleShowModalViewPrevImg = () => {
    setShowModalViewPrevImg(!showModalViewPrevImg)
  }

  const handleOnAcceptContinueNoRevisi = () => {
    setLoadingXhrNoRev(true)
    // axios
    //   .post(Config.CUSTOMER_APP + '/no-revision', {
    //     fbasekey: state.tokenList.fcm_token,
    //     po_id: params.po_id,
    //   })
    product
      .noRevision({
        po_id: params.po_id,
      })
      .then(({ data }) => {
        console.log('DATA_NO_REV', data)
        if (data.statusCode === '200') {
          setShowModalConfirmNoRevisi(false)
          setLoadingXhrNoRev(false)
          navigation.navigate('ConfirmNoRevProd', data.data)
        }
      })
      .catch(err => {
        setLoadingXhrNoRev(false)
        console.log('ERR_NO_REV', err)
      })
  }

  const handleUseCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLoadingAttachImg(true)
        launchCamera({ includeBase64: true, quality: 0.3 }, result => {
          handleShowModalUploadLampiran()
          if (!result.didCancel) {
            setIsSuccessUpload(true)
            setLoadingAttachImg(false)
            result.assets[0].fileName.length > 15
              ? setAttachFileName(subStringDot(result.assets[0].fileName, 5))
              : setAttachFileName(result.assets[0].fileName)
            return setAttachmentImg(result.assets[0].base64)
          } else {
            setLoadingAttachImg(false)
          }
        }).catch(err => {
          console.log('ERR_RN_PICK', err)
          setLoadingAttachImg(false)
        })
      } else {
        console.log('NOT_PERSMISSION_USE_CAME')
      }
    } catch (err) {
      console.log('ERR_CAM_PREV_PROD', err)
    }
  }
  const handleUseGallery = () => {
    setLoadingAttachImg(true)
    launchImageLibrary({ includeBase64: true, quality: 0.3 }, result => {
      handleShowModalUploadLampiran()
      if (!result.didCancel) {
        setIsSuccessUpload(true)
        setLoadingAttachImg(false)
        result.assets[0].fileName.length > 15
          ? setAttachFileName(subStringDot(result.assets[0].fileName, 5))
          : setAttachFileName(result.assets[0].fileName)

        return setAttachmentImg(result.assets[0].base64)
      } else {
        setLoadingAttachImg(false)
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
      setLoadingAttachImg(false)
    })
  }

  const handleRemoveAttachImg = () => {
    setIsSuccessUpload(false)
    setAttachFileName('')
    setAttachmentImg(null)
  }

  const handleOnChangeTextDesc = text => {
    if (text.length > 0 && text.length <= 150) {
      setDescCharCount(text.length)
      setDesc(text)
      setDescError(false)
      setValidateFormRevisiDesc(true)
    } else if (text.length > 150) {
      setDescError(true)
      setDesc(desc)
      setValidateFormRevisiDesc(false)
    } else if (text.length == 0) {
      setDesc('')
      setValidateFormRevisiDesc(false)
      setDescError(false)
    }
  }

  const handleOnFocusDesc = () => {
    setPlaceholderDesc('')
    setOnFocusDesc(true)
  }

  const handleOnEndEditing = () => {
    setOnFocusDesc(false)
  }

  const handleShowModalViewAttactImg = () => {
    setShowModalViewAttachImg(!showModalViewAttachImg)
  }

  const handleNavBack = () => {
    setTimeLeftRun(false)
    navigation.goBack()
  }

  const handleOnSelectRevisiItem = (item, index) => {
    const _dataRevisiTitle = [...dataRevisiTitle]
    _dataRevisiTitle.map((e, i) => {
      i === index
        ? (_dataRevisiTitle[i]['selected'] = !_dataRevisiTitle[i]['selected'])
        : (_dataRevisiTitle[i]['selected'] = false)
    })
    setDataRevisiTitle(_dataRevisiTitle)

    if (dataRevisiTitle[index]['selected']) {
      setRevisiTitle(_dataRevisiTitle[index].title)
      setIsCompulsoryRevisiDesc(true)
    } else {
      setRevisiTitle('')
      setIsCompulsoryRevisiDesc(false)
      setPlaceholderRevisiTitleForm('Apa yang ingin diubah')
    }
  }

  const handleOnAppliedRivisiTitle = () => {
    setPlaceholderRevisiTitleForm(revisiTitle)
    handleShowModalRevisi()
  }

  const handleSumbitFormRevisi = () => {
    const payload = {
      rivisi_title: revisiTitle,
      revisi_desc: desc,
      attachment: attachmentImg,
    }
    setLoadingXhrAddRev(true)
    // axios
    //   .post(Config.CUSTOMER_APP + '/product-revision', {
    //     fbasekey: state.tokenList.fcm_token,
    //     po_id: params.po_id,
    //     revisi: revisiTitle,
    //     catatan: desc,
    //     lampiran: attachmentImg.base64,
    //   })
    product
      .addRevision({
        po_id: params.po_id,
        revisi: revisiTitle,
        catatan: desc,
        lampiran: isEmptyNullOrUndefined(attachmentImg) ? '' : attachmentImg,
      })
      .then(({ data }) => {
        if (data.statusCode === '200') {
          setLoadingXhrAddRev(false)
          navigation.navigate('ConfirmAddRevProd', data.data)
        }
      })
      .catch(({ response }) => {
        setLoadingXhrAddRev(false)
        console.log('ERR_ADD_REV', response.data)
      })
  }

  const handleFullScreenPrevImage = () => {
    handleShowModalViewPrevImg()
    setDataViewPrevImg({
      uri: dataPreviewProduk.preview_product_img,
      fileName: dataPreviewProduk.product_name,
    })
  }

  const xhrGetPreviewProduk = () => {
    setLoadingXhrPrevProd(true)
    // axios
    //   .post(Config.CUSTOMER_APP + '/preview-product', {
    //     fbasekey: state.tokenList.fcm_token,
    //     po_id: params.po_id,
    //   })
    product
      .previewProduct({
        po_id: params.po_id,
      })
      .then(({ data, status }) => {
        setLoadingXhrPrevProd(false)
        if (status == 200) {
          const { titles, preview_product } = data.data
          const nowTimeUnix = moment(Date('now')).unix()
          setErrorXhrGetPreview(false)
          setDataRevisiTitle(addObjKeySelected(titles))
          setDataPreviewProduk(preview_product)
          setTimeLeftUnix(preview_product.expired_date - nowTimeUnix)
          setDataRevisiList(preview_product.revisi_list)
        }
      })
      .catch(({ response }) => {
        console.log('ERR_PREV_PROD', response.data)
        setLoadingXhrPrevProd(false)
        setErrorXhrGetPreview(true)
      })
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      titleName: 'Preview Produk',
      navigation: navigation,
      isNavDefault: false,
      onNav: handleNavBack,
    })
  }, [navigation])

  useEffect(() => {
    if (desc.length > 150) {
      setDesc(desc.slice(0, 150))
      setDescError(true)
      setDescCharCount(desc.slice(0, 150).length)
    } else {
      setDescCharCount(desc.length)
    }
  }, [desc.length])

  useEffect(() => {
    setTimeLeftRun(true)
  }, [])

  useEffect(() => {
    xhrGetPreviewProduk()
  }, [])

  useEffect(() => {
    setReadyToSubmitAddRev(isCompulsoryRevisiDesc && validateFormRevisiDesc)
  }, [isCompulsoryRevisiDesc, validateFormRevisiDesc])

  return (
    <>
      {loadingXhrPrevProd ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
          }}
        >
          <LoadingIndicator />
        </View>
      ) : errorXhrGetPreview ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: SIZES.margin_h,
            backgroundColor: Colors.white,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
              textAlign: 'center',
            }}
          >
            🙏🏾🙏🏾🙏🏾
          </Text>
          <Spacer height={10} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
              textAlign: 'center',
              lineHeight: 24,
            }}
          >
            Maaf, Sedang ada gangguan nih. Biar Prestisa beresin.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
            <Spacer height={25} />
            <View
              style={[
                {
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: '#E1F0F2',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginHorizontal: SIZES.margin_h,
                },
              ]}
            >
              <Text
                style={{
                  color: Colors.neutralBlack01,
                  fontFamily: Fonts.regular,
                  fontSize: 14,
                  lineHeight: 19.6,
                }}
              >
                Kamu masih mempunyai sisa {dataPreviewProduk.revisi_kuota} kali
                revisi
              </Text>
            </View>
            <Spacer height={16} />
            <View
              style={[
                {
                  marginHorizontal: SIZES.margin_h,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  alignItems: 'center',
                },
              ]}
            >
              <Text
                style={[
                  {
                    color: Colors.neutralBlack02,
                    fontSize: 13,
                    fontFamily: Fonts.regular,
                  },
                ]}
              >
                Batas waktu untuk mengajukan revisi
              </Text>
              <CountDown
                until={params.expired_date}
                size={7}
                digitTxtStyle={{
                  fontSize: 14,
                  color: Colors.error,
                  fontFamily: Fonts.medium,
                }}
                digitStyle={{
                  backgroundColor: 'transparent',
                  marginHorizontal: 0,
                }}
                separatorStyle={{
                  fontSize: 14,
                  color: Colors.error,
                  letterSpacing: 0,
                }}
                timeLabels={{ m: null, s: null }}
                timeToShow={['H', 'M', 'S']}
                showSeparator={true}
              />
            </View>
            <Spacer height={25} />
            <Divider width={6} color={Colors.neutralGray06} />
            <Spacer height={24} />
            <View style={[{ marginHorizontal: SIZES.margin_h }]}>
              <Text
                style={[
                  {
                    fontFamily: Fonts.medium,
                    fontSize: 16,
                    color: Colors.neutralBlack01,
                  },
                ]}
              >
                Pesanan
              </Text>
              <Spacer height={18} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={[
                    {
                      flexDirection: 'row',
                    },
                  ]}
                >
                  <FastImage
                    source={{ uri: dataPreviewProduk.product_img }}
                    style={{ height: 60, width: 60, borderRadius: 4 }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Spacer width={18} />
                  <View
                    style={{
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Text style={[{ fontSize: 14 }]}>
                      {dataPreviewProduk.product_name}
                    </Text>
                    <Spacer height={8} />
                    <TextTouchable
                      text="Detail Pesanan"
                      textStyles={{ fontSize: 12, color: Colors.primary }}
                      onPress={() =>
                        navigation.navigate('DetailPesanan', {
                          order_id: dataPreviewProduk.order_id,
                        })
                      }
                    />
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      {
                        backgroundColor: Colors.neutralGrayBlue,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 4,
                        overflow: 'hidden',
                        fontSize: 12,
                      },
                    ]}
                  >
                    ID Order {dataPreviewProduk.order_id}
                  </Text>
                </View>
              </View>
            </View>
            <Spacer height={24} />
            <Divider width={6} color={Colors.neutralGray06} />
            <Spacer height={24} />
            <View style={[{ marginHorizontal: SIZES.margin_h }]}>
              <Text
                style={[
                  {
                    fontFamily: Fonts.medium,
                    color: Colors.neutralBlack01,
                    fontSize: 18,
                  },
                ]}
              >
                Preview Produk
              </Text>
              <Spacer height={14} />
              {/* {dataRevisiList.length != 0 ? (
                <ContainerCarrouselRevisiImg
                  data={dataRevisiList}
                  onNext={() => carousel.snapToNext()}
                  onPrev={() => carousel.snapToPrev()}
                  activeSlide={activeSlide}
                  onPress={() => navigation.navigate('UnderConstruction')}
                >
                  <Carrousel
                    renderItem={RevisiImgItem}
                    data={dataRevisiList}
                    itemHeight={180}
                    activeAnimationType="timing"
                    layout={'default'}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    itemWidth={SIZES.width_window - SIZES.margin_h * 2}
                    sliderWidth={SIZES.width_window - SIZES.margin_h * 2}
                    ref={ref => setCarousel(ref)}
                    activeSlide={activeSlide}
                    onSnapToItem={index => setActiveSlide(index)}
                  />
                </ContainerCarrouselRevisiImg>
              ) : ( */}
              <View style={{ position: 'relative' }}>
                <FastImage
                  source={{ uri: dataPreviewProduk.preview_product_img }}
                  style={{ height: 180, width: '100%', borderRadius: 6 }}
                  resizeMode={'cover'}
                />
                <View style={{ position: 'absolute', bottom: 8, right: 8 }}>
                  <TouchableOpacity onPress={handleFullScreenPrevImage}>
                    <ButtonFullScreen />
                  </TouchableOpacity>
                </View>
              </View>

              {/* )} */}
              <Spacer height={24} />
              {dataRevisiList.length != 0 && (
                <RevisiListGroup data={dataRevisiList} />
              )}
              <View>
                <Text
                  style={[
                    {
                      color: Colors.neutralBlack01,
                      fontFamily: Fonts.medium,
                      fontSize: 16,
                    },
                  ]}
                >
                  Revisi
                </Text>
                <Spacer height={12} />
                <ButtonTextIcon
                  iconName="chevron-down"
                  borderColor={Colors.neutralBlack02}
                  height={42}
                  label={placeholderRevisiTitleForm}
                  onPress={handleShowModalRevisi}
                />
              </View>
              <Spacer height={20} />
              <InputTextWithCounter
                label="Catatan"
                labelStyle={[
                  {
                    color: Colors.neutralBlack01,
                    fontFamily: Fonts.medium,
                    fontSize: 16,
                  },
                ]}
                isRequired={isCompulsoryRevisiDesc}
                heightInputContainer={110}
                multiline={true}
                defaultValue={placeholderDesc}
                errorMessage={`${descCharCount}/150`}
                value={desc}
                onFocus={handleOnFocusDesc}
                onEndEditing={handleOnEndEditing}
                onChangeText={text => handleOnChangeTextDesc(text)}
                inputStyle={{ color: Colors.neutralGray02 }}
                errorStyle={{
                  color: descError ? Colors.error : Colors.neutralBlack02,
                }}
                inputContainerStyle={[
                  {
                    borderColor: Colors.neutralBlack02,
                    alignItems: 'flex-start',
                    paddingVertical: 10,
                    paddingRight: 0,
                    paddingLeft: 10,
                  },
                  onFocusDesc && { borderColor: '#0654B9' },
                  descError && { borderColor: Colors.error },
                ]}
              />
              <Spacer height={12} />
              <View>
                <Text
                  style={[
                    {
                      color: Colors.neutralBlack01,
                      fontFamily: Fonts.medium,
                      fontSize: 16,
                    },
                  ]}
                >
                  Lampiran
                </Text>
                <Spacer height={12} />
                {isSuccessUpload ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 42,
                      borderWidth: 1,
                      borderColor: Colors.neutralBlack02,
                      alignItems: 'center',
                      paddingLeft: 0,
                      paddingRight: 12,
                      borderRadius: 6,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Spacer width={10} />
                      <TouchableOpacity onPress={handleShowModalViewAttactImg}>
                        <Text
                          style={{
                            fontFamily: Fonts.medium,
                            fontSize: 16,
                            lineHeight: 24,
                            color: '#0B4DBF',
                          }}
                        >
                          {attachFileName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleRemoveAttachImg}>
                      <FeatherIcon
                        name={'x'}
                        size={22}
                        color={Colors.neutralBlack02}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ButtonTextIcon
                    isIconLeft={true}
                    isIconRight={false}
                    isLeftIconFeather={false}
                    height={42}
                    borderColor={Colors.neutralBlack02}
                    onPress={handleShowModalUploadLampiran}
                    iconNameLeft="paper-clip"
                    label={'Lampirkan foto atau referensi'}
                    renderIconLeft={() => (
                      <EvilIcon
                        name="paperclip"
                        size={30}
                        color={Colors.neutralBlack02}
                      />
                    )}
                  />
                )}
                <Spacer height={8} />
                <Text
                  style={[
                    {
                      fontFamily: Fonts.regular,
                      fontSize: 14,
                      color: Colors.neutralGray01,
                    },
                  ]}
                >
                  File JPEG, JPG, atau PNG
                </Text>
              </View>
              <Spacer height={130} />
            </View>
          </ScrollView>
          <ButtonBottomFloating
            isTouchComp={true}
            height={72}
            touchableComp={() => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <ButtonBase
                    title={'Ajukan Revisi'}
                    style={[
                      {
                        height: 40,
                        minWidth: 140,
                        paddingHorizontal: 10,
                        paddingVertical: 0,
                        borderColor: Colors.neutralBlack01,
                      },
                    ]}
                    mode="outline"
                    istextStyle={true}
                    textStyle={{
                      color: readyToSubmitAddRev
                        ? Colors.neutralBlack01
                        : Colors.neutralGray02,
                    }}
                    disable={!readyToSubmitAddRev}
                    stylesDisable={{
                      backgroundColor: 'transparent',
                      borderColor: Colors.neutralGray03,
                    }}
                    onPress={handleSumbitFormRevisi}
                    loading={loadingXhrAddRev}
                    colorLoading={Colors.neutralBlack01}
                    sizeLoading={'small'}
                  />
                  <ButtonBase
                    title={'Tanpa Revisi'}
                    style={{
                      height: 40,
                      minWidth: 140,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderColor: Colors.primary,
                    }}
                    istextStyle={true}
                    textStyle={{
                      fontFamily: Fonts.medium,
                      fontSize: 16,
                      color: Colors.white,
                    }}
                    onPress={handleShowModalConfirmNoRevisi}
                  />
                </View>
              )
            }}
          />
        </>
      )}

      <ModalBottomRevisi
        isVisible={showModalRevisi}
        onHideModal={handleShowModalRevisi}
        isActiveApplied={revisiTitle.length > 0 ? false : true}
        data={dataRevisiTitle}
        onSelectRadioItem={(item, index) =>
          handleOnSelectRevisiItem(item, index)
        }
        onApplied={handleOnAppliedRivisiTitle}
      />
      <ModalCenterUploadLampiran
        isVisible={showModalUploadLampiran}
        onClose={handleShowModalUploadLampiran}
        onUseCam={handleUseCamera}
        onUseGallery={handleUseGallery}
        isLoading={loadingAttachImg}
      />
      <ModalCenterViewSinglePhoto
        modalVisible={showModalViewAttachImg}
        data={attachmentImg}
        onClose={handleShowModalViewAttactImg}
      />
      <ModalCenterViewSinglePhoto
        modalVisible={showModalViewPrevImg}
        data={dataViewPrevImg}
        onClose={handleShowModalViewPrevImg}
      />
      <ModalCenterConfirmNoRevisi
        isVisible={showModalConfirmNoRevisi}
        onPressClose={handleShowModalConfirmNoRevisi}
        onPressAccept={handleOnAcceptContinueNoRevisi}
        loadingOnAccept={loadingXhrNoRev}
        disableOnClose={loadingXhrNoRev}
      />
    </>
  )
}

export default PreviewProdukContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Component: CarrouselRevisiImg, RevisiImgItem, RevisiList
 */

const ContainerCarrouselRevisiImg = ({
  data,
  activeSlide,
  onPrev,
  onNext,
  onPress,
  children,
}) => {
  return (
    <View
      style={{
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <View
        style={[
          {
            paddingHorizontal: 8,
            position: 'absolute',
            zIndex: 10,
            width: SIZES.width_window - SIZES.margin_h * 2,
          },
        ]}
      >
        <View
          style={{
            position: 'relative',
            height: 180,
            justifyContent: 'flex-end',
            paddingBottom: 8,
          }}
        >
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            {data.length > 0 ? (
              <>
                <View>
                  {activeSlide > 0 && (
                    <TouchableOpacity
                      onPress={onPrev}
                      style={{
                        backgroundColor: 'rgba(247, 247, 247, 1)',
                        height: 26,
                        width: 26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1000,
                      }}
                    >
                      <FeatherIcon
                        size={20}
                        name="chevron-left"
                        color={Colors.neutralBlack02}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  {activeSlide < data.length - 1 && (
                    <TouchableOpacity
                      onPress={onNext}
                      style={{
                        backgroundColor: 'rgba(247, 247, 247, 1)',
                        height: 26,
                        width: 26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1000,
                      }}
                    >
                      <FeatherIcon
                        size={20}
                        name="chevron-right"
                        color={Colors.neutralBlack02}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
              <View style={{ height: 26 }}></View>
            )}
          </View>
          <Spacer height={35} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 4,
                overflow: 'hidden',
                paddingHorizontal: 6,
                paddingVertical: 3,
              }}
            >
              Revisi #
              {isEmptyNullOrUndefined(data[activeSlide].revisi_type)
                ? 'null'
                : data[activeSlide].revisi_type}
            </Text>
            <TouchableOpacity onPress={onPress}>
              <ButtonFullScreen />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {children}
    </View>
  )
}

const RevisiImgItem = ({ item, onPress }) => {
  return (
    <View style={{ position: 'relative' }}>
      <FastImage
        source={{ uri: item.img }}
        style={{ height: 180, width: '100%' }}
        resizeMode={'cover'}
      />
    </View>
  )
}

const RevisiListGroup = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <View
            style={{
              marginBottom: index == data.length - 1 ? 0 : 24,
            }}
            key={index}
          >
            <Text
              style={[
                {
                  color: Colors.neutralBlack01,
                  fontFamily: Fonts.medium,
                  fontSize: 16,
                },
              ]}
            >
              Revisi #{item.revisi_type}
            </Text>
            <Spacer height={12} />
            <Text
              style={[
                {
                  color: Colors.neutralBlack01,
                  fontFamily: Fonts.medium,
                  fontSize: 14,
                },
              ]}
            >
              {item.title}
            </Text>
            <Spacer height={8} />
            <Text
              style={[
                {
                  color: Colors.neutralBlack01,
                  fontFamily: Fonts.regular,
                  fontSize: 15,
                  lineHeight: 21,
                },
              ]}
            >
              {item.desc}
            </Text>
          </View>
        )
      })}
      <Spacer height={24} />
    </>
  )
}
