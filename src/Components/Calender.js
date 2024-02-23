import React, { useState } from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  nextDay,
  parse,
  previousDay,
  startOfMonth,
  startOfToday,
  startOfTomorrow,
  startOfWeek,
} from 'date-fns'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from './Base/Spacer'

const HEIGHT_WINDOW = Dimensions.get('window').height

export const Calendar = ({ onSetDate }) => {
  const today = startOfToday()
  const lusaDay = add(startOfTomorrow(), { days: 1 })
  const nameDays = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
  const [selectedDay, setSelectedDay] = useState(today)
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

  const checkBool = async (params1, params2) => {
    try {
      return isSameMonth(
        add(params1, { months: -1 }),
        add(params2, { months: -1 }),
      )
    } catch (e) {
      console.log('ERROR', new Error(e).message({ params1, params2 }))
    }
  }

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
    yesterday,
    selected,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDay(day)
          onSetDate(day)
        }}
        disabled={!yesterday}
      >
        <View
          style={[
            {
              height: 37.13,
              width: 37.13,
              //   backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8.25,
              marginTop: 12.88,
              borderRadius: 1000,
            },
            equal &&
              !sameDay && {
                backgroundColor: Colors.neutralBlack01,
              },
            equal && sameDay && { backgroundColor: Colors.error },
          ]}
        >
          <Text
            style={[
              {
                lineHeight: 23,
                fontFamily: Fonts.regular,
                fontSize: 14,
              },
              !yesterday && { color: Colors.neutralGray03 },
              equal &&
                !sameDay && {
                  color: Colors.white,
                },
              !equal &&
                !sameDay &&
                !sameMonth && { color: Colors.neutralGray03 },
              equal &&
                sameDay && { color: Colors.white, fontFamily: Fonts.bold },
              !equal && sameDay && { color: Colors.error },
              //   equal && sameMonth && { color: Colors.neutralBlack02 },
              boolDayName && { color: Colors.neutralBlack02, fontSize: 12 },
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
        // backgroundColor: 'red',
        width: 328,
        height: 348,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            checkBool(firstDayCurrentMonth, today)
              .then(res => {
                !res && prevMonth()
              })
              .catch(err => {
                console.log('_ERR', err)
              })
          }}
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'green',
          }}
        >
          <FeatherIcon
            name="chevron-left"
            size={24}
            color={Colors.neutralBlack02}
          />
        </TouchableOpacity>
        <View>
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
            // backgroundColor: 'green',
          }}
        >
          <FeatherIcon
            name="chevron-right"
            size={24}
            color={Colors.neutralBlack02}
          />
        </TouchableOpacity>
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
            // backgroundColor: 'red',
          }}
        >
          {_date.map((item, i) => (
            <SqueareText
              day={item}
              key={item.toString()}
              text={format(item, 'd')}
              equal={isEqual(item, selectedDay)}
              sameDay={isSameDay(item, today)}
              yesterday={isBefore(startOfTomorrow(), item)}
              sameMonth={isSameMonth(item, firstDayCurrentMonth)}
              selected={isToday(item)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
