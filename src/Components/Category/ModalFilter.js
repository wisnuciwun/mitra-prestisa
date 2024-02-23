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
  TouchableHighlight,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CheckBox, Button, Input } from '@rneui/themed'
import InputBase from '../Base/InputBase'
import ButtonBase from '../Base/ButtonBase'

const ModalFilter = ({
  isVisible,
  onPress,
  dataCategory,
  closeModal,
  handleApplyFilter,
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const [check2, setCheck2] = useState(false)
  const [checkedID, setcheckedID] = useState('')
  const [checkDiscount, setCheckDiscount] = useState(0)
  const [filterMinPrice, setfilterMinPrice] = useState(null)
  const [filterMaxPrice, setfilterMaxPrice] = useState(null)
  const [selectedSort, setSelectedSort] = useState(null)

  const [filter, setFilter] = useState({
    min: null,
    max: null,
    rating: null,
    price: null,
    most_sold: null,
    discounted: null,
  })

  const handleSortSelect = select => {
    setSelectedSort(select)
    if (select == 'terlaris') {
      setFilter({
        ...filter,
        most_sold: 1,
        rating: '',
        price: '',
      })
    } else if (select == 'rating') {
      setFilter({
        ...filter,
        most_sold: '',
        rating: 'highest',
        price: '',
      })
    } else if (select == 'priceHigh') {
      setFilter({
        ...filter,
        most_sold: '',
        rating: '',
        price: 'highest',
      })
    } else if (select == 'priceLow') {
      setFilter({
        ...filter,
        most_sold: '',
        rating: '',
        price: 'lowest',
      })
    }
  }

  const handleDiskon = () => {
    setFilter({
      ...filter,
      discounted: !checkDiscount,
    })
  }

  useEffect(() => {
    setFilter({
      ...filter,
      discounted: checkDiscount,
    })
  }, [checkDiscount])

  const data = dataCategory

  useEffect(() => {}, [])
  return (
    <View>
      <Modal animationType="slide" visible={isVisible}>
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
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginLeft: -20,
                  }}
                >
                  Filter
                </Text>
              </View>
            </View>

            <ScrollView style={{ height: windowHeight - 50 }}>
              <View style={[styles.screen, { paddingHorizontal: 20 }]}>
                <View style={{ marginBottom: 250 }}>
                  <View style={styles.section}>
                    <Text
                      style={[styles.textCategoryChild, { fontWeight: 'bold' }]}
                    >
                      Urutkan Berdasarkan
                    </Text>
                    <View style={styles.sortContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          handleSortSelect('terlaris')
                        }}
                      >
                        <View
                          style={[
                            styles.chip,
                            ,
                            selectedSort == 'terlaris' && {
                              borderColor: Colors.primary,
                            },
                          ]}
                        >
                          <Text
                            style={
                              selectedSort == 'terlaris' && {
                                color: Colors.primary,
                              }
                            }
                          >
                            Terlaris
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSortSelect('rating')}
                      >
                        <View
                          style={[
                            styles.chip,
                            ,
                            selectedSort == 'rating' && {
                              borderColor: Colors.primary,
                            },
                          ]}
                        >
                          <Text
                            style={
                              selectedSort == 'rating' && {
                                color: Colors.primary,
                              }
                            }
                          >
                            Rating Tertinggi
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSortSelect('priceHigh')}
                      >
                        <View
                          style={[
                            styles.chip,
                            ,
                            selectedSort == 'priceHigh' && {
                              borderColor: Colors.primary,
                            },
                          ]}
                        >
                          <Text
                            style={
                              selectedSort == 'priceHigh' && {
                                color: Colors.primary,
                              }
                            }
                          >
                            Harga Tertinggi
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSortSelect('priceLow')}
                      >
                        <View
                          style={[
                            styles.chip,
                            ,
                            selectedSort == 'priceLow' && {
                              borderColor: Colors.primary,
                            },
                          ]}
                        >
                          <Text
                            style={
                              selectedSort == 'priceLow' && {
                                color: Colors.primary,
                              }
                            }
                          >
                            Harga Terendah
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text
                      style={[styles.textCategoryChild, { fontWeight: 'bold' }]}
                    >
                      Promo
                    </Text>
                    <View style={styles.sortContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setCheckDiscount(checkDiscount == 0 ? 1 : 0)
                        }}
                      >
                        <View
                          style={[
                            styles.chip,
                            checkDiscount == 1 && {
                              borderColor: Colors.primary,
                            },
                          ]}
                        >
                          <Text
                            style={
                              checkDiscount == 1 && {
                                color: Colors.primary,
                              }
                            }
                          >
                            Diskon
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text
                      style={[styles.textCategoryChild, { fontWeight: 'bold' }]}
                    >
                      Harga
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}
                    >
                      <Input
                        value={
                          filter.min != null
                            ? filter.min.toString()
                            : filter.min
                        }
                        onChangeText={text =>
                          setFilter({ ...filter, min: text })
                        }
                        placeholder="Minimal"
                        containerStyle={{ width: '40%', height: 40 }}
                      ></Input>
                      <Text> - </Text>
                      <Input
                        value={
                          filter.max != null
                            ? filter.max.toString()
                            : filter.max
                        }
                        onChangeText={text =>
                          setFilter({ ...filter, max: text })
                        }
                        placeholder="Maksimal"
                        containerStyle={{ width: '40%', height: 40 }}
                      ></Input>
                    </View>
                    <View style={styles.sortContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setFilter({ ...filter, max: 500000, min: 0 })
                        }}
                      >
                        <View style={styles.chip}>
                          <Text>{'<500.000'}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFilter({ ...filter, max: 1000000, min: 500000 })
                        }}
                      >
                        <View style={styles.chip}>
                          <Text>{'500.000 - 1.000.000'}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFilter({
                            ...filter,
                            min: 1000000,
                            max: 1000000000,
                          })
                        }}
                      >
                        <View style={styles.chip}>
                          <Text>{'>1.000.000'}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                // marginBottom: 20,
                bottom: 0,
                width: windowWidth,
                paddingHorizontal: 20,
                backgroundColor: 'white',
                borderTopColor: '#ddd',
                borderTopWidth: 1,
                paddingTop: 20,
                paddingBottom: 20,
                // justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableHighlight underlayColor={'white'}>
                  <Button
                    titleStyle={{ color: Colors.neutralBlack01 }}
                    buttonStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                    type="outline"
                    mode="outline"
                    style={{ flex: 1 }}
                    title="Reset"
                    // onPress={onPress}
                  />
                </TouchableHighlight>
                <TouchableOpacity underlayColor={'white'}>
                  <Button
                    containerStyle={{ width: 200 }}
                    title="Terapkan"
                    onPress={() => {
                      handleApplyFilter(filter)
                    }}
                  />
                </TouchableOpacity>
              </View>
              {/* <Text>Harga min : {filter.min}</Text>
              <Text>harga max: {filter.max}</Text>
              <Text>Rating {filter.rating}</Text>
              <Text>diskon : {filter.discounted}</Text>
              <Text>terlaris : {filter.most_sold}</Text>
              <Text>harga: {filter.price}</Text>   */}
            </View>

            {/* Footer */}
          </View>
        </View>
      </Modal>
    </View>
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
    fontSize: 16,
    fontWeight: '100',
  },
  chip: {
    padding: 10,
    borderColor: Colors.neutralGray03,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    // paddingBottom: 150,
  },
  sortContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    flexDirection: 'row',
    overflow: 'visible',
    flexGrow: 1,
  },
  section: {
    marginTop: 20,
  },
})
export default ModalFilter
