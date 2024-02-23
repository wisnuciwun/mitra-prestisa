import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  StartupContainer,
  IntroductionContainer,
  AuthContainer,
  HomeContainer,
  DaftarHandphone,
  FormDaftar,
  LoginPhoneOrEmail,
  ForgetPassword,
  ResetPassword,
  SyaratKetentuanContainer,
  CategoryContainer,
  SearchLocationContainer,
  PinMyLocationContainer,
  UnderConstructionContainer,
  ProductDetailContainer,
  RatingContainer,
  PhotoReviewContainer,
  PhotoDetailTheater,
  SearchByProductNameContainer,
  SearchPageSubcategory,
  SearchProductFromHomeContainer,
  CartContainer,
  VoucherContainer,
  MakeOrderPengirimanContainer,
  MakeOrderPenerimaContainer,
  MakeOrderUcapanContainer,
  MakeOrderPemesanContainer,
  RingkasanPesananContainer,
  SavedAddressContainer,
  EditPengiriman,
  EditPenerima,
  EditUcapan,
  PreviewProdukContainer,
  TitikLokasiPenerimaContainer,
  RevisiProdukContainer,
  TulisUlasanContainer,
  CustomerServiceContainer,
  ViewReviewProductContainer,
  TrackingOrderContainer,
  TransactionContainer,
  DetailKomplainOrder,
  ComplainOrderContainer,
  DetailPesananContainer,
  XenditWebViewContainer,
  ErrorPaymentContainer,
  WaitingPaymentContainer,
  SuccessPaymentContainer,
  ComplainOrderStep2Container,
  ComplainOrderStep3Container,
  InvoiceContainer,
  ConfirmNoRevProdContainer,
  ConfirmAddRevProdContainer,
  VoucherDetailContainer,
  MyPointsContainer,
  AccountSavedAddressContainer,
  AccountChangeSavedAddressContainer,
  RewardsStationContainer,
  PrestisaRewardDetailContainer,
  RedeemPrestisaRewardsPhoneInputContainer,
  ConfirmationRedeemRewardContainer,
  PrestisaRewardSubCatDetailContainer,
  MyVouchersContainer,
  MyVoucherItemDetailContainer,
  AccountVoucherPromoContainer,
  NotificationSettingsContainer,
  MemberProfileContainer,
  MemberDataContainer,
  MemberDownlineContainer,
  MemberDownlineDetailContainer,
  MemberRegisterContainer,
  PusatBantuanHome,
  PusatBantuanQuestionContainer,
  AboutPrestisaContainer,
  SuccessRegisterEPContainer,
  ProfileContainer,
  ProfileNameContainer,
  ProfilePhoneContainer,
  ProfilePasswordContainer,
  ProfileEmailContainer,
  ProfileFakturContainer,
  ProfileFakturEditContainer,
  PusatBantuanSearch,
  PusatBantuanSearchContentContainer,
  ErrorFourContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { linking, navigationRef } from './utils'
import { useDispatch, useSelector } from 'react-redux'
import { setRatioScreen } from '@/Store/ratioScreenSlice'
import InputSearch from '@/Components/Base/InputSearch'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from '@/Theme/Variables'
import CartCounterHeader from '@/Components/Base/CartCounterHeader'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { height, width } = Dimensions.get('window')
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const { colors } = NavigationTheme
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  React.useEffect(() => {
    const ratio = width / height

    if (ratio >= 0 && ratio < 0.6) {
      dispatch(setRatioScreen({ ratio: { value: ratio, isFit: false } }))
    } else {
      dispatch(setRatioScreen({ ratio: { value: ratio, isFit: true } }))
    }
  }, [])

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer
        linking={linking}
        theme={NavigationTheme}
        ref={navigationRef}
      >
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator
          screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}
        >
          <Stack.Screen
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
            name="Startup"
            component={StartupContainer}
          />

          <Stack.Screen
            name="Introduction"
            component={IntroductionContainer}
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthContainer}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="DaftarHandphone"
            component={DaftarHandphone}
            options={{
              title: 'Buat Akun Baru',
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="SyaratKetentuanContainer"
            component={SyaratKetentuanContainer}
            options={{
              title: '',
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="FormDaftar"
            component={FormDaftar}
            options={{
              title: 'Buat Akun Baru',
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="LoginPhoneOrEmail"
            component={LoginPhoneOrEmail}
            options={{ title: 'Masuk', animationEnabled: true }}
          />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <Stack.Screen name="Category" component={CategoryContainer} />

          <Stack.Screen
            name="SearchLocation"
            component={SearchLocationContainer}
          />
          <Stack.Screen
            name="PinMyLocation"
            component={PinMyLocationContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UnderConstruction"
            component={UnderConstructionContainer}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailContainer}
            options={{
              title: '',
              headerTitleAlign: 'left',
              headerTitleContainerStyle: {
                borderWidth: 0,
              },

              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="RatingContainer"
            component={RatingContainer}
            options={{
              title: 'Rating dan Ulasan',
              headerTitleAlign: 'left',
              headerTitleContainerStyle: {
                borderWidth: 0,
              },

              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="PhotoReview"
            component={PhotoReviewContainer}
            options={{
              headerTitleAlign: 'left',
              title: 'Foto Pembeli',
              headerShown: true,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="PhotoDetailTheater"
            component={PhotoDetailTheater}
            options={{
              // headerTitleAlign: 'left',
              title: 'Foto Pembeli',
              headerShown: false,
              animationEnabled: true,
            }}
          />
          <Stack.Screen
            name="SearchProductByName"
            component={SearchByProductNameContainer}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="SearchPageSubcategory"
            component={SearchPageSubcategory}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="SearchProductFromHome"
            component={SearchProductFromHomeContainer}
          />
          <Stack.Screen
            name="Cart"
            component={CartContainer}
            options={{
              title: 'Keranjang',
              headerShown: true,
              animationEnabled: false,
              headerRight: () => {
                return <CartCounterHeader size={20} />
              },
            }}
          />
          <Stack.Screen name="Voucher" component={VoucherContainer} />
          <Stack.Screen
            name="MakeOrderPengiriman"
            component={MakeOrderPengirimanContainer}
          />
          <Stack.Screen
            name="MakeOrderPenerima"
            component={MakeOrderPenerimaContainer}
          />
          <Stack.Screen
            name="MakeOrderPemesan"
            component={MakeOrderPemesanContainer}
          />
          <Stack.Screen
            name="MakeOrderUcapan"
            component={MakeOrderUcapanContainer}
          />
          <Stack.Screen
            name="RingkasanPesanan"
            component={RingkasanPesananContainer}
          />
          <Stack.Screen name="SavedAddress" component={SavedAddressContainer} />
          <Stack.Screen name="EditPengiriman" component={EditPengiriman} />
          <Stack.Screen name="EditPenerima" component={EditPenerima} />
          <Stack.Screen name="EditUcapan" component={EditUcapan} />
          <Stack.Screen
            name="PreviewProduk"
            component={PreviewProdukContainer}
          />
          <Stack.Screen
            name="TitikLokasiPenerima"
            component={TitikLokasiPenerimaContainer}
          />
          <Stack.Screen name="RevisiProduk" component={RevisiProdukContainer} />
          <Stack.Screen name="TulisUlasan" component={TulisUlasanContainer} />
          <Stack.Screen
            name="CustomerService"
            component={CustomerServiceContainer}
          />
          <Stack.Screen
            name="ViewReviewProduct"
            component={ViewReviewProductContainer}
          />
          <Stack.Screen name="DetailKomplain" component={DetailKomplainOrder} />
          <Stack.Screen
            name="Komplain"
            component={ComplainOrderContainer}
            options={{
              title: 'Komplain Pesanan',
            }}
          />
          <Stack.Screen
            name="DetailPesanan"
            component={DetailPesananContainer}
          />
          <Stack.Screen
            name="XenditWebView"
            component={XenditWebViewContainer}
          />
          <Stack.Screen
            name="SuccessPayment"
            component={SuccessPaymentContainer}
          />
          <Stack.Screen name="ErrorPayment" component={ErrorPaymentContainer} />
          <Stack.Screen
            name="WaitingPayment"
            component={WaitingPaymentContainer}
          />
          <Stack.Screen
            name="Komplain2"
            component={ComplainOrderStep2Container}
            options={{
              title: 'Komplain Pesanan',
            }}
          />
          <Stack.Screen
            name="Komplain3"
            component={ComplainOrderStep3Container}
            options={{
              title: 'Komplain Pesanan',
            }}
          />
          <Stack.Screen
            name="Invoice"
            component={InvoiceContainer}
            options={{
              animationEnabled: false,

              // headerShown: false,
            }}
          />
          <Stack.Screen
            name="Tracking"
            component={TrackingOrderContainer}
            options={{
              title: 'Tracking Pesanan',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileContainer}
            options={{
              title: 'Profil',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfileName"
            component={ProfileNameContainer}
            options={{
              title: 'Nama',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfilePhone"
            component={ProfilePhoneContainer}
            options={{
              title: 'No. Handphone',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfilePassword"
            component={ProfilePasswordContainer}
            options={{
              title: 'Password',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfileEmail"
            component={ProfileEmailContainer}
            options={{
              title: 'Email',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfileFaktur"
            component={ProfileFakturContainer}
            options={{
              title: 'Faktur Pajak',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfileFakturEdit"
            component={ProfileFakturEditContainer}
            options={{
              title: 'Faktur Pajak',
              headerShown: true,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="ConfirmAddRevProd"
            component={ConfirmAddRevProdContainer}
          />
          <Stack.Screen
            name="ConfirmNoRevProd"
            component={ConfirmNoRevProdContainer}
          />
          <Stack.Screen
            name="VoucherDetail"
            component={VoucherDetailContainer}
          />
          <Stack.Screen name="MyPoints" component={MyPointsContainer} />
          <Stack.Screen
            name="AccountSavedAddress"
            component={AccountSavedAddressContainer}
          />
          <Stack.Screen
            name="AccountChangeSavedAddress"
            component={AccountChangeSavedAddressContainer}
          />
          <Stack.Screen
            name="RewardsStation"
            component={RewardsStationContainer}
          />
          <Stack.Screen
            name="PrestisaRewardDetail"
            component={PrestisaRewardDetailContainer}
          />
          <Stack.Screen
            name="RedeemPrestisaRewardsPhoneInput"
            component={RedeemPrestisaRewardsPhoneInputContainer}
          />
          <Stack.Screen
            name="ConfirmationRedeemReward"
            component={ConfirmationRedeemRewardContainer}
          />
          <Stack.Screen
            name="PrestisaRewardSubCatDetail"
            component={PrestisaRewardSubCatDetailContainer}
          />
          <Stack.Screen name="MyVouchers" component={MyVouchersContainer} />
          <Stack.Screen
            name="MyVoucherItemDetail"
            component={MyVoucherItemDetailContainer}
          />
          <Stack.Screen
            name="AccountVoucherPromo"
            component={AccountVoucherPromoContainer}
          />
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettingsContainer}
          />

          <Stack.Screen
            name="MemberProfile"
            component={MemberProfileContainer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MemberData"
            component={MemberDataContainer}
            options={{
              title: 'Data Pribadi',
            }}
          />
          <Stack.Screen
            name="MemberDownline"
            component={MemberDownlineContainer}
            options={{
              title: 'Member',
            }}
          />
          <Stack.Screen
            name="MemberDownlineDetail"
            component={MemberDownlineDetailContainer}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="PartnerRegister"
            component={MemberRegisterContainer}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="PusatBantuanHome"
            component={PusatBantuanHome}
            options={{
              title: 'Pusat Bantuan',
            }}
          />
          <Stack.Screen
            name="PusatBantuanQuestion"
            component={PusatBantuanQuestionContainer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AboutPrestisa"
            component={AboutPrestisaContainer}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="SuccessRegisterEP"
            component={SuccessRegisterEPContainer}
            options={{
              title: '',
              headerLeft: () => {
                return
              },
            }}
          />
          <Stack.Screen
            name="PusatBantuanSearch"
            component={PusatBantuanSearch}
          />
          <Stack.Screen
            name="PusatBantuanSearchContent"
            component={PusatBantuanSearchContentContainer}
            options={{
              title: 'Pencarian',
            }}
          />
          <Stack.Screen name="ErrorFour" component={ErrorFourContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const { height, width } = Dimensions.get('window')

export default ApplicationNavigator
