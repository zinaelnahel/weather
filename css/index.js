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
