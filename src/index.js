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

  let temperatureicon = document.querySelector("#weather-app-icon");
  temperatureicon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather Icon">`;
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

function displayforecast() {
  // Select the element where the forecast will be displayed
  let forecastelement = document.querySelector("#weather-forecast");

  //Array of days to be displayed
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //decalare and intialize empty string to hold the content
  let forecasthtml = "";

  // Loop through each day and create the HTML structure
  days.forEach(function (day) {
    forecasthtml += `   
            <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15º</strong>
              </div>
              <div class="weather-forecast-temperature">9º</div>
            </div>
          </div>`;
  });

  // Set the innerHTML of the forecast element to the generated HTML string
  forecastelement.innerHTML = forecasthtml;
}

displayforecast();
