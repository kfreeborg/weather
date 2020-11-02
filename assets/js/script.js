var currentCityEl = document.querySelector("#city");
var searchBtnEl = document.querySelector("#search-btn");
var clearEl = document.getElementById("clear-history");
var historyEl = document.querySelector("#search-history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

var apiKey = "db9e17c61d09c41192d5879ee37e6413";
var lat;
var lon;

function loadWeather(city) {
  console.log("loadWeather", city);

  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

  $.ajax({
    url: forecastUrl,
    method: "GET"
  })
    .then(function (response) {
      var date = new Date();
      var forecastDays = response.list;
      $('.forecast').empty();
      for (var i = 0; i < forecastDays.length; i++) {

        if (forecastDays[i].dt_txt.indexOf("12:00:00") !== -1) {
          var tempF = Math.floor((forecastDays[i].main.temp - 273.15) * 1.80 + 32);

          var card = $("<div>").addClass("card col bg-light rounded text-dark m-1");
          var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
          var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
          var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
          var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + forecastDays[i].main.humidity + "%");

          var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecastDays[i].weather[0].icon + ".png")

          cardBody.empty().append(cityDate, image, temperature, humidity);
          card.empty().append(cardBody);
          $(".forecast").append(card);
        }
      }
    })

  var todayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  $.ajax({
    url: todayUrl,
    method: "GET"
  })

    .then(function (response) {
      var date = new Date();

      var tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
      $(".temperature").text(tempF + "°F");

      var cityDate = date.toLocaleDateString("en-US");
      $("#today_icon_div").attr({
        "src": "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
        "height": "100px", "width": "100px"
      });
      var name = response.name;
      $(".city").text(name + " " + cityDate);

      var humidity = response.main.humidity;
      $(".humidity").text(humidity + "%");

      var windSpeed = response.wind.speed
      $(".wind-speed").text(windSpeed + "MPH");

      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var uvUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";

      $.ajax({
        url: uvUrl,
        method: "GET"
      })
        .then(function (uvIndex) {
          var uvIndexDisplay = $("<button>");
          var finalUv = uvIndex[0].value;
          if (finalUv > 7) {
            uvIndexDisplay.addClass("btn btn-danger");
          } else if (finalUv < 4) {
            uvIndexDisplay.addClass("btn btn-success");
          } else {
            uvIndexDisplay.addClass("btn btn-warning");
          }

          $(".uv-index").empty().append(uvIndexDisplay.text(finalUv));
        })
    })
};

searchBtnEl.addEventListener("click", function () {
  //event.preventDefault();
  let city = currentCityEl.value;
  loadWeather(city);
  searchHistory.push(city);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
});

function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    let historyItem = document.createElement("input");
    historyItem.setAttribute("type", "text");
    // historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click", function () {
      loadWeather(historyItem.value);

    })
    historyEl.append(historyItem);
  }
};

clearEl.addEventListener("click", function () {
  searchHistory = [];
  localStorage.clear();
  renderSearchHistory();
});

renderSearchHistory();