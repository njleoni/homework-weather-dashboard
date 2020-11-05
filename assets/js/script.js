var cityInput = document.querySelector("#city-text");
var citySearch = document.querySelector("#button-addon2");
var cityButton = document.querySelector("#button-city");
var cityList = document.querySelector("#city-list");
var weatherToday = document.getElementById("current-weather");
var cityName = document.getElementById("#city");
var weatherIcon = document.getElementById("icon");
var fiveDayCard = document.getElementById("dailyCard");
var cityDateEl = document.createElement('h4');
var tempEl = document.createElement('h4');
var humidityEl = document.createElement('h4');
var realFeelEl = document.createElement('h4');
var windEl = document.createElement('h4');
var uvEl = document.createElement('h4');
var cityArray = [];
var cityRefresh = "";

cityStorage();
// getweather();

// When form is submitted...
citySearch.addEventListener("click", function(event) {
  event.preventDefault();
  cityRefresh = cityInput.value.trim();
  cityArray.push(cityInput.value.trim());
  localStorage.setItem("cityStor", JSON.stringify(cityArray))
  getweather();
  cityStorage();
});

// When form is submitted...
if (localStorage.getItem("cityStor") !== null) {
  cityList.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("clicked")
  
  });

} 


if (localStorage.getItem("cityStor") !== null) {
    cityArray = JSON.parse(localStorage.getItem("cityStor"));
    cityRefresh = cityArray[cityArray.length-1];
    // console.log(cityRefresh);
    localStorage.setItem("cityStor", JSON.stringify(cityArray))
    getweather();
} 

function getweather() {
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityRefresh + "&APPID=b9e68eb5875c33cf7f524dde6562b60d&units=imperial"
fetch(weatherURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    weatherIcon.setAttribute("style", "width: 80px")    
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
    
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=b9e68eb5875c33cf7f524dde6562b60d"
    fetch(uvURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      
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

      var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=b9e68eb5875c33cf7f524dde6562b60d&units=imperial"
      fetch(fiveDayURL)
      .then(function (response) {
      return response.json();
      })
      .then(function (data) {
      // console.log(data);
      fiveDayCard.innerHTML = "";

      for (var i = 1; i < 6; i++) {
        var cardOutline = document.createElement("div");
        cardOutline.classList = "col-lg-3";
        fiveDayCard.appendChild(cardOutline);
        var cardFrame = document.createElement("div");
        cardFrame.classList = "card text-white bg-dark mb-3";
        // cardFrame.setAttribute("style", "width: 10rem;")
        // cardFrame.setAttribute("style", "margin: 1px")
        cardOutline.appendChild(cardFrame);
        var cardImage = document.createElement("img");
        cardImage.classList = "card-img-top";
        cardImage.setAttribute("src", "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png")
        cardFrame.appendChild(cardImage);
        var cardBody = document.createElement("div");
        cardBody.classList = "card-body";
        cardFrame.appendChild(cardBody);
  
        //append date to card
        var cardDate = document.createElement("h5");
        cardDate.classList = "card-title";
        cardDate.textContent = new Date(data.daily[i].dt * 1000).toLocaleString();
        cardBody.appendChild(cardDate);
        
        //append temp to card
        var cardTemp = document.createElement("p");
        cardTemp.textContent = "Temp " + data.daily[i].temp.day;
        cardBody.appendChild(cardTemp);
        //append humidity to card
        var cardHum = document.createElement("p");
        cardHum.textContent = "Humidity " + data.daily[i].humidity;
        cardBody.appendChild(cardHum);
        
      }

        });
  });
};

function cityStorage() {
  cityList.innerHTML = "";
  cityOb = JSON.parse(localStorage.getItem("cityStor"));
  if (localStorage.getItem("cityStor") !== null) {
    for (var c = 0; c < cityOb.length; c++) {
      var button = document.createElement('button');
      button.textContent = cityOb[c];
      button.classList = 'btn btn-outline-secondary btn-block btn-lg)';
      button.type = 'button';
      button.id = 'button-city';
      button.setAttribute('data-index', c);     
      cityList.appendChild(button);
    } 
      
  }
}     

