const weatherData = {
    "Ahmedabad": "40°C",
    "Delhi": "38°C",
    "Mumbai": "32°C",
    "Bengaluru": "28°C",
    "Chennai": "35°C"
};

const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherOutput = document.getElementById("weatherOutput");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (weatherData[city]) {
        weatherOutput.textContent = `The weather in ${city} is ${weatherData[city]}`;
    } else {
        weatherOutput.textContent = `Sorry, no weather data available for ${city}`;
    }
});
