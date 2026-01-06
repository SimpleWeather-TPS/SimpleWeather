<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>SimpleWeather</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        <h1>SimpleWeather</h1>
        <p class="subtitle">Inserisci una città per vedere il meteo</p>

        <div class="search-box">
            <input 
                type="text" 
                id="cityInput" 
                placeholder="Es. Bergamo, Roma, Milano">
            <button id="searchBtn">Cerca</button>
        </div>

        <div id="errorMessage" class="error-message"></div>

        <div id="weatherCard" class="weather-card hidden">
            <h2 id="cityName"></h2>
            <p id="description"></p>
            <div class="weather-main">
                <span id="temperature" class="temperature"></span>
                <img id="weatherIcon" alt="Icona meteo">
            </div>
            <p><strong>Umidità:</strong> <span id="humidity"></span>%</p>
            <p><strong>Vento:</strong> <span id="wind"></span> m/s</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
