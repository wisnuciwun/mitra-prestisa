import { shadowBg } from './Helper'
import { Colors, Fonts } from '@/Theme/Variables'
import { Dimensions, StyleSheet } from 'react-native'

export const MARGIN_HORIZONTAL = 24
export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('screen').height

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative',
    zIndex: 0,
  },
  containerHeader: {
    position: 'relative',
    zIndex: 0,
  },
  // header: {
  //   // backgroundColor: 'red',
  //   height: 134,
  // },
  headerLayer1st: {
    // backgroundColor: 'red',
    // height: 200,
    position: 'absolute',
    top: 0,
    width: WIDTH,
    zIndex: 9,
  },
  headerLayer2nd: {
    // backgroundColor: 'red',
    height: 134 + HEIGHT / 10,
    transform: [{ translateY: -HEIGHT / 10 }],
    marginBottom: -HEIGHT / 10,
  },
})

export const header = StyleSheet.create({
  container: { top: 20 },
  kirimKeContainer: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  touchKirimeKe: { flexDirection: 'row', alignItems: 'center' },
  textKirimKe: { color: Colors.neutralGray07 },
  searchIconBellIconBagContainer: {
    // backgroundColor: Colors.white,
    marginHorizontal: MARGIN_HORIZONTAL,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // flex: 1,
  },
  onPressSearch: {
    height: 36,
    borderRadius: 4,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  searchText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: 15,
    color: Colors.neutralGray01,
  },
  containerIcons: { flexDirection: 'row' },
  onPressNotif: {
    // backgroundColor: 'red'
  },
  onPressBag: {
    //  backgroundColor: 'red'
  },
})

export const userInfoStyles = StyleSheet.create({
  userInfoContainer: {
    top: 100,
    height: 64,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: MARGIN_HORIZONTAL,
    backgroundColor: 'white',
    padding: 18,
    zIndex: 999,
    position: 'absolute',
    width: WIDTH - 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8, // @platformandroid
  },
  avatarTextSubTextContainer: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: Colors.otherOrange,
    borderRadius: 1000,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSubTextContainer: {
    // backgroundColor: 'green',
  },
  text: {
    fontFamily: Fonts.light,
    fontWeight: '900',
    fontSize: 15,
    textTransform: 'capitalize',
    lineHeight: 20,
  },
  subTextContainer: { flexDirection: 'row', alignItems: 'center' },
  subText: { fontFamily: Fonts.regular, fontSize: 12 },
  iconVerified: { width: 12, height: 12 },
  coinOrButtonAuthContainer: {
    height: 31,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 40,
    overflow: 'hidden',
  },
  daftarOrMasuk: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  coinIcon: { width: 16, height: 16 },
  coinText: {
    color: Colors.neutralBlack02,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
})

export const prodCatTabs = StyleSheet.create({
  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: 16,
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutralBlack01,
  },
})

export const tabCatStyles = StyleSheet.create({
  containerSubCat: {
    backgroundColor: '#F1F2F5',
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemSubCat: {
    marginHorizontal: 0,
    marginBottom: 0,
    paddingBottom: 16,
  },
})

export const bannerCarrousel = StyleSheet.create({
  container: { flexDirection: 'row' },
})

export const flashSaleCarrousel = StyleSheet.create({
  contianer: {
    // marginHorizontal: marginHorizontal
  },
  firstRowContainer: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  flashSaleTextContainer: {
    // marginHorizontal: MARGIN_HORIZONTAL,
  },
  flashSaleText: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  _1stRow2ndColoumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDownText: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.regular,
    fontSize: 14,
    fontWeight: '400',
  },
  countDownNumber: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#B62929',
    borderRadius: 4,
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: 13,
    fontWeight: '600',
  },
  cardsContainer: { flexDirection: 'row' },
  seeMoreText: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 15.5,
  },
})

export const mostPopular = StyleSheet.create({
  container: {
    // marginHorizontal: marginHorizontal
  },
  _1stRowContianer: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  sub1stRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeleton1RowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeleton1RowLeftContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    width: 150,
  },
  skeleton1RowRightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    width: WIDTH / 5,
  },
  sub1stRowLeftText: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  seeMoreText: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 15.5,
  },
  cardsContainer: { flexDirection: 'row' },
})

export const bannerExeProd = StyleSheet.create({
  container: {
    // marginHorizontal: marginHorizontal
  },
  firstRowContainer: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  title: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.bold,
    fontSize: 16,
    fontWeight: '600',
  },
  titleInsideBannerContainer: {
    marginHorizontal: MARGIN_HORIZONTAL,
    borderRadius: 10,
    overflow: 'hidden',
    height: 147,
    flex: 1,
    // backgroundColor: 'red',
    padding: 19,
    position: 'relative',
    backgroundColor: '#9B4F76',
  },
  titleInsideBanner1: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Amaranth-Bold',
  },
  titleInsideBanner2: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Amaranth-Bold',
  },
  subTitleInsideBanner: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: Fonts.regular,
    width: 165,
    lineHeight: 16,
  },
  containerAttributeBanner: {
    bottom: 0,
    height: 23,
    width: WIDTH - MARGIN_HORIZONTAL,
    // flex: 1,
    backgroundColor: '#7D1A4D',
    position: 'absolute',
  },
  containerAttImgBlink: { position: 'absolute', top: 12, left: 87 },
  iconBlink: {
    height: 23,
    width: 23,
  },
  containerIconDashRotated: { position: 'absolute', top: 37, left: 199 },
  iconDashRotated: {
    height: 35,
    width: 35,
  },
})

export const prodSlidert1 = StyleSheet.create({
  container: {
    ...mostPopular.container,
  },
  _1stRowContianer: {
    ...mostPopular._1stRowContianer,
  },
  sub1stRowContainer: {
    ...mostPopular.sub1stRowContainer,
  },
  sub1stRowLeftText: {
    ...mostPopular.sub1stRowLeftText,
  },
  seeMoreText: {
    ...mostPopular.seeMoreText,
  },
  cardsContainer: { ...mostPopular.cardsContainer },
})

export const cardItem = {
  cardOuter: {
    ...shadowBg.v1,
    elevation: 2,
    marginTop: 10,
    marginBottom: 10,
    width: 172,
    borderRadius: 10,
  },
  touchContainer: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardContainer: {
    overflow: 'hidden',
    margin: 0,
  },
}
