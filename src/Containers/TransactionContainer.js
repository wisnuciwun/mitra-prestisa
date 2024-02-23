import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableOpacityBase,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SearchFilterComponent from '@/Components/Transaction/SearchFilterComponent'
import axios from 'axios'
import { Config } from '@/Config'
import CardTransaksi from '@/Components/Transaction/CardTransaksi'
import ModalFilterStatus from '@/Components/Transaction/ModalFilterStatus'
import ModalTheaterOrder from '@/Components/Transaction/ModalTheaterOrder'
import _, { random } from 'lodash'
import EmptyOrBlankState from '@/Components/Base/EmptyOrBlankState'
import { Assets } from '@/Theme/Assets'

const TransactionContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const ApiUrl = Config.API_URL
  const state = useSelector(state => state)

  const [statusList, setstatusList] = useState([])
  const [modalVisible, setmodalVisible] = useState(false)
  const [selectedStatus, setselectedStatus] = useState([])
  const [dataTransaksi, setDataTransaksi] = useState()
  const [VisibleTheater, setVisibleTheater] = useState(false)
  const [selectedBukti, setSelectedBukti] = useState(null)
  const [jumlahItem, setJumlahItem] = useState(0)
  const [loading, setloading] = useState(true)

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setselectedStatus([])
  }, [])

  const handlerefreshdataafterupdate = asd => {
    setRefreshing(false)
    setselectedStatus([])
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        {item.list_transaction.length > 0 && (
          <CardTransaksi
            showBukti={data => {
              if (data != null) {
                handlerBukti(data)
              }
            }}
            data={item}
            handleRefreshTransaksi={handlerefreshdataafterupdate}
          />
        )}
      </View>
    )
  }

  const handlerBukti = data => {
    setSelectedBukti(data)
    setVisibleTheater(true)

    // setVisibleTheater(true)
  }

  const fetchDataStatus = async () => {
    const url = ApiUrl + '/customer-app/list-status-transaksi'

    await axios
      .get(url)
      .then(response => {
        const formatdata = response.data.data

        mappingDataStatus(formatdata)
        // setstatusList(formatdata)
      })
      .catch(({ response }) => {})
  }

  const fetchDataTrans = async () => {
    setloading(true)

    // setloadingOccasion(true)
    const url = ApiUrl + '/customer-app/list-transaksi'
    const data = {
      fbasekey: state.tokenList.fcm_token,
      status: selectedStatus,
    }

    await axios
      .post(url, data)
      .then(response => {
        const formatdata = response.data.data
        let x = 0
        formatdata.map((item, index) => {
          x += item.list_transaction.length
        })
        setJumlahItem(x)
        setDataTransaksi(formatdata)
        setloading(false)
        setRefreshing(false)
      })
      .catch(({ response }) => {
        setloading(false)
      })
  }

  const isSelected = id => {
    if (selectedStatus.length > 0) {
      return selectedStatus.includes(id)
    }
    return false
  }

  const mappingDataStatus = data => {
    const result = data.map((item, index) => {
      item.sub_category.map((it, idx) => {
        item.sub_category[idx] = {
          ...it,
          parent: item.id,
          parent_name: item.status,
        }
      })
      return item
    })

    setstatusList(result)
  }

  const closeModal = () => {
    setmodalVisible(false)
  }
  const closeTheater = () => {
    //
    setVisibleTheater(false)
  }

  const applyFilters = filter => {
    setselectedStatus(filter)
    setmodalVisible(false)
  }

  const showModal = () => {
    setmodalVisible(true)
  }

  useEffect(() => {
    fetchDataTrans()
    fetchDataStatus()
  }, [])

  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
    }
    fetchDataTrans()
  }, [selectedStatus])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataTrans()
      // The screen is focused
      // Call any action
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  return (
    <View style={[st.screen, Layout.fill]}>
      <SearchFilterComponent showModal={showModal} />
      <TouchableOpacity
        onPress={() => {
          fetchDataTrans()
        }}
      >
        {/* <Text>Fetch data</Text> */}
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          style={{ alignSelf: 'center', marginTop: 50 }}
          size={30}
        />
      ) : jumlahItem == 0 ? (
        <>
          {/* <Text>{jumlahItem}</Text> */}
          <EmptyOrBlankState
            image={Assets.empty_trans}
            imageHeight={200}
            imageWidth={200}
            title={'Kok kamu belum ada transaksi sih?'}
            messageBody={
              'Yuk lakukan pembelian sebelum \nproduk yang kamu incar habis'
            }
            titleButton={'Kembali ke Beranda'}
            buttonOnPress={() => {
              navigation.navigate('Home')
            }}
          />
        </>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={st.cardContainer}
          ListHeaderComponentStyle={{ padding: 0 }}
          data={dataTransaksi}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
          // keyExtractor={(item, index) => _.random(1, 1200).toString()}
        ></FlatList>
      )}

      <Modal animationType="slide" visible={modalVisible}>
        <ModalFilterStatus
          dataStatus={statusList}
          closeModal={closeModal}
          applyFilter={applyFilters}
        />
      </Modal>

      {selectedBukti != null && (
        <Modal transparent visible={VisibleTheater}>
          <ModalTheaterOrder data={selectedBukti} closeTheater={closeTheater} />
        </Modal>
      )}
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  cardContainer: { backgroundColor: '#F7F8F9' },
})
export default TransactionContainer
