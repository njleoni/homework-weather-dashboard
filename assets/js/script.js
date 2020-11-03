var cityInput = document.querySelector("#city-text");
var citySearch = document.querySelector("#button-addon2");
var cityButton = document.querySelector("#button-city");
var cityList = document.querySelector("#city-list");
var weatherToday = document.getElementById("current-weather");
var cityName = document.getElementById("#city");
var weatherIcon = document.getElementById("icon");
var cityDateEl = document.createElement('h4');
var tempEl = document.createElement('h4');
var humidityEl = document.createElement('h4');
var realFeelEl = document.createElement('h4');
var windEl = document.createElement('h4');
var uvEl = document.createElement('h4');
var cities = [];
console.log(cities);
localStorage.setItem("cityStor",JSON.stringify(cities))

// When form is submitted...
citySearch.addEventListener("click", function(event) {
  event.preventDefault();
  var cityText = cityInput.value.trim();
  cities.push(cityText);
  cityInput.value = "";
  getweather(cityText);
  cityStorage (cityText);
});


function getweather(cityText) {
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityText + "&APPID=b9e68eb5875c33cf7f524dde6562b60d&units=imperial"
fetch(weatherURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    weatherIcon.setAttribute("style", "width: 80px")
    // weatherIcon.append(weatherIcon)    
    var cityEl = data.name;
    var dateEl = new Date(data.dt * 1000).toLocaleString();
    cityDateEl.textContent = cityEl + " (" + dateEl + ") ";
    weatherToday.append(cityDateEl);
    tempEl.textContent = "Temperature: " + data.main.temp;
    weatherToday.append(tempEl);
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    weatherToday.append(humidityEl);
    realFeelEl.textContent = "Real Feel: " + data.main.feels_like;
    weatherToday.append(realFeelEl);
    windEl.textContent = "Wind Speed: " + data.wind.speed;
    weatherToday.append(windEl);

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=b9e68eb5875c33cf7f524dde6562b60d"
    fetch(uvURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      
      var uvIndex = data.value;
      // console.log(uvIndex);
      uvEl.textContent = "UV Index: " + uvIndex;
      weatherToday.append(uvEl);
  
      if (uvIndex <= 2) {
        //set low
        uvEl.setAttribute("style", "color: green;")
      } else if (uvIndex > 2 && uvIndex < 5) {
        //set moderate
        uvEl.setAttribute("style", "color: yellow;")
      } else if (uvIndex >= 5 && uvIndex < 8) {
        //set high
        uvEl.setAttribute("style", "color: orange;")
      } else if (uvIndex >= 8) {
        // set extreme
        uvEl.setAttribute("style", "color: red;")
      }
    });

      var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=5&units=imperial&appid=b9e68eb5875c33cf7f524dde6562b60d&units=imperial"
      fetch(fiveDayURL)
      .then(function (response) {
      return response.json();
      })
      .then(function (data) {
      console.log(data);
      var fiveDay = data.list

      // for (var i = 0; i < data.list.length; i++) {
      //   if 
      // }






        });
  });
};
// renderWeather();

// function renderWeather () {
//   cityEl = document.createElement('h3');
//   cityEl.textContent = cityName;
//   weatherToday.appendChild(cityEl);
// }


// cityList.innerHTML = "";

// renderCities();
cityStorage();

// function renderCities() {
//   // Clear cityList element and update cityCountSpan
//   localStorage.setItem("cityStor",JSON.stringify(cities));
//   cityList.innerHTML = "";

// }
      

function cityStorage (cityText) {
  // cityList.innerHTML = "";
  var cityPush = JSON.parse(localStorage.getItem("cityStor"));
        // console.log(cityPush);
  if (localStorage.getItem("cityStor") !== null) {
    for (var c = 0; c < cityPush.length; c++) {
      var city = cityPush[c];
      // console.log(city);
      var button = document.createElement('button');
      button.textContent = city;
      button.classList = 'btn btn-outline-secondary btn-block btn-lg)';
      button.type = 'button text';
      button.id = "button-city";

      button.setAttribute('data-index', c);     
      cityList.appendChild(button);

  } 
      
  }
}     

// cityButton.addEventListener("click", function(event) {
//   event.preventDefault();
//   getweather(cityText);


// });

      
      // When form is submitted...
// citySearch.addEventListener("click", function(event) {
//   event.preventDefault();
//   console.log("clicked");
  

//   var cityText = cityInput.value.trim();
//   // console.log(cityText);

//   // Return from function early if submitted cityText is blank
//   if (cityText === "") {
//     return;
//   }

//   // Add new city to cities array, clear the input
//   // cities.push(cityText);
//   cities.push(cityText);
//   cityInput.value = "";

//   // Re-render the list
//   renderCities();
//   cityStorage();
  
// });

// When a element inside of the cityList is clicked...
//search for this city's weather again.
// cityList.addEventListener("click", function(event) {
//   var element = event.target.text;
//   console.log(element);

//   // // If that element is a button...
//   // if (element.matches("button") === true) {
//   //   // Get its data-index value and remove the city element from the list
//   //   var index = element.parentElement.getAttribute("data-index");
//   //   cities.splice(index, 1);

//   //   // Re-render the list
//     // renderCities();
//   // }
// });
