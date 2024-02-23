import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { useTheme } from '@/Hooks'

const Brand = ({ height, width, mode, tipe }) => {
  const { Layout, Images } = useTheme()

  return (
    <View>
      <Image
        style={{ width, height }}
        source={tipe == 'color' ? Images.logo_color : Images.logo}
        resizeMode={mode}
      />
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
  tipe: PropTypes.oneOf(['color', 'white']),
}

Brand.defaultProps = {
  height: 70,
  mode: 'contain',
  width: 230,
  tipe: 'color',
}

export default Brand
