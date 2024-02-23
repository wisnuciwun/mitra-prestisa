import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CheckBox, Button } from '@rneui/themed'

const modalCategories = ({ isVisible, onPress, dataCategory, closeModal }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const [check2, setCheck2] = useState(false)
  const [checkedID, setcheckedID] = useState({})

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const data = dataCategory

  const ListCategory = () => {
    return data.map(item => {
      return (
        <View style={styles.listCategory} key={Math.random()}>
          <Text style={styles.textCategory}>{item.name}</Text>
          <View style={styles.textCategoryChild}>
            {item.sub_occasion.map(child => {
              return (
                <CheckBox
                  key={Math.random()}
                  style={{
                    backgroundColor: 'yellow',
                    marginBottom: 0,
                    ...styles.textCategoryChild,
                  }}
                  wrapperStyle={{
                    marginBottom: 0,
                    paddingLeft: 0,
                    justifyContent: 'space-between',
                  }}
                  containerStyle={{
                    marginBottom: 0,
                    marginTop: 0,
                    marginLeft: 0,
                    paddingLeft: 0,
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1,
                  }}
                  textStyle={styles.textCategoryChild}
                  checkedColor={Colors.primary}
                  title={child.name}
                  iconRight
                  checkedIcon={
                    <Icon
                      color={Colors.primary}
                      size={18}
                      name="circle-slice-8"
                    ></Icon>
                  }
                  uncheckedIcon={<Icon size={18} name="circle-outline"></Icon>}
                  checked={checkedID.child === child.id ? true : false}
                  onPress={() => {
                    // console.log(child.id)
                    setcheckedID({ parent: item.id, child: child.id })
                  }}
                />
              )
            })}
          </View>
        </View>
      )
    })
  }

  useEffect(() => {}, [])
  return (
    <Modal useNativeDriver={true} animationType="slide" visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={[
              Layout.row,
              {
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 10,
              },
            ]}
          >
            <TouchableOpacity onPress={closeModal}>
              <FeatherIcon style={{ fontSize: 25 }} name="x"></FeatherIcon>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Occasion</Text>
            </View>
          </View>

          <ScrollView style={[styles.screen, { paddingHorizontal: 20 }]}>
            <View style={{ marginBottom: 250 }}>
              <ListCategory />
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 100,
              width: windowWidth,
              paddingHorizontal: 20,

              //   height: 30,
              backgroundColor: 'white',
              borderTopColor: '#ddd',
              borderTopWidth: 1,
              paddingTop: 20,
              paddingBottom: 20,
              //   justifyContent: 'flex-end',
            }}
          >
            <View style={{ flex: 1, width: '100%' }}>
              <Button
                style={{ alignSelf: 'flex-end' }}
                title="Aplikasikan"
                onPress={() => onPress(checkedID)}
              />
            </View>
          </View>

          {/* Footer */}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'white' },
  textCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  textCategoryChild: {
    marginLeft: 0,
    fontSize: 15,
    fontWeight: '100',
  },
  modalView: {
    // paddingBottom: 150,
  },
})
export default modalCategories
