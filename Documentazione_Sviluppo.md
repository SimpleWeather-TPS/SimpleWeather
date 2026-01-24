# DOCUMENTAZIONE DI SVILUPPO

## 2.1 Rendicontazione Ore

|Attività             |Ore Previste|Ore Effettive|Scostamento|
|---------------------|------------|-------------|-----------|
|**Analisi e Design** |**20h**     |**18h**      |**-2h**    |
|Analisi requisiti    |8h          |6h           |-2h        |
|Design UI/UX         |12h         |12h          |0h         |
|**Sviluppo Frontend**|**40h**     |**45h**      |**+5h**    |
|HTML Structure       |6h          |5h           |-1h        |
|CSS Styling          |14h         |18h          |+4h        |
|JavaScript Logic     |20h         |22h          |+2h        |
|**Testing & Debug**  |**15h**     |**20h**      |**+5h**    |
|Testing funzionale   |8h          |12h          |+4h        |
|Bug fixing           |7h          |8h           |+1h        |
|**Documentazione**   |**5h**      |**7h**       |**+2h**    |
|**TOTALE**           |**80h**     |**90h**      |**+10h**   |

## 2.2 Scelte Tecniche

### Stack Tecnologico

- **Frontend**: HTML, CSS, JavaScript
- **API**: OpenWeatherMap API v2.5

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
│   2. SETUP      │
│  - Repository   │
│  - File struct  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. DEVELOPMENT  │ ◄──┐
│  - Feature dev  │    │
│  - Local test   │    │
└────────┬────────┘    │
         │             │
         ▼             │
┌─────────────────┐    │
│   4. TESTING    │    │
│  - Manual test  │    │
│  - Bug report   │────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   5. DEPLOY     │
│ - GitHub Pages  │
│ - Documentation │
└─────────────────┘
```

### Struttura del Progetto

```
simple-weather/
│
├── index.html
├── style.css
├── script.js
│
├── docs/
│   ├── design/
│   ├── development/
│   └── user-guide/
│
└── README.md
```
