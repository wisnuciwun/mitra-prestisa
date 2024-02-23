const addColorStatus = (id = Int) => {
  /**
   *
   * parent_id: 3
   *      child:[4,5,6,7]
   *
   * parent_id: 8
   *      child: [9,10]
   *
   * parent_id: 11
   *      child: [12,13,14]
   *
   * parent_id: 15
   *      child: [16]
   *
   * parent_id: 17
   *      child:[18,19]
   */
  const yellow = { textColor: '#7B3F07', textBg: '#FBE19E' }
  const red = { textColor: '#CB3A31', textBg: '#FEF2F1' }
  const green = { textColor: '#096B08', textBg: '#C6ECC6' }
  const black = { textColor: 'black', textBg: 'black' }

  switch (id) {
    case 2: // menunggu pembayaran
      return yellow
    case 4: // menunggu konfirmasi
      return yellow
    case 5: // dirangkai
      return yellow
    case 6: // preview produk
      return yellow
    case 7: // revisi produk
      return yellow
    case 9: // dalam perjalanan
      return yellow
    case 10: // pesanan tiba
      return yellow
    case 12: // komplain diajukan
      return red
    case 13: // komplain diproses
      return red
    case 14: // komplain terselesaikan
      return green
    case 16: // selesai
      return green
    case 18: // dibatalkan
      return red
    case 19: // pembayaran gagal
      return red
    default:
      return black
  }
}

const addNav = (id = Int) => {
  switch (id) {
    case 2:
      return {
        title: 'Pembayaran',
        name: 'XenditWebView',
        isNav: true,
      }
    case 6:
      return { title: 'Lihat Preview', name: 'PreviewProduk', isNav: true }
    case 7:
      return { title: 'Konfirmasi Revisi', name: 'RevisiProduk', isNav: true }
    case 9:
      return {
        title: 'Tracking Pesanan',
        name: 'Tracking',
        isNav: true,
      }
    case 10:
      return {
        title: 'Lihat Bukti Foto',
        name: null,
        isNav: false,
        component: () => {},
      }
    case 13:
      return {
        title: 'Detail Komplain',
        name: 'DetailKomplain',
        isNav: true,
      }
    case 14:
      return {
        title: 'Selesaikan Pesanan',
        name: null,
        isNav: false,
        component: () => {},
      }
    case 16:
      return {
        title: 'Tracking Pesanan',
        name: 'Tracking',
        isNav: true,
      }
    default:
      return { title: '', name: '' }
  }
}

export const manipulateDataForAccordion = (arr = Array) => {
  return arr.map((e, i) => {
    if (arr.length > 1) {
      return {
        isExpanded: false,
        name: e.name,
        index_list: i + 1,
        status: e.order_status.replace(/_/g, ' '),
        status_text_color: addColorStatus(e.status_id).textColor,
        status_text_bg: addColorStatus(e.status_id).textBg,
        nav: addNav(e.status_id),
        data: e,
      }
    } else if (arr.length > 0 && arr.length == 1) {
      return {
        isExpanded: false,
        name: e.name,
        index_list: i + 1,
        status: e.order_status.replace(/_/g, ' '),
        status_text_color: addColorStatus(e.status_id).textColor,
        status_text_bg: addColorStatus(e.status_id).textBg,
        nav: addNav(e.status_id),
        data: e,
      }
    }
  })
}
