import { Fonts, Colors, SIZES } from '@/Theme/Variables'
import { StyleSheet } from 'react-native'

export const orderMain = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
})

export const loader = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const pemesan = StyleSheet.create({
  textName: {
    fontFamily: Fonts.bold,
    color: Colors.neutralBlack01,
    fontSize: 16,
    lineHeight: 24,
  },
  textPhone: {
    fontFamily: Fonts.regular,
    color: Colors.neutralBlack02,
    fontSize: 14,
    lineHeight: 24,
  },
  textEmail: {
    fontFamily: Fonts.regular,
    color: Colors.neutralBlack02,
    fontSize: 14,
    lineHeight: 24,
  },
})

export const informasiProduct = StyleSheet.create({
  textTitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.neutralBlack02,
  },
})

export const productDetail = StyleSheet.create({
  titleNotes: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.neutralBlack01,
  },
  containerNotes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 6,
    height: 33,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.neutralGray03,
  },
  textNotes: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.neutralBlack02,
  },
})

export const kataUcapan = StyleSheet.create({
  textUcapan: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.neutralBlack01,
    lineHeight: 20,
  },
  textPengirim: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.neutralGray01,
    lineHeight: 16,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRowLabel: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.neutralGray02,
    lineHeight: 16,
  },
  timeRowData: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.neutralBlack01,
    lineHeight: 16,
  },
  grandTotalLabel: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.neutralBlack01,
    lineHeight: 24,
  },
  grandTotalData: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.neutralBlack01,
    lineHeight: 24,
  },
})

export const pengiriman = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.neutralGray02,
    lineHeight: 16,
  },
  rowData: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.neutralBlack01,
    lineHeight: 16,
  },
  grandTotalLabel: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.neutralBlack01,
    lineHeight: 24,
  },
  grandTotalData: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.neutralBlack01,
    lineHeight: 24,
  },
})

export const ringkasanPembayaran = StyleSheet.create({
  titleRow: {
    ...pengiriman.row,
  },
  rowText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.neutralBlack01,
    lineHeight: 20,
  },
  timeRowData: {
    ...pengiriman.rowData,
  },
  grandTotalLabel: {
    ...pengiriman.grandTotalLabel,
  },
  grandTotalData: {
    ...pengiriman.grandTotalData,
  },
})

export const penerima = StyleSheet.create({
  textDataName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.neutralBlack01,
    textTransform: 'capitalize',
  },
  textDataAddress: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.neutralGray01,
  },
  textDataPhone: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.neutralGray01,
  },
})

export const diskon = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.margin_h,
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  firstCol1: { flexDirection: 'row', alignItems: 'center' },
  title: {
    color: Colors.neutralBlack01,
    fontFamily: Fonts.regular,
  },
  subtitle: {
    color: Colors.primary,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: Fonts.regular,
  },
})
export const footerPoint = StyleSheet.create({
  containerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textPoint: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.neutralBlack02,
  },
})
