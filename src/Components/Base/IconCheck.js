import { Colors } from '@/Theme/Variables'
import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

const IconCheck = ({ color = Colors.otherGreen01 }) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="10.335" cy="10.335" r="8.335" fill={color} />
      <Path
        d="M14.2727 8L9.27273 13L7 10.7273"
        stroke="#F7F7F7"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default IconCheck
