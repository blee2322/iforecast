# iforecast
<img src="assets/images/poster.jpg?raw=true" >

Display a map with pins of any user’s location that has visited the website. when you click on the pin it will show the current weather in that location.User inputs where they are from to drop a pin and get the weather in that location as well. Display statistics of all visitors in a graph on site.

## Motivation

This project was created to enable visitors log their birthplace and know its weather and other basic location data. Birthplaces of previous visitors would be logged on maps and data of the vistors birthplace is available upon click.
<img src="https://d26dzxoao6i3hh.cloudfront.net/items/0d3k1C3A133a0o053s3c/Screen%20Recording%202017-10-12%20at%2003.28%20PM.gif?v=627d7623?raw=true" >

<img src="assets/images/graph.jpg?raw=true" >

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for grading and testing purposes.

### Installing

Clone to a local repository. Enjoy!

## Usage

Open index.html in your browser of choice to view the project.
Open your cloned repositoy in a text editor to review the HTML, CSS, Google Maps, Ajax, Firebase, various APIs & JS.


## Built With

* [jQuery](http://api.jquery.com/) - The Javascript library used.
* [Apixu](https://www.apixu.com/api.aspx) - Weather API used.
* [Google Maps](https://developers.google.com/maps/documentation/javascript/) - Map API used.
* [Geobytes](http://geobytes.com/free-ajax-cities-jsonp-api/) - AJAX AUTOCOMPLETE LIST CITIES JSON-P API used.
* [Bootstrap](http://getbootstrap.com/docs/4.0/getting-started/introduction/) - CSS framework used.
* [JS Info Bubble](https://github.com/googlemaps/js-info-bubble) - Google Maps infoWindow framework used.
* [Firebase](https://firebase.google.com/docs/) - database used.

### Additions

data formating snippet
```
// array of all key value from objects 
function formatHometownsGoogleMaps(locationObjs){ 
  //["san francisco, USA"]
  var locations = [];
  Object.keys(locationObjs).forEach(function(key){
    var hometown = locationObjs[key]
    var formattedHometown = [hometown.place, hometown.latitude, hometown.longitude, hometown.population];
    locations.push(formattedHometown);
  })
  return locations;
}
```
APIXU (weather) API snippet
```
function getWeather(coordinates) {
  console.log(coordinates);
  var queryPeram = coordinates;
  var apiKey = "";
  var baseURL =  "http://api.apixu.com/v1/current.json?";
  var queryURL = baseURL + "key=" + apiKey + "&q=" + queryPeram;
   console.log(queryURL);
  $.ajax({
   url: queryURL,
   method: "GET"
  }).done(function (data) {
    // console.log(data);
  
    var localTime = data.location.localtime;
    var weatherCondition = data.current.condition.text; // sunny , clear, rainy
    var currentTemp = data.current.temp_f;
    var currentWind = data.current.wind_mph;

    var weatherData = localTime + " " + weatherCondition + " " + currentTemp + " " + currentWind;
    return weatherData
  })
  return 
};
```
Google Maps API snippet
```
unction renderMap(gmapsHometowns, zoomOut){

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: (usersHometown.latitude)? (zoomOut ? zoomOut :11) : 3,
    styles: mapStyles,
    center: new google.maps.LatLng(gmapsHometowns[gmapsHometowns.length - 1][1], gmapsHometowns[gmapsHometowns.length - 1][2]),
    //center: new google.maps.LatLng(usersHometown.latitude, usersHometown.longitude),
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    // zoomControl:true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  console.log(gmapsHometowns);
  console.log(gmapsHometowns[0][1], gmapsHometowns[0][2]);
  var infowindow = new google.maps.InfoWindow({

  });

  var marker, i;
```

## Authors

participant of this project.

* **James Reantillo** - *Initial work: map feature* 
* **Fawaz Ahmed** - *Initial work: weather feature* 
* **Brandon Geeman Lee** - *Initial work: map feature* 
* **Amber Burroughs** - *Initial work: frontend of website + Google analytics* -  *Final work: Brought application together, got everything working together*
