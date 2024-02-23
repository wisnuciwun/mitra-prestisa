import { RefreshControl, ScrollView, StatusBar } from 'react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { Avatar } from '@rneui/themed'
import { Assets } from '@/Theme/Assets'
import Spacer from '@/Components/Base/Spacer'
import { useDispatch, useSelector } from 'react-redux'
import { removeLogin } from '@/Store/loginSlice'
import { setGuest } from '@/Store/guestSlice'
import moment from 'moment'
import { format } from 'date-fns'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import { buyer, eP, ePOff, ePOn } from '../Components/Account/Styles'
import { general, guest, header } from '@/Components/Account/Styles'
import { logout, main } from '@/Components/Account/Styles'
import { limitNameWord, noAva } from '@/Components/Account/Helper'
import ListNavItem from '@/Components/Account/ListNavItem'
import { listNavItems1st, listNavItems2nd } from '@/Components/Account/Data'
import axios from 'axios'
import { Config } from '@/Config'

const AccountContainer = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const login = state.login.data
  const [refreshing, setRefreshing] = React.useState(false)

  const xhrLogout = () => {
    axios
      .post(Config.CUSTOMER_APP + '/auth/logout', {
        fbasekey: state.tokenList.fcm_token,
      })
      .then(({ data, request }) => {
        console.log('RES', data)
        if (data.statusCode === '200') {
          navigation.replace('Main')
          dispatch(removeLogin())
          dispatch(setGuest({ isGuest: true }))
        }
      })
      .catch(({ response }) => {
        console.log('ERR_LOGOUT', response, '\n\n', response.data)
      })
  }

  const handleOnPressLogOut = () => {
    xhrLogout()
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true)
  // }, [])

  return (
    <>
      <StatusBar backgroundColor={'#D24B63'} barStyle={'light-content'} />
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 0.75, y: 0.5 }}
        locations={[0.3, 1]}
        colors={['#991F5D', '#D24B63']}
        style={{ flex: 1 }}
        useAngle={true}
        angle={333}
      >
        <Spacer height={16} />
        <View style={{ alignItems: 'center' }}>
          <Text style={[main.mediumText, { fontSize: 16 }]}>Akun Saya</Text>
        </View>
        <Spacer height={16} />
        <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >
          <Spacer height={10} />
          <HeaderSection isGuest={state.guest.data.isGuest} />
          <Spacer height={26} />
          {state.guest.data.isGuest ? (
            <GuestCard />
          ) : (
            <>
              <EPInfo navigation={navigation} {...login.user} />
              <Spacer height={16} />
              <AccountBuyer />
            </>
          )}
          <Spacer height={16} />
          <General />
          <Spacer height={16} />
          {!state.guest.data.isGuest && (
            <LogOut onPressLogOut={handleOnPressLogOut} />
          )}
          <Spacer height={50} />
        </ScrollView>
      </LinearGradient>
    </>
  )
}

export default AccountContainer

const HeaderSection = ({ isGuest = true }) => {
  const state = useSelector(state => state)
  const { data } = state.login || {}
  const { user } = data || {}
  const { join_date, avatar_image } = user || {}
  const _typeJoinDate = moment(join_date, 'DD-MM-YYYY HH:mm:ss').toDate()

  return (
    <View style={[header.container]}>
      {isGuest ? (
        <>
          <Avatar
            containerStyle={[header.avatar]}
            source={Assets.icon_tabler_seeding_white_big_3x}
            size={90}
            rounded
          />
          <Text style={[header.textTamu]}>Tamu</Text>
        </>
      ) : (
        <>
          <Avatar source={{ uri: noAva(avatar_image) }} size={90} rounded />
          <Text style={[header.textName]}>
            {limitNameWord(state.login.data.user.full_name)}
          </Text>
          <Text style={[header.textJoined]}>
            Joined {format(_typeJoinDate, 'dd MMMM yyyy')}
          </Text>
        </>
      )}
    </View>
  )
}

const EPInfo = ({ navigation, ...props }) => {
  return (
    <View>
      <Text style={[eP.textTitle]}>Akun Executive Partner :</Text>
      {props.ep_status ? (
        <View style={[ePOn.container]}>
          <View style={[ePOn.col1st]}>
            <Avatar source={{ uri: noAva(props.avatar_image) }} rounded />
            <Spacer width={25} />
            <View>
              <Text style={[ePOn.textName]}>{props.full_name}</Text>
              <Text style={[ePOn.textEP]}>Executive Partner</Text>
            </View>
          </View>
          <TextTouchable
            text="Kunjungi"
            textStyles={[ePOn.toucable]}
            onPress={() => navigation.navigate('MemberProfile')}
          />
        </View>
      ) : (
        <View style={[ePOff.container]}>
          <Text style={[ePOff.text1Row]}>Anda belum mempunyai akun EP</Text>
          <TextTouchable
            text="Daftar Executive Partner"
            textStyles={[ePOff.text2Row]}
            onPress={() => navigation.navigate('PartnerRegister')}
          />
        </View>
      )}
    </View>
  )
}

const AccountBuyer = ({}) => {
  return (
    <View style={[buyer.container]}>
      <Text style={[buyer.text]}>Akun Pembeli</Text>
      <Spacer height={9} />
      {listNavItems1st.map((item, index) => (
        <ListNavItem
          item={item}
          key={index}
          lists={listNavItems1st}
          index={index}
          isSvgIcon={item.isSvg}
        />
      ))}
    </View>
  )
}

const General = ({}) => {
  return (
    <View style={[general.container]}>
      <Text style={[general.text]}>Umum</Text>
      <Spacer height={9} />
      {listNavItems2nd.map((item, index) => (
        <ListNavItem
          item={item}
          key={index}
          lists={listNavItems2nd}
          index={index}
          isSvgIcon={item.isSvg}
        />
      ))}
    </View>
  )
}

const LogOut = ({ onPressLogOut }) => {
  const data = [
    {
      name: 'Log Out',
      screen: 'UnderConstruction',
      source: 'log-out',
      isSvg: true,
    },
  ]
  return (
    <View style={[logout.container]}>
      <ListNavItem
        item={data[0]}
        lists={data}
        index={0}
        noBorder={true}
        isLogOut={true}
        isSvgIcon={data[0].isSvg}
        onPressLogOut={onPressLogOut}
      />
    </View>
  )
}

const GuestCard = ({}) => {
  const navigation = useNavigation()
  return (
    <View style={[guest.container]}>
      <Text style={[guest.title]}>Kamu masuk sebagai Tamu</Text>
      <Text style={[guest.desc]}>
        Lakukan registrasi agar kamu bisa melakukan beragam transaksi
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('DaftarHandphone')}>
        <Text style={[guest.textTouch]}>Daftar Akun</Text>
      </TouchableOpacity>
    </View>
  )
}
