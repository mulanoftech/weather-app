function formatDate() {
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekdays[now.getDay()];
  let hours = now.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = now.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let daytime = document.querySelector("#display-day-time");
  daytime.innerHTML = `${day} ${hours}:${minutes}`;
}
formatDate();

// #search-button, #search-input, #curr-location
// #display-city, #actual-temp

function displayWeatherInfo(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let key = "35c9364c504818025de7c0b94a64553f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  axios.get(url).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let key = "35c9364c504818025de7c0b94a64553f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=imperial`;
  axios.get(url).then(displayWeatherInfo);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let button = document.querySelector("#curr-location");
button.addEventListener("click", getCurrentPosition);

// initialize city to preview Singapore's weather
searchCity("Singapore");
