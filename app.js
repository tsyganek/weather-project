// global variables

let celciusTemperature = null;
let feelsLikeCelciusTemperature = null;
let forecastCelciusTemperatureMax = null;
let foreastCelciusTemperatureMin = null;
const apiKey = "0f128b06bf582bcfa96722c9eae3c85c";

//define actual time

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

// weather forecast data

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "forecast text-center row">`;

  //define correct days of week for forecast data
  let today = new Date();
  let weekday = today.getDay();

  let weekRange = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  let days = weekRange.slice(weekday, weekday + 6);

  // man & max temperatures for every forecast day

  for (let i = 1; i <= 5; i++) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2 forecast">
        <div class="forecast-day">
            <h4 class="forecast-day-text">${days[i]}</h4>
        </div>
          <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
            response.data.daily[i].weather[0].icon
          }@2x.png"/>
        <div class="forecast-temp">
          <span class="forecast-temp-max">${Math.round(
            response.data.daily[i].temp.max
          )}°
          </span>
          <span class="forecast-temp-min">
           ${Math.round(response.data.daily[i].temp.min)}°</span>
        </div>
      </div>
  `;

    console.log(`http://openweathermap.org/img/wn/
            ${response.data.daily[i].weather[0].icon}.png`);
  }
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// get API data for forecast

function getForecast(coordinates) {
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric&exclude=current,minutely,hourly`;
  console.log(forecastApi);
  axios.get(forecastApi).then(displayForecast);
}

// weather search engine

function displayWeather(response) {
  // weather icon
  let weatherIconElement = document.querySelector("#icon");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute(
    "alt",
    `${response.data.weather[0].icon.description}`
  );

  // current temperature
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  celciusTemperature = Number(temperatureElement.innerHTML.slice(0, -2));

  //current humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  //current wind speed
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  //current feels like temperature
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  feelsLikeCelciusTemperature = Math.round(response.data.main.feels_like);

  // description of current weather
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  // city name
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  //  time
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = ` Last renewed: ${formatDate(
    response.data.dt * 1000
  )}`;

  // take data for forecast
  getForecast(response.data.coord);
}

// city

function search(city) {
  let apiUrlbyCityName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlbyCityName).then(displayWeather);
}

search("Kyiv");

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search-element");
  search(cityInputElement.value);
}

let form = document.querySelector("#submit-form");
form.addEventListener("submit", handleSubmit);

// units convertion

// convertion to farenheit
function displayFarenheitTemperature(event) {
  event.preventDefault();

  //current temperature
  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemperature = Math.round(celciusTemperature * 1.8 + 32);
  temperatureElement.innerHTML = `${farenheitTemperature}°F`;

  //feels lake temperature
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLikeFarenheitTemperature = Math.round(
    feelsLikeCelciusTemperature * 1.8 + 32
  );
  feelsLikeElement.innerHTML = `Feels like: ${feelsLikeFarenheitTemperature}°F`;
}

//convertion to celcius
function displayCelciusTemperature(event) {
  event.preventDefault();

  // current temperature
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${celciusTemperature}°C`;

  // feels like temperature
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Feels like: ${feelsLikeCelciusTemperature}°C`;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);
