import React from 'react'
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  ViewProps,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
} from 'react-native'
interface Props {
  selectedIndex: number
  options: string[]
  onChange: (index: number) => void
  selectedIndicatorStyle?: StyleProp<ViewStyle>
  itemTextStyle?: TextStyle
  itemStyle?: ViewStyle
  itemHeight?: number
  containerStyle?: ViewStyle
  containerProps?: Omit<ViewProps, 'style'>
  // selectedIndicatorProps?: Omit<ViewProps, 'style'>;
  rotationFunction?: (x: number) => number
  opacityFunction?: (x: number) => number
  visibleRest?: number
  decelerationRate?: 'normal' | 'fast' | number
  scrollEventThrottle?: number
  maxToRenderPerBatch?: number
  updateCellsBatchingPeriod?: number
  initialNumToRender?: number
  removeClippedSubviews?: boolean
  itemProps?: Omit<TouchableOpacityProps, 'style'>
}
declare const WheelPicker: React.FC<Props>
export default WheelPicker
