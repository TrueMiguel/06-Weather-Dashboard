// api
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=imperial

// weather api geocoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// weather icon url:
// icon link http://openweathermap.org/img/w/{emoji}.png

var form = document.querySelector("#search-form")
var userCityInput = document.querySelector('#search')
var temp0 = document.querySelector('#temp0')
var wind0 = document.querySelector('#wind0')
var humidity0 = document.querySelector('#humidity0')
var  icon = ''

// event listener to the submit of the form with the user input
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var userCity = userCityInput.value;

    locationApi(userCity);
}) 

// https://openweathermap.org/img/wn/10d@2x.png

// function that uses the openweather geocoding to take the user input and then get the lat and long from it
var locationApi = function(city) {
    var userlocal = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=4ff4b45b9265dee6811bebe35a9085ea'
    
    // pulling the searched city name and adding it to the dashboard
    var cityName = document.querySelector('#city')
    cityName.textContent = city

    $('img').removeClass('d-none')
    $('div#five-day-container').removeClass('d-none')
    
    // appending the date to the city name
    todayDate = dayjs().format('MM/DD/YYYY')
    cityName.append(' ', todayDate)

    fetch(userlocal)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var lat = data[0].lat
            var long = data[0].lon

            // weatherAPI(lat, long)
            weatherForcastApi(lat, long)
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
        temp0.textContent = data.main.temp
        wind0.textContent = data.wind.speed
        humidity0.textContent = data.main.humidity

        var emoji = data.weather[0].icon
        var city = document.querySelector('#city')
        icon = 'https://openweathermap.org/img/w/' + emoji + '.png'
        console.log(icon)
        
        city.setAttribute('src', icon)

        // console.log(data.main.humidity);
        // console.log(data.weather[0].icon);
        // console.log(data);
    });
};

var weatherForcastApi = function(lat, long) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=4ff4b45b9265dee6811bebe35a9085ea&units=imperial'
    console.log(apiUrl)

    fetch(apiUrl)
    .then(function (response) {
        console.log(response)
        return response.json();
    })

    .then(function (data) {
        console.log(data)
    })
}


// weatherAPI()