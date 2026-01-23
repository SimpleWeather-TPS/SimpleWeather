/* SIMPLE WEATHER — REALISTICO */

const API_KEY = window.API_KEY;

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");
const loader = document.getElementById("loader");

// Elementi sfondo
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

/* ---------------- EVENTI ---------------- */
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return showError("Inserisci una città.");
  loadData(city);
});

cityInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchBtn.click();
});

/* ---------------- CARICA DATI ---------------- */
async function loadData(city) {
  clearError();

  if (!API_KEY) {
    showError("API key mancante. Genera config.js con scripts/generate-config.js.");
    return;
  }
  
  // Reset interfaccia durante caricamento
  weatherCard.classList.add("hidden");
  loader.classList.remove("hidden"); // Mostra loader

  try {
    const curUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=it`;

    const foreUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=it`;

    const [curRes, foreRes] = await Promise.all([
      fetch(curUrl),
      fetch(foreUrl)
    ]);

    if (!curRes.ok || !foreRes.ok) throw new Error();

    const current = await curRes.json();
    const forecast = await foreRes.json();

    forecastList = forecast.list;

    // Imposta sfondo iniziale
    updateBackground(current.weather[0].main);

    renderCurrent(current);
    renderDaily();

  } catch (error) {
    showError("Città non trovata. Controlla il nome.");
  } finally {
    // Nascondi SEMPRE il loader alla fine
    loader.classList.add("hidden"); 
  }
}

/* ---------------- METEO ATTUALE ---------------- */
function renderCurrent(cur) {
  cityNameEl.textContent = `${cur.name}, ${cur.sys.country}`;
  descriptionEl.textContent = capitalize(cur.weather[0].description);
  temperatureEl.textContent = `${Math.round(cur.main.temp)}°`;
  humidityEl.textContent = cur.main.humidity;
  windEl.textContent = cur.wind.speed;

  weatherIconEl.src = `https://openweathermap.org/img/wn/${cur.weather[0].icon}@4x.png`;
}

/* ---------------- PREVISIONI GIORNALIERE ---------------- */
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
    const midDayItem = items[Math.floor(items.length / 2)];
    const temps = items.map(i => i.main.temp);
    
    const d = new Date(dateStr);
    const isToday = d.toDateString() === new Date().toDateString();
    const dayLabel = isToday ? "Oggi" : d.toLocaleDateString("it-IT", { weekday: "short" });

    const card = document.createElement("div");
    card.className = "forecast-card";

    card.innerHTML = `
      <strong>${capitalize(dayLabel)}</strong><br>
      <img src="https://openweathermap.org/img/wn/${midDayItem.weather[0].icon}.png" width="40">
      <div>${Math.round(Math.min(...temps))}° / ${Math.round(Math.max(...temps))}°</div>
    `;

    card.addEventListener("click", () => {
      document.getElementById("hourlyTable")?.remove();
      activeCard?.classList.remove("active");
      card.classList.add("active");
      activeCard = card;
      
      updateBackground(midDayItem.weather[0].main);
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

/* ---------------- TABELLA ORARIA ---------------- */
function showHourly(items) {
  document.getElementById("hourlyTable")?.remove();

  const table = document.createElement("table");
  table.id = "hourlyTable";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Ora</th>
        <th>Meteo</th>
        <th>Temp</th>
        <th>Vento</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");
  
  items.slice(0, 8).forEach(h => {
    const t = new Date(h.dt * 1000);
    const hour = t.getHours().toString().padStart(2, '0') + ":00";
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${hour}</td>
      <td style="display:flex; align-items:center; justify-content:center; gap:5px;">
        <img src="https://openweathermap.org/img/wn/${h.weather[0].icon}.png" width="30">
        ${capitalize(h.weather[0].description)}
      </td>
      <td><strong>${Math.round(h.main.temp)}°</strong></td>
      <td>${h.wind.speed} m/s</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("forecastContainer").after(table);
}

/* ---------------- SFONDI REALISTICI (FOTO + OVERLAY) ---------------- */
function updateBackground(weatherMain) {
  // Rimuovi tutte le classi precedenti
  bgImage.className = "bg-layer";
  bgOverlay.className = "overlay-layer";

  const condition = weatherMain.toLowerCase();

  // Logica selezione classi
  if (condition.includes("clear")) {
    bgImage.classList.add("bg-sunny");
    bgOverlay.classList.add("sun-overlay"); // Effetto luce
  } 
  else if (condition.includes("cloud")) {
    bgImage.classList.add("bg-cloudy");
    // Nessun overlay speciale, solo foto nuvolosa
  } 
  else if (condition.includes("rain") || condition.includes("drizzle")) {
    bgImage.classList.add("bg-rainy");
    bgOverlay.classList.add("rain-overlay"); // Pioggia CSS
  } 
  else if (condition.includes("snow")) {
    bgImage.classList.add("bg-snowy");
    bgOverlay.classList.add("snow-overlay"); // Neve CSS
  } 
  else if (condition.includes("thunder")) {
  bgImage.classList.add("bg-thunder");
  bgOverlay.classList.add("rain-overlay");

  setInterval(() => {
    bgOverlay.classList.add("flash-overlay");
    setTimeout(() => bgOverlay.classList.remove("flash-overlay"), 150);
  }, Math.random() * 6000 + 4000);
}

  else {
    bgImage.classList.add("bg-cloudy"); // Default
  }
}

/* ---------------- UTILITY ---------------- */
function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove("hidden"); // Mostra esplicitamente
  weatherCard.classList.add("hidden");
  loader.classList.add("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden"); // Nascondi
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
