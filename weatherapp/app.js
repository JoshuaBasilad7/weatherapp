var map = L.map('map').setView([12.8797, 121.7740], 6); // Centered on Philippines

// Add tile layer for base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example of fetching weather data from OpenWeatherMap
var apiKey = '648d8aa806df51860d1499ddf7bb84f8';
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Add markers for cities and fetch weather data
var cities = [
    { name: 'Manila', coordinates: [14.5995, 120.9842] },
    { name: 'Cebu', coordinates: [10.3157, 123.8854] },
    { name: 'Davao', coordinates: [7.1907, 125.4553] }
];

cities.forEach(city => {
    var marker = L.marker(city.coordinates).addTo(map);
    fetch(`${apiUrl}?q=${city.name},ph&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            var temperature = data.main.temp;
            marker.bindPopup(`<b>${city.name}</b><br>Temperature: ${temperature}°C`).openPopup();
        })
        .catch(error => console.error(`Error fetching weather for ${city.name}:`, error));
});
