//actual time

let celciusTemperature = null;
let feelsLikeCelciusTemperature = null;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]}, ${hours}:${minutes}`;
}

// weather search engine

function displayWeather(response) {
  let weatherIconElement = document.querySelector("#icon");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  weatherIconElement.setAttribute(
    "alt",
    `${response.data.weather[0].icon.description}`
  );

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  celciusTemperature = Number(temperatureElement.innerHTML.slice(0, -2));

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  feelsLikeCelciusTemperature = Math.round(response.data.main.feels_like);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = ` Last renewed: ${formatDate(
    response.data.dt * 1000
  )}`;
}

// city

function search(city) {
  const apiKey = "0f128b06bf582bcfa96722c9eae3c85c";
  let apiUrlbyCityName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlbyCityName).then(displayWeather);
}

search("Bucha");

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search-element");
  search(cityInputElement.value);
}

let form = document.querySelector("#submit-form");
form.addEventListener("submit", handleSubmit);

// units convertion
function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemperature = Math.round(celciusTemperature * 1.8 + 32);
  temperatureElement.innerHTML = `${farenheitTemperature}°F`;

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLikeFarenheitTemperature = Math.round(
    feelsLikeCelciusTemperature * 1.8 + 32
  );
  feelsLikeElement.innerHTML = `Feels like: ${feelsLikeFarenheitTemperature}°F`;
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${celciusTemperature}°C`;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Feels like: ${feelsLikeCelciusTemperature}°C`;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

// weather forecast
