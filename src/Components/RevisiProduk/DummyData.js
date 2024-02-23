import { Assets } from '@/Theme/Assets'

const dummy_data_revisi_produk = {
  product_name: 'Yellow Bouquet- 01',
  order_id: '45AB34FE',
  product_img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
  revisi_list: [
    {
      id: 1,
      revisi_type: 1,
      title: 'Wrapping/Vas/Box',
      desc: 'Warna pitanya tolong diganti jadi warna KUNING. Trims',
    },
    {
      id: 2,
      revisi_type: 2,
      title: 'Wrapping/Vas/Box',
      desc: 'Ujung pitanya tolong digunting segitiga/panah.TRIMS',
    },
    {
      id: 3,
      revisi_type: 3,
      title: 'Wrapping/Vas/Box',
      desc: 'Ujung pitanya tolong digunting menjadi jajar genjang.TRIMS',
    },
  ],
}

const header = {
  accepted: {
    img: Assets.check_mark_outline_primary_big_3x,
    title: 'Konfirmasi Diterima',
    desc: 'Konfirmasi kamu telah diterima dan pesanan akan diproses pengemasan',
  },
  sended: {
    img: Assets.thumb_up_color_3x,
    title: 'Revisi Berhasil Diajukan',
    desc: 'Detail revisi akan diteruskan ke pihak penjual dan diproses pada produk',
  },
  attatchment: 'file123.png',
}

export { dummy_data_revisi_produk, header }
