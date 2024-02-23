import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalBottom from '../Base/ModalBottom'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from '../Base/Spacer'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  reMapFilterPeriode,
  reMapFilterTypePoint,
  isRangeDatePeriode,
} from './Helper'
import {
  data_filter_periode as filterPeriod,
  data_filter_type_point,
} from './DummyData'
import _, { isNaN, isNull, isUndefined, lastIndexOf, set } from 'lodash'
import ButtonBottomFloating from '../ButtonBottomFloating'
import ButtonBase from '../Base/ButtonBase'
import { useDispatch, useSelector } from 'react-redux'
import {
  setPointFilterTypeMasuk,
  setPointFilterPeriodeMasuk,
  setPointFilterPeriodeKeluar,
  setPointFilterPeriodeSemua,
  clearPointFilterPeriodeMasuk,
  clearPointFilterPeriodeKeluar,
  clearPointFilterPeriodeSemua,
} from '@/Store/pointFilter'
import {
  add,
  eachDayOfInterval,
  format,
  isTomorrow,
  isYesterday,
  startOfDay,
  startOfToday,
} from 'date-fns'
import moment from 'moment'
import {
  endOfMonth,
  endOfWeek,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfTomorrow,
  startOfWeek,
} from 'date-fns'
import { ScrollView, Dimensions } from 'react-native'
import TextTouchable from '../RingkasanPesanan/TextTouchable'

const ModalBottomFilter = ({
  isVisible,
  onClose,
  data,
  catName,
  onChangePeriode = () => {},
  onChangeTypePoint = () => {},
  onPressApplied,
}) => {
  const [dataPeriode, setDataPeriode] = useState([])
  const handleOnChangePeriode = periode => {
    setDataPeriode(periode)
  }

  return (
    <ModalBottom isVisible={isVisible} heightModal={null}>
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 81,
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <FeatherIcon name={'x'} size={24} color={Colors.neutralBlack02} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
              }}
            >
              Filter
            </Text>
          </View>
          <Spacer width={24} />
        </View>

        {!isNull(data) && (
          <PointTypeCheckBoxListGroup
            data={data}
            onChangeTypePoint={values => {
              onChangeTypePoint(values)
            }}
          />
        )}
        <Spacer height={20} />
        <PeriodeTabs
          cat={catName}
          onChangePeriode={periode => {
            handleOnChangePeriode(periode)
            onChangePeriode(periode)
          }}
          dataPeriode={dataPeriode}
        />
      </View>
      <Spacer height={100} />
      <ButtonBottomFloating
        isTouchComp={true}
        touchableComp={() => (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <ButtonBase
              title="Atur Ulang"
              mode="outline"
              textColorTypeOutline={
                dataPeriode.length >= 1
                  ? Colors.neutralGray01
                  : Colors.neutralGray04
              }
              textStyle={{ fontFamily: Fonts.medium }}
              istextStyle={true}
              stylesDisable={{ backgroundColor: 'transparent' }}
              style={{ borderWidth: 0 }}
              disable={dataPeriode.length >= 1 ? false : true}
            />
            <ButtonBase
              title="Terapkan"
              textStyle={{ fontFamily: Fonts.medium }}
              istextStyle={true}
              disable={dataPeriode.length >= 1 ? false : true}
              onPress={onPressApplied}
            />
          </View>
        )}
      />
    </ModalBottom>
  )
}

export default ModalBottomFilter

const styles = StyleSheet.create({})

/**
 *
 * Small Components
 */
const PointTypeCheckBoxListGroup = ({ data, onChangeTypePoint = () => {} }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [dataTypePoint, setDataTypePoint] = useState(data)
  const [pointCatBool, setPointCatBool] = useState(false)

  const handlePressCheckBox = i => {
    const arr = [...dataTypePoint]
    arr[i]['selected'] = !arr[i]['selected']
    setDataTypePoint(arr)
    setPointCatBool(arr[i]['selected'])
    // dispatch(
    //   setPointFilterTypeMasuk(_.filter(dataTypePoint, { selected: true })),
    // )
  }

  useEffect(() => {
    onChangeTypePoint(_.filter(dataTypePoint, { selected: true }))
  }, [_.filter(dataTypePoint, { selected: true }).length])

  return (
    <View>
      <Text
        style={{ fontSize: 16, fontFamily: Fonts.medium, color: '#404040' }}
      >
        Jenis Point
      </Text>
      <Spacer height={12} />
      {dataTypePoint.map((e, i) => (
        <CheckBoxList
          {...e}
          index={i}
          key={i}
          onPress={() => handlePressCheckBox(i)}
        />
      ))}
    </View>
  )
}

const CheckBoxList = ({ onPress, ...props }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 41,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.selected ? (
          <Ionicons
            name="checkbox"
            size={26}
            color={Colors.primary}
            style={{ marginLeft: 1 }}
          />
        ) : (
          <View
            style={{
              height: 21.5,
              width: 21.5,
              borderRadius: 4,
              borderWidth: 1.5,
              borderColor: Colors.neutralGray02,
            }}
          />
        )}
      </TouchableOpacity>
      <Spacer width={10} />
      <Text
        style={{
          fontFamily: Fonts.regular,
          fontSize: 16,
          color: '#565656',
        }}
      >
        {props.name}
      </Text>
    </View>
  )
}

const PeriodeTabs = ({ cat, onChangePeriode = () => {}, dataPeriode }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const _dataPeriod = reMapFilterPeriode(filterPeriod)
  const [dataFilterPeriode, setDataFilterPeriode] = useState(_dataPeriod)
  const [showCalendar, setShowCalendar] = useState(false)

  const [dataFilterRangePeriode, setDataFilterRangePeriode] = useState([])
  const [dataFilterPilihTanggal, setDataFilterPilihTanggal] = useState([])
  const [indexdTabPeriode, setIndexdTabPeriode] = useState(0)

  const handleSelectTabDate = () => {
    setShowCalendar(!showCalendar)
  }

  const handleOnChangePilihTanggalPlaceHolder = () => {
    if (indexdTabPeriode == 2) {
      const _tanggal = dataFilterPilihTanggal
      const _length = _tanggal.length

      const _placeholder = () => {
        if (_length == 1) {
          return format(_tanggal[0], 'dd MMM yyyy')
        } else if (_length > 1) {
          return `${format(_tanggal[0], 'dd MMM yyyy')} - ${format(
            _tanggal[_tanggal.length - 1],
            'dd MMM yyyy',
          )}`
        } else if (_length == 0) {
          return 'Pilih Tanggal'
        }
      }

      const _arr = [...dataFilterPeriode]
      _arr[2]['name'] = _placeholder()
      setDataFilterPeriode(_arr)
    }
  }

  const handleRemoveSetPilihTanggal = () => {
    const _arr = [...dataFilterPeriode]
    _arr[2]['name'] = 'Pilih Tanggal'

    setDataFilterPeriode(_arr)
  }

  const handleOnPressTabPeriode = i => {
    const arr = [...dataFilterPeriode]

    arr.map((_e, _i) =>
      i === _i
        ? (arr[_i]['selected'] = !arr[_i]['selected'])
        : (arr[_i]['selected'] = false),
    )
    setDataFilterPeriode(arr)
    const n = arr
    const nFilter = _.filter(arr, { selected: true })
    const nData = Object.assign({}, ..._.filter(arr, { selected: true })).data
    const nId = Object.assign({}, ..._.filter(arr, { selected: true })).id

    nId - 1 == 2 ? handleSelectTabDate() : setShowCalendar(false)
    setIndexdTabPeriode(isNaN(nId - 1) ? 0 : nId - 1)

    setDataFilterRangePeriode(isUndefined(nData) ? [] : nData)
    dispatch(setPointFilterPeriodeMasuk(isUndefined(nData) ? [] : nData))

    // setPointFilterPeriodeMasuk(
    //   Object.assign({}, ..._.filter(dataFilterPeriode, { selected: true }))
    //     .data,
    // )
    // dispatch(
    //   setPointFilterPeriodeMasuk(
    //     Object.assign({}, ..._.filter(dataFilterPeriode, { selected: true }))
    //       .data,
    //   ),
    // )
  }

  const handleOnChangeRangeDatePeriode = range => {
    setDataFilterRangePeriode(range)
    setDataFilterPilihTanggal(range)
  }

  useEffect(() => {
    onChangePeriode(dataFilterRangePeriode)
  }, [dataFilterRangePeriode.length])

  useEffect(() => {
    handleOnChangePilihTanggalPlaceHolder()
  }, [dataFilterPilihTanggal.length])

  // other solusion to reset placeholder PilihTanggal Tab
  useEffect(() => {
    handleRemoveSetPilihTanggal()
  }, [indexdTabPeriode])

  return (
    <View>
      <Text
        style={{ fontSize: 16, fontFamily: Fonts.medium, color: '#404040' }}
      >
        Periode
      </Text>
      <Spacer height={12} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {dataFilterPeriode.map((e, i) => (
          <View
            key={i}
            style={{ marginRight: i === 3 ? 0 : 20, marginBottom: 12 }}
          >
            <ButtonOval
              text={
                i == 2 && dataPeriode.length == 0 ? 'Pilih Tanggal' : e.name
              }
              key={i}
              selected={e.selected}
              onPress={() => {
                handleOnPressTabPeriode(i)
              }}
            />
          </View>
        ))}
      </View>
      {showCalendar && (
        <Calendar
          onSetDate={date => console.log('DATE', date)}
          onChangeRangeDatePeriode={range =>
            handleOnChangeRangeDatePeriode(range)
          }
        />
      )}
    </View>
  )
}

const ButtonOval = ({
  onPress,
  text = 'Buttonnn',
  selected,
  disable,
  disableColor = Colors.neutralGray03,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <View
        style={[
          {
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderWidth: 1,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          },
          !selected
            ? {
                backgroundColor: Colors.white,
                borderColor: Colors.neutralGray01,
              }
            : { backgroundColor: Colors.primary, borderColor: Colors.primary },
          disable && { borderColor: disableColor },
        ]}
      >
        <Text
          style={[
            {
              fontFamily: Fonts.medium,
              fontSize: 15,
              lineHeight: 24,
              textAlign: 'center',
              textTransform: 'capitalize',
            },
            !selected
              ? { color: Colors.neutralBlack02 }
              : { color: Colors.neutralGray07 },
            disable && { color: disableColor },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const Calendar = ({
  onSetDate = () => {},
  onChangeRangeDatePeriode = () => {},
}) => {
  const today = startOfToday()
  const nameDays = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
  const [selectedDay, setSelectedDay] = useState(today)
  const [startDatePeriode, setStartDatePeriode] = useState(null)
  const [endDatePeriode, setEndDatePeriode] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date())

  const _date = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }
  const prevMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }

  const handleOnPressRemoveRange = () => {
    setStartDatePeriode(null)
    setEndDatePeriode(null)
    setSelectedDay(null)
  }

  useEffect(() => {
    onChangeRangeDatePeriode(
      isNull(startDatePeriode)
        ? []
        : eachDayOfInterval({
            start: startDatePeriode,
            end: isNull(endDatePeriode) ? startDatePeriode : endDatePeriode,
          }),
    )
  }, [selectedDay])

  /**
   *
   * Component Inside Body
   */
  const SqueareText = ({
    text = 'SEN',
    sameDay,
    sameMonth,
    boolDayName,
    equal,
    day,
    selected,
    tomorrow,
    yesterday,
    isStartDatePeriode,
    isEndDatePeriode,
    isOnRange,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDay(day)
          if (yesterday) {
            setEndDatePeriode(day)
          } else {
            setStartDatePeriode(day)
          }
          // onSetDate(day)
        }}
        disabled={boolDayName}
      >
        <View
          style={[
            {
              height: 37.13 + 8.25,
              width: 37.13 + 8.25,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12.88,
              borderRadius: 1000,
              // backgroundColor: 'green',
            },

            // equal &&
            //   !sameDay && {
            //     backgroundColor: Colors.neutralBlack01,
            //   },

            isStartDatePeriode && {
              borderRadius: 0,
              marginRight: 0,
              borderTopLeftRadius: 1000,
              borderBottomLeftRadius: 1000,
            },
            isEndDatePeriode && {
              borderRadius: 0,
              borderTopRightRadius: 1000,
              borderBottomRightRadius: 1000,
            },
            isOnRange && {
              backgroundColor: '#E7F4FE',
              borderRadius: 0,
              height: 37.13 + 8.25,
            },
          ]}
        >
          <Text
            style={[
              {
                lineHeight: 23,
                fontFamily: Fonts.regular,
                fontSize: 14,
              },

              !equal &&
                !sameDay &&
                !sameMonth && { color: Colors.neutralGray03 },

              equal &&
                sameDay && { color: Colors.error, fontFamily: Fonts.bold },

              boolDayName && {
                color: Colors.neutralBlack02,
                fontSize: 12,
              },

              isStartDatePeriode && {
                backgroundColor: '#1294F2',
                borderRadius: 1000,
                height: 37.13 + 8.25,
                width: 37.13 + 8.25,
                textAlignVertical: 'center',
                textAlign: 'center',
                color: Colors.white,
              },
              isEndDatePeriode && {
                backgroundColor: '#1294F2',
                borderRadius: 1000,
                height: 37.13 + 8.25,
                width: 37.13 + 8.25,
                textAlignVertical: 'center',
                textAlign: 'center',
                color: Colors.white,
              },
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        width: 328,
        height: 348,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spacer width={72} />
        <TouchableOpacity
          onPress={() => prevMonth()}
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FeatherIcon
            name="chevron-left"
            size={30}
            color={Colors.neutralBlack02}
          />
        </TouchableOpacity>
        <View
          style={{ width: 130, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.medium,
              lineHeight: 22.9,
              color: Colors.neutralBlack02,
            }}
          >
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => nextMonth()}
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FeatherIcon
            name="chevron-right"
            size={30}
            color={Colors.neutralBlack02}
          />
        </TouchableOpacity>
        <Spacer width={22} />
        <TextTouchable
          text="Hapus"
          textStyles={{
            width: 50,
            fontSize: 13,
            color: Colors.primary,
            textAlign: 'center',
          }}
          onPress={handleOnPressRemoveRange}
        />
      </View>
      <Spacer height={0} />
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 8.25 }}
      >
        {nameDays.map((e, i) => (
          <SqueareText key={e.toString()} text={e} boolDayName={true} />
        ))}
      </View>
      <ScrollView style={{}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: 8.25,
            alignItems: 'center',
          }}
        >
          {_date.map((item, i) => (
            <SqueareText
              day={item}
              key={item.toString()}
              text={format(item, 'd')}
              equal={isEqual(item, selectedDay)}
              sameDay={isSameDay(item, today)}
              sameMonth={isSameMonth(item, firstDayCurrentMonth)}
              selected={isToday(item)}
              tomorrow={isTomorrow(selectedDay)}
              isStartDatePeriode={isSameDay(item, startDatePeriode)}
              isEndDatePeriode={isSameDay(item, endDatePeriode)}
              yesterday={isBefore(selectedDay, item)}
              isOnRange={isRangeDatePeriode(
                startDatePeriode,
                endDatePeriode,
                item,
              )}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
