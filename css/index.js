let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "	Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
let currentTime = `${currentDay} ${currentHour}:${currentMinute}`;
document.querySelector("h6").innerHTML = `${currentTime}`;

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
   let humidityElement = document.querySelector("#humidity");
   humidityElement.innerHTML = response.data.main.humidity;
let windElement = document.querySelector("#wind");
   windElement.innerHTML = Math.round(response.data.wind.speed);
   let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
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



search("Cairo");