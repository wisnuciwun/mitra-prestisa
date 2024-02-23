import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import { Divider } from '@rneui/base'
import FastImage from 'react-native-fast-image'
import {
  // data,
  data_edit_ulasan,
  template_ulasan_text_123,
  template_ulasan_text_45,
} from '@/Components/TulisUlasan/DummyData'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native'
import InputTextWithCounter from '@/Components/MakeOrder/InputTextWithCounter'
import FeatherIcon from 'react-native-vector-icons/Feather'
import ModalCenterTambahkanFoto from '@/Components/TulisUlasan/ModalCenterTambahkanFoto'
import ModalCenterConfirmation from '@/Components/TulisUlasan/ModalCenterConfirmation'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ImgToBase64 from 'react-native-image-base64'
import { Assets } from '@/Theme/Assets'
import _, { isNull } from 'lodash'
import { sortedByFalse } from '@/Components/TulisUlasan/Helper'
import ModalCenterConfimEdit from '@/Components/TulisUlasan/ModalCenterConfirmEdit'
import { logError, logSuccess, numberWithCommas } from '@/Helper'
import { product } from '@/Helper/apiKit'
import ErrorFourOrFive from '@/Components/Error/ErrorFourOrFive'
import moment from 'moment'

/**
 *
 * message error {400,500}
 */
const TulisUlasanContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const routeParams = props.route.params
  const { data } = routeParams || {}

  const star = () => {
    let _data = []
    for (let i = 0; i < 5; i++) {
      _data.push(false)
    }
    return _data
  }

  const boxAddImages = () => {
    let _data = []
    for (let i = 0; i < 3; i++) {
      _data.push({ id: _.uniqueId(), isAdd: true, data: null })
    }
    return _data
  }

  const [rating, setRating] = useState(star())

  const [placeholderReviewText, setPlaceholderReviewText] = useState(
    'Tuliskan pengalaman pemesananmu disini',
  )
  const [textReview, setTextReview] = useState('')
  const [textReviewCharCount, setTextReviewCharCount] = useState(0)
  const [camData, setCamData] = useState(null)
  const [startRatingCount, setStartRatingCount] = useState(false)

  const [showModalAddImg, setShowModalAddImg] = useState(false)
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [textReviewError, setTextReviewError] = useState(false)
  const [showModalConfirmEdit, setShowModalConfirmEdit] = useState(false)
  const [isCompulsoryTextReview, setIsCompulsoryTextReview] = useState(false)
  const [validateRatingReview, setValidateRatingReview] = useState(false)
  const [validateTextReview, setValidateTextReview] = useState(false)
  const [validatePhotoReview, setValidatePhotoReview] = useState(false)
  const [disableSubmitButton, setDisableSubmitButton] = useState(false)

  const [imagesReview, setImagesReview] = useState(boxAddImages())
  const [boxAddImageIndex, setBoxAddImageIndex] = useState(null)
  const [dataConfirmAdd, setDataConfirmAdd] = useState({
    icon: '',
    title: '',
    message: '',
  })

  const [isRate123, setIsRate123] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [errorAddRating, setErrorAddRating] = useState(false)

  const handleAddImage = i => {
    setShowModalAddImg(!showModalAddImg)
    setBoxAddImageIndex(i)
  }

  const handleRemoveImage = _i => {
    setValidatePhotoReview(false)
    let _images = []

    _images = imagesReview.map((e, i) => {
      return i === _i ? { ...e, isAdd: true, data: null } : e
    })
    return setImagesReview(sortedByFalse(_images))
  }

  const handleShowModalConfirm = () => {
    setShowModalConfirm(!showModalConfirm)
  }

  const handleShowModalConfirmEdit = () => {
    setShowModalConfirmEdit(!showModalConfirmEdit)
  }

  const handleUseCamera = async () => {
    const result = await launchCamera()

    ImgToBase64.getBase64String(result.assets[0].uri)
      .then(_base64 => {
        let _images = []
        handleAddImage()
        _images = imagesReview.map((e, i) => {
          return i === boxAddImageIndex
            ? {
                ...e,
                isAdd: false,
                data: { ...result.assets[0], base64: _base64 },
              }
            : e
        })
        return setImagesReview(sortedByFalse(_images))
      })
      .catch(err => {
        console.log('ERR_BASE64', err)
      })
  }

  const handleUseGallery = async () => {
    const result = await launchImageLibrary()

    ImgToBase64.getBase64String(result.assets[0].uri)
      .then(_base64 => {
        let _images = []
        handleAddImage()
        _images = imagesReview.map((e, i) => {
          return i === boxAddImageIndex
            ? {
                ...e,
                isAdd: false,
                data: { ...result.assets[0], base64: _base64 },
              }
            : e
        })
        return setImagesReview(sortedByFalse(_images))
      })
      .catch(err => {
        console.log('ERR_BASE64', err)
      })
  }

  const _handleUseCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera({ includeBase64: true, quality: 0.3 }, result => {
          handleAddImage()
          if (!result.didCancel) {
            setValidatePhotoReview(true)
            let _images = []
            _images = imagesReview.map((e, i) => {
              return i === boxAddImageIndex
                ? {
                    ...e,
                    isAdd: false,
                    data: result.assets[0],
                  }
                : e
            })
            return setImagesReview(sortedByFalse(_images))
          }
        }).catch(err => {
          console.log('ERR_RN_PICK', err)
        })
      } else {
        console.log('NOT_PERSMISSION_USE_CAME')
      }
    } catch (err) {
      console.log('ERR_CAM_ULASAN', err)
    }
  }

  const _handleUseGallery = () => {
    launchImageLibrary({ includeBase64: true, quality: 0.3 }, result => {
      handleAddImage()

      if (!result.didCancel) {
        setValidatePhotoReview(true)
        let _images = []
        _images = imagesReview.map((e, i) => {
          return i === boxAddImageIndex
            ? {
                ...e,
                isAdd: false,
                data: result.assets[0],
              }
            : e
        })
        return setImagesReview(sortedByFalse(_images))
      }
    }).catch(err => {
      console.log('ERR_RN_PICK', err)
    })
  }

  const handleRating = i => {
    setValidateRatingReview(true)
    switch (i) {
      case 0:
        return setRating([true, false, false, false, false])
      case 1:
        return setRating([true, true, false, false, false])
      case 2:
        return setRating([true, true, true, false, false])
      case 3:
        return setRating([true, true, true, true, false])
      case 4:
        return setRating([true, true, true, true, true])
      default:
        return setRating(star())
    }
  }

  const handleAddTemplateTextReview = i => {
    setValidateTextReview(true)
    if (isRate123) {
      return textReview.length > 0
        ? setTextReview(textReview + ' ' + template_ulasan_text_123[i].text)
        : setTextReview(template_ulasan_text_123[i].text)
    } else {
      return textReview.length > 0
        ? setTextReview(textReview + ' ' + template_ulasan_text_45[i].text)
        : setTextReview(template_ulasan_text_45[i].text)
    }
  }

  const xhrPostRating = payload => {
    setLoadingSubmit(true)
    product
      .productRating(payload)
      .then(res => {
        const { data } = res
        if (data.statusCode === '200') {
          // logSuccess(res)
          const { icon, title, message } = data.data
          handleShowModalConfirm()
          setLoadingSubmit(false)
          setDataConfirmAdd({ icon: icon, title: title, message: message })
        }
      })
      .catch(({ response }) => {
        // logError(response)
        setLoadingSubmit(false)
        setErrorAddRating(true)
      })
  }

  const handleSumbitReview = () => {
    const payload = {
      po_id: data.po_id,
      product_id: data.product_detail.id,
      rating: parseInt(startRatingCount.toFixed(1)),
      review: textReview,
      foto: imagesReview.length > 0 && [
        ...imagesReview.map((e, i) => !isNull(e.data) && e.data.base64),
      ],
    }
    xhrPostRating(payload)
  }

  const handleDefaultValueWhenEditAvailable = () => {
    // const _imagesReview = [...imagesReview]
    // const _remap = _imagesReview.map((e, i) => {
    //   return data_edit_ulasan.images[i] != undefined
    //     ? { ...e, isAdd: false, data: { uri: data_edit_ulasan.images[i].url } }
    //     : e
    // })
    const rating = parseInt(data.rating) - 1
    setTextReview(data.review_message)
    handleRating(parseInt(rating))
    // setImagesReview(_remap)
  }

  // console.log('IMAGE', imagesReview)

  const handleSumbitReviewEdit = () => {
    handleShowModalConfirmEdit()
    const payload = {
      po_id: data.po_id,
      product_id: data.product_detail.id,
      rating: parseInt(startRatingCount.toFixed(1)),
      review: textReview,
      foto: imagesReview.length > 0 && [
        ...imagesReview.map((e, i) => !isNull(e.data) && e.data.base64),
      ],
    }
    xhrPostRating(payload)
  }

  const handleOnChangeText = text => {
    if (text.length > 0 && text.length <= 150) {
      setTextReviewCharCount(text.length)
      setTextReview(text)
      setTextReviewError(false)
      setValidateTextReview(true)
    } else if (text.length > 150) {
      setTextReviewError(true)
      setValidateTextReview(false)
      setTextReview(textReview)
    } else if (text.length == 0) {
      setValidateTextReview(false)
      setTextReview(text)
      setPlaceholderReviewText('Tuliskan pengalaman pemesananmu disini')
    }
  }

  const handleChangeTemplate = num => {
    if (num >= 1 && num <= 3) {
      setIsRate123(true)
    } else if (num > 3 && num <= 5) {
      setIsRate123(false)
    }
  }

  const handleOnEndEditingFromTextReview = () => {
    if (textReview.length == 0) {
      setPlaceholderReviewText('Tuliskan pengalaman pemesananmu disini')
    }
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      titleName: routeParams.isEdit ? 'Rating dan Ulasan' : 'Tulis Ulasan',
      navigation: navigation,
    })
    setErrorAddRating(false)
  }, [navigation])

  useEffect(() => {
    if (textReview.length > 150) {
      setTextReview(textReview.slice(0, 150))
      setTextReviewError(true)
      setTextReviewCharCount(textReview.slice(0, 150).length)
    } else if (textReview.length > 0 && textReview.length <= 150) {
      setTextReviewCharCount(textReview.length)
    }
  }, [textReview.length])

  useEffect(() => {
    setStartRatingCount(_.filter(rating, n => n == true).length)
    handleChangeTemplate(_.filter(rating, n => n == true).length)
  }, [_.filter(rating, n => n == true).length])

  useEffect(() => {
    routeParams.isEdit && handleDefaultValueWhenEditAvailable()
  }, [])

  useEffect(() => {
    isRate123
      ? setDisableSubmitButton(
          validateRatingReview && validateTextReview && validatePhotoReview,
        )
      : setDisableSubmitButton(validateRatingReview)
  }, [validateRatingReview, validateTextReview, validatePhotoReview, isRate123])

  /**
   *
   * Inside Body Component: ProdukInfo, EditInfo
   */
  const ProdukInfo = props => (
    <View>
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text
          style={{
            fontSize: 12,
            color: Colors.neutralBlack02,
            fontFamily: Fonts.regular,
          }}
        >
          {props.date}
        </Text>
        <Text
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: '#C6ECC6',
            borderRadius: 6,
            overflow: 'hidden',
            fontSize: 12,
            fontFamily: Fonts.medium,
            color: '#096B08',
          }}
        >
          {props.status}
        </Text>
      </View>
      <Spacer height={16} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={[{ flexDirection: 'row' }]}>
          <FastImage
            source={{ uri: props.image }}
            style={{ height: 60, width: 60, borderRadius: 4 }}
          />
          <Spacer width={12} />
          <View>
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 15,
                color: Colors.neutralBlack02,
              }}
            >
              {props.product_name}
            </Text>
            <Spacer height={8} />
            <Text
              style={{
                fontFamily: Fonts.regular,
                color: Colors.neutralGray01,
                fontSize: 11,
              }}
            >
              Total Harga
            </Text>
            <Spacer height={3} />
            <Text
              style={{
                fontFamily: Fonts.regular,
                color: Colors.neutralBlack01,
                fontSize: 12,
              }}
            >
              Rp{numberWithCommas(props.price)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )

  const EditInfo = ({ editTimes = 1, date }) => (
    <View
      style={[
        {
          paddingHorizontal: SIZES.margin_h,
          paddingVertical: 12,
          backgroundColor: '#F4E9E9',
        },
      ]}
    >
      <Text
        style={{
          lineHeight: 22.4,
          fontFamily: Fonts.medium,
          fontSize: 16,
          color: Colors.neutralGray01,
        }}
      >
        Kamu bisa {editTimes}x ubah Rating dan Ulasan sebelum {date}
      </Text>
    </View>
  )

  return (
    <>
      {errorAddRating ? (
        <ErrorFourOrFive />
      ) : (
        <>
          <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
            {routeParams.isEdit ? (
              <>
                <EditInfo
                  editTimes={1}
                  date={moment
                    .unix(data.rate_time_expired)
                    .format('DD MMMM YYYY')}
                />
                <Spacer height={17} />
              </>
            ) : (
              <>
                <View style={[{ marginHorizontal: SIZES.margin_h }]}>
                  <Spacer height={23} />
                  <Text>Info Pesanan</Text>
                  <Spacer height={9} />
                  <Divider width={1} color={Colors.neutralGray05} />
                  <Spacer height={17} />
                  <ProdukInfo {...data} />
                </View>
                <Spacer height={30} />
                <Divider width={6} color={Colors.neutralGray05} />
              </>
            )}
            <Spacer height={18} />
            <View style={[{ marginHorizontal: SIZES.margin_h }]}>
              <Text
                style={[
                  {
                    fontFamily: Fonts.medium,
                    fontSize: 14,
                    color: Colors.neutralBlack02,
                  },
                ]}
              >
                Rating
              </Text>
              <Spacer height={12} />
              <View style={[{ flexDirection: 'row' }]}>
                {rating.map((e, i) => (
                  <View style={{ marginRight: 18 }} key={i}>
                    <StarTouch
                      isTrue={e}
                      onPress={() => {
                        handleRating(i)
                      }}
                    />
                  </View>
                ))}
              </View>
              <Spacer height={28} />
              <InputTextWithCounter
                label="Berikan Ulasan"
                isRequired={isRate123}
                heightInputContainer={120}
                paddingBottomLabel={14}
                labelStyle={{
                  fontFamily: Fonts.medium,
                  fontSize: 14,
                  color: Colors.neutralBlack02,
                }}
                multiline={true}
                placeHolder={placeholderReviewText}
                defaultValue={placeholderReviewText}
                inputContainerStyle={{
                  backgroundColor: '#F9F9F9',
                  borderColor: textReviewError
                    ? Colors.error
                    : Colors.neutralBlack02,
                  alignItems: 'flex-start',
                  paddingVertical: 10,
                  paddingRight: 0,
                  paddingLeft: 10,
                }}
                inputStyle={{ color: Colors.neutralGray02 }}
                errorMessage={`${textReviewCharCount}/150`}
                errorStyle={{
                  color: textReviewError ? Colors.error : Colors.neutralBlack02,
                }}
                onFocus={() => {
                  setPlaceholderReviewText('')
                }}
                value={textReview}
                onEndEditing={handleOnEndEditingFromTextReview}
                onChangeText={text => handleOnChangeText(text)}
              />
              <Spacer height={12} />
              <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>
                {isRate123
                  ? template_ulasan_text_123.map((e, i) => (
                      <View
                        style={[{ marginRight: 12, marginBottom: 12 }]}
                        key={i}
                      >
                        <TouchTextBorder
                          label={e.text}
                          onPress={() => handleAddTemplateTextReview(i)}
                        />
                      </View>
                    ))
                  : template_ulasan_text_45.map((e, i) => (
                      <View
                        style={[{ marginRight: 12, marginBottom: 12 }]}
                        key={i}
                      >
                        <TouchTextBorder
                          label={e.text}
                          onPress={() => handleAddTemplateTextReview(i)}
                        />
                      </View>
                    ))}
              </View>
              <Spacer height={16} />
              <Text
                style={[
                  {
                    fontFamily: Fonts.regular,
                    fontSize: 13,
                    color: Colors.neutralBlack01,
                  },
                ]}
              >
                Tambahkan Foto
                {isRate123 && <Text style={{ color: Colors.error }}>*</Text>}
              </Text>
              <Spacer height={12} />
              <View style={{ flexDirection: 'row' }}>
                {imagesReview.map((item, index) => {
                  return (
                    <View style={{ marginRight: 16 }} key={Math.random()}>
                      {item.isAdd ? (
                        <AddImage onAdd={() => handleAddImage(index)} />
                      ) : (
                        <RemoveImage
                          key={index}
                          img={item.data.uri}
                          onRemove={() => handleRemoveImage(index)}
                        />
                      )}
                    </View>
                  )
                })}
              </View>
            </View>
            <Spacer height={120} />
          </ScrollView>
          {routeParams.isEdit ? (
            <ButtonBottomFloating
              label="Simpan Perubahan"
              onPress={handleSumbitReviewEdit}
              disable={!disableSubmitButton}
            />
          ) : (
            <ButtonBottomFloating
              label="Simpan"
              onPress={handleSumbitReview}
              disable={!disableSubmitButton}
              loading={loadingSubmit}
            />
          )}
          <ModalCenterTambahkanFoto
            isVisible={showModalAddImg}
            onClose={handleAddImage}
            onUseCam={_handleUseCamera}
            onUseGallery={_handleUseGallery}
          />
          <ModalCenterConfirmation
            isVisible={showModalConfirm}
            onConfirm={() => {
              navigation.goBack()
              handleShowModalConfirm()
            }}
            data={dataConfirmAdd}
          />
          <ModalCenterConfimEdit
            isVisible={showModalConfirmEdit}
            onPressAccept={handleShowModalConfirmEdit}
            onPressClose={handleShowModalConfirmEdit}
          />
        </>
      )}
    </>
  )
}

export default TulisUlasanContainer

const styles = StyleSheet.create({})

/**
 *
 *
 * Small Components: StartTouch,TouchTextBorder, AddImage, RemoveImage
 */

const StarTouch = ({ isTrue, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5
        name={'star'}
        size={31}
        color={isTrue ? '#EACA25' : Colors.neutralGray04}
        solid={true}
      />
    </TouchableOpacity>
  )
}

const TouchTextBorder = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: Colors.neutralGray02,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: 14,
          color: Colors.neutralBlack02,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const AddImage = ({ onAdd }) => {
  return (
    <TouchableOpacity onPress={onAdd}>
      <View
        style={{
          backgroundColor: '#F9F9F9',
          borderWidth: 1,
          borderColor: Colors.neutralBlack02,
          borderStyle: 'dashed',
          borderRadius: 6,
          width: 64,
          height: 64,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <FeatherIcon name={'camera'} size={20} color={Colors.neutralGray02} />
      </View>
    </TouchableOpacity>
  )
}

const RemoveImage = ({ img = Assets.noImageUrl, onRemove }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 64,
        height: 64,
        zIndex: 0,
      }}
    >
      <View
        style={{
          position: 'absolute',
          backgroundColor: Colors.white,
          borderRadius: 1000,
          top: -6,
          right: -6,
          width: 22,
          height: 22,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <TouchableOpacity onPress={onRemove}>
          <View
            style={{
              backgroundColor: Colors.neutralGray02,
              borderRadius: 1000,
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FeatherIcon name={'x'} size={16} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ zIndex: 0 }}>
        <FastImage
          source={{ uri: img }}
          style={{ width: 64, height: 64, borderRadius: 6 }}
        />
      </View>
    </View>
  )
}
