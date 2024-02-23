import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useTheme } from '@/Hooks'
import { TouchableOpacity } from 'react-native'
import { Colors, Fonts } from '@/Theme/Variables'
import LinearGradient from 'react-native-linear-gradient'

const ButtonBase = ({
  leftIcon,
  mode,
  children,
  style,
  title,
  onPress,
  disable,
  loading,
  colorTextDisable = Colors.white,
  textColorTypeOutline = Colors.primary,
  borderStyle = {},
  istextStyle = false,
  stylesDisable = {
    backgroundColor: Colors.neutralGray03,
  },
  colorLoading = 'white',
  sizeLoading = 'large',
  textStyle,
}) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  return (
    <>
      {mode !== 'gradient' ? (
        <TouchableOpacity
          disabled={disable}
          onPress={onPress}
          style={[
            mode == 'outline' ? Common.button.outline : Common.button.base,
            style,
            disable == true ? stylesDisable : {},
            borderStyle,
            // styles.full,
          ]}
        >
          <View style={[Layout.row, { alignItems: 'center' }]}>
            {leftIcon}
            <Text
              style={[
                mode == 'outline'
                  ? styles.textColor(textColorTypeOutline)
                  : styles.textWhite(colorTextDisable),
                istextStyle && textStyle,
              ]}
            >
              {loading == false ? (
                title
              ) : (
                <ActivityIndicator
                  size={sizeLoading}
                  style={[Gutters.regularVMargin]}
                  color={colorLoading}
                />
              )}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 6.0 }}
            locations={[0, 0.6]}
            colors={['#b72e67', '#4f174ccb']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  )
}

ButtonBase.propTypes = {
  mode: PropTypes.oneOf(['color', 'outline', 'gradient', 'noutline']),
  disable: PropTypes.bool,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
}

ButtonBase.defaultProps = {
  mode: 'color',
  disable: false,
  loading: false,
}
const base = {
  fontSize: 16,
  elevation: 10,
}
const textColor = color => ({
  ...base,
  color: color,
  fontFamily: Fonts.regular,
  fontWeight: '400',
})
const textWhite = colorTextDisable => ({
  ...base,
  color: colorTextDisable,
  fontFamily: Fonts.regular,
  fontWeight: '400',
})

const styles = StyleSheet.create({
  full: { ...base, alignSelf: 'stretch' },
  textColor,
  textWhite,
  button: {
    // marginTop: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    ...textWhite,
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.medium,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  disable: {
    backgroundColor: Colors.neutralGray03,
  },
})

export default ButtonBase
