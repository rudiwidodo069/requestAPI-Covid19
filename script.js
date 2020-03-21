const boxCard = document.querySelector('.box-card');
const cari = document.querySelector('#cari');
const formInput = document.querySelector('input[name=country]');
const cardModal = document.querySelector('.card-modal');

document.addEventListener('click', async function (el) {
  const search = el.target.dataset.country;
  const data = await getDetailApiCovid(search);
  detail(search, data);
});

function detail(search, data) {
  document.querySelector('.country').innerHTML = search;
  document.querySelector('.kasus').innerHTML = data.cases + " jiwa";
  document.querySelector('.meninggal').innerHTML = data.deaths + " jiwa";
  document.querySelector('.wilayah').innerHTML = " - ";
  document.querySelector('.sembuh').innerHTML = data.total_recovered + " jiwa";
  document.querySelector('.newDeath').innerHTML = data.new_deaths + " jiwa";
  document.querySelector('.newKasus').innerHTML = data.new_cases + " jiwa";
  document.querySelector('.kritis').innerHTML = data.serious_critical + " jiwa";
  document.querySelector('.aktif').innerHTML = data.active_cases + " jiwa";
}

async function getcountry1() {
  let info = formInput.value;
  const data = await getApiCovid();
  let hasil = data.filter(res => res.includes(info));
  if (hasil.length !== 0) {
    tampilSearch(hasil);
  } else {
    tampilSearch("maaf data tidak ditemukan");
  }
}

cari.addEventListener('click', async function (el) {
  el.preventDefault();
  const key = formInput.value;
  const data = await getApiCovid();
  let hasil = data.filter(res => res.includes(key));
  if (hasil.length !== 0) {
    tampilSearch(hasil);
  } else {
    tampilSearch("maaf data tidak ditemukan");
  }
});

async function getApiCovid() {
  const data = await fetch('https://api.coronavirus.syntac.co/country')
    .then(res => res.json())
    .then(res => res)
    .catch(err => false);
  return data;
}

async function getDetailApiCovid(search) {
  const data = await fetch(`https://api.coronavirus.syntac.co/country/${search}`)
    .then(res => res.json())
    .then(res => res)
    .catch(err => false);
  return data;
}

function date() {
  const bulans = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oketober", "November", "Desember"
  ];

  const minggu = [
    "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"
  ];

  const dt = new Date();
  const tahun = dt.getFullYear();
  const bulan = bulans[dt.getMonth()];
  const hari = minggu[dt.getDay()];

  return { tahun, bulan, hari };
}

async function tampilData() {
  const data = await getApiCovid();
  const sekarang = date();
  let dt = "";
  data.forEach(el => {
    dt += `<div class="col-4 p-3">
        <div class="card text-center">
          <div class="card-header bg-dark text-white">
            COUNTERY
          </div>
          <div class="card-body">
            <h5 class="card-title">${el}</h5>
            <p class="card-text">silahkan kilik tombol dibawah untuk melihat detail</p>
            <button type="button" class="btn btn-primary detailbutton" data-toggle="modal" data-target="#exampleModal" data-country="${el}">
                Detail
            </button>
          </div>
          <div class="card-footer text-muted">
            ${sekarang.hari} / ${sekarang.bulan} / ${sekarang.tahun}
          </div>
        </div>
      </div>`
  });
  boxCard.innerHTML = dt;
}

function tampilSearch(hasil) {
  const sekarang = date();
  let html = "";
  hasil.forEach(res => {
    html += `<div class="col-4 p-3">
          <div class="card text-center">
            <div class="card-header bg-dark text-white">
              COUNTERY
            </div>
            <div class="card-body">
              <h5 class="card-title"> ${res} </h5>
              <p class="card-text">silahkan kilik tombol dibawah untuk melihat detail</p>
              <button type="button" class="btn btn-primary detail-button" data-toggle="modal" data-target="#exampleModal" data-country="${res}">
                  Detail
              </button>
            </div>
            <div class="card-footer text-muted">
              ${sekarang.hari} / ${sekarang.bulan} / ${sekarang.tahun}
            </div>
          </div>
        </div>`;
  });
  boxCard.innerHTML = html;
};

tampilData();