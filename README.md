# SimpleWeather

SimpleWeather è una web-app sviluppata come progetto scolastico che permette di consultare il meteo di una città e le previsioni dei giorni successivi utilizzando i dati forniti dalle API di OpenWeather. Il progetto ha come obiettivo principale quello di imparare a lavorare con le API, interpretare dati JSON e trasformarli in un’interfaccia semplice, chiara e pensata soprattutto per l’uso da desktop.

Inserendo il nome di una città, l’app mostra il meteo attuale (temperatura, umidità, vento e descrizione del tempo) e una sezione con le previsioni. Cliccando su uno dei giorni è possibile aprire una vista dettagliata ora per ora, utile per capire meglio l’andamento della giornata.

---
## Come è stato sviluppato

Il progetto è realizzato utilizzando **HTML**, **CSS** e **JavaScript**.  
Il browser invia richieste alle API di OpenWeather, riceve i dati in formato JSON e li elabora per mostrarli in modo chiaro e organizzato all’utente.

---

### Struttura del progetto

- **index.html** → interfaccia del sito  
- **style.css** → stile grafico e layout  
- **script.js** → logica, chiamate API e gestione dei dati

---

## Ruoli del gruppo (4 membri)

Ogni componente ha avuto un ruolo preciso.

**Project Manager, API Specialist (UMAR IQBAL) — coordinamento e organizzazione / logica e integrazione dati**  
Si è occupato di pianificare il lavoro, assegnare compiti, controllare le scadenze e comunicare con il docente.
Ha gestito le chiamate alle API, la lettura dei JSON e la preparazione dei dati per il frontend.

**Frontend Developer (MEDICI LEONARDO / MIOLA LORENZO) — interfaccia e grafica**  
Hanno curato layout, colori, struttura della pagina e usabilità del sito.

**Tester / Documentazione (ANDREA IVAN LOCATELLI) — controllo qualità e scrittura documenti**  
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


```js
const API_KEY = "LA_TUA_API_KEY";


---

## Configurazione locale con variabili d'ambiente

Per evitare di committare la key nel repository, ora `config.js` viene generato a runtime leggendo la variabile `MY_API_KEY`.

### Passi
1. Installa le dipendenze: `npm ci`
2. Crea un file `.env.local` copiando `.env.local.example` e inserisci la tua chiave:
    ```bash
    MY_API_KEY=LA_TUA_API_KEY
    ```
3. Genera `config.js`: `npm run generate:config`
4. Avvia un server statico di sviluppo: `npm run dev` (usa `serve` sulla porta 4173)

`config.js` è git-ignorato per evitare di committare la chiave; se non esiste, lo script in `script.js` blocca l'interfaccia e mostra un messaggio d'errore.

---

## Deploy su GitHub Pages (con secret `MY_API_KEY`)

Il workflow GitHub Actions (`.github/workflows/deploy.yml`):
- legge il secret `MY_API_KEY` configurato nella repo
- esegue `npm ci` e `npm run generate:config` per creare `config.js` con la key
- pubblica i file statici su GitHub Pages

Trigger: push su `main` o esecuzione manuale (`workflow_dispatch`).

> Nota: trattandosi di un'app client-side, la key sarà presente nel JS pubblicato. Per chiavi sensibili servirebbe un backend/proxy, non GitHub Pages.
