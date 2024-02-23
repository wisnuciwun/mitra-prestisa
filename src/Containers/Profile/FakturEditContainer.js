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
import FormInputPajak from '@/Components/Invoice/FormInputPajak'
import { Config } from '@/Config'
import axios from 'axios'
import ModalLoadingCenter from '@/Components/Base/ModalLoadingCenter'

const FakturEditContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const [] = useState()
  const state = useSelector(state => state)
  const [facture, setFacture] = useState(props.route.params.data)
  const [reload, setReload] = useState(false)

  function deleteData() {
    const data = {
      company_address: '',
      company_email: '',
      company_name: '',
      company_npwp: '',
      invoice_tax_status: 0,
      npwp_image: '',
    }
    setFacture(data)
    setReload(!reload)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => {
        return (
          <View style={[Layout.row]}>
            <FeatherIcon
              style={{
                fontSize: 20,
                color: '#991F5D',
                marginRight: 20,
              }}
              name="edit-3"
            />
            <FeatherIcon
              onPress={() => deleteData()}
              style={{ fontSize: 20, color: '#1D1619', marginRight: 20 }}
              name="trash-2"
            />
          </View>
        )
      },
    })
  }, [reload])

  function handleSave(args) {
    setloading(true)
    const url = `${Config.CUSTOMER_APP}/auth/update-factur`
    const payload = {
      fbasekey: state.tokenList.fcm_token,
      company_name: args.company_name,
      company_email: args.company_email,
      company_address: args.company_address,
      npwp: args.company_npwp,
      npwp_image: args.npwp_image,
    }
    axios
      .post(url, payload)
      .then(response => {
        setloading(false)
        if (response.data.statusCode == '200') {
          navigation.navigate('Profile')
        }
      })
      .catch(({ response }) => {
        console.log(response.data)
      })
  }

  return (
    <View style={[st.screen, Layout.fill]}>
      <FormInputPajak
        edit={true}
        data={facture}
        button="Simpan"
        save={handleSave}
      />
      {loading && <ModalLoadingCenter />}
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
})
export default FakturEditContainer
