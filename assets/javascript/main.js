
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



