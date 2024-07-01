let searchformelement = document.querySelector("#search-form");
searchformelement.addEventListener("submit", handlesubmit);

function handlesubmit(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#search-form-input");
  let cityelement = document.querySelector("#cityname");
  cityelement.innerHTML = searchinput.value;
  searchCity(searchinput);
}

function resfreshWeather(response) {
  console.log(response.data);
}

//Function to serach for acity
function searchCity(city) {
  let apiKey = "1133ddbaebf743fc32d57eobt926aab0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(resfreshWeather);
  console.log(apiUrl);
  //make api call
}
