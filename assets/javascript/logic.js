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

  database.ref().on('value', function(snapshot){
    console.log(snapshot.val());
    var snapshotVal = snapshot.val();
    for (var i = 0; i < snapshotVal.length; i++){
        var row = $('<tr>')
        row.append('<td>'+ snapshotVal[i].name + '</td>' + '<td>'+ snapshotVal[i].destination + '</td>' + '<td>'+ snapshotVal[i].frequency + '</td>' +
            '<td>'+ snapshotVal[i].firstTrainTime + '</td>' + '<td>'+ snapshotVal[i].nextArrival + '</td>' + '<td>'+ snapshotVal[i].minutesAway + '</td>');
        
        ('#trainTable').append(row);
    }
  });

  $('document').ready(function(){

    $('#submitBtn').on('click', function(){
        console.log('hello')
        var name = $('#trainNameInput').val().trim();
        var dest = $('#destinationInput').val().trim();
        var freq = $('#frequencyInput').val().trim();
        var first = moment($('#firstTrainTimeInput').val().trim()).format('HH:mm a');
        var next;
        var away;
        database.ref().push({
            name: name,
            destination: dest,
            frequency: freq,
            firstTrainTime: first,
            nextArrival: null,
            minutesAway: null,
        });
        $('#trainTable').append('<tr>' + '<td>'+ name + '</td>' + '<td>'+ dest + '</td>' + '<td>'+ freq + '</td>' +
            '<td>'+ first + '</td>' + '<td>'+ next + '</td>' + '<td>'+ away + '</td>' + '</tr>');
    });

  });