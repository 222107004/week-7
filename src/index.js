function handlesubmit(event) {
  //replcaess with what was entered
  event.preventDefault();
  let searchinput = document.querySelector("#search-form-input");
  searchCity(searchinput.value);
}

function resfreshWeather(response) {
  let temperatureelement = document.querySelector("#weather-app-temperature");
  temperatureelement.innerHTML = Math.round(response.data.temperature.current);

  let cityelement = document.querySelector("#city");
  cityelement.innerHTML = response.data.city;

  let descriptionelement = document.querySelector("#description");
  descriptionelement.innerHTML = response.data.condition.description;

  let humidityelement = document.querySelector("#Humidity");
  humidityelement.innerHTML = `${response.data.temperature.humidity}%`;

  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = `${response.data.wind.speed}km\h`;

  let timelement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timelement.innerHTML = formatDate(date);

  console.log(response.data);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${date.getHours()}:${date.getMinutes()}`;
}

//Function to serach for acity
function searchCity(city) {
  //takes city as parameter as it seraches for a city
  //make api and update user interface

  let apiKey = "1133ddbaebf743fc32d57eobt926aab0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(resfreshWeather);
}

let searchformelement = document.querySelector("#search-form");
searchformelement.addEventListener("submit", handlesubmit);

//Show lisbon  by default
searchCity("Lisbon");
