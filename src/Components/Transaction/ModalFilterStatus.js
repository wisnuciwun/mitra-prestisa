import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NavBarV1 from '../Base/NavBarV1'
import ButtonBase from '../Base/ButtonBase'
import ButtonBottomFloating from '../ButtonBottomFloating'

const ModalFilterStatus = ({
  dataStatus,
  closeModal,
  applyFilter,
  // selectedStatus,
  // chooseStatusHandler,
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const [selectedStatus, setselectedStatus] = useState([])
  const [selectedStatusName, setselectedStatusName] = useState([])

  const chooseStatusHandler = data => {
    const statusNow = [...selectedStatus]

    if (data.sub_category == undefined) {
      const selected = isSelected(data.status)
      if (selected == true) {
        const index = statusNow.indexOf(data.status)
        statusNow.splice(index, 1)
      } else {
        statusNow.push(data.status)
      }

      const parent = dataStatus.filter(item => {
        // console.log(item.id, data.parent)
        return item.id == data.parent
      })

      // console.log(parent.length)
      if (parent.length > 0) {
        const arr1 = parent[0].sub_category
        const arr2 = statusNow

        // console.log(arr1)
        const containsAll = arr1.every(element => {
          return arr2.includes(element.id)
        })

        if (containsAll == true) {
          statusNow.push(parent[0].status)
        } else {
          const index = statusNow.indexOf(parent[0].status)
          if (index > 0) {
            console.log('index parent: ', index)
            statusNow.splice(index, 1)
          }
        }
      }
    } else {
      const selectedparent = isSelected(data.status)

      if (selectedparent == true) {
        const indexparent = statusNow.indexOf(data.status)
        statusNow.splice(indexparent, 1)

        data.sub_category.map((it, idx) => {
          const index = statusNow.indexOf(it.status)
          statusNow.splice(index, 1)
        })
      } else {
        if (selectedparent == false) {
          statusNow.push(data.status)
        }

        data.sub_category.map((it, idx) => {
          const selected = isSelected(it.status)
          // console.log(it.id, selected)
          if (selected == false) {
            statusNow.push(it.status)
          }
        })
      }
    }

    setselectedStatus(statusNow)
  }

  const isSelected = id => {
    if (selectedStatus.length > 0) {
      return selectedStatus.includes(id)
    }
    return false
  }

  function cap(str) {
    return str[0].toUpperCase() + str.slice(1)
  }

  const HandlerApplyFilter = () => {
    applyFilter(selectedStatus)
    closeModal()
  }

  useEffect(() => {}, [selectedStatus])
  return (
    <View style={st.screen}>
      <View
        style={[
          Layout.row,
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            marginBottom: 20,
          },
        ]}
      >
        <TouchableOpacity onPress={closeModal}>
          <Icon style={{ fontSize: 25 }} name="close"></Icon>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginLeft: -40,
            }}
          >
            Filter
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {dataStatus.map((item, index) => {
          // console.log(isSelected(item.id))
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  chooseStatusHandler(item)
                }}
                key={item.id}
                style={[Layout.row, st.statusRow]}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Semua Status {cap(item.name)}
                </Text>

                {isSelected(item.status) == true ? (
                  <>
                    <Icon
                      name="checkbox-marked"
                      color={Colors.primary}
                      size={20}
                    />
                  </>
                ) : (
                  <>
                    <Icon name="checkbox-blank-outline" size={20} />
                  </>
                )}
              </TouchableOpacity>

              <View>
                {item.sub_category.map((it, idx) => {
                  return (
                    <TouchableOpacity
                      onPress={() => chooseStatusHandler(it)}
                      key={it.id}
                      style={[Layout.row, st.statusRow]}
                    >
                      <Text style={{ fontSize: 16, marginLeft: 20 }}>
                        {cap(it.name)}
                      </Text>
                      {isSelected(it.status) == true ? (
                        <>
                          <Icon
                            name="checkbox-marked"
                            color={Colors.primary}
                            size={20}
                          />
                        </>
                      ) : (
                        <>
                          <Icon name="checkbox-blank-outline" size={20} />
                        </>
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </>
          )
        })}
      </ScrollView>
      <View style={st.bottomCont}>
        <TouchableOpacity onPress={applyFilter}>
          <ButtonBase
            onPress={() => HandlerApplyFilter()}
            title={'Aplikasikan'}
          ></ButtonBase>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    position: 'relative',
    flex: 1,
  },
  bottomCont: {
    // backgroundColor: 'red',
  },
  statusRow: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
})
export default ModalFilterStatus
