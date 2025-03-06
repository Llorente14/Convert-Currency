//Object ini baka digunain untuk memanggil flag dan data input option
import country_list from "./assets/country_list.js";

//Di gunakan sebagai akses ke API Exchange Rate
let apiKey = "94c34e2c2b9a1e88f9138263";

//Mengakses elemen di HTML
const dropList = document.querySelectorAll("form select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const amount = document.querySelector("form input");
const exchangeRateText = document.querySelector("form .exchange-rate");
const exhangeIcon = document.querySelector("form .icon");

/*Loop ini berfungsi untuk memasukan data option dengan valude currency_code dari object country_list 
ke dalam select dengan class drop list */
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0 //Kode untuk mata uang yang di pilih di awal adalah USD dan EUR
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "EUR"
        ? "selected"
        : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    //Ini agar option yang baru ditaruh di akhir/bawah
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  //Event listener untuk setelah memilih option maka akan memanggil func loadFlag untuk meload bendera sesuai opt pilihan
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

// Load the selected flag
const loadFlag = (element) => {
  //Digunakan untuk loop mencari flag yang sesuai dengan data di country_list
  for (let code in country_list) {
    //Jika ketemu nama country yang sama dengan element opt yang sama
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      //Maka akan mengganti src imgTag yang diambil dari web flagcdn dan menggunakan string literal untuk meangganti flagnya
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`; //toLowerCase digunakan agar isi dari countryList yang diambil ber huruf kecil agar menghindari case sensitive
    }
  }
};

// Func ini berfungsi untuk mengambil data mata uang dari API exchangerate, menggunakan fetch dan setTImeout
const getExchangeRate = () => {
  let amountVal = amount.value;
  //Melakukan pengecekan terhadap data angka yang di input di amount input
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  //Sebagai tampilan ketika menunggu fetch (req) data sampai
  exchangeRateText.innerText = "Getting exchange rate...";

  //Menggunakan lateral string untuk memanggil api sesuai from currency value
  /*{
  Berikut hasil req nya
 "result":"success",
 "documentation":"https://www.exchangerate-api.com/docs",
 "terms_of_use":"https://www.exchangerate-api.com/terms",
 "time_last_update_unix":1741132802,
 "time_last_update_utc":"Wed, 05 Mar 2025 00:00:02 +0000",
 "time_next_update_unix":1741219202,
 "time_next_update_utc":"Thu, 06 Mar 2025 00:00:02 +0000",
 "base_code":"USD",
 "conversion_rates":{
  "USD":1,
  "AED":3.6725,
  "AFN":73.0809,
  "ALL":94.2754,
  "AMD":393.7841, */
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

  /*SetTimeout digunakan untuk mennunggu waktu fetch data, pada kasus ini setTimeout digunakan untuk memberi waktu
   pada pemanggilan API, jika gagal me request dalam 2 detik text exchangeRate akan berubah menjadi Semothing went wrong*/

  setTimeout(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = amountVal * exchangeRate;
        exchangeRateText.innerText = `${amountVal} ${fromCurrency.value}   =   ${totalExRate} ${toCurrency.value}`;
      })
      .catch(() => {
        exchangeRateText.innerText = `Something went wrong`;
      });
  }, 2000);
};

//Func  untuk melakukan swap dua mata currency from jadi to, dan sebaliknya
function swapCurrencies() {
  // Berikut alur swapnya
  // temp -> from.value
  // from.value -> to.value
  // to.value -> temp(from.value awal)
  let tempCode = fromCurrency.value; // Ini untuk menampung value fromCurr untuk melakukan swap
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;

  // Lalu akan memanggil ulang juga loadFlag untuk mengupdate bendera sesuai hasil pertukaran
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  // Dan terakhir akan meng-load ulang hasil exchangeRate
  getExchangeRate();
}

// Event Listeners

//Ini event listener berguna agar input hanya bisa memasukan angka dengan memanfaatkan regEx
amount.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, ""); // Hanya izinkan angka
});

//Event listener untuk ketika load akan memanggil function getExchangeRate yang akan menampilkan hasil konversi default (USD TO EUR)

window.addEventListener("load", () => {
  getExchangeRate();
});

//Saat mengklik button getBtn, dia akan memmanggil func getExchangeRate dan langsung menampilkan exchange rate  text
getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

//Ini berguna agar ketika mengklik swap atau exchange icon , akan menjalankan func swap currencies
exhangeIcon.addEventListener("click", swapCurrencies);
