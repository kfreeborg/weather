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
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

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
    })

  $.ajax({
    url: forecastUrl,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);

      loadForecast(response);
    })
};



// today's weather
function loadCurrentConditions(response) {
  var date = new Date();

  var tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
  $(".temperature").append(tempF + "°F");

  var cityDate = 

  var name = response.name;
  $(".city").append(name + " " + date);

  var humidity = response.main.humidity;
  $(".humidity").append(humidity + "%");

  var windSpeed = response.wind.speed
  $(".wind-speed").append(windSpeed + "MPH");

  // var lat = response.data.coord.lat;
  // var lon = response.data.coord.lon;
  // console.log(lat, lon)

  var uvIndex = 6
  $(".uv-index").append(uvIndex);
  if (uvIndex < 7) {
    $(this).next("span").addClass("badge-danger");
  }
}

// forecast
function loadForecast(response) {
  var date = new Date();
  var forecastDays = response.list;

  for (var i = 0; i < forecastDays.length; i++) {
    var day = Number(forecastDays[i].dt_txt.split('-')[2].split(' ')[0]);
    var hour = forecastDays[i].dt_txt.split('-')[2].split(' ')[1];
    console.log(day);
    console.log(hour);

    if (forecastDays[i].dt_txt.indexOf("12:00:00") !== -1) {
      var tempF = Math.floor((forecastDays[i].main.temp - 273.15) * 1.80 + 32);


      var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
      var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
      var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
      var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
      var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + forecastDays[i].main.humidity + "%");

      var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecastDays[i].weather[0].icon + ".png")

      cardBody.append(cityDate, image, temperature, humidity);
      card.append(cardBody);
      $(".forecast").append(card);
    }
  }
};


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
    // historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click", function () {
      loadWeather(historyItem.value);

    })
    historyEl.append(historyItem);

    // if (searchHistory.length > 0) {
    //   loadWeather(searchHistory[searchHistory.length - 1]);
    // }
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
