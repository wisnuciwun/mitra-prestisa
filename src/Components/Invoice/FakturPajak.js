import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from './ImagePicker'
import ModalCenterTambahkanFoto from '../TulisUlasan/ModalCenterTambahkanFoto'
import Spacer from '../Base/Spacer'
import LabelText from '../Base/LabelText'
import InputTextBottomLine from '../Base/InputTextBottomLine'

const FakturPajak = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])
  return (
    <ScrollView style={[st.screen, { height: windowHeight - 110 }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <LabelText title={'Nama Perusahaan'} required={true} />
          <Text style={st.text}>{props.data.company_name}</Text>
          <Spacer height={30} />
          <LabelText title={'No. NPWP Perusahaan'} required={true} />
          <Text style={st.text}>{props.data.company_npwp}</Text>
          <Spacer height={30} />
          <LabelText title={'Email'} required={true} />
          <Text style={st.text}>{props.data.company_email}</Text>
          <Spacer height={30} />
          <LabelText title={'Alamat Perusahaan'} required={true} />
          <Text style={st.text}>{props.data.company_address}</Text>
          <Spacer height={30} />
          <LabelText title={'Foto NPWP'} required={true} />
          <Spacer height={10} />
          <ImagePicker imageNpwp={{ uri: props.data.npwp_image }} />
        </View>
        <Spacer height={40} />
      </View>
    </ScrollView>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    paddingTop: 5,
    color: Colors.neutralBlack02,
  },
})
export default FakturPajak
