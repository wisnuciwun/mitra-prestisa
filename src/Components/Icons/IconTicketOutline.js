import React from 'react'
import Svg, { Path, Defs, G, ClipPath, Rect } from 'react-native-svg'

const IconTicketOutline = ({ size = 32, color = 'white' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_1258_29569)">
        <Path
          d="M6.27508 15.9978C6.27496 16.7332 5.99721 17.4415 5.49739 17.9809C4.99757 18.5204 4.31252 18.8513 3.57923 18.9075C3.5184 18.9123 3.46165 18.94 3.42034 18.9849C3.37903 19.0298 3.35623 19.0887 3.35649 19.1497L3.35428 23.0525C3.3543 23.1169 3.37991 23.1787 3.42549 23.2243C3.47108 23.2699 3.53289 23.2955 3.59735 23.2955L9.81459 23.2955C10.0439 23.2956 10.2702 23.2422 10.4753 23.1395C10.6806 23.0364 10.9071 22.9824 11.1368 22.9821C11.3666 22.9817 11.5933 23.0348 11.7989 23.1373C12.0042 23.24 12.2305 23.2935 12.46 23.2938L28.4026 23.2955C28.4671 23.2955 28.5289 23.2699 28.5745 23.2243C28.6201 23.1787 28.6457 23.1169 28.6457 23.0525L28.6457 19.1519C28.646 19.0909 28.6232 19.032 28.5819 18.9871C28.5406 18.9422 28.4838 18.9145 28.423 18.9097C27.6894 18.854 27.004 18.5233 26.5038 17.9837C26.0037 17.4442 25.7259 16.7356 25.7259 16C25.7259 15.2643 26.0037 14.5558 26.5038 14.0162C27.004 13.4767 27.6894 13.1459 28.423 13.0902C28.4838 13.0854 28.5406 13.0578 28.5819 13.0128C28.6232 12.9679 28.646 12.9091 28.6457 12.848L28.6457 8.94746C28.6457 8.883 28.6201 8.82118 28.5745 8.7756C28.5289 8.73002 28.4671 8.70441 28.4026 8.7044L12.4578 8.70395C12.2283 8.70417 12.002 8.75773 11.7967 8.8604C11.5914 8.96357 11.3649 9.01748 11.1351 9.01787C10.9054 9.01825 10.6787 8.96509 10.4731 8.86261C10.268 8.75999 10.0417 8.70657 9.81238 8.7066L3.59514 8.70661C3.53068 8.70662 3.46886 8.73223 3.42328 8.77781C3.3777 8.8234 3.35209 8.88521 3.35208 8.94967L3.35207 12.8502C3.35181 12.9113 3.37461 12.9701 3.41592 13.0151C3.45723 13.06 3.51398 13.0876 3.57481 13.0924C4.30813 13.1475 4.99364 13.4773 5.49427 14.016C5.9949 14.5546 6.27376 15.2624 6.27508 15.9978V15.9978Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <Path
          d="M11.136 21.3503L11.136 22.8096M11.136 17.4594L11.1364 18.4321M11.1364 13.5681L11.136 14.5408M11.136 9.1907V10.65"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1258_29569">
          <Rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0 32) rotate(-90)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconTicketOutline
