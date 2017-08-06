// Initialize Firebase
var config = {
  apiKey: "AIzaSyC0oWtk_ydkOoZgr3E7gINtt9v_NBKX_xY",
  authDomain: "trainscheduler-15e8c.firebaseapp.com",
  databaseURL: "https://trainscheduler-15e8c.firebaseio.com",
  projectId: "trainscheduler-15e8c",
  storageBucket: "",
  messagingSenderId: "203035204501"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on('value', function (snapshot) {
  console.log(snapshot.val());
  
});

$('document').ready(function () {

  $('#submitBtn').on('click', function () {
    console.log('hello')
    var name = $('#trainNameInput').val().trim();
    var dest = $('#destinationInput').val().trim();
    var freq = $('#frequencyInput').val().trim();
    var first = $('#firstTrainTimeInput').val().trim();
    var next = moment(first, 'HH:mm').add(freq, 'minute').calendar();
    var away;
    database.ref().push({
      name: name,
      destination: dest,
      frequency: freq,
      firstTrainTime: moment(first, 'HH:mm').format('h:mm a'),
      nextArrival: next,
      minutesAway: null,
    });
    $('#trainTable').append('<tr>' + '<td>' + name + '</td>' + '<td>' + dest + '</td>' + '<td>' + freq + '</td>' + '<td>' +
      next + '</td>' + '<td>' + away + '</td>' + '</tr>');
  });

});