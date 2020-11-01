var currentCityEl = document.querySelector("#city");
var currentTempEl = document.querySelector(".temperature");
var currentHumidityEl = document.querySelector(".humidity"); 4
var currentWindEl = document.querySelector(".wind-speed");
var currentUVEl = document.querySelector(".uv-index");
var searchBtnEl = document.querySelector("#search-btn");
var historyEl = document.querySelector("#search-history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

var apiKey = "db9e17c61d09c41192d5879ee37e6413";

function loadWeather(city) {
  var city = currentCityEl.value;

  var todayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  $.ajax({
    url: todayUrl,
    method: "GET"
  })
    .then(function (response) {
      // console.log(response.name)
      // console.log(response.weather[0].icon)
      // let tempF = (response.main.temp - 273.15) * 1.80 + 32;
      // console.log(Math.floor(tempF))
      // console.log(response.main.humidity)
      // console.log(response.wind.speed)
      loadCurrentConditions(response);
      // loadForecast(response);
    })
};



// today's weather
function loadCurrentConditions(response) {
  var tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
  $(".temperature").append(tempF + "°F");
  // console.log(Math.floor(tempF))


  var name = response.name;
  $(".city").append(name);

  var humidity = response.main.humidity;
  $(".humidity").append(humidity + "%");



}

// forecast


loadWeather();

searchBtnEl.addEventListener("click", function () {
  var city = currentCityEl.value;
  loadWeather(city);
  searchHistory.push(city);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
});

function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var historyItem = document.createElement("input");
    historyItem.setAttribute("type", "text");
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click", function () {
      loadWeather(historyItem.value);
    })
    historyEl.append(historyItem);
  }
};


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history


// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
