# Documentazione di Sviluppo - SimpleWeather

## 2.1 Rendicontazione Ore

| Attività | Ore Previste | Ore Effettive | Scostamento |
|----------|--------------|---------------|-------------|
| **Analisi e Design** | 20h | 18h | -2h |
| Analisi requisiti | 8h | 6h | -2h |
| Design UI/UX | 12h | 12h | 0h |
| **Sviluppo Frontend** | 40h | 45h | +5h |
| HTML Structure | 6h | 5h | -1h |
| CSS Styling | 14h | 18h | +4h |
| JavaScript Logic | 20h | 22h | +2h |
| **Testing & Debug** | 15h | 20h | +5h |
| Testing funzionale | 8h | 12h | +4h |
| Bug fixing | 7h | 8h | +1h |
| **Documentazione** | 5h | 7h | +2h |
| **TOTALE** | **80h** | **90h** | **+10h** |

## 2.2 Scelte Tecniche

### Stack Tecnologico

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenWeatherMap API v2.5
- **CDN**: Unsplash per immagini di background
- **Deployment**: GitHub Pages

### Motivazioni delle Scelte

#### 1. Vanilla JavaScript vs Framework

- **Scelta**: Vanilla JS
- **Motivazione**: Progetto di piccole dimensioni, nessuna necessità di gestione stato complessa
- **Vantaggio**: Zero dependencies, bundle size ridotto, performance ottimali

#### 2. OpenWeatherMap API

- **Scelta**: Piano gratuito
- **Motivazione**: 1000 chiamate/giorno sufficienti, documentazione completa
- **Endpoints utilizzati**:
  - `/weather` → Meteo corrente
  - `/forecast` → Previsioni 5 giorni

#### 3. CSS Animations vs Canvas/WebGL

- **Scelta**: CSS Animations
- **Motivazione**: Hardware-accelerated, cross-browser compatible
- **Effetti implementati**: pioggia, neve, lampi, nuvole

#### 4. Responsive Strategy

- **Scelta**: Mobile-first con CSS Grid/Flexbox
- **Breakpoint**: 600px
- **Motivazione**: Copertura dispositivi più comuni

## 2.3 Workflow di Sviluppo

```
┌─────────────────┐
│  1. PLANNING    │
│  - User stories │
│  - Wireframes   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. SETUP       │
│  - Repository   │
│  - File struct  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. DEVELOPMENT │ ◄──┐
│  - Feature dev  │    │
│  - Local test   │    │
└────────┬────────┘    │
         │             │
         ▼             │
┌─────────────────┐    │
│  4. TESTING     │    │
│  - Manual test  │    │
│  - Bug report   │────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  5. DEPLOY      │
│  - GitHub Pages │
│  - Documentation│
└─────────────────┘
```

## 2.4 Struttura del Progetto

```
simple-weather/
│
├── index.html          # Struttura DOM principale
├── style.css           # Stili e animazioni
├── script.js           # Logica applicativa
│
├── docs/               # Documentazione
│   ├── design/
│   ├── development/
│   └── user-guide/
│
└── README.md           # Documentazione GitHub
```

## 2.5 Convenzioni di Codice

### JavaScript

```javascript
// Variabili: camelCase
const cityInput = document.getElementById("cityInput");

// Costanti: UPPER_SNAKE_CASE
const API_KEY = "219c20aad794980966e8cf5dd06566ec";

// Funzioni: camelCase con verbi
function loadData(city) { }
function renderCurrent(data) { }
```

### CSS

```css
/* Classes: kebab-case */
.weather-card { }
.forecast-container { }
```

---

**Documento generato per il progetto SimpleWeather**  
**Data**: Gennaio 2026  
**Versione**: 1.0
