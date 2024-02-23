import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { Divider } from '@rneui/themed'

const ModalKonfirmasi = ({ closemodal, konfimasi }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      <View style={st.screenModal}>
        <View
          style={{
            alignSelf: 'center',
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 20,
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 20,
              }}
            >
              Konfirmasi dan selesaikan pesanan?
            </Text>
            <Text style={{ textAlign: 'center', lineHeight: 20, fontSize: 16 }}>
              Pastikan produk telah sampai dan sudah sesuai dengan pesanan
            </Text>
          </View>
          <Divider></Divider>
          <View
            style={[
              Layout.row,
              {
                justifyContent: 'space-between',
                paddingBottom: 20,
                paddingHorizontal: 20,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                st.button,
                { flex: 1, marginRight: 5, borderColor: 'white' },
              ]}
              onPress={closemodal}
            >
              <Text style={{ fontWeight: 'bold' }}>Tidak Jadi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={konfimasi}
              style={[
                st.button,
                {
                  backgroundColor: Colors.primary,
                  borderColor: 'white',
                  flex: 1,
                },
              ]}
            >
              <View>
                <Text style={[st.buttonText, { color: 'white' }]}>
                  Ya, Konfirmasi
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screenModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.90)',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
  },
  button2: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.neutralBlack02,
    fontWeight: 'bold',
  },
})
export default ModalKonfirmasi
