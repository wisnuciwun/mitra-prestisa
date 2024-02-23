import { Dimensions, StyleSheet } from 'react-native'

/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#4D4D4D',
  primary: '#991F5D',
  success: '#28a745',
  error: '#dc3545',
  neutralGrayBlue: '#EBEDF1',
  neutralGray01: '#6C6C6C',
  neutralGray02: '#898989',
  neutralGray03: '#B6B6B6',
  neutralGray04: '#D0CFCF',
  neutralGray05: '#e5e5e5',
  neutralGray06: '#F0F0F0',
  neutralGray07: '#F7F7F7',
  neutralGray08: '#f5f5f5',
  neutralGrayUnknown: '#AEAEAE',
  neutralBlack01: '#1D1619',
  neutralBlack02: '#4D4D4D',
  otherBlue: '#0654B9',
  otherBlue02: '#3F93FF',
  otherRed: '#CB3A31',
  otherOrange: '#D17575',
  otherGreen01: '#1F811E',
  otherGreenBg: '#C6ECC6',
  otherYellow: '#FFF3CD',
}

export const NavigationColors = {
  primary: Colors.primary,
}

/**
 *
 * Font Family
 */

export const Fonts = {
  bold: 'Roboto-Bold',
  boldItalic: 'Roboto-BoldItalic',
  italic: 'Roboto-Italic',
  light: 'Roboto-Light',
  lightItalic: 'Roboto-LightItalic',
  black: 'Roboto-Black',
  blackItalic: 'Roboto-BlackItalic',
  medium: 'Roboto-Medium',
  mediumItalic: 'Roboto-MediumItalic',
  regular: 'Roboto-Regular',
  thin: 'Roboto-Thin',
  thinItalic: 'Roboto-ThinItalic',
}

/**
 * FontSize
 */
export const FontSize = {
  tiny: 12,
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

/**
 *
 * ALIGNMENT
 */
export const SIZES = {
  margin_h: 24,
  width_window: Dimensions.get('window').width,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
