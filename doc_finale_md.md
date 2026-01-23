# Documentazione Finale - SimpleWeather

## Manuale Tecnico

### Architettura del Codice

#### HTML Structure

```html
<body>
  <!-- Layer Background -->
  <div id="bg-image"></div>      <!-- Immagini fotografiche -->
  <div id="bg-overlay"></div>    <!-- Overlay animati -->
  
  <!-- UI Container -->
  <div class="app-container">
    <h1>SimpleWeather</h1>
    
    <!-- Search -->
    <div class="search-box">
      <input id="cityInput">
      <button id="searchBtn">
    </div>
    
    <!-- Feedback -->
    <div id="errorMessage"></div>
    <div id="loader"></div>
    
    <!-- Weather Card (generato dinamicamente) -->
    <div id="weatherCard">
      <!-- Meteo corrente -->
      <!-- Previsioni giornaliere -->
      <!-- Tabella oraria -->
    </div>
  </div>
</body>
```

#### CSS Architecture

```
style.css
│
├── BASE
│   ├── Reset & Typography
│   └── Body & Container
│
├── BACKGROUNDS
│   ├── .bg-layer (foto statiche)
│   ├── .overlay-layer (animazioni)
│   ├── .bg-sunny / .bg-cloudy / etc.
│   └── Animazioni: cloudDrift, sunPulse, rainMove, snowFall
│
├── OVERLAY EFFECTS
│   ├── .sun-overlay (glow solare)
│   ├── .rain-overlay (gocce animate)
│   ├── .snow-overlay (fiocchi)
│   └── .flash-overlay (lampi)
│
├── UI COMPONENTS
│   ├── .search-box
│   ├── .weather-card
│   ├── .forecast-card
│   └── #hourlyTable
│
└── UTILITIES
    ├── .hidden
    └── Media Queries (@600px)
```

#### JavaScript Modules

```javascript
script.js
│
├── CONFIGURATION
│   └── API_KEY
│
├── DOM REFERENCES
│   ├── Form elements
│   ├── Background layers
│   └── Weather card elements
│
├── STATE MANAGEMENT
│   ├── forecastList (array)
│   └── activeCard (riferimento)
│
├── EVENT HANDLERS
│   ├── searchBtn.click
│   └── cityInput.keyup
│
├── DATA FETCHING
│   └── loadData(city)
│       ├── fetch current weather
│       ├── fetch forecast
│       └── error handling
│
├── RENDERING
│   ├── renderCurrent(data)
│   ├── renderDaily()
│   └── showHourly(items)
│
├── VISUAL EFFECTS
│   └── updateBackground(condition)
│       ├── Clear → sunny bg + sun overlay
│       ├── Clouds → cloudy bg
│       ├── Rain → rainy bg + rain overlay
│       ├── Snow → snowy bg + snow overlay
│       └── Thunder → thunder bg + flash
│
└── UTILITIES
    ├── showError(msg)
    ├── clearError()
    └── capitalize(str)
```

### Flusso di Esecuzione

#### 1. Ricerca Città

```
User Input
    │
    ├─> Validazione input
    │   └─> Se vuoto: showError()
    │
    └─> loadData(city)
        │
        ├─> Reset UI
        │   ├─> Hide weatherCard
        │   └─> Show loader
        │
        ├─> API Calls (parallele)
        │   ├─> fetch(/weather)
        │   └─> fetch(/forecast)
        │
        ├─> Success
        │   ├─> updateBackground()
        │   ├─> renderCurrent()
        │   └─> renderDaily()
        │       └─> showHourly()
        │
        └─> Error
            └─> showError()
```

#### 2. Selezione Giorno

```
Click forecast-card
    │
    ├─> Remove previous active
    ├─> Set new active
    ├─> updateBackground()
    └─> showHourly(items)
```

### Gestione Errori

| Scenario | Gestione | Output |
|----------|----------|--------|
| Città non trovata | catch API error | "Città non trovata. Controlla il nome." |
| Input vuoto | Validazione preventiva | "Inserisci una città." |
| Network error | catch fetch error | "Città non trovata..." |
| API rate limit | catch 429 | Messaggio generico errore |

## Guida Utente

### Come Usare SimpleWeather

#### 1. Ricerca Meteo

1. Digitare il nome di una città italiana (es. "Milano", "Roma")
2. Premere INVIO o cliccare "Cerca"
3. Il meteo apparirà automaticamente

#### 2. Visualizzazione Dati

- **Temperatura grande**: Temperatura attuale in gradi Celsius
- **Icona**: Rappresentazione visiva delle condizioni meteo
- **Umidità**: Percentuale di umidità relativa
- **Vento**: Velocità del vento in metri/secondo

#### 3. Previsioni

- Sotto il meteo corrente sono presenti 5 card giornaliere
- Ogni card mostra: giorno, icona, temperature minima e massima
- La card "Oggi" è selezionata di default

#### 4. Dettagli Orari

- Cliccare su una card giornaliera per visualizzare le previsioni orarie
- La tabella mostra: ora, condizioni, temperatura, vento
- Massimo 8 intervalli orari (ogni 3 ore)

#### 5. Sfondi Dinamici

L'applicazione cambia automaticamente sfondo e animazioni:

- **Sole**: Cielo azzurro con effetto luce
- **Nuvole**: Nuvole in movimento
- **Pioggia**: Gocce animate
- **Neve**: Fiocchi che cadono
- **Temporale**: Lampi intermittenti

## Manutenzione

### Modificare la API Key

```javascript
// script.js, linea 3
const API_KEY = "TUA_CHIAVE_QUI";
```

### Aggiungere una Nuova Condizione Meteo

```javascript
// 1. Aggiungere immagine in style.css
.bg-fog {
  background-image: url("https://images.unsplash.com/...");
}

// 2. Aggiungere overlay se necessario
.fog-overlay {
  background: rgba(200,200,200,0.4);
}

// 3. Aggiungere logica in updateBackground()
else if (condition.includes("fog")) {
  bgImage.classList.add("bg-fog");
  bgOverlay.classList.add("fog-overlay");
}
```

### Modificare Numero Giorni Forecast

```javascript
// script.js, funzione renderDaily()
const dates = Object.keys(days).slice(0, 7); // Da 5 a 7 giorni
```

### Cambiare Lingua

```javascript
// Nelle chiamate API
&lang=en  // Inglese
&lang=fr  // Francese
&lang=de  // Tedesco
```

---

**Documento generato per il progetto SimpleWeather**  
**Data**: Gennaio 2026  
**Versione**: 1.0
