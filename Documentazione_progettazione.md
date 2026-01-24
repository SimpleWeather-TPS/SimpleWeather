# DOCUMENTAZIONE DI PROGETTAZIONE

## 1.1 Analisi dei Requisiti

### Requisiti Funzionali

|ID   |Requisito                     |Priorità|Stato     |
|-----|------------------------------|--------|----------|
|RF-01|Ricerca meteo per città       |Alta    |Completato|
|RF-02|Visualizzazione meteo corrente|Alta    |Completato|
|RF-03|Previsioni a 5 giorni         |Alta    |Completato|
|RF-04|Dettagli orari giornalieri    |Media   |Completato|
|RF-05|Animazioni meteo realistiche  |Media   |Completato|
|RF-06|Supporto multilingua (IT)     |Bassa   |Completato|

### Requisiti Non Funzionali

|ID    |Requisito    |Metrica           |Target                       |
|------|-------------|------------------|-----------------------------|
|RNF-01|Performance  |Tempo caricamento |< 2s                         |
|RNF-02|Usabilità    |Clicks per ricerca|≤ 2                          |
|RNF-03|Responsive   |Breakpoint mobile |600px                        |
|RNF-04|Accessibilità|Contrasto colori  |WCAG AA                      |
|RNF-05|Compatibilità|Browser supportati|Chrome, Firefox, Safari, Edge|

## 1.2 Architettura del Sistema

```
┌─────────────────────────────────────────┐
│           PRESENTATION LAYER            │
│ ┌─────────────────────────────────┐     │
│ │      HTML (index.html)          │     │
│ │   - Struttura semantica         │     │
│ │   - Form di ricerca             │     │
│ │   - Container dinamici          │     │
│ └─────────────────────────────────┘     │
└─────────────────────────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│            STYLING LAYER                │
│ ┌─────────────────────────────────┐     │
│ │       CSS (style.css)           │     │
│ │   - Animazioni meteo            │     │
│ │   - Responsive design           │     │
│ │   - Backdrop effects            │     │
│ └─────────────────────────────────┘     │
└─────────────────────────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│          APPLICATION LAYER              │
│ ┌─────────────────────────────────┐     │
│ │    JavaScript (script.js)       │     │
│ │   - Event handling              │     │
│ │   - API calls                   │     │
│ │   - DOM manipulation            │     │
│ │   - State management            │     │
│ └─────────────────────────────────┘     │
└─────────────────────────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│          EXTERNAL SERVICES              │
│ ┌─────────────────────────────────┐     │
│ │    OpenWeatherMap API           │     │
│ │   - Current Weather API         │     │
│ │   - 5 Day Forecast API          │     │
│ │    Unsplash (CDN)               │     │
│ │   - Background images           │     │
│ └─────────────────────────────────┘     │
└─────────────────────────────────────────┘
```

## 1.3 Diagramma di Gantt

### FASE 1: PIANIFICAZIONE (Settimana 1)

```
████░░░░░░░░░░░░░░░░░░░░
│
├─ Analisi requisiti (2 giorni)
├─ Studio API OpenWeatherMap (1 giorno)
└─ Design UI/UX (2 giorni)
```

### FASE 2: SVILUPPO BASE (Settimana 2)

```
░░░░████████░░░░░░░░░░░░
│
├─ Struttura HTML (1 giorno)
├─ Styling CSS base (2 giorni)
├─ Integrazione API (2 giorni)
└─ Funzionalità ricerca (1 giorno)
```

### FASE 3: FEATURES AVANZATE (Settimana 3)

```
░░░░░░░░████████░░░░░░░░
│
├─ Previsioni giornaliere (2 giorni)
├─ Tabella oraria (1 giorno)
├─ Animazioni background (2 giorni)
└─ Ottimizzazione responsive (1 giorno)
```

### FASE 4: TESTING & DEPLOY (Settimana 4)

```
░░░░░░░░░░░░░░░░████████
│
├─ Testing cross-browser (2 giorni)
├─ Bug fixing (2 giorni)
├─ Documentazione (1 giorno)
└─ Deploy GitHub Pages (1 giorno)
```

## 1.4 Diagramma dei Casi d’Uso

```
         ┌─────────────┐
         │   Utente    │
         └──────┬──────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│  Cerca   │ │Visualizza│ │  Cambia  │
│  Città   │ │  Meteo   │ │  Giorno  │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
     └────────────┴────────────┘
                  │
                  ▼
       ┌──────────────────┐
       │ OpenWeatherMap   │
       │      API         │
       └──────────────────┘
```
