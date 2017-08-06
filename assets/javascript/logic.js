var name;
var destination;
var firstTrain;
var freq;
var nextTrain;
var nextTrainFormatted;
var minutesAway;
var firstTimeConverted;
var currentTime;
var differentTime;
var timeRemain;
var minutesTillNext;
var adminState;

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

var auth = firebase.auth();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    adminState = true;
    $('#logout-btn').show();
    $('#create-admin-btn').show();
  } else {
    // User is signed out.
    adminState = false;
    $('#logout-btn').hide();
    $('#create-admin-btn').hide();
  }
});

$('document').ready(function () {

  $('body').on('click', '#login-btn', function () {
    var passwordVal = $('#pass').val().trim();
    var usernameVal = $('#username').val().trim();

    var pass = passwordVal;
    var username = usernameVal;

    auth.signInWithEmailAndPassword(username, pass);

    $('#username').val('');
    $('#pass').val('');
  });

  $('body').on('click', '#create-admin-btn', function () {
    var passwordVal = $('#pass').val().trim();
    var usernameVal = $('#username').val().trim();

    var pass = passwordVal;
    var username = usernameVal;

    auth.createUserWithEmailAndPassword(username, pass);

    $('#username').val('');
    $('#pass').val('');
  });

  $('body').on('click', '#logout-btn', function () {

    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });

  });

  $('body').on('click', '#submit-btn', function () {
    if (adminState === true) {
      name = $('#train-name-input').val().trim();
      destination = $('#destination-input').val().trim();
      firstTrain = $('#first-train-time-input').val().trim();
      freq = $('#frequency-input').val().trim();
      firstTimeConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years');
      currentTime = moment();
      differentTime = moment().diff(moment(firstTimeConverted), 'minutes');
      timeRemain = differentTime % freq;
      minutesTillNext = freq - timeRemain;
      nextTrain = moment().add(minutesTillNext, 'minutes');
      nextTrainFormatted = moment(nextTrain).format('hh:mm a')

      // push to firebase

      database.ref().child('trains').push({
        name: name,
        destination: destination,
        firstTrain: moment(firstTrain, 'HH:mm').format('hh:mm a'),
        freq: freq,
        nextTrainFormatted: nextTrainFormatted,
        minutesTillNext: minutesTillNext
      });

      // empty fields
      $('#train-name-input').val('');
      $('#destination-input').val('');
      $('#first-train-time-input').val('');
      $('#frequency-input').val('');

      return false;
    } else {
      alert('You do not have Permission To add a schedule');
    }
  });



  // appending schedule
  database.ref().child('trains').on('child_added', function (childSnapshot) {

    $('#train-table').append('<tr class="table-row table-striped" id=' + '"' + childSnapshot.key + '"' + '>' +
      '<td class="table-bordered">' + childSnapshot.val().name + '</td>' +
      '<td class="table-bordered">' + childSnapshot.val().destination + '</td>' +
      '<td class="table-bordered">' + childSnapshot.val().freq + '</td>' +
      '<td class="table-bordered">' + childSnapshot.val().nextTrainFormatted + '</td>' +
      '<td class="table-bordered">' + childSnapshot.val().minutesTillNext + '</td>' + '</tr>');


  });
});