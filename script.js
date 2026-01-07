/* SIMPLE WEATHER — OPENWEATHER (FREE, STABILE) */

const API_KEY = "219c20aad794980966e8cf5dd06566ec";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");

const weatherCard = document.getElementById("weatherCard");
const cityNameEl = document.getElementById("cityName");
const descriptionEl = document.getElementById("description");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const weatherIconEl = document.getElementById("weatherIcon");

let forecastList = []; //

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return showError("Inserisci una città.");
  loadData(city);
});

cityInput.addEventListener("keyup", e => e.key === "Enter" && searchBtn.click());

/* ---------------- CARICA TUTTO ---------------- */
async function loadData(city) {
  clearError();
  weatherCard.classList.add("hidden");

  try {
    // meteo attuale
    const curUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=it`;

    // previsioni 5 giorni (ogni 3 ore)
    const foreUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=it`;

    const [curRes, foreRes] = await Promise.all([
      fetch(curUrl),
      fetch(foreUrl)
    ]);

    if (!curRes.ok) throw new Error("Errore meteo attuale");
    if (!foreRes.ok) throw new Error("Errore previsioni");

    const current = await curRes.json();
    const forecast = await foreRes.json();

    forecastList = forecast.list;

    renderCurrent(current);
    renderDaily(forecast);
  } catch (err) {
    console.error(err);
    showError("Errore nel recupero dei dati meteo.");
  }
}

/* ---------------- METEO ATTUALE ---------------- */
function renderCurrent(cur) {
  cityNameEl.textContent = `${cur.name}, ${cur.sys.country}`;
  descriptionEl.textContent = cur.weather[0].description;
  temperatureEl.textContent = `${Math.round(cur.main.temp)}°C`;
  humidityEl.textContent = `${cur.main.humidity}%`;
  windEl.textContent = `${cur.wind.speed} m/s`;

  weatherIconEl.src = `https://openweathermap.org/img/wn/${cur.weather[0].icon}@2x.png`;
  weatherIconEl.alt = cur.weather[0].description;
}

/* ---------------- PREVISIONI (CARDS) ---------------- */
function renderDaily(forecast) {
  const oldForecast = document.getElementById("forecastContainer");
  if (oldForecast) oldForecast.remove();

  const oldTable = document.getElementById("hourlyTable");
  if (oldTable) oldTable.remove();

  const container = document.createElement("div");
  container.id = "forecastContainer";

  // raggruppiamo per giorno
  const days = {};

  forecastList.forEach(item => {
    const d = new Date(item.dt * 1000);
    const key = d.toISOString().split("T")[0];

    if (!days[key]) days[key] = [];
    days[key].push(item);
  });

  const dates = Object.keys(days).slice(1, 6); // prossimi 5 giorni

  dates.forEach(dateStr => {
    const dayItems = days[dateStr];

    const temps = dayItems.map(x => x.main.temp);
    const min = Math.round(Math.min(...temps));
    const max = Math.round(Math.max(...temps));

    const middle = dayItems[Math.floor(dayItems.length / 2)];

    const d = new Date(dateStr);
    const dayName = d.toLocaleDateString("it-IT", { weekday: "short" });

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <strong>${dayName}</strong><br>
      <img src="https://openweathermap.org/img/wn/${middle.weather[0].icon}.png">
      <small>${middle.weather[0].description}</small><br>
      <small>min ${min}° — max ${max}°</small>
    `;

    card.addEventListener("click", () => showHourly(dayItems));

    container.appendChild(card);
  });

  weatherCard.appendChild(container);
  weatherCard.classList.remove("hidden");
}

/* ---------------- TABELLA ORARIA ---------------- */
function showHourly(items) {
  const old = document.getElementById("hourlyTable");
  if (old) old.remove();

  const table = document.createElement("table");
  table.id = "hourlyTable";
  table.style.marginTop = "14px";
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.background = "#fff";

  table.innerHTML = `
    <thead style="background:#f1f1f1">
      <tr>
        <th style="padding:8px">Ora</th>
        <th style="padding:8px">Temp</th>
        <th style="padding:8px">Descrizione</th>
        <th style="padding:8px">Vento</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  items.forEach(h => {
    const t = new Date(h.dt * 1000);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="padding:6px 8px">${t.getHours()}:00</td>
      <td style="padding:6px 8px">${Math.round(h.main.temp)}°C</td>
      <td style="padding:6px 8px">${h.weather[0].description}</td>
      <td style="padding:6px 8px">${h.wind.speed} m/s</td>
    `;

    tbody.appendChild(row);
  });

  weatherCard.appendChild(table);
}

/* ---------------- UTILITY ---------------- */
function showError(msg){ errorMessage.textContent = msg; }
function clearError(){ errorMessage.textContent = ""; }
