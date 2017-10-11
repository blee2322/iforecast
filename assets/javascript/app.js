// test
$(document).ready(function(){
// Google analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-107619861-1');

// Initialize Firebase
var config = {
 apiKey: "AIzaSyAa2Klj4goG8mX8Z6xZTYt1yT01p9xtJaA",
 authDomain: "iforecast-c0d80.firebaseapp.com",
 databaseURL: "https://iforecast-c0d80.firebaseio.com",
 projectId: "iforecast-c0d80",
 storageBucket: "iforecast-c0d80.appspot.com",
 messagingSenderId: "940595726063"
};


firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref();

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var hometownsRef = database.ref("/hometowns");
// end firebase init

var gmapsHometowns = [];
// on load of map with no FB data 
var hometownData = {
  /* in the format [city, latitude, longitude, population].
  */
  defaultLocation: [
    "San Francisco, CA, United States", //city
    "37.700199", // latitude
    "-122.405998", //longitude
    "278058881" // population
  ],
  hometowns: [this.defaultLocation]
}
// start views count handler 
connectedRef.on("value", function(snap) {
  // If they are connected..
  // console.log(snap.val())//true or false 

  if (snap.val()) {

    // Add user to the connections list.
    var connectionsList = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    //https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect
    connectionsList.onDisconnect().remove();
  }
});

connectionsRef.on("value", function(snap) {
  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").text(snap.numChildren());
  // console.log((snap.numChildren()));
});
// viewers end 

// map load handler]
hometownsRef.on("value", function(snap) {
  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  var hometowns = snap.val();
  //console.log(hometowns);
  //if(Object.keys(hometowns).length == 0)
  if(!hometowns){
    gmapsHometowns = [hometownData.defaultLocation];    
  } else {
    gmapsHometowns = formatHometownsGoogleMaps(hometowns);
    hometownData.hometowns = gmapsHometowns;
  }
  renderMap(gmapsHometowns);
  // console.log((snap.numChildren()));
});

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

// button that creates an event that zooms out automatically
function renderMap(gmapsHometowns, zoomOut){

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

  for (i = 0; i < gmapsHometowns.length; i++) {
    
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(gmapsHometowns[i][1], gmapsHometowns[i][2]),
      map: map,
      icon: "assets/images/marker3.png"
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        map.setZoom(11);
        map.panTo(marker.position);
        // map.setCenter(marker);
        //console.log(gmapsHometowns[i][1] + "," + gmapsHometowns[i][2]);
        var weatherCoordinates = (gmapsHometowns[i][1] + "," + gmapsHometowns[i][2]).toString();
    
        var queryPeram = weatherCoordinates;
        var apiKey = "5be11e7282a5413f9ae194901170510";
        var baseURL =  "https://api.apixu.com/v1/current.json?";
        var queryURL = baseURL + "key=" + apiKey + "&q=" + queryPeram;
        // console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function (data) {
          // console.log(data);
          var localTime = data.location.localtime;
          var weatherCondition = data.current.condition.text;
          var weatherIcon;

          var currentTemp = data.current.temp_f;
          var currentWind = data.current.wind_mph;
          var localTime = data.location.localtime;
          var weatherCondition = data.current.condition.text;
          var currentTemp = data.current.temp_f;
          var currentWind = data.current.wind_mph;
          var weatherIcon;
          var nf = Intl.NumberFormat();
          nf.format(gmapsHometowns[i][3])
          if (weatherCondition === "Mist") {
      
            weatherIcon = " <img id='images' src='http://via.placeholder.com/150x150'>"
          }
          else {
            weatherIcon = " <img src='http://via.placeholder.com/50x50'>"
          }
          var weatherData = localTime + " " + weatherCondition + " " + currentTemp + " " + currentWind;


          var weatherData = localTime + " " + weatherCondition + " " + currentTemp + " " + currentWind;
          infowindow.setContent('<div id="iw-container">' +
                    '<p class="iw-icon">' + weatherIcon + '</p>' +
                    '<p class="iw-location">' + gmapsHometowns[i][0] + '</p>' +
                    '<p class="iw-time">' + localTime + '</p>' +
                    '<p class="iw-weatherCondition">'+ weatherCondition +' </p>' +
                    '<p class="iw-currentTemp">' + 'temp: ' + currentTemp + '&#8457' + '</p>' +
                    '<p class="iw-currentWind">' + 'wind: '+ currentWind + '</p>' +
                    '<p class="iw-population">' + 'population: ' + nf.format(gmapsHometowns[i][3]) + '</p>' +
                  '</div>');
         // infowindow.setContent(gmapsHometowns[i][0] + ' population: ' + gmapsHometowns[i][3] + 'Forecast: ' + weatherData );
          // + " imag src" +  weatherIcon
          infowindow.open(map, marker);

        })
      }
    })(marker, i));
  }
}

$(function (){
   $("#hometown").autocomplete({
    source: function (request, response) {
     $.getJSON(
      "http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
      function (data) {
        response(data)
      }
     );
    },
    minLength: 3,
    select: function (event, ui) {
      // before doing anything below, check if the city is in hometownData.hometowns.
      // if it is, don't do anything.
      // if the hometown is not in that array, then we can add it to firebase.

      var selectedObj = ui.item;
      $("#hometown").val(selectedObj.value);

      getCityDetails(selectedObj.value).done(function (data) {
          // console.log(data);
          
        
          usersHometown.place = data.geobytesfqcn;
          usersHometown.population = data.geobytespopulation;
          usersHometown.latitude = data.geobyteslatitude;
          usersHometown.longitude = data.geobyteslongitude;
          
          console.log(usersHometown);
          handleHometownClick(usersHometown);
          // after push hide form.
          return usersHometown;
        });
      return false;
    },
    open: function () {
     $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
    },
    close: function () {
     $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
    }
   });
   $("#hometown").autocomplete("option", "delay", 100);
});

function handleHometownClick(hometownObj){
  // once user has clicked on a hometown from the autocomplete dropdown:
  // - push hometown to firebase hometown collection √
  // - set in local storage a key to prevent the hometown form from displaying again √
  // - hide the hometown form. √
  // (not in this function) - handle the hometown stats in the firebase change event.
  hometownsRef.push(hometownObj);
  $('#hometown-form').addClass('hide');
  localStorage.setItem('hide_hometown_form', true);
}

function getCityDetails(fqcn) {
 
  if (typeof fqcn == "undefined") fqcn = $("#f_elem_city").val();
  cityfqcn = fqcn;
 
  if (cityfqcn) {
    
     return $.getJSON(
        "http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+cityfqcn
           
      );
  }
}

function getWeather(coordinates) {
  console.log(coordinates);
  var queryPeram = coordinates;
  var apiKey = "5be11e7282a5413f9ae194901170510";
  var baseURL =  "https://api.apixu.com/v1/current.json?";
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

  // show the hometown form if and only if they don't
  // have the 'hide_hometown_form' field in local storage set
  if(localStorage.getItem('hide_hometown_form') === null){
    $('#hometown-form').removeClass('hide');
  }
  var usersHometown = {};

  $("#zoomOut").on("click", function(){
    // usershometown into an array 
      var userLocationData = []
        Object.keys(usersHometown).forEach(function(key){
            userLocationData.push(key);
      });

      renderMap((gmapsHometowns)? gmapsHometowns: userLocationData);
      // usershometown into an array 
  });
  $("#downArrow").on("click", function() {
      $("html, body").animate({
      scrollTop: $("#main").offset().top}, 2000);
    return false;
    });

});









