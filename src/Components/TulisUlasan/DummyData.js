const data = {
  product_name: 'Yellow Bouquet - 01',
  product_id: '',
  product_img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
  date: '20 April 2021', // date_purcashed
  total_price: 679000,
  status: 'selesai',
}

const template_ulasan_text_123 = [
  { id: 1, text: 'Barang tidak sesuai' },
  { id: 2, text: 'Pengiriman Lama' },
  { id: 3, text: 'Kualitas produk buruk' },
]

const template_ulasan_text_45 = [
  { id: 1, text: 'Barang sesuai' },
  { id: 2, text: 'Kecepatan pengiriman baik' },
  { id: 3, text: 'Kualitas produk baik' },
]

//
const data_edit_ulasan = {
  product_name: 'Yellow Bouquet - 01',
  product_id: '',
  product_img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
  date: '20 April 2021', // date_purcashed
  total_price: 679000,
  rating: '4.0',
  review:
    'Barang terlalu besar Kecepatan pengiriman baik. Tapi ternyata ada 1 ulat di dalam daun bunga.Tolong lain kali lebih di cek. Trims',
  expired_date_edit: '', //7 days later from first review created
  edit_times: 1,
  images: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    },
  ],
  status: 'selesai',
}

const data_lihat_ulasan = {
  product_name: 'Yellow Bouquet - 01',
  product_id: '',
  product_img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
  date: '20 April 2021', // date_purcashed
  total_price: 679000,
  rating: '3.0',
  review:
    'Kecepatan pengiriman baik. Tapi ternyata ada 1 ulat di dalam daun bunga.Tolong lain kali lebih di cek. Trims',
  expired_date_edit: null, //7 days later from first review created
  edit_times: 0,
  images: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    },
  ],
  status: 'selesai',
}

export {
  data,
  template_ulasan_text_123,
  template_ulasan_text_45,
  data_lihat_ulasan,
  data_edit_ulasan,
}
