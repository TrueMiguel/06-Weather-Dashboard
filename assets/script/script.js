// api
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=imperial

// weather api geocoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var form = document.querySelector("#search-form")
var userCityInput = document.querySelector('#search')

// event listener to the submit of the form with the user input
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var userCity = userCityInput.value;

    locationApi(userCity);
}) 

// function that uses the openweather geocoding to take the user input and then get the lat and long from it
var locationApi = function(city) {
    var userlocal = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=4ff4b45b9265dee6811bebe35a9085ea'
    fetch(userlocal)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var lat = data[0].lat
            var long = data[0].lon

            weatherAPI(lat, long)
        }) 
       
} 

// taking the users modified input and then getting the weather information from that
var weatherAPI = function (lat, long) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=4ff4b45b9265dee6811bebe35a9085ea&units=imperial'
    console.log(apiUrl)

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        console.log(data.main.humidity);
        console.log(data.weather[0].icon);
        console.log(data);
    });
};

// weatherAPI()