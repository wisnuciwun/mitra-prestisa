import { StyleSheet } from 'react-native'
import { Colors } from './Variables'

/**
 *
 * STYLES
 */
export const STYLES = StyleSheet.create({
  shadow_bottom: {
    shadowColor: Colors.neutralGray03,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.43,
    shadowRadius: 4,
  },
  shadow_top: {
    shadowColor: Colors.neutralGray03,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.43,
    shadowRadius: 4,
  },
  shadow_no: {
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.43,
    shadowRadius: 4,
  },
})
