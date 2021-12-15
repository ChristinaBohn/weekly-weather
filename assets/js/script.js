// appid (custom API key)

// Fetch One Call weather data (units = imperial)
// Exclude minutely, hourly

var searchBtn = document.querySelector('#button-addon2');
var apiKey = '130e45b8035df0b2f3d2389f4fb66852'
$(document).ready(function() {

function geoData (cityName) {
  // event.preventDefault();
  var cityName = document.querySelector('#cityInput').value;
  var coordUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  console.log(cityName)
  fetch( coordUrl )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
        console.log( lat, lon );

        oneCall( lat,lon, cityName );
    });

}

function oneCall(lat, lon, cityName) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`;
  fetch( url )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      $('#todaysWeather').empty();

      var currentDate = moment(data.current.dt, 'X').format('L');
      var cardToday = $('<div>').addClass('card').css('width', '18rem');
      var cardHeader = $('<div>').addClass('card-header').text(cityName + ' ' + currentDate);
      var weatherList = $('<ul>').addClass('list-group list-group-flush');
      var temp = $('<li>').addClass('list-group-item').text('Temperature: ' + data.current.temp + 'ºF');
      var humid = $('<li>').addClass('list-group-item').text('Humidity: ' + data.current.humidity + '%');
      var wind = $('<li>').addClass('list-group-item').text('Wind Speed: ' + data.current.wind_speed + 'MPH');
      var uvi = $('<li>').addClass('list-group-item').text('UV Index: ' + data.current.uvi );

      weatherList.append(temp, humid, wind, uvi);
      cardToday.append(cardHeader, weatherList);
      $('#todaysWeather').append(cardToday)

      for(let i = 1; i < data.daily.length - 2; i++) {
 
        var dailyDate = moment(data.daily.i.dt, 'X').format('L');
        var cardForecast = $('<div>').addClass('card').css('width', '18rem');
        var cardDailyHeader = $('<div>').addClass('card-header').text(dailyDate);
        var forecastList = $('<ul>').addClass('list-group list-group-flush');
        var tempDaily = $('<li>').addClass('list-group-item').text('Temperature: ' + data.daily.i.temp + 'ºF');
        var humidDaily = $('<li>').addClass('list-group-item').text('Humidity: ' + data.daily.i.humidity + '%');
        var windDaily = $('<li>').addClass('list-group-item').text('Wind Speed: ' + data.daily.i.wind_speed + 'MPH');
        var uviDaily = $('<li>').addClass('list-group-item').text('UV Index: ' + data.daily.i.uvi );
  
        forecastList.append(tempDaily, humidDaily, windDaily, uviDaily);
        cardForcast.append(cardDailyHeader, forecastList);
        $('#forecast').append(cardForecast)
      }
      console.log(dailyDate);
    });

}

searchBtn.addEventListener('click',function() {
  event.preventDefault();
  // console.log(cityName)
  geoData()
} );
})



// moment(data.date, 'X').format('L')

// Print weather data to cards
        // From <form> listen to "submit"
            // Select <input> .val() and provide to geo API

        // From <button> listen to "click"
            // Get the city from the button's data attribute



// function appendData(data) {
//     var mainContainer = document.getElementById("myData");
//     for (var i = 0; i < data.length; i++) {
//       var div = document.createElement("div");
//       div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
//       mainContainer.appendChild(div);
//     }
//   }

//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}&units=imperial





//  BEGIN FETCH DEMO -----

  // var tableBody = document.getElementById('repo-table');
  // var fetchButton = document.getElementById('fetch-button');

  // function getApi() {
  //   // fetch request gets a list of all the repos for the node.js organization
  //   var requestUrl = 'https://api.github.com/orgs/nodejs/repos';

  //   fetch(requestUrl)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data)
  //       //Loop over the data to generate a table, each table row will have a link to the repo url
  //       for (var i = 0; i < data.length; i++) {
  //         // Creating elements, tablerow, tabledata, and anchor
  //         var createTableRow = document.createElement('tr');
  //         var tableData = document.createElement('td');
  //         var link = document.createElement('a');

  //         // Setting the text of link and the href of the link
  //         link.textContent = data[i].html_url;
  //         link.href = data[i].html_url;

  //         // Appending the link to the tabledata and then appending the tabledata to the tablerow
  //         // The tablerow then gets appended to the tablebody
  //         tableData.appendChild(link);
  //         createTableRow.appendChild(tableData);
  //         tableBody.appendChild(createTableRow);
  //       }
  //     });
  // }

  // fetchButton.addEventListener('click', getApi);

// END FETCH DEMO -----