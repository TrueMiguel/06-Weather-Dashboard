// api
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=imperial

var form = document.querySelector("#search-form")
var searchInput = document.querySelector('#search')

// need to have the api get called. Then need it to be spliced into useable sections. 
// first work on making sure the API works
// second work off the submit function. 

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var userinput = searchInput.value;
    
    weatherAPI(userinput);
}) 

var weatherAPI = function (user) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=35.91&lon=-82.30&appid=4ff4b45b9265dee6811bebe35a9085ea&units=imperial'
    // var apiUrl = https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=imperial
    // 35.918896030764245, -82.30132160280368

    fetch(apiUrl)
        .then(function (response) {
            return response.json()
            
            .then(function (data) {
            console.log(data.main.humidity)
            console.log(data.weather[0].icon)
            console.log(data)
        })
        })
}

weatherAPI()