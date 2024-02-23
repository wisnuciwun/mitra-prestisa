## 🫙 Local Storage (Redux-Persist)

### Auth

#### LogIn

Data (_state.login.data_):

```json
{
  "autofill": { "email": "mail" },
  "data": {
    "carts": [],
    "message": "berhasil login",
    "user": {
      "avatar_image": "urlImage",
      "email": "mail",
      "ep_join_date": "UnixBigInt",
      "ep_status": 1,
      "full_name": "String",
      "invoice_tax_status": 0,
      "join_date": "DD-MM-YYY HH:MM:SS",
      "join_date_epoch": "UnixBigInt",
      "phone": "String",
      "verified": 0
    }
  }
}
```

#### LogOut

Data (_state.login.data_):

```json
{
  "autofill": { "email": "mail" },
  "data": { "user": { "avatar_image": "", "full_name": "" } }
}
```

## 📍 Pin My Location

#### Sample Response Google GeoCoder

Data from google maps is array type.

##### Sample Complete Value

```json
[
  {
    "adminArea": "Daerah Khusus Ibukota Jakarta",
    "country": "Indonesia",
    "countryCode": "ID",
    "feature": "RT 02",
    "formattedAddress": "RT.2/RW.10, Ps. Manggis, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, Indonesia",
    "locale": "en",
    "locality": "Kecamatan Setiabudi",
    "position": { "lat": -6.2090977999999994, "lng": 106.84530939999999 },
    "postalCode": null,
    "streetName": null,
    "streetNumber": null,
    "subAdminArea": "Kota Jakarta Selatan",
    "subLocality": "Pasar Manggis"
  }
]
```

##### Sample Some Objects Uncomplete Value

```json
[
  {
    "adminArea": null,
    "country": "Indonesia",
    "countryCode": "ID",
    "feature": "Indonesia",
    "formattedAddress": "Indonesia",
    "locale": "en",
    "locality": null,
    "position": { "lat": -0.789275, "lng": 113.92132699999999 },
    "postalCode": null,
    "streetName": null,
    "streetNumber": null,
    "subAdminArea": null,
    "subLocality": null
  }
]
```

## Catatan

### Screen Ringkasan Pesanan

Detail data Ringkasan Pesanan (**_Multi Produk/ Single Produk_**) mengambil dari data redux **`ringkasanPesanan.data`**.

Variable **`dataPesanan`** yang ada di **`/Container/CartContainer`** , **`/Components/`** **`MakeOrder/Pengiriman`** depending dari data yang ada di data redux **`cart.data[0].cart_items`**.

Jadi, apapun jika ada perubahan di dalam data redux **`cart.data[0].cart_items`** otomatis akan merubah nilai variabel **`dataPesanan`**.

```bash
dataPesanan = cart.data[0].cart_items
```

#### Sample Data Ringkasan Pesanan

```json
{
  "customer": {
    "name": "Tech San Five ",
    "phone": "6281111111105",
    "email": "techsanfive@sanengineer.com"
  },
  "total_product": 2,
  "products": [
    {
      "id_page": 1,
      "name": "BUNGA PAPAN DUKACITA-YOGYAKARTA – 4",
      "data": {
        "product_info": {
          "id": 43009,
          "qty": 1,
          "price": 0,
          "sale_price": 0,
          "image": {
            "id": 1,
            "path": "https://lavender.prestisa.id/assets/images/products/BPDC-2.png"
          },
          "city": 1621175,
          "category_id": 43,
          "notes": ""
        },
        "ucapan": {
          "text": "Happy Wedding",
          "pengirim": "fsfsdf"
        },
        "pengiriman": {
          "date": "23 September 2022",
          "time": "16:30",
          "date_time": 1663925400
        },
        "penerima": {
          "name": "Tech San Five ",
          "phone": "6281111111105",
          "address": "Jl. Sultan Agung, RT.2/RW.10, Ps. Manggis, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12970, Indonesia\n\nKota Yogyakarta"
        },
        "ongkir": {
          "base": 0
        }
      }
    },
    {
      "id_page": 2,
      "name": "BUNGA PAPAN DUKACITA-YOGYAKARTA – 4",
      "data": {
        "product_info": {
          "id": 43009,
          "qty": 1,
          "price": 0,
          "sale_price": 0,
          "image": {
            "id": 1,
            "path": "https://lavender.prestisa.id/assets/images/products/BPDC-2.png"
          },
          "city": 1621175,
          "category_id": 43,
          "notes": ""
        },
        "ucapan": {
          "text": "Happy Wedding",
          "pengirim": "fsfsdf"
        },
        "pengiriman": {
          "date": "23 September 2022",
          "time": "16:30",
          "date_time": 1663925400
        },
        "penerima": {
          "name": "Tech San Five ",
          "phone": "6281111111105",
          "address": "Jl. Sultan Agung, RT.2/RW.10, Ps. Manggis, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12970, Indonesia\n\nKota Yogyakarta"
        },
        "ongkir": {
          "base": 0
        }
      }
    }
  ],
  "voucher_applied": [],
  "order_summary": {
    "harga_produk": 0,
    "ongkir": 0,
    "diskon_voucher": 0,
    "diskon_ongkir": 0,
    "subtotal": 0,
    "tax": 0,
    "grand_total": 0,
    "cashback_ep": 0
  }
}
```

```json
{
  "customer": {
    "email": "techsansix@sanengineer.com",
    "name": "Tech San Six",
    "phone": "6281111111106"
  },
  "order_summary": {
    "diskon_ongkir": 0,
    "diskon_voucher": 100000,
    "grand_total": 721500,
    "harga_produk": 750000,
    "ongkir": 0,
    "subtotal": 650000,
    "tax": 71500
  },
  "products": [{ "data": ["Object"], "id_page": 1, "name": "BP-DC BKS 3" }],
  "total_product": 1,
  "voucher_applied": {
    "code": "NO4JWJ",
    "description": "voucher gratis ongkir",
    "discount_amount": 20,
    "id": 1,
    "max_discount": x,
    "min_active": 10000,
    "name": "GRATIS ONGKIR",
    "promo_type": "ongkir",
    "terms": "<p></p>", //html_tag
    "type": 1
  }
}
```

### Stepper Ucapan

```javascript
import { addDataUcapan } from '@/Components/MakeOrder/Helper'

const handleAddUcapan = () => {
  dispatch(
    updateRingkasanPesanan(
      addDataUcapan(
        { pengirim: pengirim, text: ucapan },
        { data: ringkasanPesanan.data, id: currentPage },
      ),
    ),
  )
}
```

### Ringkasan Pesanan

Sample Data Multi Produk

```json
"[
  {
    "id_page": 5,
    "product_info": {
      "id": 6915,
      "name": "BGR-15",
      "description": null,
      "price": 800000,
      "sale_price": 0,
      "qty": null,
      "image": [],
      "city": 1642905,
      "product_code": "BPDC-1098",
      "category_id": 1,
      "product_type": 1,
      "rating": 0,
      "item_sold": 0,
      "dimension": [],
      "availability": null,
      "category": "karangan bunga",
      "discount": 0,
      "occasions": [],
      "tag": [],
      "notes": "",
      "selected": true,
      "id_page": 5
    },
    "ucapan": {
      "pengirim": "fdsf",
      "text": "fdsf"
    },
    "penerima": {
      "selected": true,
      "full_name": "Sania Minyak",
      "phone": "0812-3456-7890",
      "address": "Jalan Parangtritis Gang Rama No. 1090, Danunegaran, Mantrijeron, 55143"
    },
    "pengiriman": {
      "date": "",
      "time": "Jam Pengiriman"
    }
  }
]"
```

### Container

#### XenditWebView

###### Success create order, sample response but wait payment

example payment link

```bash
https://checkout-staging.xendit.co/web/62de121a3d4873e3700fdc39
```

```json
{
  "order_detail": {
    "id": 160870,
    "order_date": "25 Jul 2022",
    "order_date_epoch": 1658720792,
    "payment_status": "unpaid",
    "payment_link": "", //url
    "payment_duedate": 1658724394
  },
  "customer_info": {
    "id": 131411,
    "name": "Tech San Six",
    "email": "techsansix@sanengineer.com",
    "phone": "6281111111106"
  },
  "list_item": [
    {
      "id": 268067,
      "status": "menunggu_pembayaran",
      "order_status": "menunggu_pembayaran",
      "status_id": 2,
      "payment_link": "", // url
      "order_id": 160870,
      "product_id": 375,
      "name": "BP-DC YYK 721",
      "price": 600000,
      "qty": 1,
      "image": "https://lavender.prestisa.id/assets/images/products/BPDC-123.png",
      "product_code": "BPDC-123",
      "shipping_expedition": "",
      "shipping_address": "Jalan jalan ke Singapore dan saya beda dari yang b",
      "shipping_cost": 0,
      "subtotal": 600000,
      "sender_name": "Ga usah di permasalahkan pembelaan ",
      "greetings": "GG yang masih ngelamar kerja di daerah tersebut di ",
      "receiver_name": "Tech San Six",
      "receiver_phone": "6281111111106",
      "notes": "",
      "occasion": "Congratulation",
      "city": 1621175,
      "city_name": "Kota Yogyakarta",
      "date_time": "2022-07-29 10:41:00",
      "date_time_epoch": 1659066060,
      "po_id": "",
      "bukti_image": "",
      "tracking_pesanan": "not available"
    }
  ],
  "cashback": 0,
  "total_cost": {
    "subtotal": 1600000,
    "shipping_cost": 0,
    "discount": 100000,
    "tax": 165000,
    "total": 1665000
  },
  "payment_method": {
    "name": "",
    "total": 0,
    "paid_at": "",
    "paid_at_epoch": ""
  }
}
```

###### Navigation Params

```json
{
  "invoice_url": "URL",
  "order_id": "Int"
}
```

#### Preview Produk

##### Get Preview Product

```json
{
  "expired_date": 1658689995,
  "order_id": 160810,
  "preview_product_img": "https://lavender.prestisa.id/assets/images/purchase_orders/po.164674.jpg",
  "product_img": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
  "product_name": "Bunga Papan Yogyakarta 4",
  "revisi_kuota": 3,
  "revisi_list": []
}
```

##### Add Revision (Ajukan Revisi)

Sample Data Response Sukses

```json
[
  {
    "data": {
      "icon": "https://lavender.prestisa.id/assets/images/customer_app/icon/revisi_diterima.png",
      "message": "Detail revisi akan diteruskan ke pihak penjual dan diproses pada produk",
      "product_info": {
        "expired_date": "",
        "order_id": 160810,
        "po_id": 164674,
        "preview_product_img": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
        "product_img": [
          {
            "active": 1,
            "id": 1,
            "path": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          }
        ],
        "product_name": "Bunga Papan Yogyakarta 4",
        "revisi_list": [
          {
            "desc": "Test test",
            "id": 1,
            "lampiran": "/assets/images/customer_app/temp/lampiran_revisi1869726588.jpg",
            "revisi_type": 1,
            "title": "Warna Produk"
          },
          {
            "desc": "Halo bawswuuf",
            "id": 2,
            "lampiran": "/assets/images/customer_app/temp/lampiran_revisi1202912366.jpg",
            "revisi_type": 2,
            "title": "Wrapping/Vas/Box"
          }
        ]
      },
      "title": "Revisi kamu sudah kami catat"
    },
    "status": "success",
    "statusCode": "200"
  }
]
```

Sample Data Response Error

```json
[
  {
    "status": "error",
    "statusCode": "400", // 400,500
    "data": {
      "message": "Order sedang direvisi oleh pihak kami, harap tunggu hingga selesai" // string
    }
  }
]
```

##### No Revision (Tanpa Revisi)

Sample Data Response Sukses

```json
{
  "icon": "https://lavender.prestisa.id/assets/images/customer_app/icon/ratesuccess.png",
  "message": "Konfirmasi kamu telah diterima dan pesanan akan diproses pengemasan",
  "product_info": {
    "expired_date": "",
    "order_id": 160810,
    "po_id": 164674,
    "preview_product_img": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
    "product_img": [["Object"]],
    "product_name": "Bunga Papan Yogyakarta 4",
    "revisi_list": []
  },
  "title": "Konfirmasi Diterima"
}
```

#### Tulis Ulasan

Sample data Pick Image

```json
[
  {
    "fileName": "AF777981-6758-4C86-8B16-274F27C5B02B.jpg",
    "fileSize": 131230,
    "height": 423,
    "type": "image/jpg",
    "uri": "file:///var/mobile/Containers/Data/Application/1B166E25-9F46-4DD4-BAA0-205FDF3D702B/tmp/AF777981-6758-4C86-8B16-274F27C5B02B.jpg",
    "width": 640
  },
  {
    "fileName": "6F574FA9-7263-403F-B316-563C8D54F2A5.jpg",
    "fileSize": 5770905,
    "height": 3264,
    "type": "image/jpg",
    "uri": "file:///var/mobile/Containers/Data/Application/1B166E25-9F46-4DD4-BAA0-205FDF3D702B/tmp/6F574FA9-7263-403F-B316-563C8D54F2A5.jpg",
    "width": 2448
  },
  {
    "fileName": "3A4E9356-01D4-469D-8BF8-F3BD15CF2A04.jpg",
    "fileSize": 3182987,
    "height": 3264,
    "type": "image/jpg",
    "uri": "file:///var/mobile/Containers/Data/Application/1B166E25-9F46-4DD4-BAA0-205FDF3D702B/tmp/3A4E9356-01D4-469D-8BF8-F3BD15CF2A04.jpg",
    "width": 2448
  }
]
```

##### 📤 Tulis Ulasan

Menulis ulasan untuk pertama kalinya.

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Required Params:</div>

```json
{ "rated_status": "not rated", "rating_status": "not available" }
```

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Screen Navigation:</div>

```json
{
  "screenName": "TulisUlasan",
  "params": {
    "isEdit": false,
    "data": {
      "po_id": "",
      "product_id": "",
      "status": "",
      "date": "",
      "product_name": "",
      "price": ""
    }
  }
}
```

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Sample Data Product:</div>

```json
[
  {
    "bukti_image": "https://lavender.prestisa.id/assets/images/delivery_location/po.164669.jpg",
    "city": "Kota Yogyakarta",
    "date": "28 Jul 2022",
    "date_epoch": 1658943420,
    "image": "https://lavender.prestisa.id/assets/images/products/BPDC-123.png",
    "order_id": 160810,
    "po_id": 164669,
    "price": 600000,
    "product_detail": {
      "attribute": "",
      "availability": null,
      "capital_price": 350000,
      "category_id": 1,
      "city": 1621175,
      "country": 1643084,
      "created_at": "2018-08-21 22:20:00",
      "deleted_at": null,
      "description": "",
      "dimension": null,
      "discount": 0,
      "id": 375,
      "image": [["Object"]],
      "image_app": null,
      "item_sold": 0,
      "name": "BP-DC YYK 721",
      "price": 600000,
      "product_code": "BPDC-123",
      "product_type": 1,
      "province": 1621176,
      "qty": 1,
      "rating": 0,
      "sale_price": 600000,
      "supplier_id": null,
      "tags": null,
      "updated_at": "2018-08-21 22:20:00",
      "wp_id": null
    },
    "product_name": "BP-DC YYK 721",
    "rate_time_expired": 1659355017,
    "rated_status": "not rated",
    "rating": "",
    "rating_status": "not available"
  }
]
```

##### ✍️ Ubah Rating Dan Ulasan

Sudah pernah menulis ulasan, dan tanggal rating belum expired

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Required params:</div>

```json
{
  "rated_status": "rated",
  "rating_status": "available",
  "rate_time_expired": 1659688344 // value field rate_time_expired ini hanya contoh
}
```

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Screen Navigation:</div>

```json
{
  "screenName": "TulisUlasan",
  "params": {
    "isEdit": true,
    "data": {
      "po_id": "",
      "product_id": "",
      "status": "",
      "date": "",
      "product_name": "",
      "price": "",
      "rate_time_expired": "",
      "rating": "",
      "review_message": ""
    }
  }
}
```

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Complete response:</div>

```json
{
  "bukti_image": "https://lavender.prestisa.id/assets/images/delivery_location/po.165197.jpg",
  "city": "Kota Yogyakarta",
  "date": "16 Sep 2022",
  "date_epoch": 1663316640,
  "image": "https://lavender.prestisa.id/assets/images/products/BPDC-3343.png",
  "order_id": 161445,
  "po_id": 165197,
  "price": 1000000,
  "product_detail": {
    "attribute": "23,43",
    "availability": null,
    "capital_price": 0,
    "category_id": 43,
    "city": 1621175,
    "country": 1643084,
    "created_at": "2022-01-13 11:04:03",
    "deleted_at": null,
    "description": "",
    "dimension": null,
    "discount": 0,
    "id": 38657,
    "image": ["url", "url"],
    "image_app": null,
    "item_sold": 0,
    "name": "Bunga Papan Yogyakarta 4",
    "price": 1000000,
    "product_code": "BPDC-3343",
    "product_type": 0,
    "province": 1621176,
    "qty": 0,
    "rating": 0,
    "sale_price": 0,
    "supplier_id": null,
    "tags": ["bunga papan duka cita"],
    "updated_at": "2022-01-13 11:04:03",
    "wp_id": null
  },
  "product_name": "Bunga Papan Yogyakarta 4",
  "rate_time_expired": 1659688344,
  "rated_status": "rated",
  "rating": 5,
  "rating_status": "available",
  "review_message": "Kecepatan pengiriman baik",
  "status": "selesai"
}
```

##### 👀 Lihat Ulasan

Sudah pernah menulis ulasan dan tanggal rating sudah expired.

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Required params:</div>

```json
{
  "rated_status": "rated",
  "rating_status": "available",
  "rate_time_expired": 1659688344 // value field rate_time_expired ini hanya contoh
}
```

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Screen Navigation:</div>

```json
{
  "screenName": "ViewReviewProduct",
  "params": {
    "data": {
      "po_id": "",
      "product_id": "",
      "status": "",
      "date": "",
      "product_name": "",
      "price": ""
    }
  }
}
```

<div style="font-size:12px;font-weight:bold; margin-bottom:5px">Complete response:</div>

```json
{
  "bukti_image": "https://lavender.prestisa.id/assets/images/delivery_location/po.165197.jpg",
  "city": "Kota Yogyakarta",
  "date": "16 Sep 2022",
  "date_epoch": 1663316640,
  "image": "https://lavender.prestisa.id/assets/images/products/BPDC-3343.png",
  "order_id": 161445,
  "po_id": 165197,
  "price": 1000000,
  "product_detail": {
    "attribute": "23,43",
    "availability": null,
    "capital_price": 0,
    "category_id": 43,
    "city": 1621175,
    "country": 1643084,
    "created_at": "2022-01-13 11:04:03",
    "deleted_at": null,
    "description": "",
    "dimension": null,
    "discount": 0,
    "id": 38657,
    "image": ["url", "url"],
    "image_app": null,
    "item_sold": 0,
    "name": "Bunga Papan Yogyakarta 4",
    "price": 1000000,
    "product_code": "BPDC-3343",
    "product_type": 0,
    "province": 1621176,
    "qty": 0,
    "rating": 0,
    "sale_price": 0,
    "supplier_id": null,
    "tags": ["bunga papan duka cita"],
    "updated_at": "2022-01-13 11:04:03",
    "wp_id": null
  },
  "product_name": "Bunga Papan Yogyakarta 4",
  "rate_time_expired": 1659688344,
  "rated_status": "rated",
  "rating": 5,
  "rating_status": "available",
  "review_message": "Kecepatan pengiriman baik",
  "status": "selesai"
}
```

Type Error:

###### 500

```json
{
  "message": "Server Error"
}
```

###### 400

```json
{
  "status": "error",
  "statusCode": "400",
  "data": {
    "message": "Rating dan review sudah pernah dibuat, silahkan update jika masih dalam waktunya"
  }
}
```

###### 200

```json
{
  "status": "success",
  "statusCode": "200",
  "data": {
    "icon": "https://lavender.prestisa.id/assets/images/customer_app/icon/ratesuccess.png",
    "title": "Terima Kasih",
    "message": "Rating dan ulasanmu sudah dikirim. Kamu bisa mengubahnya 1x sebelum 01 Aug 2022",
    "rating_data": {
      "id": 2,
      "po_id": 164670,
      "product_id": 375,
      "rating": 5,
      "review_message": "Kecepatan pengiriman baik",
      "image": [
        "https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic1353090725.jpg",
        "https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic925681929.jpg",
        "https://lavender.prestisa.id/assets/images/customer_app/temp/review_pic1538185826.jpg"
      ],
      "rate_expired_date": 1659366050,
      "rate_edit_count": 0
    }
  }
}
```

### Components Base

#### ButtonBase

Button Base cannot accessible when put into modal

### Take Image From Gallery or Camera

Sample success data

###### From camera

```json
[
  {
    "height": 4160,
    "uri": "file:///data/user/0/com.prestisa/cache/rn_image_picker_lib_temp_650ef68b-1ccd-4c4a-8dc8-5642d171c2d3.jpg",
    "width": 3120,
    "fileName": "rn_image_picker_lib_temp_650ef68b-1ccd-4c4a-8dc8-5642d171c2d3.jpg",
    "type": "image/jpeg",
    "fileSize": 2710097
  }
]
```

###### From Gallery

```json
{
  "assets": [
    {
      "height": 4160,
      "uri": "file:///data/user/0/com.prestisa/cache/rn_image_picker_lib_temp_413b223a-b0ca-4453-b75a-c281033e8dae.jpg",
      "width": 3120,
      "fileName": "rn_image_picker_lib_temp_413b223a-b0ca-4453-b75a-c281033e8dae.jpg",
      "type": "image/jpeg",
      "fileSize": 2710097
    }
  ]
}
```

### List Transaksi

Sample Data

```json
{
  "status": "success",
  "statusCode": "200",
  "data": [
    {
      "id": 2,
      "name": "Menunggu Pembayaran",
      "status": "menunggu_pembayaran",
      "category": "no category",
      "list_transaction": [
        {
          "order_id": 123,
          "payment_time_expired": 1658439903,
          "order_items": [
            {
              "order_id": 123,
              "product_name": "Yellow Bouquet - 01",
              "city": "Jakarta Barat",
              "price": 99000,
              "image": [
                "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
              ],
              "date": "29 Jul 2022",
              "product_detail": {
                "id": 1,
                "created_at": "2018-08-14 01:52:16",
                "updated_at": "2018-08-14 01:52:25",
                "deleted_at": null,
                "name": "Bunga Papan Duka Cita1",
                "description": "product testing",
                "price": 100000,
                "capital_price": 80000,
                "sale_price": 90000,
                "qty": 0,
                "image": [
                  "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
                ],
                "country": 1643084,
                "province": 1923045,
                "city": 1638238,
                "product_code": "BPDC-1",
                "category_id": 1,
                "product_type": 1,
                "tags": null,
                "attribute": "1,2,33,34,,16,17",
                "supplier_id": null,
                "wp_id": null,
                "rating": 5,
                "item_sold": 10,
                "image_app": "",
                "dimension": {
                  "width": 6,
                  "height": 11,
                  "length": 5
                },
                "availability": 1,
                "discount": 10
              }
            },
            {
              "order_id": 123,
              "product_name": "Red Bouquet - 02",
              "city": "Bogor",
              "price": 100000,
              "image": [
                "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
              ],
              "date": "29 Jul 2022",
              "product_detail": {
                "id": 1,
                "created_at": "2018-08-14 01:52:16",
                "updated_at": "2018-08-14 01:52:25",
                "deleted_at": null,
                "name": "Bunga Papan Duka Cita1",
                "description": "product testing",
                "price": 100000,
                "capital_price": 80000,
                "sale_price": 90000,
                "qty": 0,
                "image": [
                  "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
                ],
                "country": 1643084,
                "province": 1923045,
                "city": 1638238,
                "product_code": "BPDC-1",
                "category_id": 1,
                "product_type": 1,
                "tags": null,
                "attribute": "1,2,33,34,,16,17",
                "supplier_id": null,
                "wp_id": null,
                "rating": 5,
                "item_sold": 10,
                "image_app": "",
                "dimension": {
                  "width": 6,
                  "height": 11,
                  "length": 5
                },
                "availability": 1,
                "discount": 10
              }
            }
          ]
        },
        {
          "order_id": 321,
          "payment_time_expired": 1658439903,
          "order_items": [
            {
              "order_id": 321,
              "product_name": "Yellow Bouquet - 01",
              "city": "Jakarta Barat",
              "price": 99000,
              "image": [
                "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
              ],
              "date": "29 Jul 2022",
              "product_detail": {
                "id": 1,
                "created_at": "2018-08-14 01:52:16",
                "updated_at": "2018-08-14 01:52:25",
                "deleted_at": null,
                "name": "Bunga Papan Duka Cita1",
                "description": "product testing",
                "price": 100000,
                "capital_price": 80000,
                "sale_price": 90000,
                "qty": 0,
                "image": [
                  "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
                ],
                "country": 1643084,
                "province": 1923045,
                "city": 1638238,
                "product_code": "BPDC-1",
                "category_id": 1,
                "product_type": 1,
                "tags": null,
                "attribute": "1,2,33,34,,16,17",
                "supplier_id": null,
                "wp_id": null,
                "rating": 5,
                "item_sold": 10,
                "image_app": "",
                "dimension": {
                  "width": 6,
                  "height": 11,
                  "length": 5
                },
                "availability": 1,
                "discount": 10
              }
            },
            {
              "order_id": 321,
              "product_name": "Red Bouquet - 02",
              "city": "Bogor",
              "price": 100000,
              "image": [
                "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
              ],
              "date": "29 Jul 2022",
              "product_detail": {
                "id": 1,
                "created_at": "2018-08-14 01:52:16",
                "updated_at": "2018-08-14 01:52:25",
                "deleted_at": null,
                "name": "Bunga Papan Duka Cita1",
                "description": "product testing",
                "price": 100000,
                "capital_price": 80000,
                "sale_price": 90000,
                "qty": 0,
                "image": [
                  "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
                ],
                "country": 1643084,
                "province": 1923045,
                "city": 1638238,
                "product_code": "BPDC-1",
                "category_id": 1,
                "product_type": 1,
                "tags": null,
                "attribute": "1,2,33,34,,16,17",
                "supplier_id": null,
                "wp_id": null,
                "rating": 5,
                "item_sold": 10,
                "image_app": "",
                "dimension": {
                  "width": 6,
                  "height": 11,
                  "length": 5
                },
                "availability": 1,
                "discount": 10
              }
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "Menunggu Konfirmasi",
      "status": "menunggu_konfirmasi",
      "category": "diproses",
      "list_transaction": [
        {
          "order_id": 123,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 123,
          "product_name": "Red Bouquet - 02",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 321,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 5,
      "name": "Dirangkai",
      "status": "dirangkai",
      "category": "diproses",
      "list_transaction": [
        {
          "order_id": 123,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 123,
          "product_name": "Red Bouquet - 02",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 321,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 321,
          "product_name": "Red Bouquet - 02",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 6,
      "name": "Preview Produk",
      "status": "preview_produk",
      "category": "diproses",
      "list_transaction": [
        {
          "order_id": 444,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "time_expired": 1658439903,
          "po_id": 1923,
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 444,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "time_expired": 1658439903,
          "po_id": 1923,
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 7,
      "name": "Revisi Produk",
      "status": "revisi_produk",
      "category": "diproses",
      "list_transaction": [
        {
          "order_id": 444,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "time_expired": 1658439903,
          "po_id": 1923,
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 9,
      "name": "Dalam Perjalanan",
      "status": "dalam_perjalanan",
      "category": "dikirim",
      "list_transaction": [
        {
          "order_id": 123,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 123,
          "product_name": "Red Bouquet - 02",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 10,
      "name": "Pesanan Tiba",
      "status": "pesanan_tiba",
      "category": "dikirim",
      "list_transaction": [
        {
          "order_id": 444,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 444,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 12,
      "name": "Komplain Diajukan",
      "status": "komplain_diajukan",
      "category": "komplain",
      "list_transaction": [
        {
          "order_id": 123,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 123,
          "product_name": "Red Bouquet - 02",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 13,
      "name": "Komplain Diproses",
      "status": "komplain_diproses",
      "category": "komplain",
      "list_transaction": [
        {
          "order_id": 444,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 14,
      "name": "Komplain Terselesaikan",
      "status": "Komplain_terselesaikan",
      "category": "komplain",
      "list_transaction": [
        {
          "order_id": 444,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 16,
      "name": "selesai",
      "status": "selesai",
      "category": "selesai",
      "list_transaction": [
        {
          "order_id": 412,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "rate_time_expired": 1659042903,
          "rating": "",
          "status_rating": "available",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 412,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "rate_time_expired": 1659042903,
          "rating": "5",
          "status_rating": "available",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 412,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "rate_time_expired": 1658351703,
          "rating": "",
          "status_rating": "unavailable",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 412,
          "product_name": "Blue Bouquet - 03",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "bukti_image": "https://lavender.prestisa.id/assets/images/products/BPDC-1.png",
          "date": "29 Jul 2022",
          "po_id": 1923,
          "rate_time_expired": 1658351703,
          "rating": 5,
          "status_rating": "unavailable",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 18,
      "name": "Dibatalkan",
      "status": "dibatalkan",
      "category": "gagal",
      "list_transaction": [
        {
          "order_id": 123,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 123,
          "product_name": "Red Bouquet - 02",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    },
    {
      "id": 19,
      "name": "Pembayaran Gagal",
      "status": "pembayaran_gagal",
      "category": "gagal",
      "list_transaction": [
        {
          "order_id": 123,
          "product_name": "Yellow Bouquet - 01",
          "city": "Jakarta Barat",
          "price": 99000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        },
        {
          "order_id": 123,
          "product_name": "Red Bouquet - 02",
          "city": "Bogor",
          "price": 100000,
          "image": [
            "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
          ],
          "date": "29 Jul 2022",
          "product_detail": {
            "id": 1,
            "created_at": "2018-08-14 01:52:16",
            "updated_at": "2018-08-14 01:52:25",
            "deleted_at": null,
            "name": "Bunga Papan Duka Cita1",
            "description": "product testing",
            "price": 100000,
            "capital_price": 80000,
            "sale_price": 90000,
            "qty": 0,
            "image": [
              "https://lavender.prestisa.id/assets/images/products/BPDC-1.png"
            ],
            "country": 1643084,
            "province": 1923045,
            "city": 1638238,
            "product_code": "BPDC-1",
            "category_id": 1,
            "product_type": 1,
            "tags": null,
            "attribute": "1,2,33,34,,16,17",
            "supplier_id": null,
            "wp_id": null,
            "rating": 5,
            "item_sold": 10,
            "image_app": "",
            "dimension": {
              "width": 6,
              "height": 11,
              "length": 5
            },
            "availability": 1,
            "discount": 10
          }
        }
      ]
    }
  ]
}
```

##### Detail Pesanan

```json
{
  "cashback": 0,
  "customer_info": {
    "email": "techsanfive@sanengineer.com",
    "id": 131410,
    "name": "Tech San Five ",
    "phone": "6281111111105"
  },
  "list_item": [
    {
      "bukti_image": "",
      "city": 1621175,
      "city_name": "Kota Yogyakarta",
      "date_time": "2022-09-23 19:59:00",
      "date_time_epoch": 1663937940,
      "greetings": "Happy Wedding",
      "id": 269347,
      "image": "https://lavender.prestisa.id/assets/images/products/BPDC-274.png",
      "name": "BP-DC JOG 6",
      "notes": "",
      "occasion": "Congratulation",
      "order_id": 161479,
      "order_status": "menunggu_konfirmasi",
      "payment_link": "https://checkout-staging.xendit.co/web/62e3da2f4d61b5b838d3ec28",
      "po_id": "",
      "price": 750000,
      "product_code": "BPDC-274",
      "product_id": 1561,
      "qty": 1,
      "receiver_name": "Tech San Five ",
      "receiver_phone": "6281111111105",
      "sender_name": "fsdfsfsdf",
      "shipping_address": "Jl. Sultan Agung, RT.2/RW.10, Ps. Manggis, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12970, Indonesia function String() { [native code] }",
      "shipping_cost": 0,
      "shipping_expedition": "",
      "status": "menunggu_konfirmasi",
      "status_id": 4,
      "subtotal": 750000,
      "tracking_pesanan": "not available"
    }
  ],
  "order_detail": {
    "id": 161479,
    "order_date": "29 Jul 2022",
    "order_date_epoch": 1659099692,
    "payment_duedate": 1659103295,
    "payment_link": "https://checkout-staging.xendit.co/web/62e3da2f4d61b5b838d3ec28",
    "payment_status": "paid"
  },
  "payment_method": {
    "name": "BRI",
    "paid_at": "29 Jul 2022 20:02:05",
    "paid_at_epoch": 1659099725,
    "total": 832500
  },
  "total_cost": {
    "discount": 0,
    "shipping_cost": 0,
    "subtotal": 750000,
    "tax": 82500,
    "total": 832500
  }
}
```

#### 🗞 Reference

<div style="font-size:12px;font-weight:bold; margin-bottom:5px"> ✅ Code For Clear Data Ringkasan:</div>

```bash
state.ringkasanPesanan
```

```javascript
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import {
  clearNavRoutes,
  clearRingkasanPesanan,
} from '@/Store/ringkasanPesananSlice'

const ClearRingkasan = () => {
  const dispatch = useDispatch()
  return (
    <View style={{ alignItems: 'center' }}>
      <TextTouchable
        text="Clear Ringkasan"
        onPress={() => {
          dispatch(clearRingkasanPesanan())
          dispatch(clearNavRoutes())
        }}
      />
    </View>
  )
}
```
