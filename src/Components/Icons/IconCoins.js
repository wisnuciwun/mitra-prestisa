import React from 'react'
import Svg, { Path, Rect, Defs, ClipPath, G } from 'react-native-svg'

const IconCoins = ({ color = '#898989', size = 14 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_1258_29248)">
        <Path
          d="M13.625 7.3125V9.5625C13.625 10.5375 11.2745 11.8125 8.375 11.8125C5.4755 11.8125 3.125 10.5375 3.125 9.5625V7.6875"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.34546 7.88223C3.99421 8.74323 6.00046 9.55099 8.37496 9.55099C11.2745 9.55099 13.625 8.34649 13.625 7.31148C13.625 6.73023 12.8847 6.09348 11.723 5.64648"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.375 3.5625V5.8125C11.375 6.7875 9.0245 8.0625 6.125 8.0625C3.2255 8.0625 0.875 6.7875 0.875 5.8125V3.5625"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.125 5.8005C9.0245 5.8005 11.375 4.596 11.375 3.561C11.375 2.52525 9.0245 1.3125 6.125 1.3125C3.2255 1.3125 0.875 2.52525 0.875 3.561C0.875 4.596 3.2255 5.8005 6.125 5.8005Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1258_29248">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconCoins
