const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.key === "Enter") {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&lang=id&APPID=${api.key}`)
    .then((res) => res.json())
    .then(displayResults)
    .catch((err) => console.error(err));
}

function displayResults(weather) {
  if (!weather || weather.cod !== 200) {
    alert("Lokasi tidak ditemukan!");
    return;
  }

  const city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const dateEl = document.querySelector(".location .date");
  dateEl.innerText = dateBuilder(now);

  const temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  const weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].description;

  const hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const dayName = days[d.getDay()];
  const dateNum = d.getDate();
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();

  return `${dayName}, ${dateNum} ${monthName} ${year}`;
}
