import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Input from '@/Components/Base/InputTextBottomLine'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { Config } from '@/Config'
import axios from 'axios'
import FormInputPajak from '@/Components/Invoice/FormInputPajak'
import FakturPajak from '@/Components/Invoice/FakturPajak'
import { setLogin } from '@/Store/loginSlice'
import { setTax } from '@/Store/taxSlice'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'

const FakturContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()
  const state = useSelector(state => state)
  const [taxStatus, setTaxStatus] = useState(
    state.login.data.user.invoice_tax_status,
  )
  const [loading, setloading] = useState(true)
  const [facture, setfacture] = useState({})
  const [edit, setEdit] = useState(false)

  const navigatetoeditform = () => {
    navigation.navigate('ProfileFakturEdit', { data: facture })
  }

  function getFaktur() {
    const url = `${Config.CUSTOMER_APP}/auth/factur-info`
    setloading(true)
    axios
      .post(url, {
        fbasekey: state.tokenList.fcm_token,
      })
      .then(response => {
        if (response.data.statusCode == '200') {
          setloading(false)
          setfacture(response.data.data.factur)
          dispatch(setTax({ ...state.tax.data, ...response.data.data.factur }))
        }
      })
      .catch(({ response }) => {
        setloading(false)
      })
  }

  function deleteFactur() {
    const url = `${Config.CUSTOMER_APP}/auth/update-factur`
    const payload = {
      fbasekey: state.tokenList.fcm_token,
      company_name: '',
      company_email: '',
      company_address: '',
      company_npwp: '',
      npwp_image: '',
    }
    axios
      .post(url, payload)
      .then(response => {
        if (response.data.statusCode == '200') {
          navigation.navigate('Profile')
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('error.response')
          console.log(error.response.data)
          // The request was made and the server responded with a status code
          // that falls out of the range of 2x
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      })
  }

  navigation.setOptions({
    headerShown: true,
    headerRight: () => {
      return (
        <View style={[Layout.row]}>
          <FeatherIcon
            onPress={() => navigatetoeditform()}
            style={{
              fontSize: 20,
              color: edit ? '#991F5D' : '#1D1619',
              marginRight: 20,
            }}
            name="edit-3"
          />
          <FeatherIcon
            onPress={() => deleteFactur()}
            style={{ fontSize: 20, color: '#1D1619', marginRight: 20 }}
            name="trash-2"
          />
        </View>
      )
    },
  })

  React.useLayoutEffect(() => {
    // setIsLoading(false)
  }, [navigation])

  useEffect(() => {
    if (state.login.data.user.invoice_tax_status) {
      getFaktur()
    } else {
      setloading(false)
    }
  }, [])

  function handleSave(args) {
    const url = `${Config.CUSTOMER_APP}/auth/update-factur`
    const payload = {
      fbasekey: state.tokenList.fcm_token,
      company_name: args.company_name,
      company_email: args.company_email,
      company_address: args.company_address,
      company_npwp: args.company_npwp,
      npwp_image: args.npwp_image.base64,
    }
    axios
      .post(url, payload)
      .then(response => {
        if (response.data.statusCode == '200') {
          const xxx = state
          const user = {
            ...xxx.login.data.user,
            ...{ invoice_tax_status: 1 },
          }

          const login = { ...xxx.login.data, user }
          dispatch(setLogin(login))
          navigation.navigate('Profile')
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('error.response')
          console.log(error.response.data)
          // The request was made and the server responded with a status code
          // that falls out of the range of 2x
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      })
  }

  return (
    <View style={[st.screen, Layout.fill]}>
      {loading == false ? (
        taxStatus == 1 ? (
          <FakturPajak data={facture} />
        ) : (
          <FormInputPajak data={facture} button="Simpan" save={handleSave} />
        )
      ) : (
        <LoadingIndicator />
      )}
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    paddingTop: 20,
  },
})
export default FakturContainer
