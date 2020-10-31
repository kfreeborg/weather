var currentCityEl = document.querySelector(".city");
var currentTempEl = document.querySelector(".temperature");
var currentHumidityEl = document.querySelector(".humidity"); 4
var currentWindEl = document.querySelector(".wind-speed");
var currentUVEl = document.querySelector(".uv-index");
var searchBtnEl = document.querySelector("#search-btn");

// var apiKey = "db9e17c61d09c41192d5879ee37e6413";

// var searchCity = function (event) {
//   event.preventDefault();

//   var city = currentCityEl.value.trim();
//   if (city) {
//     getWeather(city);
//     currentCityEl.value = "";
//   } else {
//     alert("Please enter a valid city");
//   }
//   console.log(event);
// }


// var getWeather = function (city) {
//   var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

//   // make a request to the url
//   fetch(apiUrl).then(function (response) {
//     response.json().then(function (data) {
//       console.log(data);
//     });
//   });
// };

// searchBtnEl.addEventListener("submit", searchCity);

var promise = fetch("https://api.openweathermap.org/data/2.5/weather")
  .then(function (response) {
    console.log("response", response);
  });

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


// var citiesArray;
// if (localStorage.getItem("citySearches")) {
//   citiesArray = JSON.parse(localStorage.getItem("citySearches"));
//   writeSearchHistory(citiesArray);
// } else {
//   citiesArray = [];
// };