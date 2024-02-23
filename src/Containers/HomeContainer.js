import Spacer from '@/Components/Base/Spacer'
import CardProduct from '@/Components/CardProduct'
import { useTheme } from '@/Hooks'
import { Assets } from '@/Theme/Assets'
import { Colors, Fonts } from '@/Theme/Variables'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import { Avatar } from '@rneui/themed'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { RowTabsWithChildTab } from '@/Components/Home/RowTabsWithChildTab'
import { ImageTextVertical } from '@/Components/Home/ImageTextVertical'
import { ButtonBackToTop } from '@/Components/Home/ButtonBackToTop'
import ModalOptionLocation from '@/Components/Home/ModalOptionLocation'
import { ModalSearch } from '@/Components/Home/ModalSearch'
import { Config } from '@/Config'
import {
  filterRowData,
  filterRowDataId,
  matchRow,
  reMapRow,
  addSpacer,
  shadowBg,
  getFirstWord,
} from '@/Components/Home/Helper'
import axios from 'axios'
import { SkeletonCarrouselCard } from '@/Components/Home/SkeletonCarrouselCard'
import { setShippingAddress } from '@/Store/location'
import { setCategory, setRawCatData } from '@/Store/categorySlice'
import { SkeletonItemV1 } from '@/Components/SkeletonCard'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {
  bannerCarrousel,
  bannerExeProd,
  cardItem,
  flashSaleCarrousel,
  header,
  mostPopular,
  prodCatTabs,
  prodSlidert1,
  tabCatStyles,
  userInfoStyles,
  styles,
} from '@/Components/Home/Styles'
import { TabItem } from '@/Components/Home/TabItem'
import CartCounterHeader from '@/Components/Base/CartCounterHeader'
import { setStatusUser } from '@/Store/statusUserSlice'
import { noAva } from '@/Components/Account/Helper'
import ModalEp from '@/Components/Home/ModalEp'
import { ModalRegisterSuccess } from '@/Components/Home/ModalRegisterSuccess'
import { setShowModalRegisterSuccess } from '@/Store/registerSlice'
import { auth, category, product } from '@/Helper/apiKit'
import { isEmptyNullOrUndefined } from '@/Helper'
import dynamicLinks, { firebase } from '@react-native-firebase/dynamic-links'
import { Linking } from 'react-native'

const dataBanner = [...Array(3)]

const hours = new Date().getHours()
const minute = new Date().getMinutes()
const second = new Date().getSeconds()
const { width, height } = Dimensions.get('window')
const squareSize = 68
const USER_AVATAR_IMG =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4TMi3TelAnO24U64w75_uJyAAMKTDcp3uA&usqp=CAU'

const HomeContainer = props => {
  const { Images } = useTheme()
  const navigation = useNavigation()
  const state = useSelector(state => state)
  const locBool = !state.location.is_location_first
  const cancelTokenSource = useRef()
  const cancelTokenSourceMostProd = useRef()
  const dispatch = useDispatch()
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showColorNav, setShowColorNav] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(locBool)
  const [isLoadingCarrousel, setIsLoadingCarrousel] = useState(locBool)
  const [isLoadingCatTabs, setIsLoadingCatTabs] = useState(locBool)
  const [isLoadingMostProd, setIsLoadingMostProd] = useState(locBool)
  const [dataProductCard, setDataProductCard] = useState({
    products: [],
    title: '',
    product_category: '',
  })
  const [showModalEp, setShowModalEp] = useState(false)

  const scrollRef = useRef(null)

  useScrollToTop(scrollRef)

  const handleOnPressBackToTop = () => {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    })
  }

  const handleUnderConstructionMode = () => {
    navigation.navigate('UnderConstruction')
  }

  const handleShowSearchModal = () => {
    setShowSearchModal(true)
  }

  const handleHideSearchModal = () => {
    setShowSearchModal(false)
  }

  const handleShowLocationModal = () => {
    setShowLocationModal(!showLocationModal)
  }

  const handleShowModalEp = () => {
    setShowModalEp(!showModalEp)
  }

  const handleOnPressJoinEp = () => {
    setShowModalEp(false)
    navigation.navigate('PartnerRegister')
  }

  const handleOnPressOkModal = () => {
    dispatch(setShowModalRegisterSuccess(false))
  }

  const xhrGetCategoryAndMostProd = () => {
    setIsLoadingMostProd(true)
    // cancelTokenSource.current = axios.CancelToken.source()
    cancelTokenSourceMostProd.current = axios.CancelToken.source()
    axios
      .get(
        Config.API_URL +
          '/customer-app/categories?location_id=' +
          state.location.shipping_address.data.id,
      )
      // category
      //   .catByLocId(state.location.shipping_address.data.id)
      .then(res => {
        const { category } = res.data.data
        dispatch(setRawCatData(res.data.data))
        dispatch(
          setShippingAddress({
            data: state.location.shipping_address.data,
            isLoading: false,
          }),
        )
        dispatch(
          setCategory({
            firstRowCollectId: reMapRow(category, 0, 4),
            secondRowCollectId: reMapRow(category, 4, category.length),
          }),
        )
      })
      .catch(({ response }) => {
        console.log('XHR_CAT_ERR', response)
      })

    axios
      .get(
        Config.API_URL +
          '/customer-app/products/recommendation?location_id=' +
          state.location.shipping_address.data.id,
        { cancelToken: cancelTokenSourceMostProd.current.token },
      )
      // product
      //   .recomendByLocId(state.location.shipping_address.data.id, {
      //     cancelToken: cancelTokenSourceMostProd.current.token,
      //   })
      .then(({ data, status }) => {
        status === 200 && setIsLoadingMostProd(false)
        status === 200 && setDataProductCard(data.data.most_sold)
        data.data.most_sold != undefined
          ? setDataProductCard(data.data.most_sold)
          : setDataProductCard(dataProductCard)
      })
      .catch(({ response }) => {
        // console.log('XHR_PROD_ERR', response)
      })

    axios
      .post(Config.CUSTOMER_APP + '/auth/check-status', {
        fbasekey: state.tokenList.fcm_token,
      })
      // auth
      //   .checkStatus()
      .then(({ data }) => {
        // console.log('DATA', data)
        dispatch(setStatusUser(data))
      })
      .catch(({ response }) => {
        console.log('XHR_STATUS_ERR', response)
      })
  }

  React.useLayoutEffect(() => {
    if (showSearchModal) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } })
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } })
    }
  }, [showSearchModal])

  useEffect(() => {
    xhrGetCategoryAndMostProd()
    return () => {
      cancelTokenSourceMostProd.current.cancel()
    }
  }, [state.location.shipping_address.data.id])

  useEffect(() => {
    dynamicLinks().onLink(linkx => {
      const link = {
        minimumAppVersion: null,
        url: 'https://www.prestisa.com/product/product-category-karangan-bunga-karangan-bunga-standing-bunga-standing-flower-karangan-bunga-standing-flower-indonesia-10/?pid=38657',
        utmParameters: { utm_medium: 'dynamic_link', utm_source: 'firebase' },
      }
      // console.log('Dinamik link', url)
      handleDeeplink(linkx)
    })
  }, [])
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(linkx => {
        const link = {
          minimumAppVersion: null,
          url: 'https://www.prestisa.com/product/product-category-karangan-bunga-karangan-bunga-standing-bunga-standing-flower-karangan-bunga-standing-flower-indonesia-10/?pid=38657',
          utmParameters: { utm_medium: 'dynamic_link', utm_source: 'firebase' },
        }
        // console.log('Dinamik link', link)
        handleDeeplink(linkx)
        // handle link in app
      })
  }, [])

  const handleDeeplink = link => {
    // console.log(link)
    const getId = link.url?.split('=')
    // console.log('user id', getId)

    if (getId[1] != '' && getId.length > 1) {
      navigation.navigate('ProductDetail', { product_id: getId })
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor={showSearchModal ? Colors.white : '#641737'}
        barStyle={showSearchModal ? 'dark-content' : 'light-content'}
      />
      {showSearchModal ? (
        <ModalSearch onPressSearch={handleHideSearchModal} isTyping={true} />
      ) : (
        <View style={styles.screen}>
          <View style={styles.headerLayer1st}>
            <LinearGradient
              start={{ x: 0.25, y: 0.5 }}
              end={{ x: 0.75, y: 0.5 }}
              locations={[0.1, 0.87]}
              colors={['#641737', '#B6346A']}
              style={{ height: 100 }}
              useAngle={true}
              angle={110.5}
            >
              <HeaderSection
                onPressSearch={() => {
                  navigation.navigate('SearchProductFromHome')
                }}
                navigation={navigation}
              />
            </LinearGradient>
          </View>
          <ScrollView
            ref={scrollRef}
            onScroll={e => {
              if (e.nativeEvent.contentOffset.y > 0.5) {
                setShowColorNav(true)
              } else {
                setShowColorNav(false)
              }
            }}
          >
            <View style={styles.containerHeader}>
              <UserInfo />
              <LinearGradient
                start={{ x: 0.25, y: 0.5 }}
                end={{ x: 0.75, y: 0.5 }}
                locations={[0.1, 0.87]}
                colors={['#641737', '#B6346A']}
                style={styles.headerLayer2nd}
                useAngle={true}
                angle={110.5}
              ></LinearGradient>
              <Spacer height={40} />
              <ProductCategoryTab data={state.category.rawData.category} />
              {/* <Spacer height={40} /> */}
              {/* <BannerCarrousel /> */}
              {/* <Spacer height={40} /> */}
              {/* <FlashSaleCarrousel
                data={dataProductCard}
                isLoading={state.location.shipping_address.isLoading}
              /> */}
              <Spacer height={0} />
              <MostPopular
                data={dataProductCard}
                // isLoading={state.location.shipping_address.isLoading}
                isLoading={isLoadingMostProd}
              />
              <Spacer height={30} />
              <TouchableOpacity onPress={handleShowModalEp}>
                <BannerExecutivePartner />
              </TouchableOpacity>
              <Spacer height={40} />
              {/* <ProductSliderPart1
                data={dataProductCard}
                isLoading={state.location.shipping_address.isLoading}
              /> */}
              <Spacer height={30} />
              <View style={{ alignItems: 'center' }}>
                <ButtonBackToTop onPress={handleOnPressBackToTop} />
              </View>
              <Spacer height={40} />
            </View>
          </ScrollView>
        </View>
      )}
      <ModalOptionLocation
        isVisible={showLocationModal}
        navigation={navigation}
        toggleModal={handleShowLocationModal}
      />
      <ModalRegisterSuccess
        isVisible={state.register.isShowModal}
        onPressOk={handleOnPressOkModal}
      />
      <ModalEp
        isVisible={showModalEp}
        onPressJoin={handleOnPressJoinEp}
        onPressLater={handleShowModalEp}
      />
    </>
  )
}

export default HomeContainer

const HeaderSection = ({ onPressSearch, navigation }) => {
  const state = useSelector(state => state)
  return (
    <View style={[header.container]}>
      <View style={[header.kirimKeContainer]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchLocation')}
          style={[header.touchKirimeKe]}
        >
          <FeatherIcon size={16} color={Colors.white} name="map-pin" />
          <Spacer width={4} />
          <View>
            <Text style={[header.textKirimKe]}>
              Kirim Ke:{' '}
              {state.location.is_location_first
                ? state.location.shipping_address.data.city
                : 'Pilih Kota atau Kabupaten'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Spacer height={10} />
      <View style={[header.searchIconBellIconBagContainer]}>
        <TouchableOpacity
          onPress={onPressSearch}
          style={[header.onPressSearch]}
        >
          <Text style={[header.searchText]}>Cari karangan bunga...</Text>
          <FeatherIcon size={24} color={`#b3b0b1`} name="search" />
        </TouchableOpacity>
        <Spacer width={24} />
        <View style={[header.containerIcons]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UnderConstruction')}
            style={[header.onPressNotif]}
          >
            <FeatherIcon size={24} color={Colors.white} name="bell" />
          </TouchableOpacity>
          <Spacer width={16} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={[header.onPressBag]}
          >
            <CartCounterHeader iconColor={'white'} mode="dark" size={24} />
            {/* <FeatherIcon size={24} color={Colors.white} name="shopping-bag" /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const UserInfo = () => {
  const navigation = useNavigation()
  const state = useSelector(state => state)
  const _coinOrButtonAuthContainer = {
    backgroundColor: state.guest.data.isGuest ? '#F6DD82' : Colors.otherYellow,
  }

  const statusCode = state.statusUser.data.statusCode

  const status_user = () => {
    switch (statusCode) {
      case '200':
        return 'kita belum kenal nih'
      case '201':
        return 'Terverifikasi'
      case '202':
        return 'Ayo Verifikasi Email'
      default:
        return ''
    }
  }

  return (
    <View style={[userInfoStyles.userInfoContainer, shadowBg.v1]}>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <View style={[userInfoStyles.avatarTextSubTextContainer]}>
          {state.guest.data.isGuest ? (
            <View style={[userInfoStyles.avatarContainer]}>
              <Avatar
                size={30}
                source={Assets.icon_tabler_seeding_white_big_3x}
                rounded
              />
            </View>
          ) : (
            <Avatar
              size={45}
              source={{ uri: noAva(state.login.data.user.avatar_image) }}
              rounded
            />
          )}
          <Spacer width={12} />
          <View style={[userInfoStyles.textSubTextContainer]}>
            <Text style={[userInfoStyles.text]}>
              Hello,{' '}
              {state.guest.data.isGuest
                ? 'Tamu'
                : `${getFirstWord(state.login.data.user.full_name)}`}
            </Text>
            {/* <Spacer height={3} /> */}
            <View style={[userInfoStyles.subTextContainer]}>
              {state.guest.data.isGuest ? (
                <Text style={[userInfoStyles.subText]}>
                  kita belum kenal nih
                </Text>
              ) : (
                <>
                  {statusCode == 201 && (
                    <>
                      <FastImage
                        source={Assets.icon_verified_3x}
                        resizeMode={'contain'}
                        style={[userInfoStyles.iconVerified]}
                      />
                      <Spacer width={5} />
                    </>
                  )}
                  <Text
                    style={[
                      userInfoStyles.subText,
                      statusCode == 202 && {
                        color: Colors.otherBlue,
                        fontFamily: Fonts.bold,
                      },
                    ]}
                  >
                    {status_user()}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {
        <TouchableOpacity
          activeOpacity={state.guest.data.isGuest ? 0.5 : 1}
          disabled={state.guest.data.isGuest ? false : true}
          onPress={() => {
            state.guest.data.isGuest
              ? navigation.navigate('DaftarHandphone')
              : null
          }}
        >
          <View
            style={[
              userInfoStyles.coinOrButtonAuthContainer,
              _coinOrButtonAuthContainer,
            ]}
          >
            {state.guest.data.isGuest ? (
              <Text style={[userInfoStyles.daftarOrMasuk]}>Daftar/Masuk</Text>
            ) : (
              <>
                <FastImage
                  source={Assets.icon_coin_small_3x}
                  style={[userInfoStyles.coinIcon]}
                  resizeMode={'contain'}
                />
                <Spacer width={6} />
                <Text style={[userInfoStyles.coinText]}>
                  {state.login.data.user.ep_status
                    ? isEmptyNullOrUndefined(state.login.data.user.ep_points)
                      ? '0 pts'
                      : state.login.data.user.ep_points + ' pts'
                    : '0 pts'}
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      }
    </View>
  )
}

const ProductCategoryTab = ({ data }) => {
  const state = useSelector(state => state)
  const navigation = useNavigation()
  const _subCatSize = squareSize - 4
  const catDataFull = state.category.rawData.category
  const [catIndex, setCatIndex] = React.useState(0)
  const firstCollectId = filterRowDataId(catDataFull, 0, 4)
  const secondCollectId = filterRowDataId(catDataFull, 4, catDataFull.length)
  const firstRowData = filterRowData(catDataFull, 0, 4)
  const secondRowData = filterRowData(catDataFull, 4, catDataFull.length)
  const [subCategory, setSubCategory] = useState({
    data: {
      id: 0,
      showFirstSubCategory: false,
      showSecondSubCategory: false,
    },
  })

  const handleOnShow = (index, item) => {
    setCatIndex(index)
    setSubCategory({
      data: {
        id: item.id,
        showFirstSubCategory: matchRow(firstCollectId, item),
        showSecondSubCategory: matchRow(secondCollectId, item),
      },
    })
  }

  const handleOnHide = (index, item) => {
    setCatIndex(index)
    setSubCategory({
      data: {
        id: item.id,
        showFirstSubCategory: false,
        showSecondSubCategory: false,
      },
    })
  }

  const MenuRowTabs = ({ showSubTab, subMenu, data }) => {
    return (
      <RowTabsWithChildTab
        spacerIfNotFullRow={squareSize}
        subMenu={subMenu}
        data={data}
        showSubTab={showSubTab}
        tabItem={() =>
          data.map((item, index) => {
            return (
              <TabItem
                item={item}
                key={index}
                subCategory={subCategory}
                onHide={() => handleOnHide(index, item)}
                onShow={() => handleOnShow(index, item)}
              />
            )
          })
        }
      />
    )
  }

  const SubMenu = ({ data }) => {
    return (
      <View style={[tabCatStyles.containerSubCat]}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[tabCatStyles.itemSubCat]}
              onPress={() => {
                navigation.navigate('Category', {
                  id: item.id,
                  name: item.name,
                  icon: item.icon,
                  parent_id: item.parent_id,
                })
              }}
              key={`${index}_${item.id}_${item.name}`}
            >
              <Item
                item={item}
                sizeImage={32}
                sizeImageContainer={_subCatSize}
              />
            </TouchableOpacity>
          )
        })}
        <>
          {addSpacer({
            windowWidth: width,
            boxSize: _subCatSize,
            usedSpace: squareSize,
            dataLength: data.length,
          })}
        </>
      </View>
    )
  }

  return (
    <View style={[prodCatTabs.container]}>
      <Text style={[prodCatTabs.title]}>Kategori Produk</Text>
      <Spacer height={20} />
      {data === undefined ? (
        <Text>pilih kota terlebih dahulu</Text>
      ) : (
        <>
          <MenuRowTabs
            data={filterRowData(catDataFull, 0, 4)}
            showSubTab={subCategory.data.showFirstSubCategory}
            subMenu={() => (
              <SubMenu data={firstRowData[catIndex].subcategory} />
            )}
          />
          <Spacer height={subCategory.data.showFirstSubCategory ? 20 : 2} />
          <MenuRowTabs
            data={filterRowData(catDataFull, 4, catDataFull.length)}
            showSubTab={subCategory.data.showSecondSubCategory}
            subMenu={() => (
              <SubMenu data={secondRowData[catIndex].subcategory} />
            )}
          />
          <Spacer height={subCategory.data.showSecondSubCategory ? 20 : 2} />
        </>
      )}
    </View>
  )
}

const BannerCarrousel = () => {
  return (
    <View style={[bannerCarrousel.container]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dataBanner.map((item, index) => (
          <BannerItem index={index} data={dataBanner} key={index} />
        ))}
      </ScrollView>
    </View>
  )
}

const FlashSaleCarrousel = ({ data, isLoading }) => {
  const navigation = useNavigation()
  return (
    <View style={[flashSaleCarrousel.contianer]}>
      <View style={[flashSaleCarrousel.firstRowContainer]}>
        <View style={[flashSaleCarrousel.flashSaleTextContainer]}>
          <Text style={[flashSaleCarrousel.flashSaleText]}>Flash Sale</Text>
        </View>
        <Spacer height={7.5} />
        <View style={[flashSaleCarrousel._1stRow2ndColoumnContainer]}>
          <View style={[flashSaleCarrousel.countDownContainer]}>
            <Text style={[flashSaleCarrousel.countDownText]}>
              Berakhir Dalam
            </Text>
            <Spacer width={8} />
            <Text style={[flashSaleCarrousel.countDownNumber]}>
              {hours} : {minute} : {second}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Category', {
                id: 7,
                name: 'karangan bunga papan',
                icon: null,
                parent_id: 1,
              })
            }}
          >
            <Text style={[flashSaleCarrousel.seeMoreText]}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spacer height={6} />
      {isLoading ? (
        <SkeletonCarrouselCard />
      ) : (
        <View style={[flashSaleCarrousel.cardsContainer]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => {
              return <CardItem item={item} key={index} index={index} />
            })}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const MostPopular = ({ data, isLoading }) => {
  const navigation = useNavigation()

  return (
    <View style={[mostPopular.container]}>
      <View style={[mostPopular._1stRowContianer]}>
        {isLoading ? (
          <View style={[mostPopular.skeleton1RowContainer]}>
            <View style={[mostPopular.skeleton1RowLeftContainer]}>
              <SkeletonItemV1
                top={0}
                width={width}
                heightBox={20}
                heightItem={20}
              />
            </View>
            <View style={[mostPopular.skeleton1RowRightContainer]}>
              <SkeletonItemV1
                top={0}
                width={width}
                heightBox={20}
                heightItem={20}
              />
            </View>
          </View>
        ) : (
          <View style={[mostPopular.sub1stRowContainer]}>
            <Text style={[mostPopular.sub1stRowLeftText]}>
              {data.product_category}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Category', {
                  id: data.product_category_id,
                  name: data.product_category,
                  icon: null,
                  parent_id: 1,
                })
              }}
            >
              <Text style={[mostPopular.seeMoreText]}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Spacer height={6} />
      {isLoading ? (
        <>
          <Spacer height={10} />
          <SkeletonCarrouselCard />
        </>
      ) : (
        <View style={[mostPopular.cardsContainer]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.products != undefined ? (
              data.products.map((item, index) => {
                return (
                  <CardItem
                    item={item}
                    key={index}
                    index={index}
                    category={data.product_category}
                  />
                )
              })
            ) : (
              <Text>Tidak ada produk</Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const BannerExecutivePartner = () => {
  return (
    <View style={[bannerExeProd.container]}>
      <View style={[bannerExeProd.firstRowContainer]}>
        <Text style={[bannerExeProd.title]}>Partner Corner</Text>
      </View>
      <Spacer height={12} />
      <View style={[bannerExeProd.titleInsideBannerContainer]}>
        <View>
          <Text style={[bannerExeProd.titleInsideBanner1]}>Apa itu</Text>
          <Text style={[bannerExeProd.titleInsideBanner2]}>
            Executive Partner?
          </Text>
        </View>
        <Spacer height={10} />
        <Text style={[bannerExeProd.subTitleInsideBanner]}>
          Cek alasan kenapa kamu akan rugi kalau nggak ikutan
        </Text>
        <View style={[bannerExeProd.containerAttributeBanner]} />
        <View style={[bannerExeProd.containerAttImgBlink]}>
          <FastImage
            source={Assets.icon_blink_3x}
            resizeMode="contain"
            style={[bannerExeProd.iconBlink]}
          />
        </View>
        <View style={[bannerExeProd.containerIconDashRotated]}>
          <FastImage
            source={Assets.icon_rotated_left_arrow_dashed_line_3x}
            resizeMode="contain"
            style={[bannerExeProd.iconDashRotated]}
          />
        </View>
      </View>
    </View>
  )
}

const ProductSliderPart1 = ({ data, isLoading }) => {
  const navigation = useNavigation()
  return (
    <View style={[prodSlidert1.container]}>
      <View style={[prodSlidert1._1stRowContianer]}>
        <View style={[prodSlidert1.sub1stRowContainer]}>
          <Text style={[prodSlidert1.sub1stRowLeftText]}>Bunga Papan</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Category', {
                id: 7,
                name: 'karangan bunga papan',
                icon: null,
                parent_id: 1,
              })
            }}
          >
            <Text style={[prodSlidert1.seeMoreText]}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spacer height={6} />
      {isLoading ? (
        <SkeletonCarrouselCard />
      ) : (
        <View style={[prodSlidert1.cardsContainer]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => {
              return <CardItem item={item} key={index} index={index} />
            })}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

/***
 *
 *
 * Item
 */
const Item = ({ ...props }) => {
  return <ImageTextVertical {...props} />
}

const BannerItem = ({ index, data, marginH = 24 }) => {
  return (
    <FastImage
      style={{
        height: 92,
        width: 280,
        marginLeft: index == 0 ? marginH : 12,
        marginRight: index == data.length - 1 ? 24 : 0,
        borderRadius: 6,
        backgroundColor: '#C4C4C4',
      }}
    />
  )
}

const CardItem = ({ ...props }) => {
  return (
    <View
      style={{
        marginLeft: props.index == 0 ? 24 : 0,
        marginRight: 24,
      }}
    >
      <CardProduct vertical={false} vStyle={cardItem} vHome={true} {...props} />
    </View>
  )
}
