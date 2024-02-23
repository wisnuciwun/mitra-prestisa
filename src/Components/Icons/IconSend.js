import { Colors } from '@/Theme/Variables'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const IconSend = ({ size = 92, color = Colors.white, stroke = 2 }) => {
  return (
    <Svg
      width={size + 1}
      height={size}
      viewBox="0 0 93 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M84.5913 7.92871L42.5669 49.9644"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M84.5912 7.92871L57.8484 84.3573L42.5667 49.9644L8.18311 34.6787L84.5912 7.92871Z"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconSend
