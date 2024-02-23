export const remapDataSetNotif = (data = Object) => {
  return {
    list_id: 1,
    list_name: 'Senyapkan Semua',
    list_status:
      !data.notif_status_pemesanan_produk &&
      !data.notif_status_pembayaran &&
      !data.notif_penggunaan_point &&
      !data.notif_downline_baru &&
      !data.notif_point_downline,
    child: [
      //   {
      //     section_name: 'Umum',
      //     child: [
      //       {
      //         list_id: 2,
      //         list_name: 'Perubahan Data Pribadi',
      //         list_type: 'changeaccount',
      //         list_status: 0,
      //       },
      //       {
      //         list_id: 3,
      //         list_name: 'Promo Bulanan',
      //         list_type: 'loginactivity',
      //         list_status: 0,
      //       },
      //     ],
      //   },
      {
        section_name: 'Transaksi',
        child: [
          {
            list_id: 4,
            list_name: 'Status Pemesanan Product',
            list_type: 'notif_status_pemesanan_produk',
            list_status: data.notif_status_pemesanan_produk,
          },
          {
            list_id: 5,
            list_name: 'Status Pembayaran',
            list_type: 'notif_status_pembayaran',
            list_status: data.notif_status_pembayaran,
          },
          {
            list_id: 6,
            list_name: 'Penggunaan Point',
            list_type: 'notif_penggunaan_point',
            list_status: data.notif_penggunaan_point,
          },
        ],
      },
      {
        section_name: 'Executive Partner',
        child: [
          {
            list_id: 7,
            list_name: 'Downline Baru',
            list_type: 'notif_downline_baru',
            list_status: data.notif_downline_baru,
          },
          {
            list_id: 8,
            list_name: 'Point Downline',
            list_type: 'notif_point_downline',
            list_status: data.notif_point_downline,
          },
        ],
      },
    ],
  }
}
