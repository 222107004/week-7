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

  //Call as soon as i get the weather above
  getForecast(response.data.city);
}

// Function to format a Unix timestamp into the day of the week
function formatDate(timestamp) {
  // Create a new Date object using the provided timestamp (in seconds)
  let date = new Date(timestamp * 1000);

  // Array containing names of days of the week, starting from Sunday (index 0)
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Return the name of the day based on the day of the week (0-6) from the Date object
  return days[date.getDay()];
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

function displayforecast(response) {
  console.log(response.data);
  // Select the element where the forecast will be displayed
  let forecastelement = document.querySelector("#weather-forecast");

  //decalare and intialize empty string to hold the content
  let forecasthtml = "";

  // Loop through each day and create the HTML structure
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecasthtml += `   
            <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDate(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" </>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.minimum)}º</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.maximum
              )}º</div>
            </div>
          </div>`;
    }
  });

  // Set the innerHTML of the forecast element to the generated HTML string
  forecastelement.innerHTML = forecasthtml;
}

//A function to get the forecasrt for a city
function getForecast(city) {
  let apiKey = "1133ddbaebf743fc32d57eobt926aab0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayforecast);
  console.log(apiUrl);
}

//Show lisbon  by default
searchCity("Lisbon");
getForecast("Paris");
