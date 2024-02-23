import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spacer from '@/Components/Base/Spacer'
import { ButtonGroup } from '@rneui/themed'
import ReviewCard from '@/Components/ProductDetail/ReviewCard'
import RatingStar from '@/Components/ProductDetail/RatingStar'
import { Config } from '@/Config'
import axios from 'axios'
import ModalLoadingCenter from '@/Components/Base/ModalLoadingCenter'

const RatingContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [loading, setloading] = useState(true)
  const [data, setdata] = useState([])
  const rating = Math.floor(4.2)
  const listRating = [
    { rating: 5, count: 33 },
    { rating: 4, count: 19 },
    { rating: 3, count: 9 },
    { rating: 2, count: 2 },
    { rating: 1, count: 0 },
  ]

  // const review_with_photo = [
  //   {
  //     id_customer: 132321,
  //     customer_name: 'user that deleted on staging',
  //     avatar_image:
  //       'https://lavender.prestisa.id/assets/images/customer_app/icon/akunprofile.png',
  //     image: [
  //       'https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic1271551821.jpg',
  //       'https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic1784072775.jpg',
  //       'https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic2025167354.jpg',
  //     ],
  //     date: '2022-07-25',
  //     date_epoch: 1658760498,
  //     rating: 5,
  //     ulasan: 'Kecepatan pengiriman baik',
  //   },
  //   {
  //     id_customer: 132321,
  //     customer_name: 'user that deleted on staging',
  //     avatar_image:
  //       'https://lavender.prestisa.id/assets/images/customer_app/icon/akunprofile.png',
  //     image: [
  //       'https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic1353090725.jpg',
  //       'https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic925681929.jpg',
  //       'https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic1538185826.jpg',
  //     ],
  //     date: '2022-07-25',
  //     date_epoch: 1658761252,
  //     rating: 5,
  //     ulasan: 'Kecepatan pengiriman baik',
  //   },
  // ]

  const product_id = props.route.params.product_id

  // console.log('data dari trans: ', props.route.params.data.product_id)

  const jumlah = listRating.reduce((a, b) => +a + +b.count, 0)

  const fetchData = async () => {
    setloading(true)
    // const url =
    //   Config.API_URL + `/customer-app/product-ratings?product_id=38657`
    const url =
      Config.API_URL + `/customer-app/product-ratings?product_id=${product_id}`

    await axios
      .get(url)
      .then(response => {
        setdata(response.data.data)
        console.log('Hasil response rating', response.data.data)
        setloading(false)
      })
      .catch(({ response }) => {
        console.log('Hasil response rating ERROR: ', response.data.data)

        setloading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const RatingStarRow = () => {
    return (
      <View style={[Layout.row, { flexWrap: 'wrap' }]}>
        <TouchableOpacity style={styles.ratingButton}>
          <Text>Semua {data.total_review}</Text>
        </TouchableOpacity>
        {listRating.map((rating, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[Layout.row, styles.ratingButton]}
            >
              <View
                style={{
                  //   width: 100,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                }}
              >
                {[...Array(5 - index)].map((star, index2) => {
                  return (
                    <Icon
                      name="star"
                      style={{
                        // alignSelf: 'flex-start',
                        fontSize: 16,
                        color: Colors.neutralGrayUnknown,
                      }}
                    ></Icon>
                  )
                })}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const RatingStarDetail = ({ data_detail }) => {
    const total_rating_detail = []
    const keys = Object.keys(data_detail)

    keys.forEach((key, index) => {
      total_rating_detail.push({ rating: key, count: data_detail[key] })
    })

    console.log('total_rating_detail: ', total_rating_detail.slice(0).reverse())

    return (
      <View style={[]}>
        {total_rating_detail
          .slice(0)
          .reverse()
          .map((item, index) => {
            return (
              <View key={index} style={[Layout.row, { alignItems: 'center' }]}>
                <View
                  style={{
                    width: 100,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                  }}
                >
                  {[...Array(5 - index)].map((star, index2) => {
                    return (
                      <Icon
                        name="star"
                        style={{
                          alignSelf: 'flex-start',
                          fontSize: 16,
                          color: Colors.neutralGrayUnknown,
                        }}
                      ></Icon>
                    )
                  })}
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      height: 10,
                      width: '100%',
                      borderRadius: 10,
                      overflow: 'hidden',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      backgroundColor: Colors.neutralGrayBlue,
                    }}
                  >
                    <View
                      style={{
                        width:
                          (rating.count / data.total_rating == 0 && 1) * 100 +
                          '%',
                        height: 10,
                        borderRadius: 10,

                        backgroundColor: Colors.primary,
                      }}
                    ></View>
                  </View>
                </View>
                <View style={{ width: 30, marginLeft: 20 }}>
                  <Text>{item.count}</Text>
                </View>
              </View>
            )
          })}
      </View>
    )
  }

  const [selectedIndex, setselectedIndex] = useState(0)

  return (
    <ScrollView style={[styles.screen, Layout.fill]}>
      <View style={[{ alignItems: 'center' }]}>
        <View style={[{ alignItems: 'center' }]}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {data.avg_rating}
          </Text>
          <View>
            <RatingStar size={30} rate={data.avg_rating} />
          </View>
          <Text>{data.total_rating} Rating</Text>
        </View>

        {/* Rating Detail */}

        <View
          style={{
            width: '100%',
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderBottomColor: Colors.neutralGrayBlue,
            borderBottomWidth: 2,
          }}
        >
          {loading == false && (
            <RatingStarDetail data_detail={data.total_rating_detail} />
          )}
        </View>
      </View>
      <View style={[styles.container]}>
        <Text>Ulasan Pembeli</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <RatingStarRow></RatingStarRow>
        </View>
      </View>
      <View style={[{}]}>
        {loading == false &&
          data.rating_with_review.map((item, index) => {
            return <ReviewCard key={index} data={item} />
          })}
        {/* <ReviewCard data={data} /> */}
        {/* <ReviewCard data={data} /> */}

        {/* <ReviewCard />
        <ReviewCard />
        <ReviewCard /> */}
      </View>
      <ModalLoadingCenter show={loading} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutralGrayBlue,
  },
  ratingButton: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    borderColor: Colors.neutralGray03,
    borderWidth: 1,
    marginRight: 10,
    marginTop: 10,
  },
  foto: {
    flexDirection: 'row',
    marginRight: 10,
    paddingRight: 10,
  },
})
export default RatingContainer
