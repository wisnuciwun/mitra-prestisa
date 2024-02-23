import { Assets } from '@/Theme/Assets'

export const listNavItems1st = [
  {
    name: 'Profil',
    source: 'user',
    screen: 'Profile',
    isSvg: true,
  },
  {
    name: 'Point Saya',
    source: Assets.icon_coin_grey_3x,
    screen: 'MyPoints',
    isSvg: false,
  },
  {
    name: 'Alamat Tersimpan',
    source: Assets.icon_building_house_grey_3x,
    screen: 'AccountSavedAddress',
    isSvg: false,
  },
  {
    name: 'Reward Station',
    source: 'gift',
    screen: 'UnderConstruction',
    isSvg: true,
  },
  {
    name: 'Voucher Promo',
    source: Assets.icon_discount_grey_3x,
    screen: 'AccountVoucherPromo',
    isSvg: false,
  },
  {
    name: 'Pengaturan Notifikasi',
    source: 'bell',
    screen: 'NotificationSettings',
    isSvg: true,
  },
]

export const listNavItems2nd = [
  {
    name: 'Tentang Prestisa',
    source: Assets.icon_flower_lotus_grey_3x,
    screen: 'AboutPrestisa',
    isSvg: false,
  },
  {
    name: 'Syarat & Ketentuan',
    source: 'clipboard',
    screen: 'SyaratKetentuanContainer',
    isSvg: true,
  },
  {
    name: 'Pusat Bantuan',
    source: Assets.icon_headset_grey_3x,
    screen: 'PusatBantuanHome',
    isSvg: false,
  },
]
