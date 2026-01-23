/* SIMPLE WEATHER — REALISTICO */

const API_KEY = window.API_KEY;

/* ================= ELEMENTI DOM ================= */
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");
const loader = document.getElementById("loader");

const bgImage = document.getElementById("bg-image");
const bgOverlay = document.getElementById("bg-overlay");

const weatherCard = document.getElementById("weatherCard");
const cityNameEl = document.getElementById("cityName");
const descriptionEl = document.getElementById("description");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const weatherIconEl = document.getElementById("weatherIcon");

let forecastList = [];
let activeCard = null;

/* ================= AUTOCOMPLETE ================= */
const searchBox = document.querySelector(".search-box");

const suggestionsBox = document.createElement("div");
suggestionsBox.className = "suggestions-box hidden";
searchBox.appendChild(suggestionsBox);

let debounceTimer = null;

/* ================= EVENTI ================= */
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return showError("Inserisci una città.");
  loadDataByName(city);
});

cityInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchBtn.click();
});

cityInput.addEventListener("input", () => {
  const query = cityInput.value.trim();
  if (query.length < 2) {
    suggestionsBox.classList.add("hidden");
    return;
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => fetchSuggestions(query), 300);
});

document.addEventListener("click", e => {
  if (!searchBox.contains(e.target)) {
    suggestionsBox.classList.add("hidden");
  }
});

/* ================= SUGGERIMENTI ================= */
async function fetchSuggestions(query) {
  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      query
    )}&limit=5&appid=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) return;

    const data = await res.json();
    if (!data.length) {
      suggestionsBox.classList.add("hidden");
      return;
    }

    suggestionsBox.innerHTML = "";
    data.forEach(city => {
      const item = document.createElement("div");
      item.className = "suggestion-item";
      item.textContent = `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`;

      item.addEventListener("click", () => {
        cityInput.value = item.textContent;
        suggestionsBox.classList.add("hidden");
        loadDataByCoords(city.lat, city.lon);
      });

      suggestionsBox.appendChild(item);
    });

    suggestionsBox.classList.remove("hidden");
  } catch (err) {
    console.error(err);
  }
}

/* ================= CARICAMENTO DATI ================= */
async function loadDataByName(city) {
  clearError();
  weatherCard.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${API_KEY}`;

    const geoRes = await fetch(geoUrl);
    if (!geoRes.ok) throw new Error();

    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error();

    loadDataByCoords(geoData[0].lat, geoData[0].lon);
  } catch {
    showError("Città non trovata.");
    loader.classList.add("hidden");
  }
}

async function loadDataByCoords(lat, lon) {
  clearError();
  weatherCard.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    const curUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`;
    const foreUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`;

    const [curRes, foreRes] = await Promise.all([
      fetch(curUrl),
      fetch(foreUrl)
    ]);

    if (!curRes.ok || !foreRes.ok) throw new Error();

    const current = await curRes.json();
    const forecast = await foreRes.json();

    forecastList = forecast.list;

    updateBackground(current.weather[0].main);
    renderCurrent(current);
    renderDaily();
  } catch {
    showError("Errore nel recupero dei dati meteo.");
  } finally {
    loader.classList.add("hidden");
  }
}

/* ================= METEO ATTUALE ================= */
function renderCurrent(cur) {
  cityNameEl.textContent = `${cur.name}, ${cur.sys.country}`;
  descriptionEl.textContent = capitalize(cur.weather[0].description);
  temperatureEl.textContent = `${Math.round(cur.main.temp)}°`;
  humidityEl.textContent = cur.main.humidity;
  windEl.textContent = cur.wind.speed;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${cur.weather[0].icon}@4x.png`;
}

/* ================= PREVISIONI GIORNALIERE ================= */
function renderDaily() {
  document.getElementById("forecastContainer")?.remove();
  document.getElementById("hourlyTable")?.remove();

  const container = document.createElement("div");
  container.id = "forecastContainer";

  const days = {};
  forecastList.forEach(item => {
    const key = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!days[key]) days[key] = [];
    days[key].push(item);
  });

  const dates = Object.keys(days).slice(0, 5);

  dates.forEach((dateStr, index) => {
    const items = days[dateStr];
    const mid = items[Math.floor(items.length / 2)];
    const temps = items.map(i => i.main.temp);

    const d = new Date(dateStr);
    const isToday = d.toDateString() === new Date().toDateString();
    const label = isToday ? "Oggi" : d.toLocaleDateString("it-IT", { weekday: "short" });

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <strong>${capitalize(label)}</strong><br>
      <img src="https://openweathermap.org/img/wn/${mid.weather[0].icon}.png" width="40">
      <div>${Math.round(Math.min(...temps))}° / ${Math.round(Math.max(...temps))}°</div>
    `;

    card.addEventListener("click", () => {
      document.getElementById("hourlyTable")?.remove();
      activeCard?.classList.remove("active");
      card.classList.add("active");
      activeCard = card;
      updateBackground(mid.weather[0].main);
      showHourly(items);
    });

    container.appendChild(card);
    if (index === 0) {
      activeCard = card;
      card.classList.add("active");
    }
  });

  weatherCard.appendChild(container);
  weatherCard.classList.remove("hidden");
  showHourly(days[dates[0]]);
}

/* ================= TABELLA ORARIA ================= */
function showHourly(items) {
  document.getElementById("hourlyTable")?.remove();

  const table = document.createElement("table");
  table.id = "hourlyTable";
  table.innerHTML = `
    <thead>
      <tr><th>Ora</th><th>Meteo</th><th>Temp</th><th>Vento</th></tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");
  items.slice(0, 8).forEach(h => {
    const t = new Date(h.dt * 1000);
    const hour = t.getHours().toString().padStart(2, "0") + ":00";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${hour}</td>
      <td><img src="https://openweathermap.org/img/wn/${h.weather[0].icon}.png" width="30"> ${capitalize(h.weather[0].description)}</td>
      <td><strong>${Math.round(h.main.temp)}°</strong></td>
      <td>${h.wind.speed} m/s</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("forecastContainer").after(table);
}

/* ================= SFONDI ================= */
function updateBackground(main) {
  bgImage.className = "bg-layer";
  bgOverlay.className = "overlay-layer";

  const c = main.toLowerCase();
  if (c.includes("clear")) bgImage.classList.add("bg-sunny");
  else if (c.includes("cloud")) bgImage.classList.add("bg-cloudy");
  else if (c.includes("rain")) {
    bgImage.classList.add("bg-rainy");
    bgOverlay.classList.add("rain-overlay");
  } else if (c.includes("snow")) {
    bgImage.classList.add("bg-snowy");
    bgOverlay.classList.add("snow-overlay");
  } else if (c.includes("thunder")) {
    bgImage.classList.add("bg-thunder");
    bgOverlay.classList.add("rain-overlay");
  }
}

/* ================= UTILITY ================= */
function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove("hidden");
  weatherCard.classList.add("hidden");
}

function clearError() {
  errorMessage.classList.add("hidden");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}




