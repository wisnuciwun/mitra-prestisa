import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import Spacer from '@/Components/Base/Spacer'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import LinearGradient from 'react-native-linear-gradient'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import IconFilter from '@/Components/Icons/IconFilter'
import Octicons from 'react-native-vector-icons/Octicons'
import {
  data_filter_type_point,
  my_points,
} from '@/Components/MyPoints/DummyData'
import moment from 'moment'
import { Divider } from '@rneui/base'
import { data } from '@/Components/TulisUlasan/DummyData'
import {
  addIsRedemeed,
  reMapFilterTypePoint,
  remapHistoryPoints,
} from '@/Components/MyPoints/Helper'
import ModalBottomPointDetail from '@/Components/MyPoints/ModalBottomPointDetail'
import ModalBottomFilter from '@/Components/MyPoints/ModalBottomFilter'
import _, { isNull, toString, uniqueId } from 'lodash'
import axios from 'axios'
import { Config } from '@/Config'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import { account } from '@/Helper/apiKit'
import { format, isDate } from 'date-fns'
import ModalBottomSort from '@/Components/MyPoints/ModalBottomSort'
import { setLogin } from '@/Store/loginSlice'

const MyPointsContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [point_id, setPoint_id] = useState(null)
  const [pointCatIndex, setPointCatIndex] = useState(0)
  const [pointCatName, setPointCatName] = useState('masuk')
  const [dataMyPoints, setDataMyPoints] = useState([])
  const [dataMyPointsRaw, setDataMyPointsRaw] = useState({
    total_point: '',
    point_redeemed: '',
    ep_points: [],
  })
  const [periodeFilter, setPeriodeFilter] = useState({
    from_date: '',
    to_date: '',
  })
  const [typePointId, setTypePointId] = useState([])
  const [sort, setSort] = useState('')
  const [payload, setPayload] = useState({
    type: [],
    from_date: '',
    to_date: '',
    sort: '',
  })
  const [uniqueTrigger, setUniqueTrigger] = useState(_.uniqueId())

  const [showModalBottomDetailPoint, setShowModalBottomDetailPoint] =
    useState(false)
  const [showModalBottomFilter, setShowModalBottomFilter] = useState(false)
  const [showModalBottomSort, setShowModalBottomSort] = useState(false)
  const [isLoadingXhr, setIsLoadingXhr] = useState(false)

  const handleShowModalBottomDetailPoint = () => {
    setShowModalBottomDetailPoint(!showModalBottomDetailPoint)
  }

  const handleShowModalBottomFilter = () => {
    setShowModalBottomFilter(!showModalBottomFilter)
  }

  const handleShowModalBottomSort = () => {
    setShowModalBottomSort(!showModalBottomSort)
  }

  const _dataTypePoint = () => {
    switch (pointCatIndex) {
      case 0:
        return reMapFilterTypePoint(
          _.filter(data_filter_type_point, o => o.id < 3 && o),
        )
      case 1:
        return null
      default:
        return reMapFilterTypePoint(data_filter_type_point)
    }
  }

  const filterCatPoint = () => {
    switch (pointCatName) {
      case 'masuk':
        return _.filter(dataMyPoints, { is_redeemed: false })
      case 'keluar':
        return _.filter(dataMyPoints, { is_redeemed: true })
      default:
        return dataMyPoints
    }
  }

  const handleOnPressTabCatPoint = (catName, catIdx) => {
    setPointCatName(catName)
    setPointCatIndex(catIdx)
  }

  const handleOnPressApplied = () => {
    setShowModalBottomFilter(false)
    setUniqueTrigger(_.uniqueId())
    setPayload({
      from_date: isDate(periodeFilter.from_date)
        ? moment(periodeFilter.from_date).format('YYYY-MM-DD')
        : moment(periodeFilter.from_date).format('YYYY-MM-DD'),
      to_date: isDate(periodeFilter.to_date)
        ? moment(periodeFilter.to_date).format('YYYY-MM-DD')
        : moment(periodeFilter.to_date).format('YYYY-MM-DD'),
      sort: sort,
      type: typePointId,
    })
  }

  const xhrGetMyPoints = payload => {
    setIsLoadingXhr(true)
    account
      .historyEp(payload)
      .then(({ data }) => {
        const user = {
          ...state.login.data.user,
          ep_points: data.data.total_point,
        }
        dispatch(setLogin({ ...state.login.data, user }))
        setDataMyPoints(addIsRedemeed(data.data.ep_points))
        setDataMyPointsRaw(data.data)
        setIsLoadingXhr(false)
      })
      .catch(err => {
        console.log('ERR_MY_POINTS', err)
        setIsLoadingXhr(false)
      })
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: '',
      isHeaderRight: true,
      colorArrowLeft: Colors.neutralGray07,
      headerRightComp: () => <TentangSaya />,
      headerTransparent: 'true',
    })
  }, [navigation])

  useEffect(() => {
    dataMyPoints.length != 0 && filterCatPoint()
    _dataTypePoint()
  }, [pointCatName, dataMyPoints.length])

  useEffect(() => {
    xhrGetMyPoints(payload)
  }, [uniqueTrigger])

  /**
   *
   * Inside Body Component: TentangSaya, Header
   */
  const TentangSaya = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SIZES.margin_h - 4,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: Colors.neutralGray06,
        }}
      >
        Tentang Point Saya
      </Text>
      <Spacer width={5} />
      <FeatherIcon name={'info'} size={12} color={Colors.neutralGray06} />
    </View>
  )

  const Header = props => (
    <LinearGradient
      start={{ x: 0.25, y: 0.5 }}
      end={{ x: 0.75, y: 0.5 }}
      locations={[0.0, 1.0]}
      colors={['#CC3776', '#4F174CB2']}
      style={{ height: 212 }}
      useAngle={true}
      angle={104.5}
    >
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <Spacer height={58} />
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: 32,
            color: Colors.white,
          }}
        >
          Point Saya
        </Text>
        <Spacer height={28} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <PointLayout
            isIconLeft={true}
            title="Total"
            num={props.total_point}
          />
          <View style={{ width: 2, height: 60, backgroundColor: '#FFFFFF' }} />
          <PointLayout title="Redeemed" num={props.point_redeemed} />
        </View>
      </View>
    </LinearGradient>
  )

  const RiwayatPoint = () => {
    return (
      <>
        <Spacer height={24} />
        <View style={{ marginHorizontal: SIZES.margin_h }}>
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: Colors.neutralGray01,
              fontSize: 18,
            }}
          >
            Riwayat Point
          </Text>
          <Spacer height={20} />
          <View style={{ flexDirection: 'row' }}>
            {['masuk', 'keluar', 'semua'].map((e, i) => (
              <TextTouchable
                text={e}
                textStyles={{
                  borderRadius: 16,
                  backgroundColor:
                    e === pointCatName ? Colors.primary : 'transparent',
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  color:
                    e === pointCatName
                      ? Colors.neutralGray07
                      : Colors.neutralBlack02,
                  overflow: 'hidden',
                  marginRight: i === 3 ? 0 : 8,
                  textTransform: 'capitalize',
                }}
                key={i}
                onPress={() => handleOnPressTabCatPoint(e, i)}
              />
            ))}
          </View>
        </View>
        <Spacer height={12} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            backgroundColor: '#F5F6F8',
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={handleShowModalBottomFilter}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 28,
                width: 99,
              }}
            >
              <IconFilter />
              <Spacer width={8} />
              <Text
                style={{
                  fontFamily: Fonts.medium,
                  fontSize: 14,
                  color: Colors.neutralGray01,
                }}
              >
                Filter
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: 1, height: 28, backgroundColor: '#6C6C6C' }} />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={handleShowModalBottomSort}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 28,
                width: 99,
              }}
            >
              <Text>Urutkan</Text>
              <Spacer width={8} />
              <Octicons
                name="arrow-switch"
                size={16}
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }]}>
      <ScrollView>
        <Header {...dataMyPointsRaw} />
        <RiwayatPoint />
        {isLoadingXhr ? (
          <LoadingIndicator />
        ) : (
          remapHistoryPoints(filterCatPoint()).map((e, i) => (
            <ListPoint
              key={i}
              index={i}
              onPress={() => {
                handleShowModalBottomDetailPoint()
                setPoint_id(e.id)
              }}
              data={filterCatPoint()}
              {...e}
            />
          ))
        )}
        <Spacer height={100} />
      </ScrollView>
      <ModalBottomPointDetail
        isVisible={showModalBottomDetailPoint}
        onClose={handleShowModalBottomDetailPoint}
        _id={point_id}
        dataPoints={dataMyPoints}
      />
      <ModalBottomFilter
        isVisible={showModalBottomFilter}
        onClose={handleShowModalBottomFilter}
        data={_dataTypePoint()}
        catName={pointCatName}
        onPressApplied={handleOnPressApplied}
        onChangePeriode={periode => {
          setPeriodeFilter({
            from_date: periode[0],
            to_date: periode[periode.length - 1],
          })
        }}
        onChangeTypePoint={type => {
          setTypePointId(type.map((e, i) => e.id))
        }}
      />
      <ModalBottomSort
        isVisible={showModalBottomSort}
        onClose={handleShowModalBottomSort}
        onChangeSort={data => {
          if (!isEmptyNullOrUndefined(data)) {
            setSort(data.value)
            setUniqueTrigger(uniqueId)
            setPayload({ ...payload, sort: data.value })
            setShowModalBottomSort(false)
          }
        }}
      />
    </View>
  )
}

export default MyPointsContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Components: PointLayout
 */
const PointLayout = ({
  title = 'Title',
  num = 999999999,
  isIconLeft = false,
}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: Colors.neutralGray05,
        }}
      >
        {title}
      </Text>
      <Spacer height={12} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isIconLeft && (
          <>
            <View
              style={{
                backgroundColor: '#E5B713',
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1000,
              }}
            >
              <FontAwesome5
                name={'star'}
                size={12}
                color={Colors.white}
                solid={true}
              />
            </View>
            <Spacer width={5} />
          </>
        )}
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 20,
                color: Colors.neutralGray07,
              }}
            >
              {numberWithCommas(num)}
            </Text>
          </View>
          <Spacer width={5} />
          <View
            style={{
              justifyContent: 'flex-end',
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 11,
                justifyContent: 'flex-end',
                color: Colors.neutralGray07,
              }}
            >
              points
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const ListPoint = ({ onPress, index, data, ...props }) => {
  return (
    <View style={{ paddingTop: 16 }}>
      <TouchableOpacity onPress={onPress}>
        <View style={{ marginHorizontal: SIZES.margin_h }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 12,
                color: Colors.neutralGray01,
              }}
            >
              {moment(props.date).format('DD MMM YYYY')}
            </Text>
            <Text
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                backgroundColor: props.status_color_bg,
                color: props.status_color_text,
                borderRadius: 6,
                overflow: 'hidden',
                fontSize: 12,
                fontFamily: Fonts.medium,
                textTransform: 'capitalize',
              }}
            >
              {props.status}
            </Text>
          </View>
          <Spacer height={12} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 14,
                color: props.color_status,
              }}
            >
              {props.point_name}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 14,
                color: Colors.neutralBlack02,
              }}
            >
              {props.is_redeemed ? '-' : '+'}
              {numberWithCommas(props.point_amount)}
            </Text>
          </View>
          <Spacer height={5} />
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 13,
              color: Colors.neutralGray02,
            }}
          >
            {props.point_info}
          </Text>
        </View>
        <Spacer height={12} />
      </TouchableOpacity>
      {index != data.length - 1 && (
        <Divider width={1} color={Colors.neutralGray06} />
      )}
    </View>
  )
}
