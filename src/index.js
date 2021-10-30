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
// #display-city, #actual-temp, #temp-min, #temp-max
// #icon

let fahrenheit = null;

function displayDailyForecast() {

  let dForecastElement = document.querySelector("#daily-forecast");
  let days = ["Thu","Fri","Sat","Sun"];

  let dForecastHTML = ``;
  days.forEach(function (day) {
  dForecastHTML = dForecastHTML + 
       `
       <tr>
        <td class="days-dates">Date</td>
        <td><i class="fas fa-sun"></i></td>
        <td>Sunny</td>
        <td>65 ~ 80</td>
      </tr>
  `;
  });
  dForecastHTML = dForecastHTML + ``;
  dForecastElement.innerHTML = dForecastHTML;
  console.log(dForecastHTML);
}

function displayWeatherInfo(response) {
  let currIcon = response.data.weather[0].icon;
  document.querySelector("#display-city").innerHTML = response.data.name;
  let fahrenheit = Math.round(response.data.main.temp);

  document.querySelector("#actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#temp-max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${currIcon}@2x.png`);
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

// this is for the F link
let c2flink = document.querySelector("#c-to-f");
c2flink.addEventListener("click", function (event) {
  event.preventDefault();
  let celsius = document.querySelector("#actual-temp").innerHTML;
  c2flink.classList.add("active");
  f2clink.classList.remove("active");
  let newFahr = Math.round((celsius * 9) / 5 + 32);
  document.querySelector("#actual-temp").innerHTML = newFahr;
});

// this is for the C link
let f2clink = document.querySelector("#f-to-c");
f2clink.addEventListener("click", function (event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#actual-temp").innerHTML;
  // remove the active class from the Fahrenheit link.
  c2flink.classList.remove("active");
  // add the active class to the Celsius link.
  f2clink.classList.add("active");
  let newCelsius = Math.round(((fahrenheit - 32) * 5) / 9);
  document.querySelector("#actual-temp").innerHTML = newCelsius;
});

// initialize city to preview Singapore's weather
searchCity("Singapore");
displayDailyForecast();