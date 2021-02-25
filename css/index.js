function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let temperatureElement=document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city");
   let dateElement = document.querySelector("#date");
   let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
   let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
   cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
   dateElement.innerHTML = formatDate(response.data.dt * 1000);
    humidityElement.innerHTML = response.data.main.humidity;
     windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
    



function searching(cityName) {
  let key = "2cea381e738c66dcff2a5021f253b186";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayDailyForecast);
  
}

function formatDayForecast(timestamp) {
  let forecastDay = new Date(timestamp);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = weekDays[forecastDay.getDay()];
  return `${weekDay}`;
}

function displayDailyForecast(response) {
  let forecastElement = document.querySelector("#daily-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index * 8];
    forecastElement.innerHTML += ` 
    <div class="col-2">
      <li class="weatherForecast" id="weekDay">${formatDayForecast(forecast.dt * 1000)}</li>
      <li><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="90%"/></li>
      <li class="weatherForecast">${Math.round(forecast.main.temp_max)}º/${Math.round(forecast.main.temp_min)}º</li>
    </div>`;
  }
}
function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city").value;
  searching(cityName);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

function searchLocation(position) {
  let key = "2cea381e738c66dcff2a5021f253b186";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayDailyForecast);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationBtn = document.querySelector("#btnLocation");
currentLocationBtn.addEventListener("click", getCurrentLocation);


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-button");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-button");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searching("Cairo");