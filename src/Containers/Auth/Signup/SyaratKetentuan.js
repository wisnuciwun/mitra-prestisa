import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ListView,
  SectionList,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// import { ScrollView } from 'react-native-gesture-handler'

const SyaratKetentuan = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const dataUmum = [
    {
      no: '1',
      value:
        'Aplikasi Customer Prestisa hanya digunakan untuk menggunakan layanan yang tersedia.',
    },
    {
      no: '2',
      value:
        'Aplikasi Customer Prestisa tidak boleh disalahgunakan untuk menipu, merugikan, dan/atau menimbulkan ketidaknyamanan kepada pihak lain.',
    },
    {
      no: '3',
      value:
        'Pengguna tidak diperbolehkan mengubah isi situs dan/atau aplikasi Customer Prestisa untuk tujuan apapun.',
    },
    {
      no: '4',
      value:
        'Customer Prestisa tidak bertanggung jawab atas kesalahan pengunduhan versi aplikasi yang dilakukan pengguna dan ketidakcocokan perangkat yang digunakan pengguna, serta hal-hal yang terjadi akibatnya.',
    },
    {
      no: '5',
      value:
        'Jika pengguna terbukti menggunakan aplikasi untuk tujuan yang membahayakan, merugikan, atau di luar tujuan penggunaan yang dimaksud aplikasi ini, maka Customer Prestisa berhak melarang pengguna untuk menggunakan aplikasi Customer Prestisa.',
    },
    {
      no: '6',
      value:
        'Customer Prestisa juga berhak melarang pengguna yang terbukti menggunakan aplikasi dengan perangkat yang tidak cocok atau tidak sah.',
    },
    {
      no: '7',
      value:
        'Pengguna wajib menjaga kerahasiaan informasi yang didapatkan di aplikasi Customer Prestisa dan tidak menyalahgunakannya untuk tujuan yang merugikan pihak lain.',
    },
    {
      no: '8',
      value:
        'Pengguna dihimbau untuk tidak melakukan segala bentuk tindakan yang merugikan atau menimbulkan ketidaknyamanan, seperti mengancam atau melecehkan, saat menggunakan aplikasi Customer Prestisa.',
    },
    {
      no: '9',
      value:
        'Pengguna wajib menjaga kerahasiaan informasi yang didapatkan di aplikasi Customer Prestisa dan tidak menyalahgunakannya untuk tujuan yang merugikan pihak lain.',
    },
    {
      no: '10',
      value:
        'Pengguna dilarang menggunakan informasi/ program/ fitur yang terdapat di situs dan aplikasi Customer Prestisa untuk melanggar peraturan perundang-undangan yang berlaku di Indonesia.',
    },
    {
      no: '11',
      value:
        'Pengguna bertanggung jawab penuh atas akun Customer Prestisa miliknya dan dapat dimintai pertanggungjawaban jika sewaktu-waktu terjadi kerugian yang disebabkan oleh akunnya, meskipun akun tersebut disalahgunakan oleh pihak lain.',
    },
    {
      no: '12',
      value:
        'Jika akun pengguna diretas atau dicuri sehingga pengguna kehilangan kontrol atas akunnya, maka pengguna wajib memberitahu Customer Prestisa sesegera mungkin agar kami dapat menonaktifkan akun pengguna dan melakukan tindak pencegahan lainnya.',
    },
    {
      no: '13',
      value:
        'Customer Prestisa berhak membatalkan segala transaksi yang mencurigakan atau tidak sesuai dengan syarat dan ketentuan yang berlaku.',
    },
  ]

  const dataPembatalan = [
    {
      no: '1',
      value: 'Terlambat lebih dari 2 jam untuk order pesan hari H : 15%',
    },
    {
      no: '2',
      value: 'Terlambat lebih dari 1 jam untuk order pesan H-1 : 100%',
    },
    {
      no: '3',
      value:
        'Tidak sesuai/rusak/layu : tergantung tingkat kefatalan dengan mempertimbangkan case yang terjadi dan keterangan dari dua belah pihak (customer dan supplier)',
    },
    {
      no: '4',
      value:
        'Tidak terkirim/terproses akibat kesalahan internal : 15% apabila customer tetap ingin dibuatkan. 100% apabila customer tidak mau dibuatkan',
    },
    {
      no: '5',
      value:
        'Downgrade : Sesuai nominal harga yang ditawarkan untuk produk yang akan dibuat, atau sesuai selisih kualitas produk',
    },
    {
      no: '6',
      value:
        'Cancel customer : Lebih dari satu jam sejak deal 85%. Kurang dari satu jam sejak deal : 100%',
    },
  ]

  const dataPengembalian = [
    {
      no: '1',
      value:
        'Pengembalian dana (refund) baik berupa kompensasi ataupun pembatalan pesanan, baik yang disebabkan oleh internal Prestisa ataupun pelanggan, akan diproses paling lambat dalam 2 hari kerja setelah terdapat konfirmasi adanya refund tersebut.',
    },
    {
      no: '2',
      value:
        'Pengajuan kompensasi atas komplain yang disampaikan yang berupa pengembalian dana baik sebagian atau seluruhnya akan kami layani dalam dua hari (2x24 jam) sejak pesanan diterima. Pengajuan melebihi waktu tersebut tidak dapat kami proses.',
    },
    {
      no: '3',
      value:
        'Prestisa tidak menerima permintaan bentuk tanggung jawab melebihi nilai dana yang telah dibayarkan.',
    },
  ]

  _renderItem = item => {
    // console.log(item)
    return (
      <View key={item.no} style={[Layout.row, Gutters.smallBPadding]}>
        <View style={{ width: 20 }}>
          <Text>{item.no}.</Text>
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text>{item.value}</Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          style={{ marginLeft: 20 }}
          size={20}
          onPress={() => {
            navigation.goBack()
          }}
          // color=
          name="close"
        />
      ),
      title: '',
    })
  }, [])
  return (
    <ScrollView nestedScrollEnabled={true} style={[styles.screen, Layout.fill]}>
      <View>
        <Text
          style={[{ fontSize: 25, fontWeight: 'bold', color: Colors.primary }]}
        >
          Syarat dan Ketentuan Penggunaan
        </Text>
      </View>
      <View style={[Gutters.largeTMargin]}>
        <Text style={[styles.titleSection]}>Umum</Text>
      </View>
      <View>
        {dataUmum.map(item => {
          return _renderItem(item)
        })}
      </View>
      <View style={[Gutters.largeTMargin]}>
        <Text style={[styles.titleSection]}>Pembatalan Pesanan</Text>
      </View>
      <View>
        {dataPembatalan.map(item => {
          return _renderItem(item)
        })}
      </View>
      <View style={[Gutters.largeTMargin]}>
        <Text style={[styles.titleSection]}>Pengembalian Dana</Text>
      </View>
      <View style={{ marginBottom: 100 }}>
        {dataPengembalian.map(item => {
          return _renderItem(item)
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    padding: 20,
  },
  titleSection: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
})
export default SyaratKetentuan
