export const reMapCatTab = (data = Array, child1 = [], child2 = []) => {
  return data.map((e, i) => {
    return { ...e, selected: false, list_item: i == 0 ? child1 : child2 }
  })
}

export const reMapCatTabVoucherDetail = (
  data = Array,
  child1 = [],
  child2 = [],
) => {
  return data.map((e, i) => {
    return { ...e, selected: false, list_item: i == 0 ? child1 : child2 }
  })
}

export const reMapMyVouchers = (data = Array) => {
  return data.map((e, i) => {
    return {
      ...e,
      child: e.child.map((_e, _i) => {
        switch (_e.status_redeem) {
          case 'proses':
            return {
              ..._e,
              status_color_text: '#9F5D0F',
              status_bg_color: '#F8DE99',
            }
          case 'berhasil':
            return {
              ..._e,
              status_color_text: '#4C4DDC',
              status_bg_color: '#E6E6FA',
            }
          case 'gagal':
            return {
              ..._e,
              status_color_text: '#CB3A31',
              status_bg_color: '#FFF4F2',
            }
          default:
            return {
              ..._e,
              status_color_text: 'transparent',
              status_bg_color: 'transparent',
            }
        }
      }),
    }
  })
}
