Nama anggota kelompok: 1. Axel Chrisdy Sanjaya (535240143) 2. Fabio Francisco (535240077) 3. Vincen Okta Ramadhan (535240064)

`FITUR APLIKASI`: - Aplikasi ini dapat menerima input berupa digit angka yang ingin dikonversi sesuai pilihan mata uang pengguna. - Akurasi dari konversi mata uang menggunakan aplikasi ini 95% akurat dengan kondisi secara real time. - Pilihan mata uang yang tersedia untuk dikonversi sebanyak 159 negara. - Untuk memilih mata uang yang di inginkan, tidak perlu scroll secara manual, melainkan cukup dengan mengetikkan mana mata uang dari negara yang di inginkan. - Jika selama lebih dari 2 detik user tidak terkoneksi dengan internet, maka hasil exchange ratenya akan berupa error. - Untuk mengetahui kebalikan dari nilai mata uang, cukup menekan tombol Swap atau Reverse yang berada ditengah-tengah pilihan mata uang - Untuk melakukan input nilai dari mata uang yang ingin dikonversi, hanya bisa dilakukan menggunakan input angka bilangan bulat. - Ketika melakukan refresh, tampilan awalnya akan berupa USD to EUR.

`CARA MENJALANKAN`:
Cara kami menjalankan aplikasi ini: - Pertama, data dari nilai mata uang yang kami gunakan berasal dari API Exchange Rate. - Kedua, kami membuat loop untuk memasukkan nilai dari mata uang yang dipilih oleh user yang diambil dari API Exchange Rate. - Ketiga, Ketika tombol Get Exchange Rate di klik, maka akan menampilkan kalimat "Getting exchange rate...". Lalu ketika proses pemanggilan API lebih dari 2 detik, maka kalimat tersebut berubah menjadi "Something went wrong". - Keempat, terdapat tombol untuk melakukan swap mata uang yang telah dipilih sebelumnya oleh user. Berikut alur swapnya di function swapCurrencies, 
  // temp -> from.value
  // from.value -> to.value
  // to.value -> temp(from.value awal)
Setelah itu, kita tinggal panggil function loadFlag untuk menukar bendera currencies, dan memanggil kembali API untuk mendapat hasil pertukaran tanpa menekan kembali tombol getExchange.

`Contoh Penggunaan`: 1. Buka website melalui link yang tersedia, 2. Pilih jenis mata uang yang ingin dikonversi 3. Input nominal uang yang ingin dikonversi 4. Pastikan jenis mata uang yang ingin dikonversi telah sesuai dengan yang diinginkan, dan jika tertukar bisa klik tombol yang berada di antara kedua jenis mata uang. 5. Jika sudah sesuai, maka klik tombol "Get Exchange Rate"
