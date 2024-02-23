import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { minutes, loopNumber, MARGIN_H } from './MakeOrder/Helper'
import { hoursDisable, getTimeZoneIndo } from './MakeOrder/Helper'
import { Colors, Fonts } from '@/Theme/Variables'
import WheelPicker from '../Helper/wheelPicker'
import moment from 'moment'
import _ from 'lodash'

export const Clock = ({
  onSetHours,
  onSetMinutes,
  disable4Hours,
  isAddTime = () => {},
  validateFormTime = false,
  valueTimeH,
  valueTimeM,
}) => {
  const [inputTimeHours, setInputTimeHours] = useState(false)
  const [inputTimeMinutes, setInputTimeMinutes] = useState(false)
  const [doublePressTime, setDoublePressTime] = useState(0)
  const widthBoxTimeItem = 44
  const textColorTimeitem = Colors.neutralBlack01
  const momHour = moment().hour()
  const momMin = moment().minute()
  const [indexTimeHours, setIndexTimeHours] = useState(momHour + 24)
  const [indexTimeMinutes, setIndexTimeMinutes] = useState(momMin + 60)
  const [disableTimeHours, setDisableTimeHours] = useState([])
  const [addTime, setAddTime] = useState(momHour + ':' + momMin)
  const [dataHours, setDataHours] = useState(loopNumber(0, 23))
  const [dataMinutes, setDataMinutes] = useState(minutes)

  const [isDisableColorHours, setIsDisableColorHours] = useState(true)
  const [isValTimeH, setIsValTimeH] = useState(validateFormTime)
  const [isValTimeM, setIsValTimeM] = useState(validateFormTime)

  const findElement = (array, value) => {
    return array.findIndex(element => element == value) != -1 ? true : false
  }

  const handleInputTimeHours = () => {
    // let t = new Date().getTime() - doublePressTime
    // if (t < 300) {
    // setInputTimeHours(true)
    // }
    // setDoublePressTime(new Date().getTime())
  }

  const handleInputTimeMinutes = () => {
    // let t = new Date().getTime() - doublePressTime
    // if (t < 300) {
    // setInputTimeMinutes(true)
    // }
    // setDoublePressTime(new Date().getTime())
  }

  const handleOnChangeWheelHours = index => {
    setIndexTimeHours(index + 24)
    // onSetHours(dataHours[index + 24])
    onSetHours(dataHours[index])
    isAddTime(isDisableColorHours)
  }

  const handleOnChangeWheelMinutes = index => {
    setIndexTimeMinutes(index + 60)
    onSetMinutes(dataMinutes[index + 60])
    isAddTime(isDisableColorHours)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setInputTimeHours(false)
      setInputTimeMinutes(false)
    })
  }, [])

  useEffect(() => {
    disable4Hours &&
      setDisableTimeHours(hoursDisable(disable4Hours, 1, momHour + 4, momHour))
  }, [disable4Hours])

  useEffect(() => {
    setDataHours([...loopNumber(0, 23), ...dataHours, ...loopNumber(0, 23)])
  }, [indexTimeHours])

  useEffect(() => {
    setDataMinutes([...minutes, ...dataMinutes, ...minutes])
  }, [indexTimeMinutes])

  useEffect(() => {
    setIsDisableColorHours(
      findElement(disableTimeHours, dataHours[indexTimeHours]),
    )
  }, [indexTimeHours])

  /**
   *
   * Caused Warning:
   * Please report: Excessive number of pending callbacks: 501.
   * Some pending callbacks that might have leaked by never being called from native code:
   * {"1033368":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033377":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033388":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033397":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033408":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033417":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033428":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033437":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033448":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033457":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033468":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033477":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033488":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033497":{"module":"NativeAnimatedModule","method":"getValue"},
   * "1033508":{"module":"NativeAnimatedModule","...(truncated keys)...":451}
   */
  // useEffect(() => {
  // if (validateFormTime) {
  // setTimeout(() => {
  // console.log('SETTT')
  // const _time = valueTime.split(':')
  // setIndexTimeHours(_time[0])
  // setIndexTimeMinutes(_time[1])
  // }, 100)
  // }/
  // }, [validateFormTime])

  const styleBoxTime = StyleSheet.create({
    container: {
      width: widthBoxTimeItem,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    text: {
      width: widthBoxTimeItem,
      fontFamily: Fonts.medium,
      color: textColorTimeitem,
      fontSize: 18,
      textAlign: 'center',
    },
  })

  /**
   *
   *Inside Body Component
   */
  const BoxTimeHours = ({
    focus = false,
    bgColor = Colors.white,
    withBorder = true,
    isInput = false,
  }) => {
    return (
      <View
        style={[
          styleBoxTime.container,
          { backgroundColor: bgColor },
          withBorder && { borderWidth: 2 },
          focus
            ? { borderColor: '#0654B9' }
            : { borderWidth: 1, borderColor: bgColor },
        ]}
      >
        {isInput ? (
          <TextInput
            defaultValue="22"
            keyboardType="number-pad"
            style={[styleBoxTime.text]}
          />
        ) : (
          <WheelPicker
            options={dataHours}
            onChange={index => {
              handleOnChangeWheelHours(index)
              setIsValTimeH(false)
            }}
            selectedIndex={isValTimeH ? valueTimeH : indexTimeHours}
            itemStyle={[styleBoxTime.container, { backgroundColor: bgColor }]}
            itemTextStyle={[
              styleBoxTime.text,
              disable4Hours &&
                isDisableColorHours && {
                  color: Colors.neutralGray02,
                },
            ]}
            itemProps={{
              onLongPress: () => {
                handleInputTimeHours()
              },
              delayLongPress: 1200,
            }}
          />
        )}
      </View>
    )
  }
  const BoxTimeDivider = ({ text }) => {
    return (
      <View style={[styleBoxTime.container]}>
        <Text style={[styleBoxTime.text]}>{text}</Text>
      </View>
    )
  }

  const BoxTimeMinutes = ({
    focus = false,
    bgColor = Colors.white,
    withBorder = true,
    isInput = false,
  }) => {
    return (
      <View
        style={[
          styleBoxTime.container,
          { backgroundColor: bgColor },
          withBorder && { borderWidth: 2 },
          focus
            ? { borderColor: '#0654B9' }
            : { borderWidth: 1, borderColor: bgColor },
        ]}
      >
        {isInput ? (
          <TextInput
            defaultValue="22"
            keyboardType="number-pad"
            style={[styleBoxTime.text]}
          />
        ) : (
          <WheelPicker
            options={dataMinutes}
            onChange={index => {
              handleOnChangeWheelMinutes(index)
              setIsValTimeM(false)
            }}
            selectedIndex={isValTimeM ? valueTimeM : indexTimeMinutes}
            itemStyle={[styleBoxTime.container, { backgroundColor: bgColor }]}
            itemTextStyle={[styleBoxTime.text]}
            itemProps={{
              onLongPress: () => {
                handleInputTimeMinutes()
              },
              delayLongPress: 1200,
            }}
          />
        )}
      </View>
    )
  }

  return (
    <View
      style={{
        height: 68,
        width: 249,
        backgroundColor: '#C5DFEE',
        flexDirection: 'row',
        borderRadius: 6,
      }}
      onResponderEnd={() => console.log('TEST')}
      onTouchCancel={() => console.log('TOUCH CANCEL')}
    >
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: MARGIN_H,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <BoxTimeHours text={`22`} isInput={inputTimeHours} />
        <BoxTimeDivider
          text={`:`}
          width={45}
          bgColor={`transparent`}
          withBorder={false}
        />
        <BoxTimeMinutes text={`22`} isInput={inputTimeMinutes} />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <View
          style={{
            width: 44,
            height: 32,
            backgroundColor: Colors.neutralBlack01,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.medium,
              color: Colors.white,
              lineHeight: 20,
            }}
          >
            {getTimeZoneIndo(new Date().getTimezoneOffset())}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
