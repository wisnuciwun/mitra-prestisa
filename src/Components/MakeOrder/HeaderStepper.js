import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors, Fonts } from '@/Theme/Variables'
import Spacer from '../Base/Spacer'
import PropTypes from 'prop-types'
import { MARGIN_H, WIDTH_WINDOW as WIDTH } from './Helper'
import FeatherIcon from 'react-native-vector-icons/Feather'

/**
 *
 *
 * Main Component: Header Stepper
 * @params {text, onPress, innerCircleColor, numberColor}:
 * conditions :
 *  1. Steper 1 (Default Setup):
 *    - Pengiriman: active
 *    - Penerima: inactive
 *    - Ucapan: inactive
 *    - Pemesanan: inactive
 *  2. Steper 2:
 *    - Pengiriman: active(checked)
 *    - Penerima: active
 *    - Ucapan: inactive
 *    - Pemesanan: inactive
 *  3. Steper 3:
 *    - Pengiriman: active(checked)
 *    - Penerima: active(checked)
 *    - Ucapan: active
 *    - Pemesanan: inactive
 */
const HeaderStepper = ({
  onPressPrev,
  onPressOne,
  onPressTwo,
  onPressThree,
  activeOne,
  activeTwo,
  activeThree,
  isCheckedOne,
  isCheckedTwo,
  isCheckedThree,
  step,
}) => {
  /**
   *
   * Inside Body Component: StepperContainer, Stepper
   */
  const StepperContainer = ({ renderStepper }) => {
    return (
      <View
        style={{
          position: 'relative',
          zIndex: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ position: 'absolute', zIndex: 1, top: 18 }}>
          <DashLine />
        </View>
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            zIndex: 2,
            width: WIDTH - MARGIN_H * 2,
            justifyContent: 'center',
          }}
        >
          {React.createElement(renderStepper)}
        </View>
      </View>
    )
  }

  const Stepper = ({ step }) => {
    switch (step) {
      case 2:
        return (
          <StepperContainer
            renderStepper={() => (
              <>
                <ButtonCircleTextColumn
                  number={1}
                  text={`Pengiriman`}
                  active={activeOne}
                  isChecked={isCheckedOne}
                  onPress={onPressOne}
                  disablePress={false}
                />
                <ButtonCircleTextColumn
                  number={2}
                  text={`Penerima`}
                  active={activeTwo}
                  isChecked={isCheckedTwo}
                  onPress={onPressTwo}
                  disablePress={false}
                />
                <ButtonCircleTextColumn
                  number={3}
                  text={`Ucapan`}
                  active={activeThree}
                  isChecked={isCheckedThree}
                  onPress={onPressThree}
                  disablePress={false}
                />
              </>
            )}
          />
        )
      case 3:
        return (
          <StepperContainer
            renderStepper={() => (
              <>
                <ButtonCircleTextColumn
                  text={`Pengiriman`}
                  active={activeOne}
                  isChecked={isCheckedOne}
                  onPress={onPressOne}
                  disablePress={false}
                />
                <ButtonCircleTextColumn
                  text={`Penerima`}
                  number={`2`}
                  active={activeTwo}
                  isChecked={isCheckedTwo}
                  onPress={onPressTwo}
                  disablePress={false}
                />
                <ButtonCircleTextColumn
                  text={`Ucapan`}
                  active={activeThree}
                  isChecked={isCheckedThree}
                  number={step}
                  onPress={onPressThree}
                  disablePress={false}
                />
              </>
            )}
          />
        )
      default:
        return (
          <StepperContainer
            renderStepper={() => (
              <>
                <ButtonCircleTextColumn
                  number={1}
                  text={`Pengiriman`}
                  active={activeOne}
                  isChecked={isCheckedOne}
                  onPress={onPressOne}
                  disablePress={false}
                />
                <ButtonCircleTextColumn
                  number={2}
                  text={`Penerima`}
                  active={activeTwo}
                  isChecked={isCheckedTwo}
                  onPress={onPressTwo}
                  disablePress={false}
                />
                <ButtonCircleTextColumn
                  number={3}
                  text={`Ucapan`}
                  active={activeThree}
                  isChecked={isCheckedThree}
                  onPress={onPressThree}
                  disablePress={false}
                />
              </>
            )}
          />
        )
    }
  }

  return <Stepper step={step} />
}

export default HeaderStepper

const styles = StyleSheet.create({})

/**
 *
 *
 * Small Component:
 * - ButtonCirlceTextColumn, @params {text, onPress, innerCircleColor, numberColor}:
 *    conditions :
 *      - component active:
 *         1.textcolor = 'white'
 *         2.numberColor = 'white'
 *         3.backgroundColor = 'primary'
 *         4.borderColor = 'primary'
 *      - component inactive:
 *         1.textcolor = `neutralBlack02`
 *         2.numberColor = `neutralGrey01`
 *         3.backgroundColor = 'white'
 *         4.borderColor = numberColor
 */
const ButtonCircleTextColumn = ({
  number,
  text = 'Texttexttext',
  isChecked,
  onPress,
  active,
  disablePress = true,
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
      }}
    >
      <View
        style={[
          {
            width: 36,
            height: 36,
            borderRadius: 1000,
            justifyContent: 'center',
            alignItems: 'center',
          },
          isChecked &&
            !active && {
              backgroundColor: Colors.white,
            },
          isChecked &&
            active && {
              backgroundColor: Colors.white,
            },
          !isChecked &&
            !active && {
              backgroundColor: Colors.white,
            },
          !isChecked &&
            active && {
              borderColor: 'purple',
            },
        ]}
      >
        <TouchableOpacity onPress={onPress} disabled={disablePress}>
          <View
            style={[
              {
                height: 32,
                width: 32,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1000,
              },
              isChecked &&
                !active && {
                  borderColor: Colors.primary,
                  backgroundColor: Colors.primary,
                },
              isChecked &&
                active && {
                  borderColor: Colors.primary,
                  backgroundColor: Colors.primary,
                },
              !isChecked &&
                !active && {
                  borderColor: Colors.neutralGray01,
                  backgroundColor: Colors.white,
                },
              !isChecked &&
                active && {
                  backgroundColor: Colors.primary,
                  borderColor: 'purple',
                },
            ]}
          >
            {isChecked && (
              <FeatherIcon name="check" size={20} color={Colors.white} />
            )}

            {!isChecked && active && (
              <Text
                style={[
                  {
                    fontFamily: Fonts.medium,
                    fontSize: 15,
                    lineHeight: 24,
                    textAlign: 'center',
                  },
                  { color: Colors.white },
                ]}
              >
                {number}
              </Text>
            )}
            {!isChecked && !active && (
              <Text
                style={[
                  {
                    fontFamily: Fonts.medium,
                    fontSize: 15,
                    lineHeight: 24,
                    textAlign: 'center',
                  },
                  { color: Colors.neutralGray01 },
                ]}
              >
                {number}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Spacer height={10} />
      <Text
        style={[
          {
            width: 72,
            fontFamily: Fonts.regular,
            fontSize: 13,
            lineHeight: 16,
            textAlign: 'center',
            //   backgroundColor: 'red',
          },
          isChecked &&
            !active && {
              color: Colors.primary,
            },
          isChecked &&
            active && {
              color: Colors.primary,
            },
          !isChecked &&
            !active && {
              color: Colors.neutralBlack02,
            },
          !isChecked &&
            active && {
              color: Colors.primary,
            },
        ]}
      >
        {text}
      </Text>
    </View>
  )
}

const DashLine = ({ width = 5, color = Colors.neutralGray03 }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(20)].map((_, i) => (
        <View
          style={{
            backgroundColor: color,
            height: 1,
            width: width,
            marginRight: 3,
          }}
          key={i}
        ></View>
      ))}
    </View>
  )
}
