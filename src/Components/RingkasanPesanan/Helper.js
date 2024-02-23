import { numberWithCommas, numFormatter } from '@/Helper'
import { isArray } from 'lodash'

export const data_pemesan = {
  type: 'Informasi Pemesan',
  data: {
    name: 'Sofia Nara',
    phone: '0812-3456-7890',
    email: 'sofianara@email.com',
  },
}

export const data_ringkasan_pesan_multi_v1 = [
  {
    type: 'Informasi Pemesan',
    data: {
      name: 'Sofia Nara',
      phone: '0812-3456-7890',
      email: 'sofianara@email.com',
    },
  },
  info_data_product_multi_v1,
  {
    type: 'Diskon Applied',
    data: [
      {
        discount_ammount: 10000,
        type: 'pengiriman',
      },
    ],
  },
  {
    type: ' Ringkasan Pembayaran',
    data: [
      {
        harga_produk: 973000,
        total_ongkir: 80000,
        diskon: 10000,
        grand_total: 1043000,
      },
    ],
  },
]

export const data_ringkasan_pesan_multi_v2 = {
  pemesan: {
    type: 'Informasi Pemesan',
    data: {
      name: 'Sofia Nara',
      phone: '0812-3456-7890',
      email: 'sofianara@email.com',
    },
  },
  info_product: info_data_product_multi_v1,
  diskon: {
    type: 'Diskon Applied',
    data: [
      {
        discount_ammount: 10000,
        type: 'pengiriman',
      },
    ],
  },
  ringkasan_pembayaran: {
    type: ' Ringkasan Pembayaran',
    data: [
      {
        harga_produk: 973000,
        total_ongkir: 80000,
        diskon: 10000,
        grand_total: 1043000,
      },
    ],
  },
}

export const info_data_product_multi_v1 = {
  type: 'Informasi Product',
  total: 3,
  accordion: true, // @params true or false, when true, the data will be displayed in accordion
  data: [
    {
      isExpanded: false,
      name: 'Product Satu',
      id_product: 1,
      data: {
        product_info: {
          img_thumb: 'https://picsum.photos/200/300',
          name: 'Product Satu',
          price: 100000,
          ongkir: 10000,
          notes: 'Bunganya tolong jangan sampai rusak ketika sampai',
        },
        kata_ucapan: {
          ucapan: 'Selamat dan Sukses \nSania & Elon \nSemoga Bahagia Selalu',
          pengirim: 'PT. Bahagia Selalu Lalalala',
        },
        waktu_pengiriman: {
          date: '2020-01-01',
          time: '10:00',
        },
        penerima: {
          name: 'Sania Minyak',
          phone: '0812-3456-7890',
          address:
            'Jalan Parangtritis Gang Rama No. 1090, Danunegaran, Mantrijeron, 55143',
        },
      },
    },
    {
      isExpanded: false,
      name: 'Product Dua',
      id_product: 2,
      data: {
        product_info: {
          img_thumb: 'https://picsum.photos/200/300',
          name: 'Product Satu',
          price: 100000,
          ongkir: 10000,
          notes: 'Bunganya tolong jangan sampai rusak ketika sampai',
        },
        kata_ucapan: {
          ucapan: 'Selamat dan Sukses \nSania & Elon \nSemoga Bahagia Selalu',
          pengirim: 'PT. Bahagia Selalu Lalalala',
        },
        waktu_pengiriman: {
          date: '2020-01-01',
          time: '10:00',
        },
        penerima: {
          name: 'Sania Minyak',
          phone: '0812-3456-7890',
          address:
            'Jalan Parangtritis Gang Rama No. 1090, Danunegaran, Mantrijeron, 55143',
        },
      },
    },
    {
      isExpanded: false,
      name: 'Product Dua',
      id_product: 2,
      data: {
        product_info: {
          img_thumb: 'https://picsum.photos/200/300',
          name: 'Product Satu',
          price: 100000,
          ongkir: 10000,
          notes: 'Bunganya tolong jangan sampai rusak ketika sampai',
        },
        kata_ucapan: {
          ucapan: 'Selamat dan Sukses \nSania & Elon \nSemoga Bahagia Selalu',
          pengirim: 'PT. Bahagia Selalu Lalalala',
        },
        waktu_pengiriman: {
          date: '2020-01-01',
          time: '10:00',
        },
        penerima: {
          name: 'Sania Minyak',
          phone: '0812-3456-7890',
          address:
            'Jalan Parangtritis Gang Rama No. 1090, Danunegaran, Mantrijeron, 55143',
        },
      },
    },
  ],
}

export const info_data_product_single_v1 = {
  type: 'Informasi Product',
  total: 1,
  accordion: false, // @params true or false, when true, the data will be displayed in accordion
  data: [
    {
      isExpanded: false,
      name: 'Product Satu',
      id_product: 1,
      data: {
        product_info: {
          img_thumb: 'https://picsum.photos/200/300',
          name: 'Product Satu',
          price: 100000,
          ongkir: 10000,
          notes: 'Bunganya tolong jangan sampai rusak ketika sampai',
        },
        kata_ucapan: {
          ucapan: 'Selamat dan Sukses \nSania & Elon \nSemoga Bahagia Selalu',
          pengirim: 'PT. Bahagia Selalu Lalalala',
        },
        waktu_pengiriman: {
          date: '2020-01-01',
          time: '10:00',
        },
        penerima: {
          name: 'Sania Minyak',
          phone: '0812-3456-7890',
          address:
            'Jalan Parangtritis Gang Rama No. 1090, Danunegaran, Mantrijeron, 55143',
        },
      },
    },
  ],
}

export const info_data_product_multi_v2 = {
  type: 'Informasi Product',
  total: 2,
  accordion: true, // @params true or false, when true, the data will be displayed in accordion
  data: [
    {
      isExpanded: false,
      name: 'Product Dua',
      id_product: 1,
      data: {
        type: 'Product Detail',
        data: {
          img_thumb: 'https://picsum.photos/200/300',
          name: 'Product Satu',
          price: 100000,
          ongkir: 10000,
          notes: 'Bunganya tolong jangan sampai rusak ketika sampai',
        },
        type: 'Kata Ucapan',
        data: {
          ucapan: 'Selamat dan Sukses \nSania & Elon \nSemoga Bahagia Selalu',
          pengirim: 'PT. Bahagia Selalu Lalalala',
        },
        type: 'Waktu Pengiriman',
        data: {
          date: '2020-01-01',
          time: '10:00',
        },
        type: 'Penerima',
        data: {
          name: 'Sania Minyak',
          phone: '0812-3456-7890',
          address:
            'Jalan Parangtritis Gang Rama No. 1090, Danunegaran, Mantrijeron, 55143',
        },
      },
    },
    {
      isExpanded: false,
      name: 'Product Dua',
      id_product: 1,
      data: {
        type: 'Product Detail',
        data: {
          img_thumb: 'https://picsum.photos/200/300',
          name: 'Product Satu',
          price: 100000,
          ongkir: 10000,
          notes: 'Bunganya tolong jangan sampai rusak ketika sampai',
        },
        type: 'Kata Ucapan',
        data: {
          ucapan: 'Selamat dan Sukses \nSania & Elon \nSemoga Bahagia Selalu',
          pengirim: 'PT. Bahagia Selalu Lalalala',
        },
        type: 'Waktu Pengiriman',
        data: {
          date: '2020-01-01',
          time: '10:00',
        },
        type: 'Penerima',
        data: {
          name: 'Sania Minyak',
          phone: '0812-3456-7890',
          address:
            'Jalan Parangtritis Gang Rama No. 1090, Danunegaran, Mantrijeron, 55143',
        },
      },
    },
  ],
}

// const sturcture_ringkasan = {
//   pemesan: {
//     name: 'Sofia Nara',
//     phone: '0812-3456-7890',
//     email: 'sofianara@email.com',
//   },
//   info_products: {
//     total_product: 2,
//     data: [
//       {
//         name: 'Product Dua', //refeer nama produk
//         id_page: 2, //tidak merefer ke produk id
//         data: {
//           product_info: {
//             ...keysamaDenganProdukYgAda,
//             notes: 'stirng',
//           },
//           ucapan: {
//             text: '',
//             pengirim: '',
//           },
//           pengiriman: {
//             date: 'dd MMMM yyyy',
//             time: '10:00', //format 24jam
//           },
//           penerima: {
//             name: 'String',
//             phone: 'String',
//             address: 'String',
//           },
//         },
//       },
//     ],
//   },
//   voucher: {
//     id: 4,
//     code: 'bagirejeki20k',
//     name: 'Diskon Potongan 20.000',
//     type: 2,
//     discount_amount: 20000,
//     min_active: 50000,
//     max_discount: 20000,
//     description: '',
//     terms: 'as long as u buy',
//     promo_type: 'potongan',
//     active: '',
//     stock: 1,
//     expired_date: '2022-07-20',
//   },
//   ringkasan_pembayaran: {
//     harga_produk: 973000,
//     total_ongkir: 80000,
//     diskon: 10000,
//     grand_total: 1043000,
//   },
// }

export const payload_konfirmasi_pesanan = {
  products: [
    {
      name: 'product1',
      id_page: 1,
      data: {
        product_info: {
          id: 61,
          name: 'Bunga Wedding Jakarta',
          description: 'Bunga Papan Wedding Jakarta',
          price: 600000,
          sale_price: 0,
          image: [
            {
              id: 1,
              path: 'https://lavender.prestisa.id/assets/images/products/BPDC-2.png',
            },
          ],
          city: 1642903,
          category_id: 3,
          product_type: 1,
          rating: 5,
          item_sold: 100,
          dimension: [],
          availability: 1,
          category: 'Bunga Papan',
          discount: 0,
          notes: '',
          id: 1,
          qty: 1,
          price: 100000,
        },
        ucapan: {
          text: 'cepat sembuh',
          pengirim: 'sucat',
        },
        pengiriman: {
          date: '30 June 2022',
          time: '15:21',
        },
        penerima: {
          name: 'temennya sucat',
          phone: '0888821',
          address: 'jln tempat tinggal sucat',
        },
        ongkir: {
          base: 20000,
        },
      },
    },
    {
      name: 'product2',
      id_page: 2,
      data: {
        product_info: {
          id: 13,
          qty: 1,
          price: 50000,
          id: 61,
          name: 'Bunga Wedding Jakarta',
          description: 'Bunga Papan Wedding Jakarta',
          price: 600000,
          sale_price: 0,
          image: [
            {
              id: 1,
              path: 'https://lavender.prestisa.id/assets/images/products/BPDC-2.png',
            },
          ],
          city: 1642903,
          category_id: 3,
          product_type: 1,
          rating: 5,
          item_sold: 100,
          dimension: [],
          availability: 1,
          category: 'Bunga Papan',
          discount: 0,
          notes: '',
        },
        ucapan: {
          text: 'cepat sembuh',
          pengirim: 'sucit',
        },
        pengiriman: {
          date: '30 June 2022',
          time: '15:21',
        },
        penerima: {
          name: 'temennya sucit',
          phone: '0888821',
          address: 'jln tempat tinggal sucit',
        },
        ongkir: {
          base: 20000,
        },
      },
    },
  ],
}

/**
 *
 * @params
 */
export const reMapBuyNowData = (arr = Array) => {
  return arr.map((e, i) => {
    return {
      id_page: i + 1,
      product_info: e,
      ucapan: {},
      penerima: {},
      pengiriman: {},
    }
  })
}

export const populateAllRingkasanItems = (arr = Array) => {
  return arr.map((e, i) => {
    return {
      id_page: e.id_page,
      product_info: e,
      ucapan: {},
      penerima: {},
      pengiriman: {},
    }
  })
}

export const manipulateDataForAccordion = (arr = Array) => {
  return arr.map((e, i) => {
    return {
      isExpanded: false,
      name: e.product_info.name,
      id_page: e.id_page,
      data: e,
    }
  })
}

export const reMapDataPayloadBody = (arr = Array, city = String) => {
  return arr.map((e, i) => {
    return {
      product_id: e.product_info.id,
      notes: e.product_info.notes,
      cart_id: e.product_info.id,
      ucapan: e.ucapan,
      penerima: { ...e.penerima, address: e.penerima.address + '\n\n' + city },
      pengiriman: e.pengiriman,
    }
  })
}

export const voucherReMap = (voucher, sumProd) => {
  let title = 'Pilih Voucher'
  let subtitle = ''

  if (!isArray(voucher)) {
    title = voucher.name
    if (voucher.promo_type == 'potongan') {
      if (voucher.type == 2) {
        title = `Diskon Pengiriman ${numFormatter(voucher.discount_amount)}`
        subtitle = `(hemat Rp${numFormatter(voucher.discount_amount)})`
      } else if (voucher.type == 1) {
        const diskon = (voucher.discount_amount / 100) * 500000
        subtitle = `(hemat Rp${numberWithCommas(diskon)})`
      }
    }

    if (voucher.promo_type == 'ongkir') {
      if (voucher.type == 2) {
        title = `Diskon Pengiriman ${numFormatter(voucher.discount_amount)}`
        subtitle = `(hemat Rp${numFormatter(voucher.discount_amount)})`
      } else if (voucher.type == 1) {
        const diskon = (voucher.discount_amount / 100) * sumProd
        subtitle = `(hemat Rp${numberWithCommas(
          diskon > voucher.max_discount ? voucher.max_discount : diskon,
        )})`
      }
    }

    if (voucher.promo_type == 'cashback') {
      if (voucher.type == 2) {
        title = `Cashback ${numFormatter(voucher.discount_amount)}`
        subtitle = `(hemat Rp${numFormatter(voucher.discount_amount)})`
      } else if (voucher.type == 1) {
        const diskon = (voucher.discount_amount / 100) * sumProd
        subtitle = `(hemat Rp${numberWithCommas(diskon)})`
      }
    }
  } else {
    title = 'Pilih Voucher'
    subtitle = ''
  }

  return { title: title, subtitle: subtitle }
}
