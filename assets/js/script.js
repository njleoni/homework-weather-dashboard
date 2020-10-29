// fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b9e68eb5875c33cf7f524dde6562b60d')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

var cityInput = document.querySelector("#city-text");
var citySearch = document.querySelector("#button-addon2");
var cityList = document.querySelector("#city-list");
var lastCity = cityInput
// console.log(lastCity)

var cities = [];

cityStorage();

function cityStorage () {
  var cityPush = JSON.parse(localStorage.getItem("city"));
  // console.log(cityPush[0]);
  // for (var c = 0; c < cityPush.length; c++) {
  //   document.getAttribute("data-index",c).value = cityPush[c];
  //   console.log(cityPush);

  // }

}

renderCities();

function renderCities() {
  // Clear cityList element and update cityCountSpan
  cityList.innerHTML = "";

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    // var li = document.createElement("li");
    // li.textContent = city;
    // li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = city;
    button.classList = "btn btn-outline-secondary btn-lg btn-block city[i])";
    button.type = "button text";
    // button.id = "button-addon2";
    button.id = ("city[i]");
    button.setAttribute("data-index", i);

    cityList.appendChild(button);
    // cityList.appendChild(li);

    localStorage.setItem("city",JSON.stringify(cities));
  }
  // if (localStorage.getItem("city") !== null) {
  //   console.log("null")
  //   console.log(cities);
  // } 
  // else {
  //       for (var i = 0; i < cities.length; i++) {
  //     var city = cities[i];
  
  //     // var li = document.createElement("li");
  //     // li.textContent = city;
  //     // li.setAttribute("data-index", i);
  
  //     var button = document.createElement("button");
  //     button.textContent = city;
  //     button.classList = "btn btn-outline-secondary btn-lg btn-block";
  //     button.type = "button text";
  //     button.id = "button-addon2";
  //     button.setAttribute("data-index", i);
  
  //     cityList.appendChild(button);
  //     // cityList.appendChild(li);
  
  //     localStorage.setItem("city",JSON.stringify(cities));
  //   }
  // }

  // Render a new li for each city
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
  //   renderCities();
  // }
});
