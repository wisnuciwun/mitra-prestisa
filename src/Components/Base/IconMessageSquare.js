import React from 'react'
import Svg, { Path } from 'react-native-svg'

const IconMessageSquare = ({ color = 'red', size = 24, stroke = 1.6 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.42773 6.85718H17.142"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <Path
        d="M7.28516 10.7142H14.5709"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default IconMessageSquare
