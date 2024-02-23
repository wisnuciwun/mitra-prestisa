import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import Svg, { Path, Defs, G } from 'react-native-svg'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from '../Base/Spacer'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'

const CardVoucher = ({
  borderColor = Colors.primary,
  holeEdgeWidth = 15,
  radiusOuter = 0,
  isDiscount,
  isShipping,
  title = 'Title title title',
  subtitle = 'Subtitle subtitle subtitle',
  footerText = 'Footer text footer text',
  bgColor = '#F7F9FA',
  numberVoucher = 99,
  onPressSeeDetail,
  disable = false,
  active = false,
}) => {
  const { width } = Dimensions.get('window')
  const bgCardVoucher = '#F7F9FA'
  const bgCardVoucherShadow = Colors.neutralGray05
  const height = Math.floor((128 / 374) * 100)
  const marginH = 24
  const borderWidth = 2

  return (
    <View style={{ position: 'relative' }}>
      <View
        style={{
          position: 'absolute',
          marginHorizontal: 24,
          zIndex: 2,
          top: 2,
          left: holeEdgeWidth + 15,
          height: 116,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            // backgroundColor: 'cyan',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              {
                height: 36,
                width: 36,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              },
              active && { backgroundColor: '#BD7A86' },
              disable && { backgroundColor: Colors.neutralGray03 },
            ]}
          >
            {isShipping && (
              <FeatherIcon size={18} name={`truck`} color={Colors.white} />
            )}
            {isDiscount && (
              <FastImage
                source={Assets.icon_discount_2_white_3x}
                style={{ height: 24, width: 24 }}
              />
            )}
          </View>
          <Spacer width={18} />
          <View>
            <Text
              style={[
                {
                  fontSize: 15,
                  fontFamily: Fonts.medium,
                  lineHeight: 24,
                },
                active && { color: Colors.neutralBlack01 },
                disable && { color: Colors.neutralGray02 },
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                {
                  fontSize: 13,
                  fontFamily: Fonts.medium,
                  lineHeight: 20,
                },

                active && { color: Colors.neutralGray01 },
                disable && {
                  color: Colors.neutralGray02,
                  fontFamily: Fonts.regular,
                },
              ]}
            >
              Min. Pembelian Rp{subtitle}
            </Text>
            <Spacer height={6} />
            <TouchableOpacity onPress={onPressSeeDetail}>
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontFamily: Fonts.medium,
                    lineHeight: 20,
                  },
                  active && { color: Colors.otherBlue },
                  disable && { color: Colors.neutralGray03 },
                ]}
              >
                Lihat Detail
              </Text>
            </TouchableOpacity>
            <Spacer height={6} />
            <Text
              style={[
                {
                  fontSize: 12,
                  fontFamily: Fonts.regular,
                  lineHeight: 20,
                },
                active && { color: Colors.neutralGray01 },
                disable && { color: Colors.neutralGray02 },
              ]}
            >
              Hingga {footerText}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          {
            position: 'absolute',
            right: marginH + borderWidth + 25,
            bottom: 13,
            zIndex: 2,
            paddingHorizontal: 7,
            paddingVertical: 2,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          },
          active && { backgroundColor: '#D5E29F' },
          disable && { backgroundColor: Colors.neutralGray04 },
        ]}
      >
        <Text
          style={[
            {
              fontSize: 12,
              fontFamily: Fonts.medium,
              lineHeight: 15,
            },
            active && { color: Colors.neutralBlack02 },
            disable && { color: Colors.neutralGray02 },
          ]}
        >
          x{numberVoucher}
        </Text>
      </View>
      <View style={{}}>
        <View style={{ zIndex: 0, top: 0, position: 'absolute' }}>
          <CardVoucherOutline
            borderColor={borderColor}
            holeEdgeWidth={holeEdgeWidth}
            radiusOuter={radiusOuter}
            active={active}
            disable={disable}
          />
        </View>
        <View style={{ zIndex: 0, top: 2 }}>
          <CardVoucherInner
            borderColor={borderColor}
            holeEdgeWidth={holeEdgeWidth}
            radiusOuter={radiusOuter}
            bgColor={bgColor}
            active={active}
            disable={disable}
          />
        </View>
      </View>
    </View>
  )
}

export default CardVoucher

const CardVoucherInner = ({
  borderColor = Colors.primary,
  bgColor = '#BD7A86',
  holeEdgeWidth = 20,
  radiusOuter = 4,
  active = false,
  disable = false,
}) => (
  <View
    style={[
      {
        height: 116,

        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 26,
        borderRadius: radiusOuter,
      },
      active && { backgroundColor: bgColor },
      disable && { backgroundColor: '#F0F0F0' },
    ]}
  >
    <View
      style={{
        position: 'absolute',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: Dimensions.get('window').width - 48,
      }}
    >
      <View
        style={[
          {
            height: 22,
            width: holeEdgeWidth,
            backgroundColor: Colors.white,
            marginLeft: 0,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderTopWidth: 2,
          },
          active && {
            borderRightColor: borderColor,
            borderTopColor: borderColor,
            borderBottomColor: borderColor,
            borderBottomColor: borderColor,
          },
          disable && {
            borderRightColor: '#F0F0F0',
            borderTopColor: '#F0F0F0',
            borderBottomColor: '#F0F0F0',
            borderBottomColor: '#F0F0F0',
          },
        ]}
      />
      <View
        style={[
          {
            height: 22,
            width: holeEdgeWidth,
            backgroundColor: Colors.white,
            marginRight: 0,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderTopWidth: 2,
          },
          active && {
            borderLeftColor: borderColor,
            borderTopColor: borderColor,
            borderBottomColor: borderColor,
            borderBottomColor: borderColor,
          },
          disable && {
            borderLeftColor: '#F0F0F0',
            borderTopColor: '#F0F0F0',
            borderBottomColor: '#F0F0F0',
            borderBottomColor: '#F0F0F0',
          },
        ]}
      />
    </View>
  </View>
)

const CardVoucherOutline = ({
  borderColor = Colors.primary,
  holeEdgeWidth = 20,
  radiusOuter = 6,
  active = false,
  disable = false,
}) => (
  <View
    style={[
      {
        height: 120,
        // width: 364,
        //   backgroundColor: '#F7F9FA',
        // backgroundColor: borderColor,
        position: 'relative',
        justifyContent: 'center',
        marginHorizontal: 24,
        borderRadius: radiusOuter + 2,
      },
      active && { backgroundColor: borderColor },
      disable && { backgroundColor: '#F0F0F0' },
    ]}
  >
    <View
      style={{
        // position: 'absolute',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: Dimensions.get('window').width - 48,
      }}
    >
      <View
        style={{
          height: 22,
          width: holeEdgeWidth,
          backgroundColor: Colors.white,
          marginLeft: -2,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View
        style={{
          height: 22,
          width: holeEdgeWidth,
          backgroundColor: Colors.white,
          marginRight: -2,
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({})

// const V3 = (
//   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//     <View style={{ position: 'relative' }}>
//       {/* <View> */}
//       {Platform.OS != 'ios' && (
//         <Svg
//           width={width - 0}
//           height="128"
//           viewBox={`-1 -1 100 100`}
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           style={[{ position: 'absolute' }]}
//         >
//           <G filter="url(#filter0_d_1186_46325)">
//             <Path
//               d="M4 2V52.9764H8.41667C13.6725 52.9764 17.25 56.631 17.25 62C17.25 67.369 13.6725 71.0236 8.41667 71.0236H4V122H368V71.0236H363.583C358.327 71.0236 354.75 67.369 354.75 62C354.75 56.631 358.327 52.9764 363.583 52.9764H368V2H4Z"
//               fill={bgCardVoucherShadow}
//             />
//           </G>
//         </Svg>
//       )}
//       {/* </View> */}
//       <Svg
//         width={width - 0}
//         height="128"
//         viewBox={`0 0 100 100`}
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         //   style={[shadowBg.v1]}
//         style={[Platform.OS === 'ios' && shadowBg.v1, { position: 'relative' }]}
//       >
//         <G filter="url(#filter0_d_1186_46325)">
//           <Path
//             d="M4 2V52.9764H8.41667C13.6725 52.9764 17.25 56.631 17.25 62C17.25 67.369 13.6725 71.0236 8.41667 71.0236H4V122H368V71.0236H363.583C358.327 71.0236 354.75 67.369 354.75 62C354.75 56.631 358.327 52.9764 363.583 52.9764H368V2H4Z"
//             fill={bgCardVoucher}
//           />
//         </G>
//       </Svg>
//     </View>
//   </View>
// )

// const V1 = (
//   <Svg
//     width="372"
//     height="128"
//     viewBox="0 0 372 128"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <G filter="url(#filter0_d_1186_46301)">
//       <Path
//         d="M4 2V52.9764H8.41667C13.6725 52.9764 17.25 56.631 17.25 62C17.25 67.369 13.6725 71.0236 8.41667 71.0236H4V122H368V71.0236H363.583C358.327 71.0236 354.75 67.369 354.75 62C354.75 56.631 358.327 52.9764 363.583 52.9764H368V2H4Z"
//         fill="#F7F9FA"
//       />
//       <Path
//         d="M8.41667 51.9764H5V3H367V51.9764H363.583C360.716 51.9764 358.241 52.978 356.481 54.7753C354.723 56.5708 353.75 59.0894 353.75 62C353.75 64.9106 354.723 67.4292 356.481 69.2247C358.241 71.022 360.716 72.0236 363.583 72.0236H367V121H5V72.0236H8.41667C11.2836 72.0236 13.7595 71.022 15.5189 69.2247C17.2765 67.4292 18.25 64.9106 18.25 62C18.25 59.0894 17.2765 56.5708 15.5189 54.7753C13.7595 52.978 11.2836 51.9764 8.41667 51.9764Z"
//         stroke="#991F5D"
//         stroke-width="2"
//       />
//     </G>
//     <Defs>
//       <Filter
//         id="filter0_d_1186_46301"
//         x="0"
//         y="0"
//         width="372"
//         height="128"
//         filterUnits="userSpaceOnUse"
//         color-interpolation-filters="sRGB"
//       >
//         <feFlood flood-opacity="0" result="BackgroundImageFix" />
//         <feColorMatrix
//           in="SourceAlpha"
//           type="matrix"
//           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//           result="hardAlpha"
//         />
//         <feOffset dy="2" />
//         <feGaussianBlur stdDeviation="2" />
//         <feComposite in2="hardAlpha" operator="out" />
//         <feColorMatrix
//           type="matrix"
//           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
//         />
//         <feBlend
//           mode="normal"
//           in2="BackgroundImageFix"
//           result="effect1_dropShadow_1186_46301"
//         />
//         <feBlend
//           mode="normal"
//           in="SourceGraphic"
//           in2="effect1_dropShadow_1186_46301"
//           result="shape"
//         />
//       </Filter>
//     </Defs>
//   </Svg>
// )

// <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//       <View style={{ position: 'relative' }}>
//         {/* <View> */}
//         {Platform.OS != 'ios' && (
//           <Svg
//             width={width - 0}
//             height="128"
//             viewBox={`-1 -1 ${width} 128`}
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             style={[{ position: 'absolute' }]}
//           >
//             <G filter="url(#filter0_d_1186_46325)">
//               <Path
//                 d="M4 2V52.9764H8.41667C13.6725 52.9764 17.25 56.631 17.25 62C17.25 67.369 13.6725 71.0236 8.41667 71.0236H4V122H368V71.0236H363.583C358.327 71.0236 354.75 67.369 354.75 62C354.75 56.631 358.327 52.9764 363.583 52.9764H368V2H4Z"
//                 fill={bgCardVoucherShadow}
//               />
//             </G>
//           </Svg>
//         )}
//         {/* </View> */}
//         <Svg
//           width={width - 0}
//           height="128"
//           viewBox={`0 0  ${width} 128`}
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           //   style={[shadowBg.v1]}
//           style={[
//             Platform.OS === 'ios' && shadowBg.v1,
//             { position: 'relative' },
//           ]}
//         >
//           <G filter="url(#filter0_d_1186_46325)">
//             <Path
//               d="M4 2V52.9764H8.41667C13.6725 52.9764 17.25 56.631 17.25 62C17.25 67.369 13.6725 71.0236 8.41667 71.0236H4V122H368V71.0236H363.583C358.327 71.0236 354.75 67.369 354.75 62C354.75 56.631 358.327 52.9764 363.583 52.9764H368V2H4Z"
//               fill={bgCardVoucher}
//             />
//           </G>
//         </Svg>
//       </View>
//     </View>
