fetch('http://api.openweathermap.org/data/2.5/weather?q=Gilbert,mn,us&units=imperial&APPID=b9e68eb5875c33cf7f524dde6562b60d')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var temp = data.main.temp;
    console.log(temp);
    var realFeel = data.main.feels_like;
    console.log(realFeel);
    var humidity = data.main.humidity;
    console.log(humidity);
    var lat = data.coord.lat;
    console.log(lat);
    var lon = data.coord.lon;
    console.log(lon);
    var dt = data.dt;
    console.log(dt);
  });

var cityInput = document.querySelector("#city-text");
var citySearch = document.querySelector("#button-addon2");
var cityList = document.querySelector("#city-list");
var lastCity = cityInput
console.log(lastCity)

var cities = [];
// cityList.innerHTML = "";



// renderCities();
cityStorage();

function renderCities() {
  // Clear cityList element and update cityCountSpan
  localStorage.setItem("cityStor",JSON.stringify(cities));
  cityList.innerHTML = "";

}
      


function cityStorage () {
  // cityList.innerHTML = "";
  var cityPush = JSON.parse(localStorage.getItem("cityStor"));
        console.log(cityPush);
  if (localStorage.getItem("cityStor") !== null) {
    for (var c = 0; c < cityPush.length; c++) {
      var city = cityPush[c];
      console.log(city);
      var button = document.createElement('button');
      button.textContent = city;
      button.classList = 'btn btn-outline-secondary btn-block btn-lg)';
      button.type = 'button text';
      button.id = "button-addon2";
      button.setAttribute('data-index', c);
        
      cityList.appendChild(button);

  } 
      
  }
}     
      
      
      // When form is submitted...
citySearch.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("clicked");

  var cityText = cityInput.value.trim();
  // console.log(cityText);

  // Return from function early if submitted cityText is blank
  if (cityText === "") {
    return;
  }

  // Add new city to cities array, clear the input
  // cities.push(cityText);
  cities.push(cityText);
  cityInput.value = "";

  // Re-render the list
  renderCities();
  cityStorage();
});

// When a element inside of the cityList is clicked...
//search for this city's weather again.
cityList.addEventListener("click", function(event) {
  var element = event.target.text;
  console.log(element);

  // // If that element is a button...
  // if (element.matches("button") === true) {
  //   // Get its data-index value and remove the city element from the list
  //   var index = element.parentElement.getAttribute("data-index");
  //   cities.splice(index, 1);

  //   // Re-render the list
    // renderCities();
  // }
});
