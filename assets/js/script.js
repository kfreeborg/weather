var currentCityEl = document.getElementsByClassName("city");
var currentTempEl = document.getElementsByClassName("temperature");
var currentHumidityEl = document.getElementsByClassName("humidity"); 4
var currentWindEl = document.getElementsByClassName("wind-speed");
var currentUVEl = document.getElementsByClassName("uv-index");

var apiKey = "db9e17c61d09c41192d5879ee37e6413";
console.log(apiKey);

var weather = {
  temperature: {
    value: 18,
    unit: "fahrenheit"
  },
  humidity: {
    value: "",
    unit: "%"
  },
  windSpeed: {
    value: "",
    unit: "MPH"
  },
  uvIndex: {
    vlaue: ""
  },
  city: "",
  iconId: ""
}


var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
console.log(queryUrl);

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