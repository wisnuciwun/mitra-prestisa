import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { StyleSheet } from 'react-native'

export const main = StyleSheet.create({
  mediumText: {
    fontFamily: Fonts.medium,
    fontSize: 20,
    color: Colors.white,
    lineHeight: 24,
  },
})

export const header = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 2 },
  avatar: { backgroundColor: Colors.otherOrange, padding: 18 },
  textTamu: { ...main.mediumText, textTransform: 'capitalize', marginTop: 16 },
  textName: {
    ...main.mediumText,
    textTransform: 'capitalize',
    marginTop: 16,
    textAlign: 'center',
    marginHorizontal: SIZES.margin_h,
  },
  textJoined: {
    ...main.mediumText,
    textTransform: 'capitalize',
    fontSize: 12,
    color: Colors.neutralGray07,
  },
})

export const eP = StyleSheet.create({
  textTitle: {
    marginHorizontal: SIZES.margin_h,
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.neutralGray07,
    lineHeight: 20,
  },
})

export const ePOff = StyleSheet.create({
  container: {
    marginTop: 8,
    backgroundColor: '#FFFFFF40',
    marginHorizontal: SIZES.margin_h,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  text1Row: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.neutralGray06,
    lineHeight: 20,
  },
  text2Row: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.neutralGray06,
    lineHeight: 24,
  },
})

export const ePOn = StyleSheet.create({
  container: {
    marginTop: 8,
    backgroundColor: '#FFFFFF40',
    marginHorizontal: SIZES.margin_h,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col1st: { flexDirection: 'row' },
  textName: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.white,
    textTransform: 'capitalize',
  },
  textEP: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.white,
    textTransform: 'capitalize',
  },
  toucable: {
    fontSize: 13,
    color: Colors.neutralBlack02,
    backgroundColor: '#C9E8F2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 1000,
    overflow: 'hidden',
  },
})

export const buyer = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: SIZES.margin_h,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.neutralGray02,
    lineHeight: 22,
  },
})

export const general = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: SIZES.margin_h,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.neutralGray02,
    lineHeight: 22,
  },
})

export const logout = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: SIZES.margin_h,
    paddingHorizontal: 16,
    // paddingVertical: 16,
    borderRadius: 10,
  },
})

export const guest = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: SIZES.margin_h,
    paddingHorizontal: 16,
    paddingTop: 29,
    paddingBottom: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.neutralBlack02,
    marginBottom: 8,
  },
  desc: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.neutralGray01,
    marginBottom: 8,
    textAlign: 'center',
  },
  textTouch: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.primary,
    marginBottom: 8,
  },
})
