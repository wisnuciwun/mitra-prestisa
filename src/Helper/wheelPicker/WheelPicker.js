'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const react_1 = __importStar(require('react'))
const react_native_1 = require('react-native')
const WheelPicker_styles_1 = __importDefault(require('./WheelPicker.styles'))
const WheelPickerItem_1 = __importDefault(require('./WheelPickerItem'))
const WheelPicker = ({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  itemHeight = 40,
  rotationFunction = x => 1 - Math.pow(1 / 2, x),
  opacityFunction = x => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = 'fast',
  scrollEventThrottle = 1,
  updateCellsBatchingPeriod = 50,
  maxToRenderPerBatch = 10,
  initialNumToRender = 10,
  removeClippedSubviews = false,
  containerProps = {},
  selectedIndicatorProps = {},
  itemProps = {},
}) => {
  const [scrollY] = (0, react_1.useState)(new react_native_1.Animated.Value(0))
  const containerHeight = (1 + visibleRest * 2) * itemHeight
  const paddedOptions = (0, react_1.useMemo)(() => {
    const array = [...options]
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null)
      array.push(null)
    }
    return array
  }, [options, visibleRest])
  const offsets = (0, react_1.useMemo)(
    () => [...Array(paddedOptions.length)].map((x, i) => i * itemHeight),
    [paddedOptions, itemHeight],
  )
  const currentScrollIndex = (0, react_1.useMemo)(
    () =>
      react_native_1.Animated.add(
        react_native_1.Animated.divide(scrollY, itemHeight),
        visibleRest,
      ),
    [visibleRest, scrollY, itemHeight],
  )
  const handleMomentumScrollEnd = event => {
    const offsetY = event.nativeEvent.contentOffset.y
    let index = Math.floor(Math.floor(offsetY) / itemHeight)
    const last = Math.floor(offsetY % itemHeight)
    if (last > itemHeight / 2) index++
    if (index !== selectedIndex) {
      onChange(index)
    }
  }
  return react_1.default.createElement(
    react_native_1.View,
    Object.assign(
      {
        style: [
          WheelPicker_styles_1.default.container,
          { height: containerHeight },
          containerStyle,
        ],
      },
      containerProps,
    ),
    react_1.default.createElement(react_native_1.View, {
      style: [
        WheelPicker_styles_1.default.selectedIndicator,
        selectedIndicatorStyle,
        {
          transform: [{ translateY: -itemHeight / 2 }],
          height: itemHeight,
        },
      ],
    }),
    react_1.default.createElement(react_native_1.Animated.FlatList, {
      style: WheelPicker_styles_1.default.scrollView,
      showsVerticalScrollIndicator: false,
      scrollEventThrottle: scrollEventThrottle,
      updateCellsBatchingPeriod: updateCellsBatchingPeriod,
      maxToRenderPerBatch: maxToRenderPerBatch,
      initialNumToRender: initialNumToRender,
      removeClippedSubviews: removeClippedSubviews,
      onScroll: react_native_1.Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      ),
      onMomentumScrollEnd: handleMomentumScrollEnd,
      snapToOffsets: offsets,
      decelerationRate: decelerationRate,
      initialScrollIndex: selectedIndex,
      getItemLayout: (data, index) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      }),
      data: paddedOptions,
      keyExtractor: (item, index) => index.toString(),
      renderItem: ({ item: option, index }) => {
        // console.log('OPTIONS', option)

        return react_1.default.createElement(WheelPickerItem_1.default, {
          key: `option-${index}`,
          index: index,
          option: option,
          style: itemStyle,
          textStyle: itemTextStyle,
          height: itemHeight,
          currentScrollIndex: currentScrollIndex,
          rotationFunction: rotationFunction,
          opacityFunction: opacityFunction,
          visibleRest: visibleRest,
          itemProps: itemProps,
        })
      },
    }),
  )
}
exports.default = WheelPicker
