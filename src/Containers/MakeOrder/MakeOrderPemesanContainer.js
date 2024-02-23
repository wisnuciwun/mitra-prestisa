import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Divider, Switch } from '@rneui/themed'
import HeaderStepper from '@/Components/MakeOrder/HeaderStepper'
import Spacer from '@/Components/Base/Spacer'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import InputTextTitleOnBorder from '@/Components/MakeOrder/InputTextTitleOnBorder'
import ButtonBase from '@/Components/Base/ButtonBase'

const MakeOrderPemesanContainer = props => {
  const userlogin = useSelector(state => state.login)
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)
  const [nama, setNama] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')

  const [validemail, setvalidemail] = useState(true)
  const [validbutton, setvalidbutton] = useState(true)
  const [validphone, setvalidphone] = useState(true)

  const toggleSwitch = () => {
    setChecked(!checked)
  }

  const handlerSetNama = nama => {
    setNama(nama)
  }
  const handlerSetPhone = phone => {
    const first = data.substring(0, 1)

    //   if(first != 0 || first != + ){
    //       setphone(phone)

    //     }else{
    //       setphone(phone)

    //   }
  }
  const handlerSetEmail = email => {
    setemail(email)
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function validateOnlyNumbers(phone) {
    const re = /^[0-9\b]+$/
    return re.test(phone)
  }

  const debounce = func => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  useEffect(() => {
    if (checked == true) {
      setNama(userlogin.data.user.full_name)
      setemail(userlogin.data.user.email)
      setphone(userlogin.data.user.phone)
    } else {
      setNama('')
      setemail('')
      setphone('')
    }
  }, [checked])

  useEffect(() => {
    // console.log(nama)
    // console.log(validateEmail)
    // console.log(validphone)
    if (
      nama.length > 0 &&
      validemail == true &&
      validphone == true &&
      email.length > 0 &&
      phone.length > 0
    ) {
      console.log('valid')
      setvalidbutton(false)
    } else {
      console.log('no valid')
      setvalidbutton(true)
    }
  }, [nama, email, phone])

  return (
    <View style={[styles.screen, Layout.fill]}>
      <Spacer height={20} />
      <HeaderStepper step={4} />
      <Spacer height={20} />
      <Divider width={1} color={Colors.neutralGray05} />
      <ScrollView style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 20,
            // marginLeft: 20,
          }}
        >
          Info Pemesan
        </Text>
        <View style={[Layout.row, { justifyContent: 'space-between' }]}>
          <Text>Gunakan info profil saya</Text>
          <TouchableOpacity
            onPress={() => {
              toggleSwitch()
            }}
          >
            <Switch
              onChange={() => {
                console.log('onchane')
              }}
              value={checked}
              onValueChange={value => {
                console.log('onchanevalue')
                setChecked(!value)
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <InputTextTitleOnBorder
            value={nama}
            onChangeText={text => {
              handlerSetNama(text)
            }}
            inputContainerStyle={{}}
            errorMessage=""
            label="Nama Pemesan"
          ></InputTextTitleOnBorder>
          <InputTextTitleOnBorder
            value={email}
            onChangeText={text => {
              const validEmail = validateEmail(text)
              console.log(validEmail)
              if (validEmail) {
                setvalidemail(true)
              } else {
                setvalidemail(false)
              }
              setemail(text)
              //handlerSetEmail(text)
            }}
            keyboardType={'email-address'}
            inputContainerStyle={{}}
            errorMessage={
              validemail == false ? 'Format email dengan benar' : ''
            }
            label="Email Pemesan"
          ></InputTextTitleOnBorder>
          <InputTextTitleOnBorder
            value={phone}
            onChangeText={text => {
              const validnumber = validateOnlyNumbers(text)
              if (validnumber || text.length == 0) {
                const first = text.substring(0, 1)

                if (first == 0 || first == '+') {
                  setphone(phone)
                  setvalidphone(true)
                } else {
                  setphone(phone)
                  setvalidphone(false)
                }
                setphone(text)
              } else {
                // setvalidphone(false)
              }
            }}
            inputContainerStyle={{}}
            errorMessage={!validphone ? 'Format No. Telephone harus benar' : ''}
            keyboardType="numeric"
            label="No. Telepon Pemesan"
          ></InputTextTitleOnBorder>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          borderTopColor: Colors.neutralGray08,
          borderTopWidth: 1,
        }}
      >
        <ButtonBase
          disable={validbutton}
          title={'Konfirmasi Pesanan'}
        ></ButtonBase>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
})
export default MakeOrderPemesanContainer
