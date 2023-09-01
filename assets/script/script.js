// api
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=imperial

// weather api geocoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// weather icon url:
// icon link http://openweathermap.org/img/w/{emoji}.png

var form = document.querySelector("#search-form");
var userCityInput = document.querySelector('#search');
var temp0 = document.querySelector('#temp0');
var wind0 = document.querySelector('#wind0');
var humidity0 = document.querySelector('#humidity0');
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
    var userlocal = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=4ff4b45b9265dee6811bebe35a9085ea';
    
    // pulling the searched city name and adding it to the dashboard
    var cityName = document.querySelector('#city');
    cityName.textContent = city;

    // remove the hidden state from 5 day forecast and the weather icons
    $('img').removeClass('d-none');
    $('div#five-day-container').removeClass('d-none');
    
    // appending the date to the city name
    todayDate = dayjs().format('MM/DD/YYYY');
    cityName.append(' ', todayDate);

    // fetching the lat and long from the user input
    fetch(userlocal)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var long = data[0].lon;

            weatherAPI(lat, long)
            weatherForcastApi(lat, long);
        }) 
       
};

// taking the users modified input and then getting the weather information from that
var weatherAPI = function (lat, long) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=4ff4b45b9265dee6811bebe35a9085ea&units=imperial';

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

        console.log(data)

        temp0.textContent = data.main.temp
        wind0.textContent = data.wind.speed
        humidity0.textContent = data.main.humidity

        // trying to get weather icon to update with the emoji
        var emoji = data.weather[0].icon
        
        var city = document.querySelector('#wicon')
        icon = 'https://openweathermap.org/img/w/' + emoji + '.png'
        console.log(icon)
        
        city.setAttribute('src', icon)
    });
};

var weatherForcastApi = function(lat, long) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=4ff4b45b9265dee6811bebe35a9085ea&units=imperial'

    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

        // updating 1st 5 day forecast
        temp1.textContent = data.list[5].main.temp
        wind1.textContent = data.list[5].wind.speed
        humidity1.textContent = data.list[5].main.humidity

        // updating 2nd 5 day forecast
        temp2.textContent = data.list[13].main.temp
        wind2.textContent = data.list[13].wind.speed
        humidity2.textContent = data.list[13].main.humidity
       
        // updating 3rd 5 day forecast
        temp3.textContent = data.list[21].main.temp
        wind3.textContent = data.list[21].wind.speed
        humidity3.textContent = data.list[21].main.humidity
       
        // updating 4th 5 day forecast
        temp4.textContent = data.list[29].main.temp
        wind4.textContent = data.list[29].wind.speed
        humidity4.textContent = data.list[29].main.humidity
       
        // updating 4th 5 day forecast
        temp5.textContent = data.list[37].main.temp
        wind5.textContent = data.list[37].wind.speed
        humidity5.textContent = data.list[37].main.humidity
    })
}


// weatherAPI()