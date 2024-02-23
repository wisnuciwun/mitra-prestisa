import { StyleSheet } from 'react-native'

export default function ({ Colors, Gutters, Layout }) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 50,
    borderRadius: 5,
    // alignSelf: 'stretch',
    // width: '100%',
    backgroundColor: Colors.primary,
  }
  const rounded = {
    ...base,
    borderRadius: 20,
  }

  return StyleSheet.create({
    base,
    rounded,
    disable: {
      ...base,
      backgroundColor: '#aaa',
    },
    outline: {
      ...base,
      borderRadius: 5,
      backgroundColor: Colors.transparent,
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 1,
      borderColor: Colors.primary,
    },
  })
}
