import React, { useState, useEffect } from 'react'
import ButtonBase from '@/Components/Base/ButtonBase'
import InputBase from '@/Components/Base/InputBase'
import Spacer from '@/Components/Base/Spacer'
import { useTheme } from '@/Hooks'
import { Colors, SIZES } from '@/Theme/Variables'
import { useNavigation } from '@react-navigation/native'
import { Divider } from '@rneui/themed'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { setProperty } from '@/Store/ringkasanPesananSlice'

const EditUcapan = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const idPage = props.route.params.id_page

  const [ucapan, setucapan] = useState('')
  const [pengirim, setpengirim] = useState('')
  const [selectedPill, setselectedPill] = useState('')
  const [disableButton, setdisableButton] = useState(true)

  const templateUcapan = [
    { id: 1, title: 'Tanpa Ucapan' },
    { id: 2, title: 'Happy Wedding' },
    { id: 3, title: 'Selamat dan Sukses' },
    { id: 4, title: 'Happy Anniversary' },
    { id: 5, title: 'Turut Berduka Cita' },
    { id: 6, title: 'Selamat Ulang Tahun' },
  ]

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Ucapan Pada Produk',
    })
  }, [navigation])

  useEffect(() => {
    if (pengirim.length > 0 && ucapan.length > 0) {
      setdisableButton(false)
    } else {
      setdisableButton(true)
    }
  }, [pengirim, ucapan])

  console.log('ID_PAGE', idPage)

  return (
    <>
      <ScrollView style={[st.screen, Layout.fill]}>
        <Spacer height={20} />
        <View style={{ marginHorizontal: SIZES.margin_h - 2 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 20 }}>
            Kata Ucapan
          </Text>
        </View>
        <Spacer height={20} />
        <Divider width={1} color={Colors.neutralGray05} />

        <View style={[st.screen, { padding: 20 }]}>
          <View>
            {props.jumlahPage > 0 ? (
              <View>
                <Text
                  style={{
                    color: Colors.primary,
                    marginBottom: 10,
                    fontSize: 14,
                  }}
                >
                  Produk {currentPage} dari {jumlahPage}
                </Text>
                <Divider />
                <Spacer height={20} />
              </View>
            ) : (
              <View></View>
            )}
          </View>
          <View>
            <Text>
              Nama pengirim yang tertera di produk/kartu
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <InputBase
              value={pengirim}
              onChangeText={text => {
                setpengirim(text)
              }}
            />
            <Text style={{ alignSelf: 'flex-end', marginTop: 10 }}>{0}/48</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>
              Kalimat ucapan
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <TextInput
              //   defaultValue={catatanSelected.catatan}
              value={ucapan}
              multiline={true}
              maxLength={120}
              numberOfLines={6}
              style={st.textArea}
              onChangeText={text => {
                setucapan(text)
              }}
            ></TextInput>
            <Text style={{ alignSelf: 'flex-end', marginTop: 10 }}>
              {0}/100
            </Text>
          </View>
          <View style={[Layout.row, { flexWrap: 'wrap' }]}>
            {templateUcapan.map((item, index) => {
              const selectedText = { color: Colors.primary }
              const selectedPillStyle = { borderColor: Colors.primary }
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    //   console.log(item.id)
                    setselectedPill(item.id)
                    setucapan(item.title)
                  }}
                  style={[
                    st.pill,
                    selectedPill == item.id && selectedPillStyle,
                  ]}
                >
                  <Text
                    style={[
                      { color: Colors.neutralBlack01 },
                      selectedPill == item.id && selectedText,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
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
          onPress={() => {
            navigation.push('RingkasanPesanan')
            dispatch(
              setProperty({
                id_page: idPage,
                property: { ucapan: { pengirim: pengirim, text: ucapan } },
              }),
            )
          }}
          title={'Simpan Perubahan'}
        ></ButtonBase>
      </View>
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  image: {
    borderRadius: 5,
    width: 72,
    height: 72,
    backgroundColor: '#eee',
    marginRight: 20,
  },
  pill: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.neutralGray03,
  },
  textArea: {
    textAlignVertical: 'top',
    borderColor: Colors.neutralGray02,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.neutralBlack02,
    marginTop: 10,
    padding: 15,
  },
})
export default EditUcapan
