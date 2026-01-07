# SimpleWeather

SimpleWeather è una web-app sviluppata come progetto scolastico che permette di consultare il meteo di una città e le previsioni dei giorni successivi utilizzando i dati forniti dalle API di OpenWeather. Il progetto ha come obiettivo principale quello di imparare a lavorare con le API, interpretare dati JSON e trasformarli in un’interfaccia semplice, chiara e pensata soprattutto per l’uso da desktop.

Inserendo il nome di una città, l’app mostra il meteo attuale (temperatura, umidità, vento e descrizione del tempo) e una sezione con le previsioni. Cliccando su uno dei giorni è possibile aprire una vista dettagliata ora per ora, utile per capire meglio l’andamento della giornata.

---
## Come è stato sviluppato

Il progetto è realizzato utilizzando **HTML**, **CSS** e **JavaScript**.  
Il browser invia richieste alle API di OpenWeather, riceve i dati in formato JSON e li elabora per mostrarli in modo chiaro e organizzato all’utente.
Grazie a questo sistema di richieste api, riusciamo ad ottimizzare la nostra web app fornendo un servizio chiaro e completo agli utenti

---

### Struttura del progetto

- **index.html** → interfaccia del sito  
- **style.css** → stile grafico e layout  
- **script.js** → logica, chiamate API e gestione dei dati

---

## Ruoli del gruppo (4 membri)

Ogni componente ha avuto un ruolo preciso.

**Project Manager — coordinamento e organizzazione**  
Si è occupato di pianificare il lavoro, assegnare compiti, controllare le scadenze e comunicare con il docente.

**Frontend Developer — interfaccia e grafica**  
Ha curato layout, colori, struttura della pagina e usabilità del sito.

**API / Data Specialist — logica e integrazione dati**  
Ha gestito le chiamate alle API, la lettura dei JSON e la preparazione dei dati per il frontend.

**Tester / Documentazione — controllo qualità e scrittura documenti**  
Ha testato il sito, trovato eventuali errori e scritto la documentazione finale.



---

## Piattaforme e risorse utilizzate

- **OpenWeather API** – servizio di dati meteo  
  https://openweathermap.org/
- **Icons8 e icone OpenWeather** – icone grafiche
- **Visual Studio Code** – editor di codice
- **GitHub** – gestione e condivisione del progetto
- **Documentazione OpenWeather** – consultata per parametri ed endpoint

Tutto il codice è pensato a scopo **didattico** e non commerciale.

---

## Crediti

- Dati meteo: **OpenWeather**  
- Icone: **OpenWeather** e **Icons8**  
- Sviluppo: gruppo di 4 studenti (TPS – progetto scolastico)

SimpleWeather può essere ampliato in futuro con nuove funzioni come grafici, tema scuro, salvataggio delle città preferite e versione mobile.

## Come utilizzare il sito

Per usare SimpleWeather non servono installazioni particolari.

1. Apri il file `index.html` nel browser.
2. Scrivi nel campo di ricerca il nome della città (es. “Milano” o “Roma”).
3. Premi invio o il pulsante di ricerca.
4. Verrà mostrato:
   - il meteo attuale
   - le previsioni di più giorni
5. Cliccando su uno dei giorni nelle previsioni si apre una tabella con:
   - temperatura ora per ora
   - descrizione meteo
   - velocità del vento

Per far funzionare correttamente le richieste, nel file `script.js` è necessario inserire la propria API key di OpenWeather dentro:

```js
const API_KEY = "LA_TUA_API_KEY";
