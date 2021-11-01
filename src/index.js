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
function formatDTStamp(dtstamp) {
  let date = new Date(dtstamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[day];
}
let fahrenheit = null;

function displayDailyForecast(response) {
  let forecast = response.data.daily;
  let dForecastElement = document.querySelector("#daily-forecast");
  
  let dForecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
  if(index<7){
    dForecastHTML = dForecastHTML + 
       `
       <tr>
        <td class="days-dates">${formatDTStamp(forecastDay.dt)}</td>
        <td><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/ alt="" width="40"></td>
        <td>${forecastDay.weather[0].main}</td>
        <td>${Math.round(forecastDay.temp.min)} ~ ${Math.round(forecastDay.temp.max)}</td>
      </tr>
  `;
  }

  });
  dForecastHTML = dForecastHTML + ``;
  dForecastElement.innerHTML = dForecastHTML;
  console.log(dForecastHTML);
}
function getDForecast(coordinates) {
  console.log(coordinates);
  let key = "35c9364c504818025de7c0b94a64553f";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=imperial`;
  console.log(url);
  axios.get(url).then(displayDailyForecast);

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
  getDForecast(response.data.coord);
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
//displayDailyForecast();